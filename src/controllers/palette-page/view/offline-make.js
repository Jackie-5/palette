/**
 * Created by Jackie.Wu on 2017/11/3.
 */

import React, { Component } from 'react'
import { ListView, InputItem, WhiteSpace, Button, TextareaItem } from 'antd-mobile';


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

    render() {
        const self = this.props.self;
        const { getFieldProps } = self.props.form;
        const row = (rowData, sectionID, rowID) => {
            return (
                <div className="offline-make-body__list-box" key={rowID}>
                    <div className="offline-make-body__list-box__title">{self.state.offlineMakeState.title}</div>
                    <div>意向时间:</div>
                    {
                        self.state.offlineMakeState.timeSelect.map((item, i)=>{
                            return <div className="offline-make-body__list-box__select" key={i}>
                                <div>{item.title}</div>
                                <div>
                                    {
                                        item.select.map((it, k)=>{
                                            return <Button
                                                key={k}
                                                className={it.active ? 'offline-make-body__list-box__select__btn am-button-active' : 'offline-make-body__list-box__select__btn'}
                                                type="ghost" size="small" inline>{it.value}</Button>
                                        })
                                    }
                                </div>
                            </div>
                        })
                    }
                    <div className="offline-make-body__list-box__contact">
                        <div className="offline-make-body__list-box__contact__title">{self.state.offlineMakeState.name.title}</div>
                        <div className="offline-make-body__list-box__contact__input">
                            <InputItem
                                clear
                                onChange={(v) => { console.log('onChange', v); }}
                                onBlur={(v) => { console.log('onBlur', v); }}
                            />
                        </div>
                    </div>
                    <div className="offline-make-body__list-box__contact">
                        <div className="offline-make-body__list-box__contact__title">{self.state.offlineMakeState.mobile.title}</div>
                        <div className="offline-make-body__list-box__contact__input">
                            <InputItem
                                clear
                                onChange={(v) => { console.log('onChange', v); }}
                                onBlur={(v) => { console.log('onBlur', v); }}
                            />
                        </div>
                    </div>
                    <div className="offline-make-body__list-box__tips">{self.state.offlineMakeState.tips}</div>
                    <div className="offline-make-body__list-box__enter">
                        <Button className="offline-make-body__list-box__enter__btn" type="ghost" size="small" inline>提交</Button>
                    </div>
                    <div className="iconfont icon-jiantou offline-make-body__list-box__return" onClick={self.pageLeftSwitch.bind(self, self.state.leftIcon[self.state.leftIcon.length-1])} />
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