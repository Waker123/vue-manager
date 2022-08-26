import Mock from 'mockjs'

// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj(url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
        '"}'
    )
}

let List = []
const count = 30
const citys = Array('上海', '杭州', '苏州', '广州', '成都', '北京');



// 生成随机数据
for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            id: Mock.Random.guid(),
            cityName: citys[Mock.Random.natural(0, 5)],
            destination: citys[Mock.Random.natural(0, 5)],
            goTime: (Mock.Random.natural(0, 24, 0, 0)) + ':00',
            ticketPrice: (Mock.Random.natural(35, 60)) + '元',
            remainder: (Mock.Random.natural(0, 200, 0, 0)) + '张',
            shift: (Mock.Random.natural(1, 12)) + '次'
        }),
    )
}

// // 添加出发地和目的地
// for (let i = 0; i < count; i++) {
//     for (let j = 0; j < citys.length; j++) {
//         List[i].cityName = citys[j]
//         for()
//     }
// }



export default {


    // 返回高铁数据列表
    getHighSpeedRailList: config => {
        // 这里config.url获取的是get请求中的数据
        console.log(List)
        const { cityName, page = 1, limit = 20 } = param2Obj(config.url)
        console.log('cityName:' + cityName, 'page:' + page, '分页大小limit:' + limit)
        const mockList = List.filter(data => {
            if (cityName && data.cityName.indexOf(cityName) === -1 && data.destination.indexOf(cityName) === -1) return false
            return true
        })
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        return {
            code: 20000,
            count: mockList.length,
            list: pageList
        }
    },

    // 用于导出数据
    getHighSpeedRailDataList: () => {
        return List
    },

    createHighSpeedRail: config => {
        // console.log(config, 'ccccccccccccccc')
        // console.log(JSON.parse(config.body), 'zzzzzz')
        const { cityName, destination, goTime, ticketPrice, remainder, shift } = JSON.parse(config.body)

        List.unshift({
            id: Mock.Random.guid(),
            cityName: cityName,
            destination: destination,
            goTime: goTime,
            ticketPrice: ticketPrice,
            remainder: remainder,
            shift: shift
        })
        return {
            code: 20000,
            data: {
                message: '添加成功'
            }
        }
    },
    // 用于删除数据
    deleteHighSpeedRail: config => {
        const { id } = param2Obj(config.url)
        console.log(id, 'ssssssssssssssssssss');
        if (!id) {
            return {
                code: -999,
                message: '参数不正确'
            }
        } else {
            List = List.filter(data => data.id !== id)
            return {
                code: 20000,
                message: '删除成功'
            }
        }
    },


    // 用于更新数据
    updateHighSpeedRail: config => {
        const { id, cityName, destination, goTime, ticketPrice, remainder, shift } = JSON.parse(config.body)
        List.some(data => {
            if (data.id === id) {
                data.cityName = cityName
                data.destination = destination
                data.goTime = goTime
                data.ticketPrice = ticketPrice
                data.remainder = remainder
                data.shift = shift
                return true
            }
        })
        return {
            code: 20000,
            data: {
                message: '编辑成功'
            }
        }
    }


}