/**
 * Created by Jackie.Wu on 2017/4/16.
 */
import React from 'react';
import { WingBlank, WhiteSpace, Flex, List } from 'antd-mobile';

const Item = List.Item;
const allKpiCash = item => (
    <div className="kpi-top-cash" >
        <WingBlank size="sm" >
            <WhiteSpace
                size="sm" />
            <div className="all-cash clearfix" >
                <span>{item.title}</span>
            </div>
            <WhiteSpace
                size="lg" />
            <div
                className={`${item.amountviewColor} all-cash-fist-number`} >{item.amountview}</div>
            <div className="all-cash-than" >
                <p>环</p>
                <span>{item.dayGrow}</span>
                <p>同</p>
                <span>{item.weekGrow}</span>
            </div>
            <WhiteSpace size="lg" />
            <Flex className="all-cash-other" >
                <Flex.Item>
                    <p>MTD</p>
                    <p>{item.mtdview}</p>
                </Flex.Item>
                <Flex.Item className={item.kpi ? '' : 'hide'} >
                    <p>KPI</p>
                    <p>{item.kpi}</p>
                </Flex.Item>
                <Flex.Item>
                    <p>YTD</p>
                    <p>{item.ytd}</p>
                </Flex.Item>
            </Flex>
            <WhiteSpace size="sm" />
            <Flex className="all-cash-other" >
                <Flex.Item>
                    <p>MTD同</p>
                    <p>{item.grow}</p>
                </Flex.Item>
                <Flex.Item className={item.kpiReach ? '' : 'hide'} >
                    <p>KPI达成</p>
                    <p>{item.kpiReach}</p>
                </Flex.Item>
                <Flex.Item>
                    <p>YOY</p>
                    <p>{item.yoy}</p>
                </Flex.Item>
            </Flex>
            <WhiteSpace size="sm" />
        </WingBlank>
    </div>
);

const kpiCashEach = (state) => {
    return state.eachCash.map((item, i) => (
        <Item key={i} >
            <div className="kpi-box__each__title clearfix" >
                <a href={item.link ? item.link : 'javascript:;'} >
                    <span>{item.title}</span>
                    {
                        item.link ? <span className="kpi-box__each__title__tips" >详情</span> : ''
                    }
                </a>
            </div>
            <div className="kpi-box__each__cash" >
                <span className={`${item.amountviewColor} kpi-box__each__cash__span`}>{item.amountview}</span>
                <div className="kpi-box__each__cash__then" >
                    <p className="kpi-box__each__cash__then__p" ><span>环</span><span>{item.dayGrow}</span></p>
                    <p className="kpi-box__each__cash__then__p" ><span>同</span><span>{item.weekGrow}</span></p>
                </div>
            </div>
            <Flex className="kpi-box__each__flex" >
                <Flex.Item>
                    <p>MTD</p>
                    <p>{item.mtdview}</p>
                </Flex.Item>
                <Flex.Item className={item.kpi ? '' : 'hide'} >
                    <p >KPI</p>
                    <p>{item.kpi}</p>
                </Flex.Item>
                <Flex.Item>
                    <p>YTD</p>
                    <p>{item.ytd}</p>
                </Flex.Item>
            </Flex>
            <WhiteSpace size="sm" />
            <Flex className="kpi-box__each__flex" >
                <Flex.Item>
                    <p>MTD同</p>
                    <p>{item.grow}</p>
                </Flex.Item>
                <Flex.Item className={item.kpiReach ? '' : 'hide'} >
                    <p>KPI达成</p>
                    <p>{item.kpiReach}</p>
                </Flex.Item>
                <Flex.Item>
                    <p>YOY</p>
                    <p>{item.yoy}</p>
                </Flex.Item>
            </Flex>
        </Item>
    ));
};

export default class extends React.Component {
    render() {
        const state = this.props.state;
        state.eachCash = state.eachCash ? state.eachCash : [{}, {}, {}];
        state.adAllCash = state.adAllCash ? state.adAllCash : {};
        return (<div>
            {allKpiCash(state.adAllCash)}
            <List className="kpi-box__each" >
                {kpiCashEach(state)}
            </List>
        </div>);
    }
}
