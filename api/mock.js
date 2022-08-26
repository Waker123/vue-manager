import Mock from 'mockjs'
import homeApi from './mockServerData/home'
import userApi from './mockServerData/user'
import permissionApi from './mockServerData/permission'
import ticketApi from './mockServerData/ticket'
/* 
Mock.mock( rurl, function( options ) )
记录用于生成响应数据的函数。当拦截到匹配 rurl 的 Ajax 请求时，函数 function(options) 将被执行，并把执行结果作为响应数据返回。
 */

Mock.mock('/home/getData', homeApi.getStatisticalData)

// 正则
// 新增
Mock.mock(/user\/add/, 'post', userApi.createUser)


//编辑
Mock.mock(/user\/edit/, 'post', userApi.updateUser)


Mock.mock(/user\/getUser/, 'get', userApi.getUserList)


Mock.mock(/user\/del/, 'get', userApi.deleteUser)


Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)

// 用于导出excel
Mock.mock(/user\/getExcelData/, 'post', userApi.getDataList)


Mock.mock(/ticket\/getRailData/, 'get', ticketApi.getHighSpeedRailList)


Mock.mock(/ticket\/edit/, 'post', ticketApi.updateHighSpeedRail)


Mock.mock(/ticket\/add/, 'post', ticketApi.createHighSpeedRail)


Mock.mock(/ticket\/del/, 'get', ticketApi.deleteHighSpeedRail)


Mock.mock(/ticket\/getExcelData/, 'get', ticketApi.getHighSpeedRailDataList)



//返回echarts大图标所需要的数据
Mock.mock(/home\/getMonthData/, 'get', homeApi.getMonthPersonData)

