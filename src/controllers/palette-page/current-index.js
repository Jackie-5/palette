/**
 * Created by Jackie.Wu on 2017/4/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createForm } from 'rc-form';

import method from './method';
import '../../less/main.less';
import './page-less.less';
import PullLeft from './view/pull-left';
import QueueAnim from 'rc-queue-anim';
import { Media, Player } from 'react-media-player';

import CanvasIndex from './view/canvas';
import Tie from './view/tie-list';
import Music from './view/music-list';
import PenAndColor from './view/pen-color';
import Review from './view/review-works';
import Hope from './view/hope';
import Logo from './view/logo';
import About from './view/about';
import Offline from './view/offline';
import OfflineMake from './view/offline-make';
import Person from './view/person';

//import nprogress from 'nprogress';

//nprogress.start();

const pageSwitch = (pageSwitch, self) => {
    for (let i of Object.keys(pageSwitch)) {
        if (i === 'index' && pageSwitch[i]) return <CanvasIndex key="index" self={self}/>;
        if (i === 'tie' && pageSwitch[i]) return <Tie key="tie" self={self}/>;
        if (i === 'music' && pageSwitch[i]) return <Music key="music" self={self}/>;
        if (i === 'color' && pageSwitch[i]) return <PenAndColor key="color" self={self}/>;
        if (i === 'review' && pageSwitch[i]) return <Review key="review" self={self}/>;
        if (i === 'logo' && pageSwitch[i]) return <Logo key="logo" self={self}/>;
        if (i === 'aboutCurrent' && pageSwitch[i]) return <About key="aboutCurrent" self={self}/>;
        if (i === 'hope' && pageSwitch[i]) return <Hope key="hope" self={self}/>;
        if (i === 'offline' && pageSwitch[i]) return <Offline key="offline" self={self}/>;
        if (i === 'offlineMake' && pageSwitch[i]) return <OfflineMake key="offlineMake" self={self}/>;
        if (i === 'person' && pageSwitch[i]) return <Person key="person" self={self}/>;
    }
};

class App extends method {
    render() {
        return (
            <div className="palette-page-box">
                <PullLeft self={this}/>
                <div className="page-content">
                    <QueueAnim appear={false} className="queue-simple"
                               onEnd={this.onAnimateEnd.bind(this)}>
                        {
                            pageSwitch(this.state.pageSwitch, this)
                        }
                    </QueueAnim>
                </div>
                <Media>
                    <Player
                        ref={c => this._player = c}
                        src={this.state.defaultPage.musicurl}
                        autoPlay
                        onPause={()=>{}}
                    />
                </Media>
            </div>
        );
    }
}

const H5NumberInputExampleWrapper = createForm()(App);
ReactDOM.render(<H5NumberInputExampleWrapper />, document.getElementById('app-page'));
