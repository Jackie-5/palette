/**
 * Created by Jackie.Wu on 2017/4/16.
 */

import React from 'react';
import initState from './init-state';
import axios from '../../libs/axios';
import axiosAll from 'axios';
import pageAjax from '../../libs/pageAjax';
import { Toast, Modal } from 'antd-mobile';
import copy from 'clone';
import { wxShareConfig, hideConfig, wxConfigSet } from '../../libs/wx-share-config';
import userAgent from '../../libs/user-agent';

const alert = Modal.alert;

export default class method extends React.Component {
    constructor(props) {
        super(props);
        this.state = initState;
        this.isInitCanvas = true;
        this.canvasNextArr = [];
    }

    async componentDidMount() {
        // 进入页面 set 默认值
        const self = this;
        if (userAgent()) {
            await axios({ url: pageAjax.LoginPower });
            const wxConfig = await axios({
                url: pageAjax.ShareGetParm,
                params: {
                    flag: 1
                }
            });
            wxConfigSet(wxConfig);
            wx.ready(() => {
                self.initCanvas();
                hideConfig();
                wxShareConfig(self.state.indexShareOpt);
                self.refs.audio.play();
            });
        }

    }

    async saveUpdate(type, options = {}, state) {
        // 更换经文
        if (type === 'addWork') {
            // 保存作品用到的接口
            const save = await axios({
                url: pageAjax.UserLectionAddWorks,
                method: 'post',
                params: options
            });
            if (save.code === 0) {
                Toast.success(save.msg, 1);
                this.setState(state);
            }
        } else {
            const save = await axios({
                url: pageAjax.UserUpdateState,
                method: 'post',
                params: options
            });
            if (save.code === 0) {
                Toast.success(save.msg, 1);
                for (let i in options) {
                    state.defaultPage[i] = options[i]
                }
                this.setState(state);
            }
        }
    }


    async pageLeftSwitch(options, e) {
        const { item } = options;
        e.stopPropagation();
        e.preventDefault();
        const self = this;
        const state = copy(self.state);
        this.isInitCanvas = false;
        state.reviewImgIsPerson = false;
        // 默认分享
        wxShareConfig(self.state.indexShareOpt);

        if (item.link === 'rubber') {
            if (state.pageSwitch['index']) {
                self.clearCanvas();
            }
        } else {
            if (!state.pageSwitch[item.link]) {
                document.title = item.title;
                for (let i in state.pageSwitch) {
                    state.pageSwitch[i] = item.link === i;
                }
                // 如果是从各个页面点回到首页的那么做页面处理
                if (options.tie) {
                    // 先查看用户是否可以保存作品
                    // TODO 这里逻辑 看一下
                    const isSave = await axiosAll.get(pageAjax.UserLectionWorksIsOver);
                    if (isSave.data.code !== 0) {
                        alert('提示', isSave.data.msg, [
                            {
                                text: '取消', onPress: () => {
                                this.setState(state);
                            }
                            },
                            {
                                text: '确定', onPress: () => {
                                self.saveUpdate('addWork', {
                                    bh_id: options.tie.b_id,
                                }, state);
                            }
                            },
                        ]);
                    } else {
                        self.saveUpdate('addWork', {
                            bh_id: options.tie.b_id,
                        }, state);
                    }
                } else if (options.music) {
                    self.saveUpdate('update', {
                        m_id: options.music.m_id,
                    }, state);
                } else if (options.pen) {
                    self.saveUpdate('update', {
                        fontsize: state.defaultPage.fontsize,
                        color: state.defaultPage.color,
                    }, state);
                } else if (options.person) {
                    state.reviewImgIsPerson = true;
                    self.setState(state);
                } else if (options.offline) {
                    state.offlineMakeState.param.bs_id = options.offline.bs_id;
                    state.offlineMakeState.title = options.offline.bs_name;
                    self.setState(state);
                } else if (options.review) {
                    // 当在预览时的操作
                    if (options.review === 'return') {
                        self.setState(state);
                    } else if (options.review === 'save') {
                        axios({
                            url: pageAjax.UserLectionSaveWorks,
                            method: 'post',
                            params: {
                                bh_id: state.defaultPage.bh_id
                            }
                        }).then((data) => {
                            if (data.code === 0) {
                                Toast.success(data.msg, 1);
                                this.setState(state);
                            }
                        });
                    } else if (options.review === 'delete') {
                        axios({
                            url: pageAjax.UserLectionDelWorks,
                            params: {
                                bh_id: state.defaultPage.bh_id
                            }
                        }).then((data) => {
                            if (data.code === 0) {
                                Toast.success(data.msg, 1);
                                this.setState(state);
                            }
                        });
                    } else if (options.review === 'share') {
                        wxShareConfig({
                            wx,
                            title: `[乙度抄经] asdfadf`,
                            desc: '『乙东方 · 度千处』点亮一盏心灯，送出一份祝福。',
                            link: `http://wechat.eastdoing.com/chaojing/share.html?adfasdf`,
                            imgUrl: 'http://wechat.eastdoing.com/chaojing/share.jpg'
                        });
                        axios({
                            url: pageAjax.UserLectionGetShareKey,
                            params: {
                                bh_id: state.defaultPage.bh_id
                            }
                        }).then((data) => {
                            if (data.code === 0) {
                                wxShareConfig({
                                    title: `[乙度抄经] ${state.defaultPage.Lectionname}`,
                                    desc: '『乙东方 · 度千处』点亮一盏心灯，送出一份祝福。',
                                    link: `http://wechat.eastdoing.com/chaojing/share.html?shareId=${data.msg}`,
                                    imgUrl: 'http://wechat.eastdoing.com/chaojing/share.jpg'
                                });
                            }
                        });

                    }
                } else {
                    self.setState(state)
                }
            }
        }
    }

    onAnimateEnd({ key, type }) {
        if (key === 'index' && type === 'enter') {
            if (this.isInitCanvas) {
                this.canvasMethod.initCanvas();
            } else {
                this.initCanvas();
            }
        }
    }

    subCanvas(self) {
        this.canvasMethod = self;
    }

    async initCanvas() {
        const self = this;
        const state = copy(this.state);
        state.reviewImgIsPerson = false;
        const detailData = await axios({ url: pageAjax.userLectionMyDetail });
        const data = await axios({ url: pageAjax.LectionGetWordList, params: { b_id: detailData.data.b_id } });
        document.title = detailData.data.lectionname;
        state.defaultPage = detailData.data;

        state.indexState.currentNumber = detailData.data.position - 1;
        state.indexState.allNumber = data.data.length - 1;
        state.indexState.indexData = data.data;
        self.setState(state);
        this.canvasMethod.initCanvas();
    }

    clearCanvas() {
        this.canvasMethod.clearCanvas();
    }

    prevFont() {
        const self = this;
        const state = copy(this.state);
        if (state.indexState.currentNumber > 0) {
            state.indexState.currentNumber -= 1;
            this.clearCanvas();
            self.setState(state);
            if (self.canvasNextArr.length > 0) {
                self.canvasNextArr.pop()
            }
        } else {
            Toast.info(state.indexState.prevToast, 2)
        }
    }

    async nextFont() {
        const self = this;
        const state = copy(this.state);
        if (this.canvasMethod.beginWrite) {
            // 每次push一下canvas的base64
            self.canvasNextArr.push({
                w_id: state.indexState.indexData[state.indexState.currentNumber].w_id,
                baseImg: this.canvasMethod.canvasToBase()
            });
            // 当前canvas的Arr里到了规定的个数的时候，或者抄到最后一个字的时候去做上传
            if (self.canvasNextArr.length === state.nextNumberAjax || state.indexState.currentNumber === state.indexState.allNumber) {
                await axios({
                    url: pageAjax.UserLectionUploadImg,
                    method: 'post',
                    params: {
                        bh_id: state.defaultPage.bh_id,
                        imgdata: self.canvasNextArr
                    },
                });
                // 每次上传成功后把base64代码清理掉
                self.canvasNextArr = [];
            }
            // 作为保险当网络请求堵塞的时候，查看当前是否超出了上传最大值，如果超出了让用户终止上传。
            if(self.canvasNextArr.length > state.nextNumberAjax){
                Toast.info(state.indexState.notSaveToast, 2);
                return;
            }
            // 当前的数如果不等于总数，那么就可以继续往下写。
            if(state.indexState.currentNumber !== state.indexState.allNumber){
                self.clearCanvas();
                state.indexState.currentNumber += 1;
            } else {
                // 当写到最后一个字的时候，帮助用户自动保存作品。
                await axios({
                    url: pageAjax.UserLectionSaveWorks,
                    method: 'post',
                    params: {
                        bh_id: state.defaultPage.bh_id
                    }
                });
                Toast.info(state.indexState.nextToast, 2);
            }

            self.setState(state);

        } else {
            Toast.info(state.indexState.tips, 2);
        }

    }

    changePenColor(index, type) {
        const state = copy(this.state);
        if (type === 'pen') {
            state.penColorState.penSize.map((item, i) => {
                item.active = index === i;
                if (item.active) (state.defaultPage.fontsize = item.size)
            });

        } else {
            state.penColorState.color.map((item, i) => {
                item.active = index === i;
                if (item.active) (state.defaultPage.color = item.value)
            });
        }
        this.setState(state);
    }
};
