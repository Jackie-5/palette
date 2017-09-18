/**
 * Created by Jackie.Wu on 2017/4/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import method from './method';
import '../../less/main.less';
import './page-less.less';
import nprogress from 'nprogress';

nprogress.start();

class App extends method {
    render() {
        return (
            <div className="" ref="test1">
                <canvas ref="test" style={{width:320, height:300, background:'#0ff'}}></canvas>
            </div>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('app-page'));