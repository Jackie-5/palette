/**
 * Created by Jackie.Wu on 2017/10/25.
 */
import React, { Component } from 'react'
import { ListView } from 'antd-mobile';
import axios from '../../../libs/axios';
import pageAjax from '../../../libs/pageAjax';
import ReactHtmlParser from 'react-html-parser';


const MyBody = (props) => <div className="about__box__body">
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
        this.genData = (length = 1) => {
            this.rowIDs['0'] = [];
            for (let jj = 0; jj < length; jj++) {
                const rowName = `S${jj}, R${jj}`;
                this.rowIDs['0'].push(rowName);
                this.dataBlob[rowName] = rowName;
            }
            // new object ref
            this.sectionIDs = ['Section 0'];
            this.rowIDs = [].concat(this.rowIDs);
        };

        this.state = {
            dataSource: dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
            isLoading: true,
        };
    }

    componentDidMount() {
        // simulate initial Ajax
        const self = this.props.self;
        const state = self.state;
        axios({
            url:pageAjax.lectionDetail,
            param: {
                B_id: state.defaultPage.b_id
            }
        })
            .then((data) => {
                state.aboutArticle = data.data;
                this.genData();
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
                    isLoading: false,
                });
                self.setState(state);
            });

    }

    render() {
        const state = this.props.self.state;
        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID} className="about__box__body__row">
                    <div className="about__box__body__row__title">{state.aboutArticle.lectionname}</div>
                    <div className="about__box__body__row__author">{state.aboutArticle.b_author}</div>
                    <div className="about__box__body__row__cont">{ReactHtmlParser(state.aboutArticle.b_summary)}</div>
                </div>
            );
        };

        return <ListView ref="lv"
                         dataSource={this.state.dataSource}
                         renderBodyComponent={() => <MyBody />}
                         renderRow={row}
                         className="about__box"
                         contentContainerStyle={{ height: '100%' }}
        />
    }
}

