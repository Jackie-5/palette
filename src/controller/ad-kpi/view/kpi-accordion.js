/**
 * Created by Jackie.Wu on 2017/4/16.
 */
import React from 'react';
import { Accordion, Progress, WingBlank, List } from 'antd-mobile';

const AccordionHeader = (item, i) => (<div className="kpi-acc-header" key={i} >
    <div className="kpi-bg-bu-name" >
        <div className="bg-bu-title" >{item.name}</div>
        <div className="bg-bu-kpi-number" >
            <span>KPI</span>
            <span>{item.kpi}</span>
        </div>
    </div>
    <div className="kpi-acc-icon" >
        <div className="kpi-icon kpi-icon-color" >实</div>
        <div className="kpi-icon-number" >{item.cash}</div>
    </div>
    <div className={item.notKpi ? 'kpi-acc-progress' : 'hide'} >
        <div className={item.kpiProgressColor} >
            <Progress percent={item.cashRatio} position="normal" unfilled="show" />
        </div>
        <div className="line" style={{ left: `${parseFloat(item.dateRatio)}%` }} />
    </div>
    <div className={item.notKpi ? 'hide' : 'kpi-acc-progress'} >
        KPI未设置
    </div>
    <div className="kpi-acc-proportion" >{item.cashRatioValue}</div>
</div>);

export default class extends React.Component {
    render() {
        return (<div className="kpi-detail-list" >
            <Accordion accordion >
                {
                    this.props.data.map((item, i) => (
                        <Accordion.Panel
                            key={i}
                            className={item.list.length > 0 ? 'kpi-accordion-arrow' : 'kpi-accordion-arrow kpi-arrow-none'}
                            header={<WingBlank size="md" >{AccordionHeader(item, i)}</WingBlank>} >
                            <List>
                                {
                                    item.list.length > 0 && item.list.map((it, k) => <List.Item key={k} >
                                        {AccordionHeader(it, k)}
                                    </List.Item>)
                                }
                            </List>
                        </Accordion.Panel>))
                }
            </Accordion>
        </div>);
    }
}
