/**
 * Created by Jackie.Wu on 2017/4/16.
 */
import React from 'react';
import { Tabs, SegmentedControl } from 'antd-mobile';
import KpiAccordion from './kpi-accordion';

const TabPane = Tabs.TabPane;

let updateFlag = true;
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            panelAccordion: [],
            selectedIndex: 0,
        };
    }

    componentWillUpdate(nextProps) {
        if (nextProps.state.queryKpi.length === 4 && updateFlag) {
            updateFlag = false;
            this.setState({
                selectedIndex: 0,
                panelAccordion: nextProps.state.queryKpi[0].subMenu.panelData[0],
            });
        }
    }

    onChange(panel) {
        const self = this;
        return (e) => {
            self.setState({
                panelAccordion: panel[e.nativeEvent.selectedSegmentIndex],
                selectedIndex: e.nativeEvent.selectedSegmentIndex
            });
        };
    }

    tabOnChange() {
        const self = this;
        return (key)=>{
            self.setState({
                panelAccordion: this.props.state.queryKpi[key].subMenu.panelData[0],
                selectedIndex: 0,
            });
        };
    }

    render() {
        return (<div className="kpi-detail" >
            <Tabs defaultActiveKey="0" onChange={this.tabOnChange()} >
                {
                    this.props.state.queryKpi.map((item, i) => {
                        return <TabPane tab={item.title} key={i} >
                            <div className="kpi-segment" >
                                <SegmentedControl
                                    selectedIndex={this.state.selectedIndex}
                                    values={item.subMenu.title}
                                    onChange={this.onChange(item.subMenu.panelData)}
                                />
                            </div>
                            <KpiAccordion data={this.state.panelAccordion} />
                        </TabPane>;
                    })
                }
            </Tabs>
        </div>);
    }
}
