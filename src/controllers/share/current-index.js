/**
 * Created by Jackie.Wu on 2017/4/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createForm } from 'rc-form';

import method from './method';
import '../../less/main.less';
import './share.less';


class App extends method {
    render() {
        return (
            <div className="palette-share-box">
                <div className="palette-share-box__hope">
                    <div className="palette-share-box__hope__title clearfix">
                        <div className="palette-share-box__hope__title__name">祈福信息</div>
                    </div>
                    <div className="palette-share-box__hope__box">
                        <div className="palette-share-box__hope__box__content">XXX为XXX祈福</div>
                        <div className="palette-share-box__hope__box__content">
                            <span>祈福种类:</span>
                            <span>金榜题名</span>
                        </div>
                        <div className="palette-share-box__hope__box__content">
                            <span>心愿:</span>
                            <span>阿斯顿发生法撒旦发顺丰</span>
                        </div>
                    </div>
                </div>
                <div className="palette-share-box__page-view">
                    <div className="palette-share-box__page-view__title clearfix">
                        <div className="palette-share-box__page-view__title__name">我的作品</div>
                    </div>
                    <div className="palette-share-box__page-view__box">
                        <div className="palette-share-box__page-view__box__img">
                            <div className="ov">
                                <img src="http://hellorfimg.zcool.cn/preview/726298525.jpg" />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="palette-share-box__praise clearfix">
                    <span className="palette-share-box__praise__font">0赞</span>
                    <div className={this.state.xin ? 'iconfont icon-xin palette-share-box__praise__icon' : 'iconfont icon-xin1 palette-share-box__praise__icon'} />
                </div>
            </div>
        );
    }
}

const H5NumberInputExampleWrapper = createForm()(App);
ReactDOM.render(<H5NumberInputExampleWrapper />, document.getElementById('app-page'));
