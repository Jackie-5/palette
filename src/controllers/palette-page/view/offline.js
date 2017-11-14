/**
 * Created by Jackie.Wu on 2017/10/25.
 */
import React, { Component } from 'react'
import { ListView, List } from 'antd-mobile';
import axios from '../../../libs/axios';
import pageAjax from '../../../libs/pageAjax';

const Item = List.Item;

const MyBody = (props) => <div className="offline-body">
    {props.children}
</div>;

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
                const rowName = `S${jj}, R${jj}`;
                this.rowIDs['0'].push(rowName);
                this.dataBlob[rowName] = rowName;
            }
            // new object ref
            this.sectionIDs = ['Section 0'];
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
        axios(pageAjax.BespeakGetList)
            .then((data) => {
                state.offlineState = data.data;
                this.genData();
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
                    isLoading: false,
                });
            });

    }


    render() {
        const self = this.props.self;
        const { offlineState } = self.state;
        const row = (rowData, sectionID, rowID) => {
            return (
                <List key={rowID} className="offline-body__row">
                    {
                        offlineState.map((item, i)=>{
                            return <Item
                                key={i}
                                onClick={self.pageLeftSwitch.bind(self, self.state.offlineMake, {offline: item})}
                                         className="offline-body__row__title" multipleLine>
                                <div className="offline-list-title clearfix">
                                    <div className="offline-list-title__name">{item.bs_name}</div>
                                    <div className="offline-list-title__btn">预约</div>
                                </div>
                                <div className="offline-list-cont"><span className="offline-list-cont__span">地址:</span>{item.bs_adress}
                                </div>
                                <div className="offline-list-cont"><span className="offline-list-cont__span">电话:</span>{item.bs_tel}
                                </div>
                                <div className="offline-list-cont"><span className="offline-list-cont__span">联系人:</span>{item.bs_man}
                                </div>
                                <div className={item.bs_context ? "offline-list-cont offline-list-gray" : "hidden"}><span className="offline-list-cont__span">特别说明:</span>{item.bs_context}
                                </div>
                            </Item>
                        })
                    }
                </List>
            );
        };

        return <ListView ref="lv"
                         dataSource={this.state.dataSource}
                         renderBodyComponent={() => <MyBody />}
                         renderRow={row}
                         className="offline-box"
                         contentContainerStyle={{ height: '100%' }}
        />
    }
}

