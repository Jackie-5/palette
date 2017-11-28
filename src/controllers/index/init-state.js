/**
 * Created by Jackie.Wu on 2017/2/14.
 */
import index from './state/index-satate';
import penColor from './state/pen-color';
import hopeState from './state/hope-state';
import logoState from './state/logo-state';
import offlineMake from './state/offline-make';

export default {
    defaultPage: {},
    isMusic: true,
    nextNumberAjax: 3,
    leftIcon: [
        {
            icon: 'icon-maobi',
            link: 'index',
            title: ''
        },
        {
            font: '帖',
            link: 'tie',
            title: '选择字帖',
        },
        {
            font: '音',
            link: 'music',
            title: '选择音乐',
        },
        {
            font: '笔',
            link: 'color',
            title: '选择毛笔',
        },
        {
            icon: 'icon-xiangpica',
            link: 'rubber'
        },
        {
            icon: 'icon-yan',
            link: 'review',
            title: '作品预览',
        },
        {
            icon: 'icon-ren-copy',
            link: 'person',
            title: '用户中心',
        },
        {
            icon: 'icon-zuobiao1',
            link: 'offline',
            title: '线下抄经点',
        }
    ],
    logo: {
        link: 'logo',
        title: '关于乙度',
    },
    aboutCurrent: {
        link: 'aboutCurrent',
        title: '字帖简介',
    },
    hope: {
        link: 'hope',
        title: '祈福信息',
    },
    offlineMake: {
        link: 'offlineMake',
        title: '抄经预约',
    },
    pageSwitch: {
        // 写字
        index: true,
        // 选帖子
        tie: false,
        // 选音乐
        music: false,
        // 颜色和笔大小
        color: false,
        // 作品预览
        review: false,
        // 个人中心
        person: false,
        // 线下抄经
        offline: false,
        // 线下抄经预约
        offlineMake: false,
        // 点击logo
        logo: false,
        // 当前抄经的经文简介
        aboutCurrent: false,
        // 祈福
        hope: false,
    },

    indexState: { ...index },
    penColorState: { ...penColor },
    hopeState: { ...hopeState },
    logoState: {},
    aboutArticle: {},
    offlineMakeState: { ...offlineMake },
    personState: {},
    musicList: [],
    tieList: [],
    offlineState: [],
    currentReviewImgSrc: '',
    reviewImgIsPerson: false,
    reviewBtn: [
        [
            {
                value: '返回主页',
                icon: 'icon-fanhui',
                key: 'return',
            },
        ],
        [
            {
                value: '保存作品',
                icon: 'icon-baocun',
                key: 'save',
            },
            {
                value: '返回主页',
                icon: 'icon-fanhui',
                key: 'return',
            },
        ],
        [
            {
                value: '分享作品',
                icon: 'icon-fenxiang',
                key: 'share',
            },
            {
                value: '删除作品',
                icon: 'icon-delete',
                key: 'delete',
            },
        ]
    ],
    indexShareOpt: {
        title: `[乙度抄经]`,
        desc: '『乙东方 · 度千处』点亮一盏心灯，送出一份祝福。',
        link: `http://wechat.eastdoing.com/chaojing/index.html`,
        imgUrl: 'http://wechat.eastdoing.com/chaojing/share.jpg'
    }
};