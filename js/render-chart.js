const renderPieChart = () => {
    var dataSet = [];

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"project":"CDD ECONOMIC SEEFOR_FINAL","state":"edo","lga":"esan_central","col1":"group_qm9ug76/CROP_PRODUCTION","col2":false,"col3":false});

var requestOptions = {
method: 'POST',
headers: myHeaders,
body: raw,
redirect: 'follow'
};

fetch("https://data4gov.pythonanywhere.com/compute_columns", requestOptions)
.then(response => response.json())
.then(result => {
    let distribution = JSON.parse(result.response.content.data.distribution);
    console.log(distribution)
    let dataset = [];
    let keys = [];
    for (const item in distribution) {
        console.log(item);
        let obj = {}
        obj['value'] = distribution[item];
        obj['name'] = item;
        dataset.push(obj);
        keys.push(item);
    }

    return {'dataset':dataset, 'keys':keys};
    })
    .then(dataset => {
        console.log(dataset.dataset[0].cassava );
        var chartliexample20 = echarts.init(document.getElementById('pieChart13'));
var data = dataset.dataset;
option = {
    backgroundColor: '',
    title: {
        text: '',
        subtext: '',
        x: 'center',
        y: 'center',
        textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#fff'
        }
    },
    tooltip: {
        show: true,
        trigger: 'item',
        formatter: "{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'horizontal',
        bottom: '0%',
        data: dataset.keys,
        itemGap: 20,
        color: '#fff'
    },
    series: [{
        type: 'pie',
        selectedMode: 'single',
        radius: ['35%', '58%'],
        color: ['#F25F5C', '#FFE066', '#247BA0', '#70C1B3', '#F77F00'],

        label: {
            normal: {
                position: 'inner',
                formatter: '{d}%',

                textStyle: {
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 14
                }
            }
        },
        labelLine: {
            normal: {
                show: false
            }
        },
        data: data
    }, {
        type: 'pie',
        radius: ['58%', '80%'],
        itemStyle: {
            normal: {
                color: '#8F2D56'
            },
            emphasis: {
                color: '#F2F2F2'
            }
        },
        label: {
            normal: {
                position: 'inner',
                formatter: '{c}',
                textStyle: {
                    color: '#FFF',
                    fontWeight: 'bold',
                    fontSize: 14
                }
            },
            emphasis: {
                
                textStyle: {
                    color: '#5E548E',
                    fontWeight: 'bold',
                    fontSize: 14
             
                }
            },

        },
     
        data: data
    }]
};
chartliexample20.setOption(option);
    })
.catch(error => console.log('error', error));
}

renderPieChart();