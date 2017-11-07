/**
 * Created by Jackie.Wu on 2017/10/25.
 */
import React, { Component } from 'react'
import { ListView, List } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

const MyBody = (props) => <div className="logo-about__box__body">
    {props.children}
</div>;

const data = [
    {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: 'Meet hotel',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: 'McDonald\'s invites you',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: 'Eat the week',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
];

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
        this.genData();
        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
            isLoading: false,
        });
    }


    render() {
        const state = this.props.self.state;
        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID} className="logo-about__box__body__row">
                    <div className="logo-about__box__body__row__title">{state.logoState.title}</div>
                    {
                        state.logoState.logoAbout.map((item, i) => {
                            return <div className="logo-about__box__body__row__content" key={i}>
                                <div className="logo-about__box__body__row__content__title">{item.title}</div>
                                {
                                    item.content.map((it, i)=>{
                                        return <div className="logo-about__box__body__row__content__cont" key={i}>{it}</div>
                                    })
                                }
                            </div>
                        })
                    }
                </div>
            );
        };

        return <div style={{ height: '100%' }} className="logo-about">
            <ListView ref="lv"
                      dataSource={this.state.dataSource}
                      renderBodyComponent={() => <MyBody />}
                      renderRow={row}
                      className="logo-about__box"
                      contentContainerStyle={{ height: '100%' }}
            />
            <div className="logo-about__img"/>
        </div>
    }
}

