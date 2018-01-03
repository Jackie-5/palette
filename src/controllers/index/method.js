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
import second from '../../libs/second';
import { shareIndex, shareName } from '../../libs/share-content';
import cookies from 'js-cookie';

const alert = Modal.alert;

export default class method extends React.Component {
    constructor(props) {
        super(props);
        this.state = initState;
        this.isInitCanvas = true;
        this.canvasNextArr = [];
    }

    shouldComponentUpdate(nextProps, nextState) {
        const self = this;
        if (self.state.defaultPage.musicurl !== nextState.defaultPage.musicurl) {
            const audio = new Audio(this.state.defaultPage.musicurl);
            audio.onloadedmetadata = () => {
                if (self.refs.audio.paused && self.state.isMusic) {
                    self.refs.audio.play()
                }
            };
        }
        return true;
    }

    async componentDidMount() {
        // 进入页面 set 默认值
        const self = this;
        cookies.set('returnUrl', location.href);
        if (userAgent()) {
            const isWatch = await axios({ url: pageAjax.LoginPower });
            if (isWatch.code === 101) {
                wx.hideAllNonBaseMenuItem();
                self.state.isShowFollowPop = true;
                self.setState(self.state);
                return;
            }

            const wxConfig = await axios({
                url: pageAjax.ShareGetParm,
                params: {
                    flag: location.href,
                }
            });
            wxConfigSet(wxConfig);
            wx.ready(() => {
                self.initCanvas();
                hideConfig();
                wxShareConfig(shareIndex);
                self.state.isMusic && self.refs.audio.play();
            });
        }
    }

    async deleteWork(params, state) {
        const data = await axios({
            url: pageAjax.UserLectionDelWorks,
            method: 'post',
            params: params
        });

        if (data.code === 0) {
            Toast.success(data.msg, 1);
            this.setState(state);
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
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }

        const self = this;
        const state = copy(self.state);
        this.isInitCanvas = false;
        state.isReviewImgIsPerson = false;
        // 默认分享
        if (!(options.review && options.review === 'share')) {
            wxShareConfig(shareIndex);
        }


        if (item.link === 'rubber') {
            if (state.pageSwitch['index']) {
                self.clearCanvas();
            }
        } else {
            if (!state.pageSwitch[item.link]) {
                document.title = item.title;
                for (let i in state.pageSwitch) {
                    if (options.review !== 'share') {
                        state.pageSwitch[i] = item.link === i;
                    }
                }
                // 查看当前切换页面是否要上传图片
                if (self.canvasNextArr.length > 0) {
                    await self.uploadCanvas()
                }

                // 如果是从各个页面点回到首页的那么做页面处理
                if (options.tie) {
                    // 先查看用户是否可以保存作品
                    const isSave = await axiosAll.get(pageAjax.UserLectionWorksIsOver);
                    if (isSave.data.code !== 0) {
                        if (options.tie.b_id !== state.defaultPage.b_id) {
                            alert('提示', isSave.data.msg, [
                                {
                                    text: '取消', onPress: () => {
                                    this.setState(state);
                                }
                                },
                                {
                                    text: '确定', onPress: () => {
                                    self.deleteWork({
                                        bh_id: state.defaultPage.bh_id
                                    }, state);
                                    self.saveUpdate('addWork', {
                                        b_id: options.tie.b_id,
                                    }, state);
                                }
                                },
                            ]);
                        } else {
                            this.setState(state);
                        }

                    } else {
                        self.saveUpdate('addWork', {
                            b_id: options.tie.b_id,
                        }, state);
                    }
                } else if (options.music) {
                    self.saveUpdate('update', {
                        m_id: options.music.m_id,
                    }, state);
                } else if (options.pen) {
                    state.defaultPage.fontsize = options.pen.size;
                    state.defaultPage.color = options.pen.color;
                    self.saveUpdate('update', {
                        fontsize: options.pen.size,
                        color: options.pen.color,
                    }, state);
                } else if (options.person) {
                    state.isReviewImgIsPerson = true;
                    state.reviewImgIsSquare = options.isSquare;
                    state.reviewImgIsPerson = options.person;
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
                        alert('提示', state.indexState.deleteTips, [
                            {
                                text: '取消', onPress: () => {
                                this.setState(state);
                            }
                            },
                            {
                                text: '确定', onPress: () => {
                                self.deleteWork({
                                    bh_id: state.reviewImgIsPerson.bh_id
                                }, state);
                            }
                            },
                        ]);
                    } else if (options.review === 'share') {
                        state.isReviewImgIsPerson = true;
                        const data = await axios({
                            url: pageAjax.UserLectionGetShareKey,
                            params: {
                                bh_id: state.reviewImgIsPerson.bh_id
                            }
                        });
                        const user = await axios({
                            url: pageAjax.UserBasic,
                        });

                        await axios({
                            url: pageAjax.UserLectionUpdateSharePower,
                            method: 'post',
                            params: {
                                bh_id: state.reviewImgIsPerson.bh_id,
                                bh_power: state.isShareCheck ? 1 : 0,
                                bh_h_powere: state.isShareHui ? 1 : 0,
                                bh_square_power: state.isShareSquare ? 1 : 0,
                            }
                        });
                        wxShareConfig({
                            title: `『${user.data.nickname}』${shareName.title}《${data.data.lectionname}》`,
                            desc: shareName.desc,
                            link: `${shareName.link}?i=${data.data.key}&n=${encodeURIComponent(data.data.lectionname)}&u=${encodeURIComponent(user.data.nickname)}&d=${encodeURIComponent(state.reviewImgIsPerson.lectiontime)}&m=${encodeURIComponent(user.data.nickname)}`,
                            imgUrl: shareName.imgUrl
                        });
                        state.isShowSharePop = true;
                        self.setState(state);
                    }
                } else if (options.over) {
                    alert('提示', state.indexState.isSaveTips, [
                        {
                            text: '取消', onPress: () => {
                        }
                        },
                        {
                            text: '确定', async onPress () {
                            await axios({
                                url: pageAjax.UserLectionSaveWorks,
                                method: 'post',
                                params: {
                                    bh_id: state.defaultPage.bh_id
                                }
                            });
                            self.setState(state);
                        }
                        },
                    ]);
                } else {
                    self.setState(state)
                }
            }
        }
    }


    onAnimateEnd({ key, type }) {
        const appPage = document.getElementById('app-page');
        const self = this;
        const resizeWindow = () => {
            self.initCanvas()
        };
        if (key === 'index' && type === 'enter') {
            if (this.isInitCanvas) {
                this.canvasMethod.initCanvas();
            } else {
                this.initCanvas();
            }
            appPage.addEventListener('touchmove', this.preventDefaultMove);
            if (!navigator.userAgent.includes('Android')) {
                window.addEventListener('resize', resizeWindow);
            }
        } else {
            appPage.removeEventListener('touchmove', this.preventDefaultMove);
            if (!navigator.userAgent.includes('Android')) {
                window.removeEventListener('resize', resizeWindow);
            }

        }
    }

    subCanvas(self) {
        this.canvasMethod = self;
    }

    async initCanvas() {
        const self = this;
        const state = copy(this.state);
        state.isReviewImgIsPerson = false;
        const detailData = await axios({ url: pageAjax.userLectionMyDetail });
        const data = await axios({ url: pageAjax.LectionGetWordList, params: { b_id: detailData.data.b_id } });
        document.title = detailData.data.lectionname + ` [${detailData.data.b_author}]`;
        state.defaultPage = detailData.data;
        state.penColorState.pen.map((item) => {
            item.active = detailData.data.color === item.color && detailData.data.fontsize === item.size.toString();
        });
        state.saveNextArr = [];
        state.indexState.currentNumber = detailData.data.position - 1;
        state.indexState.allNumber = data.data.length - 1;
        state.indexState.indexData = data.data;
        self.setState(state);

        this.canvasMethod.initCanvas();
    }

    clearCanvas() {
        this.canvasMethod.clearCanvas();
    }

    async uploadCanvas() {
        const self = this;
        const state = this.state;
        const uploadData = await axios({
            url: pageAjax.UserLectionUploadImg,
            method: 'post',
            loading: true,
            isFail: true,
            params: {
                bh_id: self.state.defaultPage.bh_id,
                imgdata: self.canvasNextArr,
            },
        });

        if (uploadData.code === 0) {
            // 每次上传成功后把base64代码清理掉
            self.canvasNextArr = [];
            return true
        } else {
            Toast.info(state.indexState.notSaveToast, 2);
            return false
        }
    }

    preventDefaultMove(e) {
        e.preventDefault();
    }

    prevFont(e) {
        this.preventDefaultMove(e);
        const self = this;
        const state = copy(this.state);

        if (state.indexState.currentNumber > 0) {
            // 初始化当前canvas
            this.clearCanvas();

            if (self.canvasNextArr.length > 0) {
                self.canvasNextArr.pop();
            }

            if (state.saveNextArr.length > 0) {
                state.saveNextArr.pop();
            } else {
                Toast.info(state.indexState.notPrevToast, 2);
                return
            }
            state.indexState.currentNumber -= 1;
            self.setState(state);
        } else {
            Toast.info(state.indexState.prevToast, 2);
        }
    }

    async nextFont(e) {
        e && e.preventDefault();
        const self = this;
        const state = copy(this.state);
        if (this.canvasMethod.beginWrite) {
            const newDate = new Date().getTime();

            // 当前的数如果不等于总数，那么就可以继续往下写。
            if (state.indexState.currentNumber !== state.indexState.allNumber) {
                // 每次push一下canvas的base64
                state.saveNextArr.push(this.canvasMethod.canvasToBase());
                self.canvasNextArr.push({
                    w_id: state.indexState.indexData[state.indexState.currentNumber].w_id,
                    baseImg: this.canvasMethod.canvasToBase(),
                    wh_time: second(newDate - self.canvasMethod.isStartTime),
                    wh_starttime: self.canvasMethod.isStartTimeMoment
                });
                self.canvasMethod.isStartTime = undefined;
                self.canvasMethod.isStartTimeMoment = undefined;
                // 当前canvas的Arr里到了规定的个数的时候，或者抄到最后一个字的时候去做上传
                if (self.canvasNextArr.length === state.nextNumberAjax || state.indexState.currentNumber === state.indexState.allNumber) {
                    const upload = await self.uploadCanvas();
                    if (!upload) {
                        return;
                    }
                }
                // 当抄经的数量大于固定次数的时候，删掉最前面的 确定 saveNextArr 数组里只有5个值
                if (state.saveNextArr.length > state.nextNumberAjax + 1) {
                    state.saveNextArr.shift();
                }
                self.clearCanvas();
                state.indexState.currentNumber += 1;
            } else {
                // 当写到最后一个字的时候，帮助用户自动保存作品。
                alert('提示', state.indexState.isSaveTips, [
                    {
                        text: '取消', onPress: () => {
                        this.setState(state);
                    }
                    },
                    {
                        text: '确定', async onPress () {
                        // 点击确定后 上传最后一张图片
                        self.canvasNextArr.push({
                            w_id: state.indexState.indexData[state.indexState.currentNumber].w_id,
                            baseImg: self.canvasMethod.canvasToBase(),
                            wh_time: second(newDate - self.canvasMethod.isStartTime),
                            wh_starttime: self.canvasMethod.isStartTimeMoment
                        });
                        self.canvasMethod.isStartTime = undefined;
                        self.canvasMethod.isStartTimeMoment = undefined;

                        await self.uploadCanvas();

                        await axios({
                            url: pageAjax.UserLectionSaveWorks,
                            method: 'post',
                            params: {
                                bh_id: state.defaultPage.bh_id
                            }
                        });
                        state.saveNextArr = [];
                        self.setState(state);

                        self.pageLeftSwitch({
                            item: self.state.leftIcon[5], person: {
                                bh_id: state.defaultPage.bh_id,
                                lectionname: state.defaultPage.lectionname,
                            }
                        });
                        self.clearCanvas();
                    }
                    },
                ]);


            }

            if (self.canvasMethod.setTimeOutFn) {
                clearTimeout(self.canvasMethod.setTimeOutFn);
            }

            self.setState(state);

        } else {
            Toast.info(state.indexState.tips, 2);
        }

    }
};
