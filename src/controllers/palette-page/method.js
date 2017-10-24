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

    pageLeftSwitch(item) {
        const self = this;
        const state = self.state;
        if(!state.pageSwitch[item.link]){
            for (let i in state.pageSwitch) {
                state.pageSwitch[i] = item.link === i;
            }
            this.setState(state)
        }
    }
    onAnimateEnd({key, type}){
        console.log(key, type)
    }

};