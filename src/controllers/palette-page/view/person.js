/**
 * Created by Jackie.Wu on 2017/10/31.
 */

import React, { Component } from 'react'
import { ListView , List} from 'antd-mobile';

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
        this.genData = (length = 40) => {
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
        const row = (rowData, sectionID, rowID) => {
            return (
                <List key={rowID} className="person-color-body__row">
                    <Item onClick={() => {}} className="person-color-body__row__title" multipleLine>
                        <span>静夜思地方</span>
                        <Brief className="person-color-body__row__title__sub-title">萨芬的</Brief>
                    </Item>
                </List>
            );
        };
        return (
            <div style={{height:'100%'}} className="person-page-box">
                <div className="person-page-box__person">
                    <div className="person-page-box__person__img">
                        <img
                             src="//p0.meituan.net/dpmerchantimage/8a34efd3-481d-4292-8b14-6ef6d465e91b.jpg%40800w_600h_0e_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20" />
                    </div>
                    <div className="person-page-box__person__name">啥浪蝶狂蜂静安寺</div>
                    <div className="person-page-box__person__title">
                        <i className="iconfont icon-jingshu" />
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