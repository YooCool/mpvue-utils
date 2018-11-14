// 封装request请求
import { host } from './config'

function request(url, method, data, header = {}) {
  wx.showLoading({
    title: '加载中'
  })
  let baseURL = host
  if ((url.indexOf('http://') > -1) || (url.indexOf('https://') > -1)) {
    baseURL = ''
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          wx.showToast({
            title: '抱歉！服务器开小差了，请稍后再试',
            icon: 'none',
            duration: 3000
          })
          reject(false)
        }
      },
      fail: function (error) {
        console.log(error)
        reject(false)
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  })
}

export function get(url, data) {
  return request(url, 'GET', data)
}

export function post(url, data) {
  return request(url, 'POST', data)
}
