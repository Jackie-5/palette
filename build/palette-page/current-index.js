webpackJsonp([0],{172:function(n,t,e){"use strict";function o(n){return n&&n.__esModule?n:{default:n}}function r(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function i(n,t){if(!n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?n:t}function a(n,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(n,t):n.__proto__=t)}var s=function(){function n(n,t){for(var e=0;e<t.length;e++){var o=t[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}return function(t,e,o){return e&&n(t.prototype,e),o&&n(t,o),t}}(),c=e(48),f=o(c),u=e(81),l=o(u),p=e(82),h=o(p);e(84),e(83);var d=e(80),g=(o(d),function(n){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,n),s(t,[{key:"render",value:function(){return f.default.createElement("div",{className:"",style:{width:"100%",height:"100%"}},f.default.createElement("canvas",{ref:"test",className:"canvasBg"}),f.default.createElement("div",{className:"",ref:"test1",style:{width:100,height:30,background:"",color:"#fff"},onClick:this.clear}," 点击清除"))}}]),t}(h.default));l.default.render(f.default.createElement(g,null),document.getElementById("app-page"))},173:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={color:"green"}},174:function(n,t,e){t=n.exports=e(23)(),t.push([n.i,"/* Make clicks pass-through */\n#nprogress {\n  pointer-events: none;\n}\n\n#nprogress .bar {\n  background: #29d;\n\n  position: fixed;\n  z-index: 1031;\n  top: 0;\n  left: 0;\n\n  width: 100%;\n  height: 2px;\n}\n\n/* Fancy blur effect */\n#nprogress .peg {\n  display: block;\n  position: absolute;\n  right: 0px;\n  width: 100px;\n  height: 100%;\n  box-shadow: 0 0 10px #29d, 0 0 5px #29d;\n  opacity: 1.0;\n\n  -webkit-transform: rotate(3deg) translate(0px, -4px);\n      -ms-transform: rotate(3deg) translate(0px, -4px);\n          transform: rotate(3deg) translate(0px, -4px);\n}\n\n/* Remove these to get rid of the spinner */\n#nprogress .spinner {\n  display: block;\n  position: fixed;\n  z-index: 1031;\n  top: 15px;\n  right: 15px;\n}\n\n#nprogress .spinner-icon {\n  width: 18px;\n  height: 18px;\n  box-sizing: border-box;\n\n  border: solid 2px transparent;\n  border-top-color: #29d;\n  border-left-color: #29d;\n  border-radius: 50%;\n\n  -webkit-animation: nprogress-spinner 400ms linear infinite;\n          animation: nprogress-spinner 400ms linear infinite;\n}\n\n.nprogress-custom-parent {\n  overflow: hidden;\n  position: relative;\n}\n\n.nprogress-custom-parent #nprogress .spinner,\n.nprogress-custom-parent #nprogress .bar {\n  position: absolute;\n}\n\n@-webkit-keyframes nprogress-spinner {\n  0%   { -webkit-transform: rotate(0deg); }\n  100% { -webkit-transform: rotate(360deg); }\n}\n@keyframes nprogress-spinner {\n  0%   { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n\n",""])},175:function(n,t,e){t=n.exports=e(23)(),t.push([n.i,".canvasBg {\n  background: url("+e(181)+") #969896 no-repeat center;\n}\n",""])},176:function(n,t,e){t=n.exports=e(23)(),t.i(e(174),""),t.i(e(177),""),t.push([n.i,'html {\n  width: 100%;\n  height: 100%;\n}\nbody {\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  color: rgba(0, 0, 0, 0.7);\n}\na {\n  color: rgba(0, 0, 0, 0.7);\n}\na:hover {\n  color: rgba(0, 0, 0, 0.7);\n}\na:active {\n  color: rgba(0, 0, 0, 0.7);\n}\na:visited {\n  color: rgba(0, 0, 0, 0.7);\n}\n.clearfix {\n  zoom: 1;\n}\n.clearfix::before,\n.clearfix::after {\n  content: " ";\n  clear: both;\n  display: block;\n  height: 0;\n}\np {\n  margin: 0;\n  padding: 0;\n}\n.hide {\n  display: none!important;\n}\n.show {\n  display: block!important;\n}\n.orange {\n  color: #ff5b05 !important;\n}\n.green {\n  color: #090 !important;\n}\n.time-bar-box {\n  height: 0.5rem;\n  background: #f0f0f0;\n  font-size: 0.24rem;\n}\n.time-bar-box .time-middle {\n  text-align: center;\n  line-height: 0.5rem;\n}\n.time-bar-box .time-middle .name {\n  float: left;\n  margin-left: 1rem;\n}\n.time-bar-box .time-middle .time {\n  float: right;\n  margin-right: 1rem;\n}\n',""])},177:function(n,t,e){t=n.exports=e(23)(),t.push([n.i,'\n@font-face {font-family: "iconfont";\n  src: url('+e(78)+"); /* IE9*/\n  src: url("+e(78)+"#iefix) format('embedded-opentype'), \n  url("+e(180)+") format('woff'), \n  url("+e(179)+") format('truetype'), \n  url("+e(178)+'#iconfont) format(\'svg\'); /* iOS 4.1- */\n}\n\n.iconfont {\n  font-family:"iconfont" !important;\n  font-size:16px;\n  font-style:normal;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.icon-jiantou1:before { content: "\\E66C"; }\n\n.icon-jiantou:before { content: "\\E601"; }\n\n.icon-chevron-copy-copy-copy:before { content: "\\E621"; }\n\n.icon-guanjunhuojiang-copy:before { content: "\\E600"; }\n\n',""])},178:function(n,t){n.exports="/images/iconfont.bc863a882482cadd0bec1dce7eae5fff.svg"},179:function(n,t){n.exports="/images/iconfont.9246e9cec5569b81aa8ad70851d4fbed.ttf"},180:function(n,t){n.exports="/images/iconfont.3e2ca941de0be8056be6925710f2b3fc.woff"},181:function(n,t){n.exports="/images/1A5DBF177125F1E1AFCE9EF90D123C49.1a5dbf177125f1e1afce9ef90d123c49.png"},78:function(n,t){n.exports="/images/iconfont.b78c39d0a020bc305b712ac1d9c73497.eot"},82:function(n,t,e){"use strict";function o(n){return n&&n.__esModule?n:{default:n}}function r(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function i(n,t){if(!n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?n:t}function a(n,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(n,t):n.__proto__=t)}function s(n,t){this.canvas=n,this.canvas.width=document.body.clientWidth,this.canvas.height=document.body.clientHeight,this.ctx=this.canvas.getContext("2d"),this.ctx.fillStyle="rgba(0,0,0,0.25)";var e=this;this.canvas.addEventListener("touchstart",function(n){n.preventDefault(),e.downEvent(n)}),this.canvas.addEventListener("touchmove",function(n){n.preventDefault(),e.moveEvent(n)}),this.canvas.addEventListener("touchend",function(n){n.preventDefault(),e.upEvent(n)}),this.moveFlag=!1,this.upof={},this.radius=0,this.has=[],this.lineMax=20,this.lineMin=10,this.linePressure=1,this.smoothness=80}Object.defineProperty(t,"__esModule",{value:!0});var c=function(){function n(n,t){for(var e=0;e<t.length;e++){var o=t[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}return function(t,e,o){return e&&n(t.prototype,e),o&&n(t,o),t}}(),f=e(48),u=o(f),l=e(173),p=o(l);s.prototype.clear=function(){var n=this;return function(){n.ctx.clearRect(0,0,n.canvas.width,n.canvas.height)}},s.prototype.downEvent=function(n){this.moveFlag=!0,this.upof=this.getXY(n),this.has=[{time:(new Date).getTime(),dis:this.distance(this.upof,this.upof)}]},s.prototype.moveEvent=function(n){if(this.moveFlag){var t=this.getXY(n),e=this.upof,o=this.radius;this.has.unshift({time:(new Date).getTime(),dis:this.distance(e,t)});for(var r=0,i=0,a=0;a<this.has.length-1&&(r+=this.has[a].dis,i+=this.has[a].time-this.has[a+1].time,!(r>this.smoothness));a++);var s=Math.min(i/r*this.linePressure+this.lineMin,this.lineMax)/2;this.radius=s,this.upof=t;for(var c=Math.round(this.has[0].dis/2)+1,f=0;f<c;f++){var u=e.x+(t.x-e.x)/c*f,l=e.y+(t.y-e.y)/c*f,p=o+(s-o)/c*f;this.ctx.beginPath(),this.ctx.arc(u,l,p,0,2*Math.PI,!0),this.ctx.fill()}}},s.prototype.upEvent=function(n){this.moveFlag=!1},s.prototype.getXY=function(n){return{x:n.targetTouches[0].pageX,y:n.targetTouches[0].pageY}},s.prototype.distance=function(n,t){var e=t.x-n.x,o=t.y-n.y;return Math.sqrt(e*e+o*o)};var h=function(n){function t(n){r(this,t);var e=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,n));return e.state=p.default,e}return a(t,n),c(t,[{key:"clear",value:function(){}},{key:"componentDidMount",value:function(){var n=new s(this.refs.test);this.refs.test1.onclick=n.clear()}}]),t}(u.default.Component);t.default=h},83:function(n,t,e){var o=e(175);"string"==typeof o&&(o=[[n.i,o,""]]);e(79)(o,{});o.locals&&(n.exports=o.locals)},84:function(n,t,e){var o=e(176);"string"==typeof o&&(o=[[n.i,o,""]]);e(79)(o,{});o.locals&&(n.exports=o.locals)}},[172]);