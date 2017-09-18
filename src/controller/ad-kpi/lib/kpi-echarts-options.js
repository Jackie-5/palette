/**
 * Created by Jackie.Wu on 2017/3/3.
 */

export default (title, data) => {
    const series = [];
    const fdate = [];
    [data.all_amount, data.cpm_amount, data.cpt_amount,data.mem_amount].forEach((item, i) => {
        let obj = {
            name: title[i],
            type: 'line',
            smooth: true,
            data: item,
        };
        series.push(obj);
    });
    data.fdate.forEach((item) => {
        fdate.push(item.split('-')[1] + '-' + item.split('-')[2]);
    });
    return {
        color: ['#fc6620', '#fae49f', '#c8dab7', '#59c4e6'],
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data: title,
            top: 20,
        },
        toolbox: {
            show: false,
        },
        grid: {
            left: '5%',
            right: '5%',
            bottom: '5%',
            containLabel: true,
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: fdate,
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: '#d3d3d3',
                    },
                },
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    // 这里让chartsY轴向里
                    textStyle: {
                        color: '#979797',
                    },
                    interval: 6,
                },
                lineStyle: {
                    color: '#ccc',
                },
            },
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    // 这里让chartsY轴向里
                    inside: true,
                    textStyle: {
                        color: '#979797',
                    },
                    formatter: (value) => (value === 0) ? 0 : `${value / 1000000}M`,
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
            },
        ],
        series: series,
    };
}