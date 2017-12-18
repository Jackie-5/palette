/**
 * Created by Jackie.Wu on 2017/4/16.
 */

import React from 'react';
import axios from '../../libs/axios';
import pageAjax from '../../libs/pageAjax';
import URI from 'urijs'
import { wxShareConfig, hideConfig, wxConfigSet } from '../../libs/wx-share-config';
import { shareName } from '../../libs/share-content';

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
        this.urlSearch = new URI(location.href).query(true);
        const wxConfig = await axios({
            url: pageAjax.ShareGetParm,
            params: {
                flag: location.href
            }
        });
        wxConfigSet(wxConfig);
        wx.ready(() => {
            wxShareConfig({
                title: `『${decodeURIComponent(this.urlSearch.u)}』${shareName.title}《${decodeURIComponent(this.urlSearch.n)}》`,
                desc: shareName.desc,
                link: `${shareName.link}?i=${this.urlSearch.i}&n=${this.urlSearch.n}&u=${this.urlSearch.u}`,
                imgUrl: shareName.imgUrl
            });
            hideConfig();
            self.initShare();
        });
        document.title = decodeURIComponent(this.urlSearch.n);
        document.querySelector('.loadImg').onload = ()=>{
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
