// 接口请求都会写在这个里面
import axios from "./axios";
export const getMenu = (params) => {
    return axios.request({
        url: '/permission/getMenu',
        method: 'post',
        data: params
    })
}

export const getData = () => {
    return axios.request({
        // 这个url是通过mock模拟出来的
        url: '/home/getData'
    })
}


export const getUser = (params) => {
    return axios.request({
        url: '/user/getUser',
        method: 'get',
        params
    })
}


export const getExcelData = () => {
    return axios.request({
        url: '/user/getExcelData',
        method: 'post'
    })
}

// 注意get方法不要写data post方法要写data 就是post用data，get用params!!!!!!!!!!!!!!!!!!!!!
export const getRailData = (params) => {
    return axios.request({
        url: '/ticket/getRailData',
        method: 'get',
        params
    })
}

export const updateRailData = (params) => {
    return axios.request({
        url: '/ticket/edit',
        method: 'post',
        data: params
    })
}


export const addRailData = (params) => {
    return axios.request({
        url: '/ticket/add',
        method: 'post',
        data: params
    })
}


export const delRailData = (params) => {
    return axios.request({
        url: 'ticket/del',
        method: 'get',
        params
    })
}

export const getRailExcelData = () => {
    return axios.request({
        url: 'ticket/getExcelData',
        method: 'get',
    })
}


export const getMonthData = () => {
    return axios.request({
        url: 'home/getMonthData',
        method: 'get'
    })
}