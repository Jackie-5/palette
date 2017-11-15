/**
 * Created by Jackie.Wu on 2017/4/16.
 */

import React from 'react';
import initState from './init-state';
import axios from '../../libs/axios';
import axiosAll from 'axios';
import pageAjax from '../../libs/pageAjax';
import { Toast } from 'antd-mobile';

export default class method extends React.Component {
    constructor(props) {
        super(props);
        this.state = initState;
    }

    async componentDidMount() {
        // 进入页面 set 默认值
        await axios(pageAjax.LoginPower);
        this.initCanvas();
    }

    pageLeftSwitch(item, options = {}, e) {
        e.stopPropagation();
        const self = this;
        const state = self.state;

        if (options.music) {
            state.currentMusic = options.music.musicurl;
        }


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
                this.setState(state)
            }
        }
    }

    onAnimateEnd({ key, type }) {
        console.log(key, type)
    }

    subCanvas(self) {
        this.canvasMethod = self;
    }

    async initCanvas() {
        const self = this;
        const state = this.state;
        const data = await axiosAll.all([axios(pageAjax.userLectionMyDetail), axios(pageAjax.LectionGetWordList)]);

        state.defaultPage = data[0].data;
        state.indexState.currentNumber = data[0].data.position - 1;
        state.indexState.allNumber = data[1].data.length;
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
            Toast.info(state.indexState.prevToast, 200)
        }

        console.log('prev')
    }

    nextFont() {
        console.log('next')
    }

    changePenColor(index) {
        const state = this.state;
        state.penColorState.color.map((item, i) => {
            item.active = index === i
        });
        this.setState(state);
        this.initCanvas();
    }

    changePenSize(size, index) {
        const state = this.state;
        state.penColorState.penSize.map((item, i) => {
            item.active = index === i
        });
        this.setState(state);
        this.initCanvas();
    }
};
