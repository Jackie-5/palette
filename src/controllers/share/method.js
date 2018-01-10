/**
 * Created by Jackie.Wu on 2017/4/16.
 */

import React from 'react';
import axios from '../../libs/axios';
import pageAjax from '../../libs/pageAjax';
import URI from 'urijs'
import { wxShareConfig, hideConfig, wxConfigSet } from '../../libs/wx-share-config';
import { shareName } from '../../libs/share-content';
import cookies from 'js-cookie';

export default class method extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            param: {}
        };
    }

    async componentDidMount() {
        // 进入页面 set 默认值
        const self = this;
        cookies.set('returnUrl', location.href);
        localStorage.setItem('returnUrl', location.href);
        this.urlSearch = {};
        let query = new URI(location.href).query(true);

        for (let i in query) {
            this.urlSearch[i] = decodeURIComponent(query[i])
        }

        const wxConfig = await axios({
            url: pageAjax.ShareGetParm,
            params: {
                flag: location.href
            }
        });
        wxConfigSet(wxConfig);
        wx.ready(() => {
            wxShareConfig({
                title: `『${this.urlSearch.u}』${shareName.title}《${this.urlSearch.n}》`,
                desc: shareName.desc,
                link: `${shareName.link}?i=${encodeURIComponent(this.urlSearch.i)}&n=${encodeURIComponent(this.urlSearch.n)}&u=${encodeURIComponent(this.urlSearch.u)}`,
                imgUrl: shareName.imgUrl
            });
            hideConfig();
            self.initShare();
        });
        document.querySelector('#app-page').classList.add('app-page');
        document.title = this.urlSearch.n;
        document.querySelector('.loadImg').onload = () => {
            document.querySelector('.palette-share-box__page-view__box').scrollLeft = document.querySelector('.loadImg').offsetWidth;
        };
    }

    async initShare() {

        const data = await axios({
            url: pageAjax.ShareGetShareDetails,
            params: {
                key: this.urlSearch.i
            }
        });
        this.setState(
            {
                param: data.data,
            }
        );
    }

    imgClick() {
        wx.previewImage({
            current: this.state.param.bh_imgurl, // 当前显示图片的http链接
            urls: [
                this.state.param.bh_imgurl
            ]
        });
    }

    async praise() {
        const self = this;
        const state = self.state;
        const data = await axios({
            url: pageAjax.ShareZan,
            method: 'post',
            params: {
                key: self.urlSearch.i,
            }
        });

        if (data.code === 0) {
            self.initShare();
        }
    }
};
