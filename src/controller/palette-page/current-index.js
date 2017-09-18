/**
 * Created by Jackie.Wu on 2017/4/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createForm } from 'rc-form';
require('../../libs/preview')();

import method from './method';
import '../../less/main.less';
import './page-less.less';
import nprogress from 'nprogress';

nprogress.start();


class Render extends method {
  render() {
    return (<div className="" >

    </div>);
  }
}


ReactDOM.render(<Render />, document.getElementById('app-page'));