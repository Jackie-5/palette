/**
 * Created by Jackie.Wu on 2017/10/25.
 */
import React, {Component} from 'react'
import { ListView, List, Toast } from 'antd-mobile';
import axios from '../../../libs/axios';
import pageAjax from '../../../libs/pageAjax';

const Item = List.Item;
const Brief = Item.Brief;
const NUM_SECTIONS = 1;
const NUM_ROWS_PER_SECTION = 1;

const MyBody = (props)=><div className="tie-body">
    {props.children}
</div>;

export default class extends Component {

    constructor(props) {
        super(props);
        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

        const dataSource = new ListView.DataSource({
            getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });

        this.dataBlob = {};
        this.sectionIDs = [];
        this.rowIDs = [];
        this.genData = (pIndex = 0) => {
            for (let i = 0; i < NUM_SECTIONS; i++) {
                const ii = (pIndex * NUM_SECTIONS) + i;
                const sectionName = `Section ${ii}`;
                this.sectionIDs.push(sectionName);
                this.dataBlob[sectionName] = sectionName;
                this.rowIDs[ii] = [];

                for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
                    const rowName = `S${ii}, R${jj}`;
                    this.rowIDs[ii].push(rowName);
                    this.dataBlob[rowName] = rowName;
                }
            }
            // new object ref
            this.sectionIDs = [].concat(this.sectionIDs);
            this.rowIDs = [].concat(this.rowIDs);
        };

        this.state = {
            dataSource: dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
            isLoading: true,
        };
    }

    componentDidMount() {
        const self = this.props.self;
        const state = self.state;
        // simulate initial Ajax
        axios({url : pageAjax.lectionGetList})
            .then((data) => {
                state.tieList = data.data;
                this.genData();
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
                    isLoading: false,
                });
                self.setState(state);
            });
    }


    render(){
        const self = this.props.self;
        const state = self.state;
        const row = (rowData, sectionID, rowID) => {
            return (
                <List key={rowID} className="tie-body__row">
                    {
                        state.tieList.map((item, i) => {
                            return <Item
                                key={i}
                                onClick={self.pageLeftSwitch.bind(self, self.state.leftIcon[0], {tie: item})}
                                className="tie-body__row__title"
                                multipleLine>
                                <span>{item.lectionname}</span>
                                <Brief className="tie-body__row__title__sub-title">{item.b_author}</Brief>
                            </Item>
                        })
                    }

                </List>
            );
        };

        return <ListView ref="lv"
                         dataSource={this.state.dataSource}
                         renderBodyComponent={() => <MyBody />}
                         renderRow={row}
                         className="tie-box"
                         contentContainerStyle={{height: '100%'}}
        />
    }
}

