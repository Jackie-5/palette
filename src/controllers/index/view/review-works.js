/**
 * Created by Jackie.Wu on 2017/10/31.
 */

import React, { Component } from 'react'
import { ListView, Button, Checkbox } from 'antd-mobile';
import axios from '../../../libs/axios';
import pageAjax from '../../../libs/pageAjax';

const CheckboxItem = Checkbox.CheckboxItem;

const MyBody = (props) => {
    return <div className="review-color-body">
        {props.children}
    </div>
};

const isBtnShow = (propsSelf, self) => {
    const { currentNumber, allNumber } = propsSelf.state.indexState;
    const currentReviewDetail = propsSelf.state.currentReviewDetail;
    const { isReviewImgIsPerson } = propsSelf.state;
    return <div>
        {
            propsSelf.state.reviewBtn[
                isReviewImgIsPerson ? 2 :
                    (currentNumber >= allNumber) ? 1 : 0
                ].map((item, i) => {
                return <div key={i}>
                    {
                        item.key === 'delete' ?
                            <div className={item.icon + ' iconfont font-size review-delete-btn'}
                                 onClick={propsSelf.pageLeftSwitch.bind(propsSelf, {
                                     item: propsSelf.state.leftIcon[6],
                                     review: item.key
                                 })}
                            />
                            : <Button
                            type="ghost" size="small"
                            onClick={propsSelf.pageLeftSwitch.bind(propsSelf, {
                                item: propsSelf.state.leftIcon[0],
                                review: item.key
                            })}
                            inline
                        >
                            <span>{item.value}</span>
                            <span className={item.icon + ' iconfont font-size'}/>
                        </Button>
                    }
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
        if (!state.isReviewImgIsPerson) {
            const data = await axios({
                url: pageAjax.UserLectionPreviewWorks,
                method: 'post',
                params: {
                    bh_id: state.defaultPage.bh_id
                }
            });
            state.currentReviewImgSrc = data.msg;
        } else {
            const paw = await axios({
                url: pageAjax.UserLectionGetShareKey,
                params: {
                    bh_id: state.reviewImgIsPerson.bh_id
                }
            });
            const data = await axios({
                url: pageAjax.ShareGetShareDetails,
                params: {
                    key: paw.data.key
                }
            });
            state.currentReviewDetail = data.data;
        }


        this.genData();
        this.setState({
            ...state,
            dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
            isLoading: false,
        });
        // 让图片从右往左滚动
        document.querySelector('.loadImg').onload = () => {
            if (document.querySelector('.palette-review-box__page-view__box')) {
                document.querySelector('.palette-review-box__page-view__box').scrollLeft = document.querySelector('.loadImg').offsetWidth;
            } else {
                document.querySelector('#review-box').scrollLeft = document.querySelector('.loadImg').offsetWidth;
            }
        };
    }

    showImg() {
        wx.previewImage({
            current: this.state.isReviewImgIsPerson ? this.state.currentReviewDetail.bh_imgurl : this.state.currentReviewImgSrc, // 当前显示图片的http链接
            urls: [
                this.state.isReviewImgIsPerson ? this.state.currentReviewDetail.bh_imgurl : this.state.currentReviewImgSrc
            ]
        });
    }

    checkedClick(e) {
        const self = this;
        const state = self.state;
        state.isShareCheck = !state.isShareCheck;
        self.setState(state);
    }

    render() {
        const self = this.props.self;
        const state = self.state;
        const currentReviewDetail = self.state.currentReviewDetail;
        const isPerson = state.isReviewImgIsPerson && currentReviewDetail && ((currentReviewDetail.bh_prayman && currentReviewDetail.bh_prayother) || currentReviewDetail.pt_name || currentReviewDetail.bh_wish);
        const row = (rowData, sectionID, rowID) => {
            return (
                <div style={{ height: '100%', overflowY: 'scroll' }} key={rowID} id="review-box">
                    {
                        state.isReviewImgIsPerson ? <div>
                            <div
                                className={ (currentReviewDetail.bh_prayman && currentReviewDetail.bh_prayother) || currentReviewDetail.pt_name || currentReviewDetail.bh_wish ? 'palette-share-box__hope' : 'hide' }>
                                <div className="palette-review-box__hope__title clearfix">
                                    <div className="palette-review-box__hope__title__name">祈福信息</div>
                                </div>
                                <div className="palette-review-box__hope__box">
                                    <div
                                        className={ (currentReviewDetail.bh_prayman && currentReviewDetail.bh_prayother) ? 'palette-review-box__hope__box__content' : 'hide'}>
                                        [{currentReviewDetail.bh_prayman}] 为 [{currentReviewDetail.bh_prayother}]祈福
                                    </div>
                                    <div
                                        className={currentReviewDetail.pt_name ? 'palette-review-box__hope__box__content' : 'hide'}>
                                        <span>祈福种类:</span>
                                        <span>{currentReviewDetail.pt_name}</span>
                                    </div>
                                    <div
                                        className={currentReviewDetail.bh_wish ? 'palette-review-box__hope__box__content' : 'hide'}>
                                        <span>心愿:</span>
                                        <span>{currentReviewDetail.bh_wish}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="palette-review-box__page-view">
                                <div className="palette-review-box__page-view__title clearfix">
                                    <div className="palette-review-box__page-view__title__name">我的作品</div>
                                </div>
                                <div className="palette-review-box__page-view__box">
                                    <div className="palette-review-box__page-view__box__img">
                                        <div className="ov">
                                            <img className="loadImg" src={currentReviewDetail.bh_imgurl}
                                                 onClick={this.showImg.bind(self)}/>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="palette-review-box__versesImg">
                                <div className="palette-review-box__versesImg__border"/>
                                <div className="palette-review-box__versesImg__img">
                                    <img src={currentReviewDetail.versesImg}/>
                                </div>
                                <div className="palette-review-box__versesImg__border"/>
                            </div>
                        </div> :
                            <div className="review-color-body__color">
                                <img className="loadImg" src={self.state.currentReviewImgSrc}
                                     onClick={this.showImg.bind(self)}/>
                            </div>
                    }

                </div>
            );
        };
        return (
            <div style={{ height: '100%' }} className="review-page-box">
                <ListView ref="lv"
                          dataSource={this.state.dataSource}
                          renderBodyComponent={() => <MyBody />}
                          renderRow={row}
                          className={ isPerson ? 'review-color-box review-color-box-height' : 'review-color-box'}
                          contentContainerStyle={{ height: '100%' }}
                />
                {
                    isPerson ?
                    <CheckboxItem
                        checked={self.state.isShareCheck}
                        className="isCheck"
                        onClick={this.checkedClick.bind(self)}
                    >
                        祈福信息是否随作品分享
                    </CheckboxItem> : '' }

                {
                    state.isReviewImgIsPerson ?
                    <CheckboxItem
                        checked={self.state.isShareCheck}
                        className="isCheck"
                        onClick={this.checkedClick.bind(self)}
                    >
                        是否分享回向偈
                    </CheckboxItem> : ''
                }
                <div className={
                    isPerson ?
                        'review-page-box__review review-page-box__height' : 'review-page-box__review'
                }>
                    {
                        isBtnShow(self)
                    }
                </div>
            </div>
        );
    }
}