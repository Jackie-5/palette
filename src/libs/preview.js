/**
 * Created by Jackie.Wu on 16/10/14.
 */
import Ajax from './axios';
import routerJson from '../../router-config.json';

module.exports = () => {
  for (let key of Object.keys(routerJson)){
    if (window.__page_point === key) {
      Ajax('/midas/keplerapp/common/logInsert', 'get', {
        viewPage: routerJson[key].point.name,
        type: routerJson[key].point.type
      });
    }
  }
};