/**
 * Created by Jackie.Wu on 2017/4/16.
 */
import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { WingBlank, WhiteSpace } from 'antd-mobile';
export default class extends React.Component {
    render() {
        const state = this.props.state;
        return (<div>
            {state.echarts ? <div className="kpi-ecahrts" >
                <WingBlank size="md" >
                    {state.echarts && <ReactEcharts
                        showLoading={false}
                        option={state.echarts}
                    /> }
                </WingBlank>
            </div> : <div /> }
            {state.echarts && <WhiteSpace size="lg" />}
        </div>);
    }
}
