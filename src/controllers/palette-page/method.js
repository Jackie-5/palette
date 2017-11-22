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

const alert = Modal.alert;

export default class method extends React.Component {
    constructor(props) {
        super(props);
        this.state = initState;
    }

    async componentDidMount() {
        // 进入页面 set 默认值
        await axios({ url: pageAjax.LoginPower });
        this.initCanvas();
    }

    async saveUpdate(type, options = {}, state) {
        if (type === 'saveWork') {
            // 保存作品用到的接口
            const save = await axios({
                url: pageAjax.UserLectionAddWorks,
                method: 'post',
                params: options
            });
            if (save.code === 0) {
                Toast.info(save.msg, 1);
                this.setState(state);
                this.initCanvas();
            }
        } else {
            const save = await axios({
                url: pageAjax.UserUpdateState,
                method: 'post',
                params: options
            });
            if(save.code === 0){
                Toast.info(save.msg, 1);
                for (let i in options){
                    state.defaultPage[i] = options[i]
                }
                this.setState(state);
                this.initCanvas();
            }
        }
    }


    async pageLeftSwitch(item, options = {}, e) {
        e.stopPropagation();
        const self = this;
        const state = copy(self.state);


        if (item.link === 'rubber') {
            if (state.pageSwitch['index']) {
                self.clearCanvas();
            }
        } else {
            let isTrue = false;
            if (!state.pageSwitch[item.link]) {
                document.title = item.title;
                for (let i in state.pageSwitch) {
                    state.pageSwitch[i] = item.link === i;
                }
                // 如果是从各个页面点回到首页的那么做页面处理
                if (options.tie) {
                    // 先查看用户是否可以保存作品
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
                                self.saveUpdate('saveWork', {
                                    bh_id: options.tie.b_id,
                                }, state);
                            }
                            },
                        ]);
                    } else {
                        self.saveUpdate('saveWork', {
                            bh_id: options.tie.b_id,
                        }, state);
                    }
                } else if (options.music) {
                    self.saveUpdate('update',{
                        m_id: options.music.m_id,
                    }, state);
                } else if (options.pen) {
                    console.log('asdfa');
                } else {
                    this.setState(state)
                }

            }
        }
    }

    onAnimateEnd({ key, type }) {
        //console.log(key, type)
    }

    subCanvas(self) {
        this.canvasMethod = self;
    }

    async initCanvas(options) {
        const self = this;
        const state = this.state;
        const data = await axiosAll.all([
            axios({ url: pageAjax.userLectionMyDetail }),
            axios({ url: pageAjax.LectionGetWordList })
        ]);

        state.defaultPage = data[0].data;
        // 字的颜色
        state.penColorState.penSize.map((item, i) => {
            item.active = state.defaultPage.color === item;
        });
        // 字体大小
        state.penColorState.color.map((item, i) => {
            item.active = index === i
        });

        state.indexState.currentNumber = data[0].data.position - 1;
        state.indexState.allNumber = data[1].data.length - 1;
        state.indexState.indexData = data[1].data;
        self.setState(state);

        this.canvasMethod.initCanvas();
    }

    clearCanvas() {
        this.canvasMethod.clearCanvas();
    }

    prevFont() {
        const self = this;
        const state = this.state;
        if (state.indexState.currentNumber > 0) {
            state.indexState.currentNumber -= 1;
            this.clearCanvas();
            self.setState(state);
        } else {
            Toast.info(state.indexState.prevToast, 2)
        }
    }

    nextFont() {
        const self = this;
        const state = this.state;
        console.log(state.indexState.currentNumber < state.indexState.allNumber);
        if (state.indexState.currentNumber < state.indexState.allNumber) {
            state.indexState.currentNumber += 1;
            this.clearCanvas();
            self.setState(state);
        } else {
            Toast.info(state.indexState.nextToast, 2);
        }
    }

    changePenColor(index, type) {
        const state = this.state;
        if(type === 'pen'){
            state.penColorState.penSize.map((item, i) => {
                item.active = index === i;
            });
        } else {
            state.penColorState.color.map((item, i) => {
                item.active = index === i
            });
        }
        this.setState(state);
        //this.initCanvas();
    }
};
