/**
 * Created by Jackie.Wu on 2017/10/25.
 */
import React, {Component} from 'react'
import { ListView, List } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

const MyBody = (props)=><div className="offline-body">
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
        this.genData();
        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
            isLoading: false,
        });
    }


    render(){
        const self = this.props.self;
        const row = (rowData, sectionID, rowID) => {
            return (
                <List key={rowID} className="offline-body__row">
                    <Item onClick={self.pageLeftSwitch.bind(self, self.state.offlineMake)} className="offline-body__row__title" multipleLine>
                        <div className="offline-list-title clearfix">
                            <div className="offline-list-title__name">乙度体验馆</div>
                            <div className="offline-list-title__btn">预约</div>
                        </div>
                        <div className="offline-list-cont"><span className="offline-list-cont__span">地址:</span>长宁区安化路定西路武夷路441140弄</div>
                        <div className="offline-list-cont"><span className="offline-list-cont__span">电话:</span>13123123123</div>
                        <div className="offline-list-cont"><span className="offline-list-cont__span">联系人:</span>爱上了的</div>
                        <div className="offline-list-cont offline-list-gray"><span className="offline-list-cont__span">特别说明:</span>这次活动阿里斯顿放假啦圣诞节发生啥都离开房间</div>
                    </Item>
                </List>
            );
        };

        return <ListView ref="lv"
                         dataSource={this.state.dataSource}
                         renderBodyComponent={() => <MyBody />}
                         renderRow={row}
                         className="offline-box"
                         contentContainerStyle={{height: '100%'}}
        />
    }
}

