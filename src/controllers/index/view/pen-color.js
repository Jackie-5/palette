/**
 * Created by Jackie.Wu on 2017/10/31.
 */

import React, { Component } from 'react'
import { ListView, Button, Grid } from 'antd-mobile';

const MyBody = (props) => {
    return <div className="pen-color-body">
        <div className="pen-color-body__color">
            {props.children}
        </div>
    </div>
};



export default class extends Component {
    constructor(props) {
        super(props);
    }


    enter(obj){
        this.pageLeftSwitch({item: this.state.leftIcon[0], pen: obj })
    }

    render() {
        const self = this.props.self;
        const row = (rowData, sectionID, rowID) => {
            return (
                <div className="pen-color-body__color__list-box" key={rowID}>
                    <div style={{ border: self.state.penColorState.color[rowID].active ? '1px solid ' + self.state.penColorState.color[rowID].value : '1px solid transparent' }}>
                        <div onClick={self.changePenColor.bind(self, rowID, 'color')}
                             className="pen-color-body__color__list-box__li"
                             style={{ backgroundColor: self.state.penColorState.color[rowID].value }}/>
                    </div>
                </div>

            );
        };
        return (
            <div style={{ height: '100%' }} className="pen-page-box">
                <Grid data={self.state.penColorState.pen}
                      className="pen-grid-box"
                      columnNum={3}
                      hasLine={true}
                      onClick={this.enter.bind(self)}
                      renderItem={(dataItem, index) =>(
                          <div className={dataItem.active ? 'pen-grid-box__list __active' : 'pen-grid-box__list'}>
                              <div className="pen-grid-box__list__item-color"
                                   style={{
                                       background: dataItem.color,
                                       transform: index === 0 || index === 3 || index === 6 ?
                                           'scale(0.6)' :
                                           index === 1 || index === 4 || index === 7 ? 'scale(0.8)' : 'scale(1)'
                                   }}>
                              </div>
                              <div className="pen-grid-box__list__item-font">{dataItem.value}</div>
                          </div>
                      )}
                />
            </div>
        );
    }
}