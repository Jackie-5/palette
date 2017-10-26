/**
 * Created by Jackie.Wu on 2017/2/14.
 */
import index from './state/index-satate';

export default {
    color: 'green',
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
    pageSwitch:{
        index: true,
        tie: false,
        music: false,
        color: false,
        review: false,
        offline: false,
        logo: false,
        aboutCurrent: false,
    },

    indexState: {...index}
};