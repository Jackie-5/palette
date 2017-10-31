/**
 * Created by Jackie.Wu on 2017/10/31.
 */

import React, { Component } from 'react'
import { ListView } from 'antd-mobile';


const MyBody = (props) => {
    return <div className="review-color-body">
        <div className="review-color-body__color">
            {props.children}
        </div>
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
        const row = (rowData, sectionID, rowID) => {
            return (
                <div className="review-color-body__color__list-box" key={rowID}>

                </div>
            );
        };
        return (
            <div style={{height:'100%'}} className="review-page-box">
                <ListView ref="lv"
                          dataSource={this.state.dataSource}
                          renderBodyComponent={() => <MyBody />}
                          renderRow={row}
                          className="review-color-box"
                          contentContainerStyle={{ height: '100%' }}
                />
                <div className="review-page-box__review">
                    <div className="review-page-box__review__box">
                        <div className="">保存到我的作品</div>
                        <div className="">分享</div>
                    </div>
                </div>
            </div>
        );
    }
}