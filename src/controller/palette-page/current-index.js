/**
 * Created by Jackie.Wu on 2017/4/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import method from './method';
import '../../less/main.less';
import './page-less.less';
import nprogress from 'nprogress';

//nprogress.start();

class App extends method {
    render() {
        return (
            <div className="" style={{width: 100 + '%', height:100 + '%'}}>
                <canvas ref="test" className="canvasBg"></canvas>
                <div className="" ref="test1" style={{width:100, height:30, background:'', color:'#fff'}} onClick={this.clear}> 点击清除</div>
            </div>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('app-page'));