/**
 * Created by Jackie.Wu on 2017/4/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createForm } from 'rc-form';
import { Result } from 'antd-mobile';

import method from './method';
import '../../less/main.less';
import './share.less';
import userAgent from '../../libs/user-agent';


class App extends method {
    render() {
        const { param } = this.state;
        return (
        <div>
            {
                userAgent() ? <div className="palette-share-box">
                    <div className={ param.bh_power && param.bh_power.toString() === '1' && (param.bh_prayman && param.bh_prayother) || param.pt_name || param.bh_wish ? 'palette-share-box__hope' : 'hide' }>
                        <div className="palette-share-box__hope__title clearfix">
                            <div className="palette-share-box__hope__title__name">祈福信息</div>
                        </div>
                        <div className="palette-share-box__hope__box">
                            <div className={ (param.bh_prayman && param.bh_prayother) ? 'palette-share-box__hope__box__content' : 'hide'}>[{param.bh_prayman}] 为 [{param.bh_prayother}]祈福</div>
                            <div className={param.pt_name ? 'palette-share-box__hope__box__content' : 'hide'}>
                                <span>祈福种类:</span>
                                <span>{param.pt_name}</span>
                            </div>
                            <div className={param.bh_wish ? 'palette-share-box__hope__box__content' : 'hide'}>
                                <span>心愿:</span>
                                <span>{param.bh_wish}</span>
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
                                    <img className="loadImg" src={param.bh_imgurl} onClick={this.imgClick.bind(this)}/>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="palette-share-box__praise clearfix" onClick={this.praise.bind(this)}>
                        <span className="palette-share-box__praise__font">{param.praiseNum}赞</span>
                        <div className={param.ispraise === 1 ? 'iconfont icon-xin1 palette-share-box__praise__icon' : 'iconfont icon-xin palette-share-box__praise__icon'} />
                    </div>
                    <div className={param.bh_h_power === '1' ? 'palette-share-box__versesImg' : 'hide'}>
                        <div className="palette-share-box__versesImg__border" />
                        <div className="palette-share-box__versesImg__img">
                            <img src={param.versesImg} />
                        </div>
                        <div className="palette-share-box__versesImg__border" />
                    </div>
                    <div className="palette-share-box__qcode">
                        <div className="palette-share-box__qcode__img">
                            <img src={param.wxImg} />
                        </div>
                    </div>
                </div> :  <Result
                    img={<div className="iconfont icon-tanhao result-tanhao" /> }
                    title="浏览器提示"
                    message="请在微信浏览器打开"
                />
            }
        </div>
        );
    }
}

const H5NumberInputExampleWrapper = createForm()(App);
ReactDOM.render(<H5NumberInputExampleWrapper />, document.getElementById('app-page'));
