/**
 * Created by Jackie.Wu on 2017/2/23.
 */
import axios from 'axios';
import { Toast } from 'antd-mobile';
import URI from 'urijs';


export default (url, method, params) =>
    new Promise((resolve, reject) => {
        const hostname = new URI(location.href).hostname();
        // 当在本地的时候 默认全部等于get请求，方便本地调试
        if (hostname === 'localhost') {
            method = 'get';
        }
        const getAndPost = method === 'get' ? axios.get(url, { params: params || {} }) : axios.post(url, params || {});
        getAndPost.then((data) => {
            resolve(data.data);
        })
            .catch((error) => {
                Toast.fail('加载失败!!!', 1);
                reject(error);
            });
    });