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

    pageLeftSwitch(item,e) {
        e.stopPropagation();
        const self = this;
        const state = self.state;

        if(item.link === 'rubber'){
            self.clearCanvas();
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
    initCanvas(options = {}){
        this.canvasMethod.initCanvas(options)
    }

    clearCanvas(){
        this.canvasMethod.clearCanvas();
    }

    prevFont(){
        console.log('prev')
    }
    nextFont(){
        console.log('next')
    }

};
