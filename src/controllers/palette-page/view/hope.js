/**
 * Created by Jackie.Wu on 2017/11/3.
 */

import React, { Component } from 'react'
import { ListView, InputItem, WhiteSpace, Button,TextareaItem } from 'antd-mobile';


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
                <div className="hope-body__list-box" key={rowID}>
                    <WhiteSpace size="xl" />
                    {
                        self.state.hopeState.input.map((item)=>{
                            return <div className="hope-body__list-box__input">
                                <InputItem
                                    placeholder={item.placeholder}
                                    clear
                                    onChange={(v) => { console.log('onChange', v); }}
                                    onBlur={(v) => { console.log('onBlur', v); }}
                                />
                            </div>
                        })
                    }
                    <WhiteSpace size="xl" />
                    <div className="hope-body__list-box__species-title">祈福种类</div>
                    <div className="hope-body__list-box__species-box">
                        {
                            self.state.hopeState.species.map((item)=>{
                                return <Button
                                    className={item.active ? 'hope-body__list-box__species-box__button am-button-active' : 'hope-body__list-box__species-box__button'}
                                    type="ghost" size="small" inline>{item.value}</Button>
                            })
                        }
                    </div>
                    <WhiteSpace size="xl" />
                    <div className="hope-body__list-box__wish-title">心愿(可选填)</div>
                    <WhiteSpace size="lg" />
                    <TextareaItem
                        className="hope-body__list-box__textarea"
                        {...getFieldProps('note3')}
                        autoHeight
                        labelNumber={10}
                        rows={4}
                    />
                    <WhiteSpace size="xl" />
                    <div className="hope-body__list-box__enter-box">
                        <Button type="primary" size="small" className="hope-body__list-box__enter-box__btn" inline>开始抄经</Button>
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