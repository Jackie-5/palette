/**
 * Created by Jackie.Wu on 2017/10/31.
 */

import React, { Component } from 'react'
import { ListView, List, RefreshControl } from 'antd-mobile';
import axiosAll from 'axios';
import axios from '../../../libs/axios';
import pageAjax from '../../../libs/pageAjax';

const Item = List.Item;
const Brief = Item.Brief;

// 每页10条
// 当前页数
const defaultPageIndex = 1;
let pageIndex = 1;
const currentPageNumber = 10;


const MyBody = (props) => {
    return <div className="person-color-body">
        <List className="person-color-body__row">
            {props.children}
        </List>

    </div>
};

export default class extends Component {
    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.genData = (pIndex = 0) => {
            let person = this.props.self.state.personState;
            const dataArr = [];
            if (person.list.length === 0) {
                dataArr.push(0);
            } else {
                person.list.forEach((item, i) => {
                    if (person.tabs[0].active) {
                        dataArr.push(item);
                    } else {
                        dataArr.push(item);
                    }
                });
            }
            return dataArr;
        };
        this.rData = this.genData();
        this.state = {
            dataSource,
            isLoading: true,
        };
    }

    renderCustomIcon() {
        return [
            <div key="0" className="am-refresh-control-pull">
                <span>{this.state.showFinishTxt ? '刷新完毕' : '下拉可以刷新'}</span>
            </div>,
            <div key="1" className="am-refresh-control-release">
                <span>松开立即刷新</span>
            </div>,
        ];
    }

    componentDidMount() {
        const _this = this;
        const self = this.props.self;
        const state = self.state;
        const isTabs = state.personState.tabs[1].active;

        let obj = {};
        if (isTabs) {
            pageIndex = defaultPageIndex;
            obj.PageSize = currentPageNumber;
            obj.PageIndex = pageIndex;
        }

        axiosAll.all([axios({
            url: pageAjax.UserBasic,
        }), axios({
            url: isTabs ? pageAjax.GetWorkSquareList : pageAjax.UserLectionMyWorks,
            params: obj
        })])
            .then((data) => {
                if (isTabs) {
                    state.personState = {
                        ...state.personState,
                        allPage: data[1].data.TotalPageCount, ...data[0].data,
                        list: data[1].data.DataList
                    };
                } else {
                    state.personState = { ...state.personState, ...data[0].data, list: data[1].data };
                }

                this.rData = _this.genData();

                this.setState({
                    dataSource: _this.state.dataSource.cloneWithRows(_this.rData),
                    isLoading: false,
                });
                self.setState(state);
            })

    }

    initAjax(options = {}) {
        const { isRefresh, isTab } = options;
        const self = this.props.self;
        const state = self.state;
        const isTabs = state.personState.tabs[1].active;
        let obj = {};
        if (isTabs) {
            obj.PageSize = currentPageNumber;
            obj.PageIndex = pageIndex;
        }
        axios({
            url: isTabs ? pageAjax.GetWorkSquareList : pageAjax.UserLectionMyWorks,
            params: obj
        }).then((data) => {
            if (data) {
                if (isTabs) {
                    state.personState.list = isRefresh ? data.data.DataList : [...data.data.DataList];
                    state.personState.allPage = data.data.TotalPageCount;
                    if (pageIndex === defaultPageIndex) {
                        this.rData = [...this.genData()];
                    } else {
                        this.rData = [...this.rData, ...this.genData()];
                    }
                    pageIndex++;
                } else {
                    state.personState.list = isRefresh ? data.data : [...data.data];
                    this.rData = this.genData();
                }
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.rData),
                    isLoading: false,
                    refreshing: false
                });

                self.setState(state);

                if (isTab) {
                    this.refs.lv.scrollTo(0, 0);
                }
            }
        });
    }

    onRefresh() {
        pageIndex = defaultPageIndex;
        if (!this.manuallyRefresh) {
            this.setState({ refreshing: true });
        } else {
            this.manuallyRefresh = false;
        }

        this.initAjax({
            isRefresh: true
        });
    };

    onEndReached = (event) => {
        const state = this.props.self.state;
        if (state.personState.tabs[1].active) {
            if (pageIndex > state.personState.allPage) {
                return;
            }
            this.initAjax();
        }

    };


    switchTabs(item) {
        const self = this.props.self;
        const state = self.state;

        pageIndex = defaultPageIndex;


        state.personState.tabs.map((it) => {
            it.active = item.key === it.key;
        });

        this.setState(state);

        this.initAjax({
            isTab: true
        });
    }


    render() {
        const self = this.props.self;
        const { personState } = self.state;
        const row = (rowData, sectionID, rowID) => {
            if (rowData) {
                return <Item
                    key={rowID}
                    onClick={self.pageLeftSwitch.bind(self, {
                        item: self.state.leftIcon[5],
                        person: rowData,
                        isSquare: personState.tabs[1].active
                    })}
                    className="person-color-body__row__title" multipleLine>
                    <span>{rowData.lectionname}</span>
                    <Brief>
                        <div className="pull-left">{rowData.b_author}</div>
                        <div>{personState.tabs[0].active ? rowData.lectiontime : rowData.nickname }</div>
                    </Brief>
                    {
                        personState.tabs[0].active ?
                            <i className="iconfont icon-yan person-color-body__row__title__icon"/>
                            :
                            <div className="person-color-body__row__title__total">人气: {rowData.total}</div>
                    }

                </Item>
            } else {
                return <Item
                    className="person-color-body__row__notList" multipleLine>
                    <span>您暂无作品哦~</span>
                </Item>
            }
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
                </div>
                <div className="person-page-box__tabs">
                    {
                        personState.tabs.map((item, i) => {
                            return <div
                                key={i}
                                className={`person-page-box__tabs__li pull-left ${item.active && 'person-page-box__tabs__active'}`}
                                onClick={this.switchTabs.bind(this, item)}
                            >
                                <i className={'iconfont ' + item.icon}/>
                                <span>{item.value}</span>
                            </div>
                        })
                    }
                </div>
                <ListView ref="lv"
                          dataSource={this.state.dataSource}
                          renderFooter={() => {
                              if (personState.tabs[1].active && this.rData.length > currentPageNumber) {
                                  return <div style={{ textAlign: 'center' }}>
                                      {this.state.isLoading ? '页面加载中...' : '我是有底线的...'}
                                  </div>
                              } else {
                                  return <div style={{ height: 20 }}/>
                              }

                          }}
                          renderBodyComponent={() => <MyBody />}
                          renderRow={row}
                          className="person-color-box"
                          refreshControl={<RefreshControl
                              refreshing={this.state.refreshing}
                              icon={this.renderCustomIcon()}
                              onRefresh={this.onRefresh.bind(this)}
                          />}
                          style={{
                              overflow: 'auto',
                              border: '1px solid #ddd',
                          }}
                          scrollRenderAheadDistance={50}
                          onEndReached={this.onEndReached}
                          onEndReachedThreshold={20}
                />
            </div>
        );
    }
}