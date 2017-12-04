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
        //const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        //const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

        //const dataSource = new ListView.DataSource({
        //    getRowData,
        //    getSectionHeaderData: getSectionData,
        //    rowHasChanged: (row1, row2) => row1 !== row2,
        //    sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        //});
        //this.dataBlob = {};
        //this.sectionIDs = [];
        //this.rowIDs = [];
        //this.genData = (length = this.props.self.state.penColorState.color.length) => {
        //    this.rowIDs['0'] = [];
        //    for (let jj = 0; jj < length; jj++) {
        //        const rowName = jj;
        //        this.rowIDs['0'].push(rowName);
        //        this.dataBlob[rowName] = rowName;
        //    }
        //    // new object ref
        //    this.sectionIDs = ['0'];
        //    this.rowIDs = [].concat(this.rowIDs);
        //};
        //
        //this.state = {
        //    dataSource: dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
        //    isLoading: true,
        //};
    }

    componentDidMount() {
        // simulate initial Ajax
        //this.genData();
        //this.setState({
        //    dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
        //    isLoading: false,
        //});
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
                {/*<ListView ref="lv"*/}
                          {/*dataSource={this.state.dataSource}*/}
                          {/*renderBodyComponent={() => <MyBody />}*/}
                          {/*renderRow={row}*/}
                          {/*className="pen-color-box"*/}
                          {/*contentContainerStyle={{ height: '100%' }}*/}
                {/*/>*/}
                {/*<div className="pen-page-box__pen">*/}
                    {/*<div className="pen-page-box__pen__box">*/}
                        {/*<div className="iconfont pen-page-box__pen__box__pen-icon icon-maobi"/>*/}
                        {/*{*/}
                            {/*self.state.penColorState.penSize.map((item, i) => <div*/}
                                {/*key={i}*/}
                                {/*className={item.active ? 'pen-page-box__pen__box__pen-size pen-page-box__pen__box__pen-size-active' : 'pen-page-box__pen__box__pen-size'}*/}
                                {/*onClick={self.changePenColor.bind(self, i, 'pen')}>*/}
                                {/*<div className="pen-page-box__pen__box__pen-size__border">*/}
                                    {/*{item.value}*/}
                                {/*</div>*/}
                            {/*</div>)*/}
                        {/*}*/}
                        {/*<div className="pen-page-box__pen__box__enter">*/}
                            {/*<Button className="pen-page-box__pen__box__enter__btn" type="ghost" size="small"*/}
                                    {/*onClick={self.pageLeftSwitch.bind(self,  {item: self.state.leftIcon[0], pen: {} })}*/}
                                    {/*inline*/}
                            {/*>提交</Button>*/}
                        {/*</div>*/}

                    {/*</div>*/}
                {/*</div>*/}

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