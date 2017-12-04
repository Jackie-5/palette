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
                                     item: propsSelf.state.leftIcon[0],
                                     review: item.key
                                 })}
                            >

                            </div> : <Button
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
        if(state.isReviewImgIsPerson){
            const data = await axios({
                url: pageAjax.UserLectionGetMyWorksByID,
                params: {
                    bh_id: state.reviewImgIsPerson.bh_id
                }
            });
            state.currentReviewImgSrc = data.msg;
        } else {
            const paw = await axios({
                url: pageAjax.UserLectionGetMyWorksByID,
                params: {
                    bh_id: state.reviewImgIsPerson.bh_id
                }
            });
        }


        this.genData();
        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
            isLoading: false,
        });

        self.setState(state);
        // 让图片从右往左滚动
        document.querySelector('.loadImg').onload = () => {
            document.querySelector('.review-color-body').scrollLeft = document.querySelector('.loadImg').offsetWidth;
        };
    }

    showImg() {
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
                <div className="">
                    {
                        state.isReviewImgIsPerson ? <div className="">
                            <div className={ (param.bh_prayman && param.bh_prayother) || param.pt_name || param.bh_wish ? 'palette-share-box__hope' : 'hide' }>
                                <div className="palette-share-box__hope__title clearfix">
                                    <div className="palette-share-box__hope__title__name">祈福信息</div>
                                </div>
                                <div className="palette-share-box__hope__box">
                                    <div className={ (param.bh_prayman && param.bh_prayother) ? 'palette-share-box__hope__box__content' : 'hide'}>{param.bh_prayman}为{param.bh_prayother}祈福</div>
                                    <div className={param.pt_name ? 'palette-share-box__hope__box__content' : 'hide'}>
                                        <span>祈福种类:</span>
                                        <span>{param.pt_name}</span>
                                    </div>
                                    <div className={param.bh_wish ? 'palette-share-box__hope__box__content' : 'hide'}>
                                        <span>心愿:</span>
                                        <span>{param.bh_wish}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="palette-share-box__page-view">
                                <div className="palette-share-box__page-view__title clearfix">
                                    <div className="palette-share-box__page-view__title__name">我的作品</div>
                                </div>
                                <div className="palette-share-box__page-view__box">
                                    <div className="palette-share-box__page-view__box__img">
                                        <div className="ov">
                                            <img className="loadImg" src={param.bh_imgurl} />
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="palette-share-box__praise clearfix" onClick={this.praise.bind(this)}>
                                <span className="palette-share-box__praise__font">{param.praiseNum}赞</span>
                                <div className={param.ispraise === 1 ? 'iconfont icon-xin1 palette-share-box__praise__icon' : 'iconfont icon-xin palette-share-box__praise__icon'} />
                            </div>
                            <div className="palette-share-box__versesImg">
                                <div className="palette-share-box__versesImg__border" />
                                <div className="palette-share-box__versesImg__img" onClick={this.imgClick.bind(this)}>
                                    <img src={param.versesImg} />
                                </div>
                                <div className="palette-share-box__versesImg__border" />
                            </div>
                            <div className="palette-share-box__qcode">
                                <div className="palette-share-box__qcode__img">
                                    <img src={param.wxImg} />
                                </div>
                            </div>
                        </div> :
                            <div className="review-color-body__color" key={rowID}>
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