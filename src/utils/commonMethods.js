export default {
  
  /* 常用时间方法 */
  // time cFormat 日期格式，例如{y}/{m}/{d}
  parseTime (time, cFormat) {
    if (arguments.length === 0) {
      return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      if (('' + time).length === 10) time = parseInt(time) * 1000
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear() || new Date().getFullYear(),
      m: date.getMonth() + 1 || new Date().getMonth() + 1,
      d: date.getDate() || new Date().getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      // Note: getDay() returns 0 on Sunday
      if (key === 'a') {
        return ['日', '一', '二', '三', '四', '五', '六'][value]
      }
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    return timeStr
  },
  
  // time 时间戳，options 日期格式，例如{y}/{m}/{d}
  formatTime (time, option) {
    time = +time * 1000
    const d = new Date(time)
    const now = Date.now()
    const diff = (now - d) / 1000
  
    if (diff < 30) {
      return '刚刚'
    } else if (diff < 3600) {
      // less 1 hour
      return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
      return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
      return '1天前'
    }
    if (option) {
      return parseTime(time, option)
    } else {
      return (
        d.getFullYear() +
        '年' +
        d.getMonth() +
        1 +
        '月' +
        d.getDate() +
        '日' +
        d.getHours() +
        '时' +
        d.getMinutes() +
        '分'
      )
    }
  },
  
  //  获取当前日期前后多少天的日期，之前多少天传正数，后面多少天传负数，今天传0，
  //  num为传入的数字， time为传入的指定日期，如果time不传，则默认为当前时间
  getBeforeDate (num, time) {
    let n
    if(num){
      n = num
    }
    else{
      n =0
    }
    let d = ''
    if (time) {
      d = new Date(time)
    } else {
      d = new Date()
    }
    let year = d.getFullYear()
    let mon = d.getMonth() + 1
    let day = d.getDate()
    if (day <= n) {
      if (mon > 1) {
        mon = mon - 1
      } else {
        year = year - 1
        mon = 12
      }
    }
    d.setDate(d.getDate() - n)
    year = d.getFullYear()
    mon = d.getMonth() + 1
    day = d.getDate()
    let s = year + '-' + (mon < 10 ? ('0' + mon) : mon) + '-' + (day < 10 ? ('0' + day) : day)
    return s
  },
  
  /* 获取身份证相关信息 */
  getIdCardInfo (idCard) {
    let bbd = '' // 出生日期
    let sex = '' // 性别
    let birthPlace = '' // 出生地
    idCard = idCard.toUpperCase()  // 转大写
    let len = idCard.length
  
    // 生日
    if (len === 15) {
      let re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/)
      let arrSplit = idCard.match(re)
      let birth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4])
      bbd = birth
    } else if (len === 18) {
      let re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/)
      let arrSplit = idCard.match(re)
      let birth = new Date(arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4])
      bbd = birth
    }
    bbd = bbd.getFullYear() + '-' + Number(bbd.getMonth() + 1) + '-' + bbd.getDate()
    let arrFix = bbd.split('-')
    if (arrFix[1].length === 1) {
      arrFix[1] = '0' + arrFix[1]
    }
    if (arrFix[2].length === 1) {
      arrFix[2] = '0' + arrFix[2]
    }
    bbd = arrFix[0] + '-' + arrFix[1] + '-' + arrFix[2]
    // 性别
    if (idCard.length === 18) {
      sex = idCard.charAt(idCard.length - 2)
    } else {
      sex = idCard.charAt(idCard.length - 1)
    }
    if (sex % 2 === 1) {
      sex = '男'
    } else {
      sex = '女'
    }
  
    let code = idCard.substring(0, 6).toString()
    let city = cityCode.find(item => item.code === code)
    if (city) { birthPlace = city.value }
    let rsp = {
      birthPlace: birthPlace, // 籍贯
      birthday: bbd,  // 返回生日
      sex: sex    // 返回性别
    }
    return rsp
  }
}

