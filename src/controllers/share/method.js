/**
 * Created by Jackie.Wu on 2017/4/16.
 */

import React from 'react';
import axios from '../../libs/axios';
import pageAjax from '../../libs/pageAjax';
import URI from 'urijs'

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
        await axios({ url: pageAjax.LoginPower });
        const wxConfig = await axios({
            url: pageAjax.ShareGetParm,
            params: {
                flag: location.href
            }
        });
        wx.config({
            debug: false,
            appId: wxConfig.data.appId,
            timestamp: wxConfig.data.timestamp,
            nonceStr: wxConfig.data.nonceStr,
            signature: wxConfig.data.signature,
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'startRecord',
                'stopRecord',
                'onVoiceRecordEnd',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'openLocation',
                'getLocation',
                'hideOptionMenu',
                'showOptionMenu',
                'hideMenuItems',
                'showMenuItems',
                'closeWindow',
                'scanQRCode',
            ],
        });

        wx.ready(() => {
            self.initShare();
        });
        document.querySelector('.loadImg').onload = ()=>{
            document.querySelector('.palette-share-box__page-view__box').scrollLeft = document.querySelector('.loadImg').offsetWidth;
        };
    }

    async initShare() {
        const data = await axios({
            url: pageAjax.ShareGetShareDetails,
            params: {
                bh_id: this.urlSearch.shareId
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
            params: {
                bh_id: self.urlSearch.shareId,
                method: 'post'
            }
        });

        if (data.code === 0) {
            state.param.ispraise = state.param.ispraise === 1 ? 0 : 1;
            self.setState(state);
        }
    }
};
