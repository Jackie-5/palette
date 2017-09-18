/**
 * Created by Jackie.Wu on 2017/4/16.
 */

import React from 'react';
import initState from './init-state';
import moment from 'moment';
import axios from 'axios';
import Ajax from '../../libs/axios';
import kpiAjaxUrl from './lib/ajax-config';
import { symbol } from '../../libs/general';
import kpiEcharts from './lib/kpi-echarts-options';
import actEach from './lib/act-each';
import nprogress from 'nprogress';


const year = moment().year();
const month = (moment().month() + 1);
const lastMonth = moment().month();
const showLastMonth = lastMonth === 0 ? 12 : lastMonth;
const currentQuarter = moment().quarter();
const lastQuarter = moment().quarter() === 1 ? 4 : moment().quarter() - 1;

export default class method extends React.Component {
    constructor(props) {
        super(props);
        this.state = initState;
    }

    componentDidMount() {
        const self = this;
        const currentQ = currentQuarter * 3 - 2;
        const lastQ = lastQuarter * 3 - 2;
        const axiosAll = [
            Ajax(kpiAjaxUrl.queryOverviewPublishAmount, 'get'),
            Ajax(kpiAjaxUrl.queryKPIReach, 'get'),
            Ajax(kpiAjaxUrl.queryOverviewPublishAmountCharts, 'get'),
            Ajax(kpiAjaxUrl.queryKPI, 'get', {
                queryStartDate: `${year}-${JSON.stringify(month).length === 1 ? `0${month}` : month}-01`,
                queryType: 0,
            }),
            Ajax(kpiAjaxUrl.queryKPI, 'get', {
                queryStartDate: `${lastMonth === 0 ? year - 1 : year}-${JSON.stringify(showLastMonth).length === 1 ? `0${showLastMonth}` : showLastMonth}-01`,
                queryType: 0,
            }),
            Ajax(kpiAjaxUrl.queryKPI, 'get', {
                queryStartDate: `${year}-${JSON.stringify(currentQ).length === 1 ? `0${currentQ}` : currentQ}-01`,
                queryType: 1,
            }),
            Ajax(kpiAjaxUrl.queryKPI, 'get', {
                queryStartDate: `${currentQuarter === 1 ? year - 1 : year}-${JSON.stringify(lastQ).length === 1 ? `0${lastQ}` : lastQ}-01`,
                queryType: 1,
            }),
        ];
        // 请求KPI上面的
        axios.all(axiosAll)
            .then((data) => {
                self.topCash(data[0], data[1]);
                self.echarts(data[2]);
                self.queryKpi(1, data[3]);
                self.queryKpi(2, data[4]);
                self.queryKpi(3, data[5]);
                self.queryKpi(4, data[6]);
                nprogress.done();
            });
    }

    topCash(amountMsg, reachMsg) {
        const publishAmount = amountMsg.msg.publishAmount;
        const kpiTopCashState = this.state.kpiTopCash;
        const adAllCash = {};
        const effectCash = {};
        const showCash = {};
        const memCash = {};
        kpiTopCashState.buName = amountMsg.msg.buName;
        kpiTopCashState.queryDate = amountMsg.queryDate;
        // 广告收入
        adAllCash.title = '广告收入';
        adAllCash.amountview = publishAmount.all_amountview;
        adAllCash.dayGrow = symbol(publishAmount.dayGrow_all_amountview);
        adAllCash.weekGrow = symbol(publishAmount.weekGrow_all_amountview);

        adAllCash.amountviewColor = publishAmount.weekGrow_all_amountview.includes('-') ? 'green' : 'orange';

        adAllCash.mtdview = publishAmount.all_amount_mtdview;
        adAllCash.grow = symbol(publishAmount.grow_all_amountview);
        adAllCash.kpi = reachMsg.msg.allKPI;
        adAllCash.kpiReach = symbol(reachMsg.msg.allKPIReach);
        adAllCash.ytd = publishAmount.all_amount_ytdview;
        adAllCash.yoy = symbol(publishAmount.grow_all_amount_yoyview);
        // 效果广告
        effectCash.title = '效果广告';
        effectCash.link = window.location.origin.includes('localhost') ? `${window.location.origin}?entry=cpc-overview` : '/midas/keplerapp/indexAction';
        effectCash.amountview = publishAmount.cpm_amountview;
        effectCash.dayGrow = symbol(publishAmount.dayGrow_cpm_amountview);
        effectCash.weekGrow = symbol(publishAmount.weekGrow_cpm_amountview);

        effectCash.amountviewColor = publishAmount.weekGrow_cpm_amountview.includes('-') ? 'green' : 'orange';

        effectCash.mtdview = publishAmount.cpm_amount_mtdview;
        effectCash.grow = symbol(publishAmount.grow_cpm_amountview);
        effectCash.kpi = reachMsg.msg.cpcKPI;
        effectCash.kpiReach = symbol(reachMsg.msg.cpcKPIReach);
        effectCash.ytd = publishAmount.cpm_amount_ytdview;
        effectCash.yoy = symbol(publishAmount.grow_cpm_amount_yoyview);
        // 展示广告
        showCash.title = '展示广告';
        showCash.amountview = publishAmount.cpt_amountview;
        showCash.dayGrow = symbol(publishAmount.dayGrow_cpt_amountview);
        showCash.weekGrow = symbol(publishAmount.weekGrow_cpt_amountview);

        showCash.amountviewColor = publishAmount.weekGrow_cpt_amountview.includes('-') ? 'green' : 'orange';

        showCash.mtdview = publishAmount.cpt_amount_mtdview;
        showCash.grow = symbol(publishAmount.grow_cpt_amountview);
        showCash.kpi = reachMsg.msg.cptKPI;
        showCash.kpiReach = symbol(reachMsg.msg.cptKPIReach);
        showCash.ytd = publishAmount.cpt_amount_ytdview;
        showCash.yoy = symbol(publishAmount.grow_cpt_amount_yoyview);
        // 商户通
        memCash.title = '商户通';
        memCash.link = window.location.origin.includes('localhost') ? `${window.location.origin}?entry=merchants` : '/midas/adbrand/keplerapp/toMemIndexAction';
        memCash.amountview = publishAmount.mem_amountview;
        memCash.dayGrow = symbol(publishAmount.dayGrow_mem_amountview);
        memCash.weekGrow = symbol(publishAmount.weekGrow_mem_amountview);

        memCash.amountviewColor = publishAmount.weekGrow_mem_amountview.includes('-') ? 'green' : 'orange';

        memCash.mtdview = publishAmount.mem_amount_mtdview;
        memCash.grow = symbol(publishAmount.grow_mem_amountview);
        memCash.kpi = reachMsg.msg.memKPI;
        memCash.kpiReach = symbol(reachMsg.msg.memKPIReach);
        memCash.ytd = publishAmount.mem_amount_ytdview;
        memCash.yoy = symbol(publishAmount.grow_mem_amount_yoyview);

        kpiTopCashState.adAllCash = adAllCash;
        kpiTopCashState.eachCash = [effectCash, showCash, memCash];
        this.setState(kpiTopCashState);
    }

    echarts(data) {
        this.setState({ echarts: kpiEcharts(this.state.kpiTopCash.title, data.msg.publishAmountCahrts) });
    }

    queryKpi(type, data) {
        const queryKpi = this.state.queryKpi;
        const kpiList = {};
        const subMenuObj = {
            title: ['全部', '效果', '展示', '商户通'],
        };

        subMenuObj.panelData = data.msg.bgList.length > 0 ?
            [
                actEach(data.msg.dateRatio, data.msg.bgList, data.msg.all, data.msg.buList),
                actEach(data.msg.dateRatio, data.msg.bgList, data.msg.cpc, data.msg.buList),
                actEach(data.msg.dateRatio, data.msg.bgList, data.msg.cpt, data.msg.buList),
                actEach(data.msg.dateRatio, data.msg.bgList, data.msg.mem, data.msg.buList)
            ]
            :
            [
                actEach(data.msg.dateRatio, data.msg.buList, data.msg.all),
                actEach(data.msg.dateRatio, data.msg.buList, data.msg.cpc),
                actEach(data.msg.dateRatio, data.msg.buList, data.msg.cpt),
                actEach(data.msg.dateRatio, data.msg.buList, data.msg.mem)
            ];

        switch (type) {
            case 1 :
                kpiList.title = `${month}月达成`;
                break;
            case 2 :
                kpiList.title = `${showLastMonth}月达成`;
                break;
            case 3 :
                kpiList.title = `Q${currentQuarter}达成`;
                break;
            case 4 :
                kpiList.title = `Q${lastQuarter}达成`;
                break;
            default:
                break;
        }
        kpiList.subMenu = subMenuObj;
        queryKpi.push(kpiList);
        this.setState(queryKpi);
    }
};
