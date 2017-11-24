/**
 * Created by Jackie.Wu on 2017/10/24.
 */
import React from 'react';
import copy from 'clone';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.beginWrite = false;
    }

    componentDidMount() {
        this.props.self.subCanvas(this);
    }

    initCanvas(options = {}) {
        const self = this.props.self;
        this.beginWrite = false;
        try {
            this.refs.writeCanvas.width = this.refs.canvasBox.offsetWidth;
            this.refs.writeCanvas.height = this.refs.canvasBox.offsetHeight;
            this.refs.bgCanvas.width = this.refs.writeCanvas.width;
            this.refs.bgCanvas.height = this.refs.writeCanvas.height;
            this.writeCtx = this.refs.writeCanvas.getContext("2d");
            this.bgCtx = this.refs.bgCanvas.getContext("2d");
            this.penSize = self.state.defaultPage.fontsize || 10;
            this.canvasColor = self.state.defaultPage.color || '#000';
            this.fontWidth = 320;
            this.moveSum = 0;
            this.penmanship = [];
            this.canvasPos = this.refs.writeCanvas.getBoundingClientRect();
        } catch (e) {

        }
    }

    canvasTouchStart(e) {
        const self = this;
        //const x = e.touches[0].pageX - this.canvasPos.left + (document.querySelector('.page-left-function').offsetWidth / 2);
        const x = e.touches[0].pageX - this.canvasPos.left;
        const y = e.touches[0].pageY - this.canvasPos.top;

        self.stroke = {
            newDate: new Date,
            d: [
                {
                    x: x,
                    y: y,
                    t: 0
                }],
            c: self.canvasColor,
            p: self.penSize
        };
        this.canvasTouchMoveBegin(x, y);
        e.preventDefault()
    }

    canvasTouchMoveBegin(x, y) {
        this.beginWrite = true;
        this.writeCtx.save();
        this.writeCtx.moveTo(x, y);
        this.preDot = null;
        this.moveQueue = [];
        this.firstMove = 0;
        this.lineWidth = this.penSize / 2 * (this.fontWidth / 320);
        this.canvasMoving(x, y)
    }

    canvasTouchMoveEnd(d) {
        var e = this;
        e.penmanship.length ? e.stroke.newDate -= e.penmanshipTime :
            (e.penmanshipTime = e.stroke.newDate,
                e.stroke.newDate = e.stroke.newDate.getTime()),
            e.penmanship.push(e.stroke),
            e._clearQueue = null,
            e.repeatQueue = [],
            e.stroke = null;
        --this.writeCtx.lineWidth;
        for (var b; this.moveQueue.length;)b = this.moveQueue.shift(), this.actionPaint(b, this.fontWidth / 320 * this.penSize / 8);
        this.showToCanvas()
    }

    showToCanvas() {
        this.bgCtx.clearRect(0, 0, this.refs.writeCanvas.width, this.refs.writeCanvas.height);
        const b = this.writeCtx.getImageData(0, 0, this.refs.writeCanvas.width, this.refs.writeCanvas.height);
        for (var c = 0; c < b.data.length; c += 4) 0 != b.data[c + 3] && (b.data[c] = 100, b.data[c + 1] = 30, b.data[c + 2] = 7, b.data[c + 3] = Math.round(.75 * b.data[c + 3]))
        this.bgCtx.putImageData(b, -5 * 0.5, 5 * 0.5)
    }

    canvasTouchMove(e) {
        const self = this;
        //const x = e.touches[0].pageX - this.canvasPos.left + (document.querySelector('.page-left-function').offsetWidth / 2);
        const x = e.touches[0].pageX - this.canvasPos.left;
        const y = e.touches[0].pageY - this.canvasPos.top;
        this.stroke.d.push(
            {
                x: x,
                y: y,
                moveDate: new Date - self.stroke.newDate
            });
        this.canvasMoving(x, y);
    }

    canvasMoving(b, c) {
        var d;
        d = 0;
        if (this.moveQueue.length && (d = this.moveQueue[this.moveQueue.length - 1], d = Math.sqrt((d.x - b) * (d.x - b) + (d.y - c) * (d.y - c)), 0 == d))return;
        this.moveSum++;
        !this.firstMove && 2 == this.moveQueue.length && 4 * d < this.moveQueue[1].c && (this.moveQueue[0].x -=
            2 / 3 * (this.moveQueue[0].x - this.moveQueue[1].x), this.moveQueue[0].y -= 2 / 3 * (this.moveQueue[0].y - this.moveQueue[1].y), this.moveQueue[1].c /= 2 / 3 * this.moveQueue[1].c);
        d = { x: b, y: c, c: d };
        this.moveQueue.push(d);
        3 <= this.moveQueue.length && (d = this.moveQueue.shift(), this.actionPaint(d))
    }

    actionPaint(b, c) {
        var d = b.x, e = b.y, h = b.c;
        if (!this.preDot || 0 !== h) {
            this.nextDot = this.moveQueue.length ? this.moveQueue[0] : null;
            if (h) {
                this.writeCtx.moveTo(this.preDot.x, this.preDot.y);
                var f = 0;
                !this.firstMove && this.nextDot && h > 3 * this.nextDot.c &&
                (h /= 4, f = 1);
                this.firstMove = 1;
                var bs = this.fontWidth / 320 * this.penSize;
                c || (c = h < .003125 * this.fontWidth ? 1.625 * bs : h < .00625 * this.fontWidth ? 1.375 * bs : h < .009375 * this.fontWidth ? 1.25 * bs : h < .015625 * this.fontWidth ? 1.125 * bs : h < .021875 * this.fontWidth ? bs : h < .028125 * this.fontWidth ? .875 * bs : h < .034375 * this.fontWidth ? .75 * bs : h < .046875 * this.fontWidth ? .625 * bs : h < .0625 * this.fontWidth ? .5 * bs : .375 * bs);
                this.toLW = c;
                if (f)for (f = 1; 3 >= f; f++)this.paintDot(d + f / 3 * (this.preDot.x - d), e + f / 3 * (this.preDot.y - e), h)
            }
            this.paintDot(d, e, h);
            this.preDot = b;
        }
    }

    paintDot(b, c, d) {
        var e = this.lineWidth, h = this.canvasColor;
        this.writeCtx.fillStyle = h;
        this.writeCtx.strokeStyle = h;
        if (this.preDot) {
            d = Math.floor(Math.abs(d) / (this.lineWidth / 3));
            if (1 < d)for (var e = this.lineWidth,
                               f = 0; f < d; f++)e -= (e - this.toLW) / (8 < d ? d : 8); else Math.abs(this.lineWidth - this.toLW) > this.fontWidth / 320 * this.penSize * .025 && (e = this.lineWidth - (this.lineWidth - this.toLW) / 8);
            var g = this.lineWidth * Math.sin(Math.atan((c - this.preDot.y) / (b - this.preDot.x))),
                k = this.lineWidth * Math.cos(Math.atan((c - this.preDot.y) / (b - this.preDot.x))),
                l = e * Math.sin(Math.atan((c - this.preDot.y) / (b - this.preDot.x))),
                m = e * Math.cos(Math.atan((c - this.preDot.y) / (b - this.preDot.x)));
            d = this.preDot.x + g;
            var f = this.preDot.y - k, g = this.preDot.x - g, k = this.preDot.y +
                k, n = b + l, p = c - m, l = b - l, m = c + m;
            this.writeCtx.beginPath();
            this.writeCtx.moveTo(d, f);
            this.writeCtx.lineTo(g, k);
            this.writeCtx.lineTo(l, m);
            this.writeCtx.lineTo(n, p);
            this.writeCtx.fill();
            this.writeCtx.closePath();
            this.writeCtx.fillStyle = h;
            this.writeCtx.lineWidth = this.lineWidth = e
        }
        this.writeCtx.beginPath();
        this.writeCtx.lineWidth = this.lineWidth = e;
        this.writeCtx.arc(b, c, this.lineWidth, 0, 2 * Math.PI);
        this.writeCtx.fill();
        this.writeCtx.closePath()
    }

    clearCanvas() {
        this.beginWrite = false;
        this.writeCtx.clearRect(0, 0, this.refs.writeCanvas.width, this.refs.writeCanvas.height);
        this.bgCtx.clearRect(0, 0, this.refs.writeCanvas.width, this.refs.writeCanvas.height);
    }

    canvasToBase() {
        var image = new Image();
        this.writeCtx.drawImage(image, 0, 0, this.refs.writeCanvas.width, this.refs.writeCanvas.height);
        return this.refs.writeCanvas.toDataURL("image/png");
    }


    stopAndPlayMusic(e) {
        e && e.stopPropagation();
        const state = copy(this.state);
        state.isMusic = !state.isMusic;
        if (state.isMusic) {
            this.refs.audio.play()
        } else {
            this.refs.audio.pause()
        }
        this.setState(state)
    }

    render() {
        const self = this.props.self;
        const { indexData, allNumber, currentNumber } = self.state.indexState;
        return <div className="canvas-index">
            <div className="canvas-switch canvas-top" onClick={self.prevFont.bind(self)}>
                <div className="canvas-text">
                    <div>{currentNumber <= 0 ? '' : indexData[currentNumber - 1].pinyin}</div>
                    <div>{currentNumber <= 0 ? '' : indexData[currentNumber - 1].chinese}</div>
                </div>
                <div
                    className="canvas-number">{ currentNumber + 1 }/{ allNumber + 1 }</div>
                <div className="canvas-top-icon iconfont icon-TMS_yinlefuhao"
                     onClick={this.stopAndPlayMusic.bind(self)}>
                    <div className={self.state.isMusic ? '' : 'canvas-top-icon-stop iconfont icon-jinzhi'}/>
                </div>
                <div className="canvas-images">
                    <img src={currentNumber <= 0 ? '' : indexData[currentNumber - 1].imgurl} alt=""/>
                </div>
            </div>
            <div className="canvas-box" ref="canvasBox">
                <div className="canvas-text">
                    <div>{indexData[currentNumber].pinyin}</div>
                    <div>{indexData[currentNumber].chinese}</div>
                </div>
                <canvas ref="writeCanvas"
                        onTouchStart={this.canvasTouchStart.bind(this)}
                        onTouchMove={this.canvasTouchMove.bind(this)}
                        onTouchEnd={this.canvasTouchMoveEnd.bind(this)}
                        style={{ position: 'absolute', top: 0, left: 0, zIndex: 9 }}/>
                <canvas ref="bgCanvas"/>
                <img src={indexData[currentNumber].imgurl} alt="" className="canvas-images canvas-img-middle"/>
            </div>
            <div className="canvas-switch canvas-bottom" onClick={self.nextFont.bind(self)}>
                <div className="canvas-text">
                    <div>{currentNumber >= allNumber ? '' : indexData[currentNumber + 1].pinyin}</div>
                    <div>{currentNumber >= allNumber ? '' : indexData[currentNumber + 1].chinese}</div>
                </div>
                <div className="canvas-images">
                    <img src={currentNumber >= allNumber ? '' : indexData[currentNumber + 1].imgurl} alt=""/>
                </div>
            </div>
            <div className="canvas-bottom-icon about-current iconfont icon-i1"
                 onClick={self.pageLeftSwitch.bind(self, self.state.aboutCurrent)}/>
            <div className="canvas-bottom-icon hope-icon iconfont icon-wodeqifu"
                 onClick={self.pageLeftSwitch.bind(self, self.state.hope)}/>
        </div>
    }
}