/**
 * Created by Jackie.Wu on 2017/11/3.
 */

import React, { Component } from 'react'
import { ListView, InputItem, Button, Toast } from 'antd-mobile';
import axios from '../../../libs/axios';
import pageAjax from '../../../libs/pageAjax';
import copy from 'clone';


const MyBody = (props) => {
    return <div className="offline-make-body">
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
        // simulate initial Ajax
        this.genData();
        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
            isLoading: false,
        });
    }

    async enter() {
        const state = copy(this.state);
        // 查看当前是否全都没选中
        let isTrue = true;
        // 查看当前所选日期的值
        state.offlineMakeState.timeSelect.map((item, i)=>{
            item.select.map((it, k)=>{
                if(it.active){
                    if(i === 0){
                        if(k === 0) (state.offlineMakeState.param.w_m = '1');
                        if(k === 1) (state.offlineMakeState.param.w_a = '1');
                        if(k === 2) (state.offlineMakeState.param.w_n = '1');
                    } else {
                        if(k === 0) (state.offlineMakeState.param.h_m = '1');
                        if(k === 1) (state.offlineMakeState.param.h_a = '1');
                        if(k === 2) (state.offlineMakeState.param.h_n = '1');
                    }
                    isTrue = false;
                }
            });
        });

        if(isTrue){
            Toast.offline('至少要选中一个时间段哦~', 1);
            return;
        }

        if(state.offlineMakeState.param.man === undefined || !/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(state.offlineMakeState.param.man)){
            Toast.offline('请填写您的名字~', 1);
            return;
        }
        if(state.offlineMakeState.param.tel === undefined || state.offlineMakeState.param.tel.length !== 13 && !/0?(13|14|15|17|18)[0-9]{9}/.test(state.offlineMakeState.param.tel)){
            Toast.offline('请填写正确的手机号~', 1);
            return;
        }

        const data = await axios({
            url: pageAjax.BespeakEnrol,
            method: 'post',
            params: state.offlineMakeState.param
        });

        if(data.code === 0){
            Toast.success(data.msg, 1);
            for (let i in state.pageSwitch) {
                state.pageSwitch[i] = state.leftIcon[state.leftIcon.length - 1].link === i;
            }
            state.offlineMakeState.param = {};
            state.offlineMakeState.timeSelect.map((item, i)=>{
                item.select.map((it, k)=>{
                    it.active = i === 0 && k === 0;
                });
            });
            this.setState(state);
        }
    }

    timeSelectClick(timeI, listK) {
        const state = copy(this.state);
        state.offlineMakeState.timeSelect.map((item, i)=>{
            item.select.map((it, k)=>{
                if(timeI === i && listK === k){
                    it.active = !it.active;
                }
            });
        });
        this.setState(state);
    }

    inputChange(type, v){
        const state = copy(this.state);
        if(type === 'name'){
            state.offlineMakeState.param.man = v;
        } else{
            state.offlineMakeState.param.tel = v.split(' ').join('');
        }
        this.setState(state);
    };

    render() {
        const self = this.props.self;
        const { getFieldProps } = self.props.form;
        const row = (rowData, sectionID, rowID) => {
            return (
                <div className="offline-make-body__list-box" key={rowID}>
                    <div className="offline-make-body__list-box__title">{self.state.offlineMakeState.title}</div>
                    <div>意向时间:</div>
                    {
                        self.state.offlineMakeState.timeSelect.map((item, i) => {
                            return <div className="offline-make-body__list-box__select" key={i}>
                                <div>{item.title}</div>
                                <div>
                                    {
                                        item.select.map((it, k) => {
                                            return <Button
                                                key={k}
                                                onClick={this.timeSelectClick.bind(self, i, k)}
                                                className={it.active ? 'offline-make-body__list-box__select__btn am-button-active' : 'offline-make-body__list-box__select__btn'}
                                                type="ghost" size="small" inline>{it.value}</Button>
                                        })
                                    }
                                </div>
                            </div>
                        })
                    }
                    <div className="offline-make-body__list-box__contact">
                        <div
                            className="offline-make-body__list-box__contact__title">{self.state.offlineMakeState.name.title}</div>
                        <div className="offline-make-body__list-box__contact__input">
                            <InputItem
                                clear
                                onChange={this.inputChange.bind(self, 'name')}
                                onBlur={this.inputChange.bind(self, 'name')}
                            />
                        </div>
                    </div>
                    <div className="offline-make-body__list-box__contact">
                        <div
                            className="offline-make-body__list-box__contact__title">{self.state.offlineMakeState.mobile.title}</div>
                        <div className="offline-make-body__list-box__contact__input">
                            <InputItem
                                {...getFieldProps('phone')}
                                type="phone"
                                clear
                                onBlur={this.inputChange.bind(self, 'phone')}
                            />
                        </div>
                    </div>
                    <div className="offline-make-body__list-box__tips">{self.state.offlineMakeState.tips}</div>
                    <div className="offline-make-body__list-box__enter">
                        <Button className="offline-make-body__list-box__enter__btn"
                                type="ghost" size="small"
                                onClick={this.enter.bind(self)}
                                inline
                        >提交</Button>
                    </div>
                    <div className="iconfont icon-jiantou offline-make-body__list-box__return"
                         onClick={self.pageLeftSwitch.bind(self, {item: self.state.leftIcon[self.state.leftIcon.length - 1]})}/>
                </div>
            );
        };
        return (
            <div className="offline-make-page-box">
                <ListView ref="lv"
                          dataSource={this.state.dataSource}
                          renderBodyComponent={() => <MyBody />}
                          renderRow={row}
                          className="offline-make-box"
                          contentContainerStyle={{ height: '100%' }}
                />
            </div>
        );
    }
}