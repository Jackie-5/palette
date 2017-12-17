/**
 * Created by Jackie.Wu on 2017/10/31.
 */

import React, { Component } from 'react'
import { ListView, List } from 'antd-mobile';
import axiosAll from 'axios';
import axios from '../../../libs/axios';
import pageAjax from '../../../libs/pageAjax';

const Item = List.Item;
const Brief = Item.Brief;


const MyBody = (props) => {
    return <div className="person-color-body">
        {props.children}
    </div>
};

export default class extends Component {
    constructor(props) {
        super(props);
        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

        const dataSource = new ListView.DataSource({
            getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });
        this.dataBlob = {};
        this.sectionIDs = [];
        this.rowIDs = [];
        this.genData = (length = 1) => {
            this.rowIDs['0'] = [];
            for (let jj = 0; jj < length; jj++) {
                const rowName = jj;
                this.rowIDs['0'].push(rowName);
                this.dataBlob[rowName] = rowName;
            }
            // new object ref
            this.sectionIDs = ['0'];
            this.rowIDs = [].concat(this.rowIDs);
        };

        this.state = {
            dataSource: dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
            isLoading: true,
        };
    }

    componentDidMount() {
        const self = this.props.self;
        const state = self.state;
        // simulate initial Ajax
        axiosAll.all([axios({
            url: pageAjax.UserBasic,
        }), axios({
            url:pageAjax.UserLectionMyWorks,
        })])
            .then((data) => {
                state.personState = {...data[0].data, list: data[1].data};
                this.genData();
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
                    isLoading: false,
                });
                self.setState(state);
            })

    }

    render() {
        const self = this.props.self;
        const { personState } = self.state;
        const row = (rowData, sectionID, rowID) => {
            return (
                <List key={rowID} className="person-color-body__row">
                    {
                        personState.list.length > 0 ? personState.list.map((item, i)=>{
                            return <Item
                                key={i}
                                onClick={self.pageLeftSwitch.bind(self,  {item: self.state.leftIcon[5], person: item})}
                                className="person-color-body__row__title" multipleLine>
                                <span>{item.lectionname}</span>
                                <Brief>
                                    <div className="pull-left">{item.b_author}</div>
                                    <div>{item.lectiontime}</div>
                                </Brief>
                                <i className="iconfont icon-yan person-color-body__row__title__icon" />
                            </Item>
                        }) : <Item
                            className="person-color-body__row__notList" multipleLine>
                            <span>您暂无作品哦~</span>
                        </Item>
                    }
                </List>
            );
        };
        return (
            <div style={{ height: '100%' }} className="person-page-box">
                <div className="person-page-box__person">
                    <div className="person-page-box__person__top-box">
                        <div className="person-page-box__person__top-box__img">
                            <img
                                src={personState.headimg}/>
                        </div>
                        <div className="person-page-box__person__top-box__name">{personState.nickname}</div>
                    </div>

                    <div className="person-page-box__person__title">
                        <i className="iconfont icon-jingshu"/>
                        <span>我的作品</span>
                    </div>
                </div>
                <ListView ref="lv"
                          dataSource={this.state.dataSource}
                          renderBodyComponent={() => <MyBody />}
                          renderRow={row}
                          className="person-color-box"
                          contentContainerStyle={{ height: '100%' }}
                />
            </div>
        );
    }
}