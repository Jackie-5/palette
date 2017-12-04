/**
 * Created by Jackie.Wu on 2017/11/3.
 */

import React, { Component } from 'react'
import { ListView, InputItem, WhiteSpace, Button, TextareaItem, Toast } from 'antd-mobile';
import axios from '../../../libs/axios';
import pageAjax from '../../../libs/pageAjax';
import copy from 'clone';


const MyBody = (props) => {
    return <div className="hope-body">
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

    async componentDidMount() {
        // simulate initial Ajax
        const self = this.props.self;
        const state = self.state;
        let isActive = true;
        const data = await axios({
            url: pageAjax.PrayTypeGetList,
        });

        state.hopeState.species = data.data;

        const getData = await axios({
            url: pageAjax.UserLectionGetPray,
        });
        // 选中祈福信息
        state.hopeState.species.map((item, i) => {
            if (getData.pt_id === item.pt_id) {
                item.active = true;
                isActive = false;
            }
        });
        // 查看当前是否有选中的 如果没有 那么选中第一个
        if(isActive){
            state.hopeState.species.map((item, i) => {
                item.active = i === 0
            });
        }
        // 还原祈福信息
        state.hopeState.param.bh_prayman = getData.data.bh_prayman;
        state.hopeState.param.bh_prayother = getData.data.bh_prayother;
        state.hopeState.param.bh_wish = getData.data.bh_wish;

        this.genData();
        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
            isLoading: false,
        });

        self.setState(state);

    }

    speciesClick(item) {
        const state = copy(this.state);
        //const arr = [];
        state.hopeState.species.map((it) => {
            it.active = item.pt_id === it.pt_id;
            if (it.active) {
                state.hopeState.param.pt_id = it.pt_id;
            }
            //if(item.pt_id === it.pt_id){
            //    it.active = !it.active;
            //}
            //if (it.active) {
            //    arr.push(it.pt_id);
            //}
        });
        //state.hopeState.param.pt_id = arr.join(',');
        this.setState(state);
    }

    inputBlur(key, v) {
        const state = copy(this.state);
        // 祈福人
        state.hopeState.param[key] = v;
        this.setState(state);
    }

    async enter() {
        const state = copy(this.state);
        state.hopeState.param.bh_id = state.defaultPage.bh_id;
        if (!/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(state.hopeState.param.bh_prayman)
            || !/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(state.hopeState.param.bh_prayother)
            || !state.hopeState.param.pt_id
        ) {
            Toast.offline('请填写完整信息哦~');
            return;
        }

        const data = await axios({
            url: pageAjax.UserLectionUpdateWorks,
            params: state.hopeState.param,
            method: 'post',
        });
        if (data.code === 0) {
            for (let i in state.pageSwitch) {
                state.pageSwitch[i] = state.leftIcon[0].link === i;
            }
            Toast.success(data.msg, 1);
            this.setState(state);
        }
    }

    render() {
        const self = this.props.self;
        const state = self.state;
        const { getFieldProps } = self.props.form;
        const row = (rowData, sectionID, rowID) => {
            return (
                <div className="hope-body__list-box" key={rowID}>
                    <WhiteSpace size="xl"/>
                    {
                        self.state.hopeState.input.map((item, i) => {
                            return <div className="hope-body__list-box__input" key={i}>
                                <InputItem
                                    {...getFieldProps(`inputclear${i}`)}
                                    clear
                                    onBlur={this.inputBlur.bind(self, item.key)}
                                    value={state.hopeState.param[item.key]}
                                >{item.placeholder}:</InputItem>
                            </div>
                        })
                    }
                    <WhiteSpace size="xl"/>
                    <div className="hope-body__list-box__species-title">祈福种类:</div>
                    <div className="hope-body__list-box__species-box">
                        {
                            self.state.hopeState.species.map((item, i) => {
                                return <Button
                                    onClick={this.speciesClick.bind(self, item)}
                                    key={i}
                                    className={item.active ? 'hope-body__list-box__species-box__button am-button-active' : 'hope-body__list-box__species-box__button'}
                                    type="ghost" size="small" inline>{item.pt_name}</Button>
                            })
                        }
                    </div>
                    <WhiteSpace size="xl"/>
                    <div className="hope-body__list-box__wish-title">心愿:</div>
                    <WhiteSpace size="lg"/>
                    <TextareaItem
                        className="hope-body__list-box__textarea"
                        {...getFieldProps('note3')}
                        autoHeight
                        labelNumber={10}
                        rows={4}
                        placeholder="(可选填)"
                        value={state.hopeState.param.bh_wish}
                        onBlur={this.inputBlur.bind(self, 'bh_wish')}
                    />
                    <WhiteSpace size="xl"/>
                    <div className="hope-body__list-box__enter-box">
                        {/*<Button type="primary" size="small" className="hope-body__list-box__enter-box__btn"*/}
                        {/*style={{marginRight: '10px'}}*/}
                        {/*onClick={self.pageLeftSwitch.bind(self, {item: self.state.leftIcon[0]})}*/}
                        {/*inline>返回抄经</Button>*/}
                        <Button type="primary" size="small" className="hope-body__list-box__enter-box__btn"
                                onClick={this.enter.bind(self)}
                                inline>保存信息</Button>
                    </div>
                </div>
            );
        };
        return (
            <div className="hope-page-box">
                <ListView ref="lv"
                          dataSource={this.state.dataSource}
                          renderBodyComponent={() => <MyBody />}
                          renderRow={row}
                          className="hope-box"
                          contentContainerStyle={{ height: '100%' }}
                />
            </div>
        );
    }
}