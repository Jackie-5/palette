/**
 * Created by Jackie.Wu on 2017/10/25.
 */
import React, { Component } from 'react'
import { ListView, List } from 'antd-mobile';
import axios from '../../../libs/axios';
import pageAjax from '../../../libs/pageAjax';

const Item = List.Item;
const Brief = Item.Brief;

const MyBody = (props) => <div className="tie-body">
    <List className="tie-body__row">
        {props.children}
    </List>
</div>;

export default class extends Component {

    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.genData = () => {
            if(this.props.self.state.tieList.length === 0){
                this.props.self.state.tieList.push('none');
            }
            return this.props.self.state.tieList
        };
        this.rData = this.genData();
        this.state = {
            dataSource,
            isLoading: true,
        };
    }

    componentDidMount() {
        const self = this.props.self;
        const state = self.state;
        const _this = this;
        // simulate initial Ajax
        axios({ url: pageAjax.lectionGetList })
            .then((data) => {
                if (data.data) {
                    state.tieObject.forEach((item) => {
                        data.data.forEach((it) => {
                            if (item.key === it.b_no.slice(0, 1)) {
                                item.data.push(it);
                            }
                        });
                        if (item.active) {
                            state.tieList = item.data;
                        }
                    });
                    _this.rData = this.genData();
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(_this.rData),
                    });
                    self.setState(state);
                }

            });
    }

    listClick(item) {
        const self = this.props.self;
        const state = self.state;
        const _this = this;
        state.tieObject.map((it) => {
            it.active = item.key === it.key;
            if (it.active) {
                state.tieList = item.data;
            }
        });
        _this.rData = this.genData();
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(_this.rData),
        });
        self.setState(state);
    }


    render() {
        const self = this.props.self;
        const state = self.state;
        const row = (rowData, sectionID, rowID) => {
            if(rowData === 'none'){
                return <Item className="tie-body__row__none" key={sectionID}>
                    暂无字帖
                </Item>
            } else {
                return (
                    <Item
                        key={sectionID}
                        onClick={self.pageLeftSwitch.bind(self, { item: self.state.leftIcon[0], tie: rowData })}
                        className="tie-body__row__title"
                        multipleLine>
                        <span>{rowData.lectionname}</span>
                        <Brief className="tie-body__row__title__sub-title">{rowData.b_author}</Brief>
                        <Brief className="tie-body__row__title__sub-title">人气: {rowData.total}</Brief>
                        <div
                            className={state.defaultPage.b_id === rowData.b_id ? 'tie-body__row__title__now' : 'hide'}>{state.defaultPage.b_id === rowData.b_id ? '正在书写' : ''}</div>
                    </Item>
                );
            }
        };

        return <div className="tie-container">
            <div className="tie-container__select">
                {
                    state.tieObject.map((item, i) => {
                        return <div
                            className={`tie-container__select__item ${item.active && 'tie-container__select__active'}`}
                            key={i} onClick={this.listClick.bind(this, item)}>{item.name}</div>
                    })
                }
            </div>

            <ListView ref="lv"
                      dataSource={this.state.dataSource}
                      renderBodyComponent={() => <MyBody />}
                      renderRow={row}
                      className="tie-box"
                      contentContainerStyle={{ height: '100%' }}
            />
        </div>
    }
}


{/*<List key={rowID} className="tie-body__row">*/
}
{/*{*/
}
{/*state.tieList.map((item, i) => {*/
}
{/*return <Item*/
}
{/*key={i}*/
}
{/*onClick={self.pageLeftSwitch.bind(self, { item: self.state.leftIcon[0], tie: item })}*/
}
{/*className="tie-body__row__title"*/
}
{/*multipleLine>*/
}
{/*<span>{item.lectionname}</span>*/
}
{/*<Brief className="tie-body__row__title__sub-title">{item.b_author}</Brief>*/
}
{/*<Brief className="tie-body__row__title__sub-title">人气: {item.total}</Brief>*/
}
{/*<div*/
}
{/*className={state.defaultPage.b_id === item.b_id ? 'tie-body__row__title__now' : 'hide'}>{state.defaultPage.b_id === item.b_id ? '正在书写' : ''}</div>*/
}
{/*</Item>*/
}
{/*})*/
}
{/*}*/
}
{/*</List>*/
}