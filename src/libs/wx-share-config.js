/**
 * Created by JackieWu on 2017/11/24.
 */
import { Toast } from 'antd-mobile';

export const wxShareConfig = (options) => {
    const { title, desc, link, imgUrl} = options;
    wx.onMenuShareTimeline({
        title: title, // 分享标题
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            Toast.success('分享成功', 1);
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            Toast.success('分享失败', 1);
        }
    });
    wx.onMenuShareAppMessage({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
            Toast.success('分享成功', 1);
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            Toast.success('分享失败', 1);
        }
    });
};

export const hideConfig = ()=>{
    wx.hideMenuItems({
        menuList: [
            'menuItem:share:qq',
            'menuItem:share:weiboApp',
            'menuItem:favorite',
            'menuItem:share:facebook',
            'menuItem:share:QZone',
            'menuItem:copyUrl',
            'menuItem:editTag',
            'menuItem:delete',
            'menuItem:originPage',
            'menuItem:readMode',
            'menuItem:openWithQQBrowser',
            'menuItem:openWithSafari',
            'menuItem:share:email',
            'menuItem:setFont',
            'menuItem:exposeArticle',
        ]
    });
};

export const wxConfigSet = (wxConfig)=>{
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
};