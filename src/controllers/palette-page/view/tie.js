/**
 * Created by Jackie.Wu on 2017/10/25.
 */
import React, {Component} from 'react'
import { ListView, List } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

const MyBody = (props)=><div className="tie-body">
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
        this.genData = (length = 5) => {
            this.rowIDs['0'] = [];
            for (let jj = 0; jj < length; jj++) {
                const rowName = `S${jj}, R${jj}`;
                this.rowIDs['0'].push(rowName);
                this.dataBlob[rowName] = rowName;
            }
            // new object ref
            this.sectionIDs = ['Section 0'] ;
            this.rowIDs = [].concat(this.rowIDs);
        };

        this.state = {
            dataSource: dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
            isLoading: true,
        };
    }

    componentDidMount() {
        // simulate initial Ajax
        setTimeout(() => {
            this.genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
                isLoading: false,
            });
        }, 600);
    }


    render(){

        const row = (rowData, sectionID, rowID) => {
            return (
                <List key={rowID} className="tie-body__row">
                    <Item onClick={() => {}} className="tie-body__row__title" multipleLine>
                        <span>静夜思地方</span>
                        <Brief className="tie-body__row__title__sub-title">萨芬的</Brief>
                    </Item>
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
