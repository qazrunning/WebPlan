var canvas = document.getElementById("myCanvas");
var cxt = canvas.getContext('2d');
var canWidth = cxt.canvas.clientWidth;
var init = {
    top: 32,
    spaceH: 79
};
var row2 = {
    y: init.top + init.spaceH,
    data: [{
            type: 'Step',
            text: '业务名称1',
            name: 'step_2_1',
            arrowArr: [{
                arrow: 'drawBottomToTop',
                to: 'step_3_1'
            }],
            x: '',
            y: '',
            requestData: {}
        },
        {
            type: 'Step',
            text: '业务名称2',
            name: 'step_2_2',
            arrowArr: [{
                arrow: 'drawBottomToLeft',
                to: 'step_3_2'
            }]
        },
        {
            type: 'Step',
            text: '业务名称3',
            name: 'step_2_3',
            arrowArr: [{
                arrow: 'drawBottomToRight',
                to: 'step_3_2'
            }]
        },
        {
            type: 'Step',
            name: 'step_2_4',
            text: '业务名称4',
            arrowArr: [{
                arrow: 'drawBottomToTop',
                to: 'step_6_4'
            }]
        }
    ]
};
row2.data = calChartX(canWidth, row2.data, row2.y);
var flowData = [{
        row: 1,
        y: init.top,
        data: [{
            type: 'Start',
            text: '开始',
            name: 'step_1_1',
            arrowArr: [{
                    arrow: 'drawBottomToTop',
                    to: 'step_2_1'
                },
                {
                    arrow: 'drawBottomToTop',
                    to: 'step_2_2'
                },
                {
                    arrow: 'drawBottomToTop',
                    to: 'step_2_3'
                }, {
                    arrow: 'drawBottomToTop',
                    to: 'step_2_4'
                }
            ],
            x: canWidth / 2,
            y: '',
        }]
    },
    {
        row: 2,
        y: init.top + init.spaceH,
        data: row2.data,
        method: {
            onmousemove: null,
            onmouseleave: null,
            onclick: hoverSingleChart
        }
    },
    {
        row: 3,
        y: '',
        data: [{
            type: 'Step',
            text: '业务名称488',
            x: row2.data[0].x,
            name: 'step_3_1',
            arrowArr: [{
                arrow: 'drawBottomToTop',
                to: 'step_4_1'
            }]
        }, {
            type: 'Step',
            text: '业务名称5555',
            name: 'step_3_2',
            x: canWidth / 2,
            arrowArr: [{
                arrow: 'drawBottomToTop',
                to: 'step_4_2'
            }]
        }]
    },
    {
        row: 4,
        y: '',
        data: [{
            type: 'Step',
            text: '业务名称6',
            x: row2.data[0].x,
            name: 'step_4_1',
            arrowArr: [{
                arrow: 'drawBottomToTop',
                to: 'step_5_1'
            }]
        }, {
            type: 'Step',
            text: '业务名称7',
            name: 'step_4_2',
            x: canWidth / 2,
            arrowArr: [{
                arrow: 'drawBottomToTop',
                to: 'step_5_2'
            }]
        }]
    },
    {
        row: 5,
        y: '',
        data: [{
            type: 'Step',
            text: '业务名称8',
            x: row2.data[0].x,
            name: 'step_5_1',
            arrowArr: [{
                arrow: 'drawBottomToTop',
                to: 'step_6_1'
            }]
        }, {
            type: 'Step',
            text: '业务名称9',
            name: 'step_5_2',
            x: canWidth / 2,
            arrowArr: [{
                    arrow: 'drawBottomToTop',
                    to: 'step_6_2'
                },
                {
                    arrow: 'drawBottomToTop',
                    to: 'step_6_3'
                }
            ]
        }]
    },
    {
        row: 6,
        y: '',
        data: [{
            type: 'Step',
            text: '业务名称10',
            x: row2.data[0].x,
            name: 'step_6_1',
            arrowArr: [{
                arrow: 'drawBottomToLeft',
                to: 'step_7_1'
            }]
        }, {
            type: 'Step',
            text: '业务名称11',
            name: 'step_6_2',
            x: row2.data[1].x,
            arrowArr: [{
                arrow: 'drawBottomToTop',
                to: 'step_7_1'
            }]
        }, {
            type: 'Step',
            text: '业务名称12',
            name: 'step_6_3',
            x: row2.data[2].x,
            arrowArr: [{
                arrow: 'drawBottomToTop',
                to: 'step_7_1'
            }]
        }, {
            type: 'Step',
            text: '业务名64',
            name: 'step_6_4',
            x: row2.data[3].x,
            arrowArr: [{
                arrow: 'drawBottomToTop',
                to: 'step_7_1'
            }]
        }]
    },
    {
        row: 7,
        y: init.top + init.spaceH * 6 + 10,
        data: [{
            type: 'Condition',
            text: '判断条件',
            x: canWidth / 2,
            name: 'step_7_1',
            arrowArr: [{
                arrow: 'drawBottomToTop',
                to: 'step_8_1'
            }]
        }]
    },
    {
        row: 8,
        y: init.top + init.spaceH * 7 + 30,
        isAverage: true, //平均计算x
        data: [{
                type: 'Step',
                text: '业务名称12',
                name: 'step_8_1',
                arrowArr: [{
                    arrow: 'drawRightToLeft',
                    to: 'step_8_2'
                }],
                requestData: {},
                method: {
                    onmousemove: null,
                    onmouseleave: null,
                    onclick: null
                }
            },
            {
                type: 'Step',
                text: '业务名称4',
                name: 'step_8_2',
                arrowArr: [{
                    arrow: 'drawRightToLeft',
                    to: 'step_8_3'
                }]
            },
            {
                type: 'Step',
                text: '业务名称4',
                name: 'step_8_3',
                arrowArr: [{
                    arrow: 'drawRightToLeft',
                    to: 'step_8_4'
                }]
            },
            {
                type: 'Step',
                name: 'step_8_4',
                text: '业务名称4',
                arrowArr: [{
                    arrow: 'drawRightToLeft',
                    to: 'step_8_5'
                }]
            },
            {
                type: 'Step',
                name: 'step_8_5',
                text: '业务名称4',
                arrowArr: [{
                    arrow: 'drawRightToLeft',
                    to: 'step_8_6'
                }]
            },
            {
                type: 'Step',
                name: 'step_8_6',
                text: '业务名称4',
                arrowArr: [{
                    arrow: 'drawBottomToTop',
                    to: 'step_9_1'
                }]
            }
        ]
    },
    {
        row: 9,
        y: init.top + init.spaceH * 8 + 30,
        isAverage: true,
        data: [{
                type: 'Step',
                text: '业务名称455',
                name: 'step_9_1',
                arrowArr: [{
                    arrow: 'drawRightToLeft',
                    to: 'step_9_2'
                }],
                requestData: {},
                method: {
                    onmousemove: null,
                    onmouseleave: null,
                    onclick: hoverSingleChart
                }
            },
            {
                type: 'Step',
                text: '业务名称4',
                name: 'step_9_2',
                arrowArr: [{
                    arrow: 'drawRightToLeft',
                    to: 'step_9_3'
                }]
            },
            {
                type: 'Step',
                text: '业务名称4',
                name: 'step_9_3',
                arrowArr: [{
                    arrow: 'drawRightToLeft',
                    to: 'step_9_4'
                }]
            },
            {
                type: 'Step',
                name: 'step_9_4',
                text: '业务名称4',
                arrowArr: [{
                    arrow: 'drawRightToLeft',
                    to: 'step_9_5'
                }]
            },
            {
                type: 'End',
                name: 'step_9_5',
                text: '结束',
                arrowArr: []
            }
        ]
    }
];
// 第一行 定起始点 第二行定开始位 第三行y就不用管了
let colorStyle={
    bgColor:'#da45dc',
    fontColor:"#fff"
}
drawFlowChart(cxt, canvas, flowData, init.top, init.spaceH,colorStyle);


function hoverSingleChart(singleData) {
    console.log("---------鼠标事件-----------");
    console.log(singleData);
}