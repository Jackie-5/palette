/**
 * Created by Jackie.Wu on 2017/4/16.
 */

import React from 'react';
import initState from './init-state';

export default class method extends React.Component {
    constructor(props) {
        super(props);
        this.state = initState;
    }

    pageLeftSwitch(item, e) {
        e.stopPropagation();
        const self = this;
        const state = self.state;

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
        this.initCanvas();
    }

    initCanvas() {
        const options = {};
        this.state.penColorState.color.map((item) => {
            if (item.active) {
                options.penColor = item.value
            }
        });
        this.state.penColorState.penSize.map((item) => {
            if (item.active) {
                options.penSize = item.size
            }
        });
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
