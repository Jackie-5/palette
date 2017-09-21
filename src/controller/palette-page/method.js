/**
 * Created by Jackie.Wu on 2017/4/16.
 */

import React from 'react';
import initState from './init-state';

function Handwriting(id, test1) {
    this.canvas = id;
  this.canvas.width = document.body.clientWidth;
  this.canvas.height = document.body.clientHeight;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.fillStyle = "rgba(0,0,0,0.25)";
    var _this = this;
    this.canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        _this.downEvent(e)
    });
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
        _this.moveEvent(e)
    });
    this.canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
        _this.upEvent(e)
    });
    this.moveFlag = false;
    this.upof = {};
    this.radius = 0;
    this.has = [];
    this.lineMax = 20;
    this.lineMin = 10;
    this.linePressure = 1;
    this.smoothness = 80;
}

Handwriting.prototype.clear = function () {
    var self = this;
  return ()=>{
    self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
  }

}

Handwriting.prototype.downEvent = function (e) {
    this.moveFlag = true;
    this.upof = this.getXY(e);
    this.has = [
        { time: new Date().getTime(), dis: this.distance(this.upof, this.upof) }
    ];

}

Handwriting.prototype.moveEvent = function (e) {
    if (!this.moveFlag)
        return;
    var of = this.getXY(e);
    var up = this.upof;
    var ur = this.radius;
    this.has.unshift({ time: new Date().getTime(), dis: this.distance(up, of) });
    var dis = 0;
    var time = 0;
    for (var n = 0; n < this.has.length - 1; n++) {
        dis += this.has[n].dis;
        time += this.has[n].time - this.has[n + 1].time;
        if (dis > this.smoothness)
            break;
    }
    var or = Math.min(time / dis * this.linePressure + this.lineMin, this.lineMax) / 2;
    this.radius = or;
    this.upof = of;
  //if (this.has.length<=2)
  //  return;
    var len = Math.round(this.has[0].dis / 2) + 1;
    for (var i = 0; i < len; i++) {
        var x = up.x + (of.x - up.x) / len * i;
        var y = up.y + (of.y - up.y) / len * i;
        var r = ur + (or - ur) / len * i;
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI, true);
        this.ctx.fill();
    }
}

Handwriting.prototype.upEvent = function (e) {
    this.moveFlag = false;
}

Handwriting.prototype.getXY = function (e) {
    return {
        x: e.targetTouches[0].pageX,
        y: e.targetTouches[0].pageY
    }
}

Handwriting.prototype.distance = function (a, b) {
    var x = b.x - a.x, y = b.y - a.y;
    return Math.sqrt(x * x + y * y);
}

export default class method extends React.Component {
    constructor(props) {
        super(props);
        this.state = initState;
    }

    clear(){
        //return this.hw.clear()
    }

    componentDidMount() {
        var hw = new Handwriting(this.refs.test);

      this.refs.test1.onclick = hw.clear()
        //hw.lineMax = 40;
        //hw.lineMin = 5;
        //hw.linePressure = 1;
        //hw.smoothness = 100;
    }

};
