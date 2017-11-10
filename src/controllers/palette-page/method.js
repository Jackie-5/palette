/**
 * Created by Jackie.Wu on 2017/4/16.
 */

import React from 'react';
import initState from './init-state';
import axios from '../../libs/axios';
import pageAjax from '../../libs/pageAjax';

export default class method extends React.Component {
    constructor(props) {
        super(props);
        this.state = initState;
    }

    componentDidMount() {
        const self = this;
        const state = this.state;
        // 进入页面 set 默认值
        axios(pageAjax.userLectionMyDetail)
            .then((data) => {
                state.defaultPage = data.data;
                self.setState(state);
                this.canvasMethod.initCanvas()
            })
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
        //this.initCanvas();
    }

    initCanvas() {
        const options = {};
        this.canvasMethod.initCanvas(options)
    }

    clearCanvas() {
        this.canvasMethod.clearCanvas();
    }

    prevFont() {
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
