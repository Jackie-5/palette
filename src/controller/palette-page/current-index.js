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
            <div className="canvas-box" style={{width: 100 + '%', height:100 + '%', position:'relative', overflow:'hidden'}}>
                <canvas ref="writeCanvas"
                        className="canvasBg"
                        onTouchStart={this.canvasTouchStart.bind(this)}
                        onTouchMove={this.canvasTouchMove.bind(this)}
                        onTouchEnd={this.canvasTouchMoveEnd.bind(this)}
                        width='100' height='100' style={{position:'absolute', top:0, left:0, zIndex:9}} />
                <canvas ref="bgCanvas"
                        width='100%' height='100%' />
            </div>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('app-page'));