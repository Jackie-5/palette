/**
 * Created by JackieWu on 2017/12/6.
 */

export default (date)=>{
    var leave1 = (date) % (24 * 3600 * 1000);
    var leave2 = leave1 % (3600 * 1000);
    var leave3 = leave2 % (60 * 1000);
    return Math.round(leave3 / 1000);
}