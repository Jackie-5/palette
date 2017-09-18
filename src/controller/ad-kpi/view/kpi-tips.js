/**
 * Created by Jackie.Wu on 2017/4/16.
 */
import React from 'react';
import { WingBlank, WhiteSpace } from 'antd-mobile';

export default class extends React.Component {
    render() {
        const state = this.props.state;
        return (<div className="kpi-tips" >
            <WhiteSpace size="sm" />
            <WingBlank size="sm" >
                {state.kpiTips}
            </WingBlank>
            <WhiteSpace size="sm" />
        </div>);
    }
}
