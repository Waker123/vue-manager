// mock数据模拟
import Mock from 'mockjs'

// 图表数据
let List = []
let monthList = []
export default {



    getStatisticalData: () => {
        //Mock.Random.float 产生随机数100到8000之间 保留小数 最小0位 最大0位
        for (let i = 0; i < 7; i++) {
            List.push(
                Mock.mock({
                    // 模拟每日的人流量大小
                    上海线: Mock.Random.float(1000, 10000, 0, 0),
                    杭州线: Mock.Random.float(1000, 10000, 0, 0),
                    苏州线: Mock.Random.float(1000, 10000, 0, 0),
                    北京线: Mock.Random.float(1000, 10000, 0, 0),
                    成都线: Mock.Random.float(1000, 10000, 0, 0),
                    广州线: Mock.Random.float(1000, 10000, 0, 0)
                })
            )
        }

        return {
            // 状态码，2w表示正常的数据
            code: 20000,
            data: {
                dataList: List,
                // 饼图
                // 获取今日占比
                videoData: [
                    {
                        name: '上海线',
                        value: List[6]['上海线']
                    },
                    {
                        name: '杭州线',
                        value: List[6]['杭州线']
                    },
                    {
                        name: '苏州线',
                        value: List[6]['苏州线']
                    },
                    {
                        name: '北京线',
                        value: List[6]['北京线']
                    },
                    {
                        name: '成都线',
                        value: List[6]['成都线']
                    },
                    {
                        name: '广州线',
                        value: List[6]['广州线']
                    }
                ],
                // 柱状图
                userData: [
                    {
                        date: '上海线',
                        todayPerson: List[6]['上海线'],
                        addPerson: List[6]['上海线'] - List[5]['上海线']
                    },
                    {
                        date: '杭州线',
                        todayPerson: List[6]['杭州线'],
                        addPerson: List[6]['杭州线'] - List[5]['杭州线']
                    },
                    {
                        date: '苏州线',
                        todayPerson: List[6]['苏州线'],
                        addPerson: List[6]['苏州线'] - List[5]['苏州线']
                    },
                    {
                        date: '北京线',
                        todayPerson: List[6]['北京线'],
                        addPerson: List[6]['北京线'] - List[5]['北京线']
                    },
                    {
                        date: '成都线',
                        todayPerson: List[6]['成都线'],
                        addPerson: List[6]['成都线'] - List[5]['成都线']

                    },
                    {
                        date: '广州线',
                        todayPerson: List[6]['广州线'],
                        addPerson: List[6]['广州线'] - List[5]['广州线']
                    },
                ],
                // 折线图
                orderData: {
                    date: ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007'],
                    data: List
                },
                tableData: [
                    {
                        name: '上海线',
                        todayPerson: List[6]['上海线'],
                        yesterdayPerson: List[5]['上海线'],
                        monthPerson: List[5]['上海线'] * 30
                    },
                    {
                        name: '杭州线',
                        todayPerson: List[6]['杭州线'],
                        yesterdayPerson: List[5]['杭州线'],
                        monthPerson: List[5]['杭州线'] * 30
                    },
                    {
                        name: '苏州线',
                        todayPerson: List[6]['苏州线'],
                        yesterdayPerson: List[5]['苏州线'],
                        monthPerson: List[5]['苏州线'] * 30
                    },
                    {
                        name: '北京线',
                        todayPerson: List[6]['北京线'],
                        yesterdayPerson: List[5]['北京线'],
                        monthPerson: List[5]['北京线'] * 30
                    },
                    {
                        name: '成都线',
                        todayPerson: List[6]['成都线'],
                        yesterdayPerson: List[5]['成都线'],
                        monthPerson: List[5]['成都线'] * 30
                    },
                    {
                        name: '广州线',
                        todayPerson: List[6]['广州线'],
                        yesterdayPerson: List[5]['广州线'],
                        monthPerson: List[5]['广州线'] * 30
                    }
                ]
            }
        }
    },

    //获取本月人流量数据
    getMonthPersonData: () => {
        monthList.length = 0;//清空这个数组，防止这个数组不断扩大
        for (let i = 1; i < 32; i++) {
            monthList.push(
                Mock.mock([
                    // 模拟每日的人流量大小
                    `2022/5/${i}`, Mock.Random.float(1000, 10000, 0, 0), "上海线"
                ]),
                Mock.mock([
                    // 模拟每日的人流量大小
                    `2022/5/${i}`, Mock.Random.float(1000, 10000, 0, 0), "杭州线"
                ]),
                Mock.mock([
                    // 模拟每日的人流量大小
                    `2022/5/${i}`, Mock.Random.float(1000, 10000, 0, 0), "苏州线"
                ]),
                Mock.mock([
                    // 模拟每日的人流量大小
                    `2022/5/${i}`, Mock.Random.float(1000, 10000, 0, 0), "成都线"
                ]),
                Mock.mock([
                    // 模拟每日的人流量大小
                    `2022/5/${i}`, Mock.Random.float(1000, 10000, 0, 0), "北京线"
                ]),
                Mock.mock([
                    // 模拟每日的人流量大小
                    `2022/5/${i}`, Mock.Random.float(1000, 10000, 0, 0), "广州线"
                ]),

            )
        }
        return {
            code: 20000,
            data: monthList
        }
    }
}
