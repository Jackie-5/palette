/**
 * Created by Jackie.Wu on 2017/2/14.
 */
import index from './state/index-satate';

export default {
    color: 'green',
    leftIcon: [
        {
            icon: 'icon-home',
            link: 'index'
        },
        {
            font: '帖',
            link: 'tie'
        },
        {
            font: '音',
            link: 'music'
        },
        {
            font: '笔',
            link: 'color'
        },
        {
            icon: 'icon-xiangpica',
            link: 'rubber'
        },
        {
            icon: 'icon-yan',
            link: 'review'
        },
        {
            icon: 'icon-ren-copy',
            link: 'person'
        },
        {
            icon: 'icon-zuobiao1',
            link: 'offline'
        }
    ],
    logo: {
        link: 'logo'
    },
    aboutCurrent: {
        link: 'aboutCurrent'
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