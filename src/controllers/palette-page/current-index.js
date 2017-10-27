/**
 * Created by Jackie.Wu on 2017/4/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import method from './method';
import '../../less/main.less';
import './page-less.less';
import PullLeft from './view/pull-left';
import QueueAnim from 'rc-queue-anim';

import CanvasIndex from './view/canvas';
import Tie from './view/tie-list';
import Music from './view/music-list';

//import nprogress from 'nprogress';

//nprogress.start();

const pageSwitch = (pageSwitch, self) => {
    for (let i of Object.keys(pageSwitch)) {
        if (i === 'index' && pageSwitch[i]) return <CanvasIndex key="index" self={self}/>;
        if (i === 'tie' && pageSwitch[i]) return <Tie key="tie" self={self}/>;
        if (i === 'music' && pageSwitch[i]) return <Music key="music" self={self}/>;
    }
};

class App extends method {
    render() {
        return (
            <div className="palette-page-box">
                <PullLeft self={this}/>
                <div className="page-content">
                    <QueueAnim duration={300} appear={false} className="queue-simple"
                               onEnd={this.onAnimateEnd.bind(this)}>
                        {
                            pageSwitch(this.state.pageSwitch, this)
                        }
                    </QueueAnim>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app-page'));