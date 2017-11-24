/**
 * Created by Jackie.Wu on 2017/4/16.
 */

import React from 'react';
import initState from './init-state';
import axios from '../../libs/axios';
import pageAjax from '../../libs/pageAjax';
import { Toast, Modal } from 'antd-mobile';
import copy from 'clone';
import { wxShareConfig } from '../../libs/wx-share-config';

const alert = Modal.alert;

export default class method extends React.Component {
    constructor(props) {
        super(props);
        this.state = initState;
    }

    async componentDidMount() {
        // 进入页面 set 默认值
        await axios({ url: pageAjax.LoginPower });
        const wxConfig = await axios({ url: pageAjax.ShareGetParm });
        const data = await axios({
            url: pageAjax.UserLectionGetMyWorksByID,
            params: {
                bh_id: 1
            }
        });
        wx.config({
            debug: true,
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

        wx.ready(()=>{

        });
    }
};
