/**
 * Created by Jackie.Wu on 2017/10/31.
 */

import React, { Component } from 'react'
import { ListView, Button } from 'antd-mobile';
import axios from '../../../libs/axios';
import pageAjax from '../../../libs/pageAjax';

const MyBody = (props) => {
    return <div className="review-color-body">
        {props.children}
    </div>
};

const isBtnShow = (propsSelf, self) => {
    const { currentNumber, allNumber } = propsSelf.state.indexState;
    const { reviewImgIsPerson } = propsSelf.state;
    return <div>
        {
            propsSelf.state.reviewBtn[
                reviewImgIsPerson ? 2 :
                    (currentNumber >= allNumber) ? 1 : 0
                ].map((item, i) => {
                return <div key={i}>
                    <Button
                            type="ghost" size="small"
                            onClick={propsSelf.pageLeftSwitch.bind(propsSelf, propsSelf.state.leftIcon[0], { review: item.key })}
                            inline
                    >
                        <span>{item.value}</span>
                        <span className={item.icon + ' iconfont font-size'}/>
                    </Button>
                </div>
            })
        }
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
        const data = await axios({
            url: state.reviewImgIsPerson ? pageAjax.UserLectionGetMyWorksByID : pageAjax.UserLectionPreviewWorks,
            params: {
                bh_id: state.defaultPage.bh_id
            }
        });
        state.currentReviewImgSrc = data.msg;

        this.genData();
        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
            isLoading: false,
        });

        self.setState(state);
    }
    showImg(){
        wx.previewImage({
            current: this.state.currentReviewImgSrc, // 当前显示图片的http链接
            urls: [
                this.state.currentReviewImgSrc
            ]
        });
    }

    render() {
        const self = this.props.self;
        const row = (rowData, sectionID, rowID) => {
            return (
                <div className="review-color-body__color" key={rowID}>
                    <img src={self.state.currentReviewImgSrc} onClick={this.showImg.bind(self)} />
                </div>
            );
        };
        return (
            <div style={{ height: '100%' }} className="review-page-box">
                <ListView ref="lv"
                          dataSource={this.state.dataSource}
                          renderBodyComponent={() => <MyBody />}
                          renderRow={row}
                          className="review-color-box"
                          contentContainerStyle={{ height: '100%' }}
                />
                <div className="review-page-box__review">
                    {
                        isBtnShow(self)
                    }
                </div>
            </div>
        );
    }
}