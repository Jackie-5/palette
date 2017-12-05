/**
 * Created by Jackie.Wu on 2017/2/23.
 */
import axios from 'axios';
import { Toast } from 'antd-mobile';
import URI from 'urijs';


export default (options = {}) =>
    new Promise((resolve, reject) => {
        const hostname = new URI(location.href).hostname();
        //if(!options.loading){
        //    Toast.loading('数据加载中',1000);
        //}
        if(!options.method){
            options.method = 'get';
        }
        // 当在本地的时候 默认全部等于get请求，方便本地调试
        if (hostname === 'localhost') {
            options.method = 'get';
            //options.url = `http://wechat.eastdoing.com${options.url}`
        }
        const getAndPost = options.method === 'get' ? axios.get(options.url, { params: options.params }) : axios.post(options.url, options.params);
        getAndPost.then((data) => {
            if(data.data.code === 0){
                resolve(data.data);
                //if(!options.loading){
                //    //Toast.hide();
                //}
            } else {
                if(data.data.code === 100){
                    location.href = data.data.msg;
                    reject(data.data.code);
                    return;
                }
                if(data.data.code === 101){
                    resolve(data.data);
                }
                if(!options.isFail){
                    Toast.fail(data.data.msg, 1);
                }

            }

        })
            .catch((error) => {
                Toast.fail('加载失败!!!', 1);
                reject(error);
            });
    });