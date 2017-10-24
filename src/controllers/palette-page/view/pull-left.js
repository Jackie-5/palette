/**
 * Created by Jackie.Wu on 2017/10/24.
 */
import React from 'react';

const iconEach = self => self.state.leftIcon.map((item, i)=>(
    <div className="left-icon-box" key={i} onClick={self.pageLeftSwitch.bind(self, item)}>
        <div className={item.font ? 'icon_font-size' : 'iconfont icon-size ' + item.icon}>{item.font ? <div className="">{item.font}</div> : '' }</div>
    </div>
));

export default class extends React.Component {
    render() {
        return <div className="page-left-function">
            {iconEach(this.props.self)}
            <div className="page-logo" />
        </div>
    }
}