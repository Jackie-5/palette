/**
 * Created by Jackie.Wu on 2017/10/24.
 */
import React from 'react';

const iconEach = self => self.state.leftIcon.map((item, i)=>(
    <div className={self.state.pageSwitch[item.link] ? 'left-icon-box left-active' : 'left-icon-box'} key={i} onClick={self.pageLeftSwitch.bind(self, item)}>
        <div className={item.font ? 'icon_font-size' : 'iconfont icon-size ' + item.icon}>{item.font ? <span>{item.font}</span> : '' }</div>
    </div>
));

export default class extends React.Component {
    render() {
        const self = this.props.self;
        return <div className="page-left-function">
            {iconEach(self)}
            <div className="page-logo" onClick={self.pageLeftSwitch.bind(self, self.state.logo)} />
        </div>
    }
}