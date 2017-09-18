/**
 * Created by Jackie.Wu on 2017/4/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createForm } from 'rc-form';
require('../../libs/preview')();

import method from './method';
import { WhiteSpace } from 'antd-mobile';
import TimeBar from '../../libs/time-bar';
import CashView from './view/cash-view';
import KpiEcharts from './view/kpi-echarts';
import KpiTab from './view/kpi-tab';
import KpiTips from './view/kpi-tips';

import '../../less/main.less';
import './ad-kpi.less';
import nprogress from 'nprogress';

nprogress.start();


class render extends method {
  render() {
    return (<div className="kpi-box" >
      <TimeBar buName={this.state.buName} queryDate={this.state.queryDate} />
      <CashView state={this.state} />
      <WhiteSpace size="lg" />
      <KpiEcharts state={this.state} />
      <KpiTab state={this.state} />
      <KpiTips state={this.state} />
    </div>);
  }
}


const BasicInputExampleWrapper = createForm()(render);
ReactDOM.render(<BasicInputExampleWrapper />, document.getElementById('app-kepler-page-box'));