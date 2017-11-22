/**
 * Created by Jackie.Wu on 2017/11/9.
 */
export default {
    param: {
        bs_id: '',
        w_m: '0',
        w_a: '0',
        w_n: '0',
        h_m: '0',
        h_a: '0',
        h_n: '0',
        man: '',
        tel: ''
    },
    timeSelect: [
        {
            title: '工作日:',
            select: [
                {
                    value: '上午',
                    active: true,
                },
                {
                    value: '下午',
                    active: false,
                },
                {
                    value: '晚上',
                    active: false,
                }
            ]
        },
        {
            title: '节假日:',
            select: [
                {
                    value: '上午',
                    active: false,
                },
                {
                    value: '下午',
                    active: false,
                },
                {
                    value: '晚上',
                    active: false,
                }
            ]
        }
    ],
    title: '',
    name: {
        title: '联系人:',
        value: '',
    },
    mobile: {
        title: '联系电话:',
        value: '',
    },
    tips: '提示:工作人员将尽快与您电话确认预约事宜。'
}