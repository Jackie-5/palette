/**
 * Created by a on 2017/5/10.
 */
export default (dateRatio, bgList, act, buList) => {
    const arr = [];
    bgList.forEach((item) => {
        // 如果是有bg的 那么先做bg循环
        const data = {
            list: [],
        };
        act.forEach((it) => {
            if (item.id === it.buType) {
                data.name = item.name;
                data.cash = it.cash;
                data.kpi = it.kpi;
                data.progressColor = it.cashRatio >= dateRatio ? 'orange' : 'blue';
                data.cashRatioValue = it.cashRatio === 'NaN' ? '' : `${it.cashRatio}%`;
                data.cashRatio = it.cashRatio;
                data.notKpi = it.cashRatio !== 'NaN';
                // console.log(typeof it.cashRatio)
                // console.log(typeof dateRatio)
                data.kpiProgressColor = JSON.parse(Math.floor(it.cashRatio === 'NaN' ? 0 : it.cashRatio)) >= JSON.parse(Math.floor(dateRatio === 'NaN' ? 0 : dateRatio)) ? 'kpi-progress-orange' : 'kpi-progress-green';
                data.dateRatio = dateRatio;
            }
        });
        if (buList) {
            buList.forEach((buIt) => {
                // 如果有bu 那么去做bu的循环并且对应到每个bg下
                if (item.id === buIt.fatherId) {
                    let obj = {
                        name: buIt.name
                    };
                    act.forEach((it) => {
                        if (buIt.id === it.buType) {
                            obj.cash = it.cash;
                            obj.kpi = it.kpi;
                            obj.progressColor = it.cashRatio >= dateRatio ? 'orange' : 'blue';
                            obj.cashRatioValue = it.cashRatio === 'NaN' ? '' : `${it.cashRatio}%`;
                            obj.cashRatio = it.cashRatio;
                            obj.notKpi = it.cashRatio !== 'NaN';
                            obj.kpiProgressColor = JSON.parse(Math.floor(it.cashRatio === 'NaN' ? 0 : it.cashRatio)) >= JSON.parse(Math.floor(dateRatio === 'NaN' ? 0 : dateRatio)) ? 'kpi-progress-orange' : 'kpi-progress-green';
                            obj.dateRatio = dateRatio;
                        }
                    });
                    data.list.push(obj)
                }
            });
        }
        arr.push(data);
    });
    return arr;
}