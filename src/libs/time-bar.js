/**
 * Created by Jackie.Wu on 2017/2/22.
 */
import React from 'react';

export default class extends React.Component {
    render() {
        return (<div className="time-bar-box" >
            <div className="time-middle" >
                {
                    this.props.buName ?
                        <div>
                            <div className="name" >{this.props.buName}</div>
                            <div className="time" >{this.props.queryDate}</div>
                        </div>
                        :
                        this.props.queryDate
                }
            </div>
        </div>);
    }
}