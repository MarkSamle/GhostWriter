// const fs = window.require('fs')
// var initSqlJs = require('@/database/js/sql-asm.js')
// const md5 = require("md5-node")
// const path = require("path")
// const dbPath = path.join(__static.replace('app.asar','app'),'db/sqlite.db')
const _charStr = 'abacdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789';
// 查询最大自增ID
export const getRows = (db,tableName) => {
    var stmt = db.prepare("SELECT * FROM sqlite_sequence WHERE name = $name")
    var row = stmt.getAsObject({$name:tableName})
    if (row.seq != undefined && row.seq != null){
        return row.seq
    } else {
        return 0
    }
}

export const getMonth = () => {
    var date = new Date()
    var year = date.getFullYear() // 年
    var month = date.getMonth() + 1 // 月
    if (month >= 1 && month <= 9) {
         month = "0" + month;
    }
    return year + "_" + month 
}

export const getNowStr = () => {
    var date = new Date()
    var sign2 = ":"
    var year = date.getFullYear() // 年
    var month = date.getMonth() + 1 // 月
    var day = date.getDate() // 日
    var hour = date.getHours() // 时
    var minutes = date.getMinutes() // 分
    var seconds = date.getSeconds() //秒

     // 给一位数的数据前面加 “0”
    if (month >= 1 && month <= 9) {
         month = "0" + month;
    }
     if (day >= 0 && day <= 9) {
         day = "0" + day;
     }
     if (hour >= 0 && hour <= 9) {
      hour = "0" + hour;
      }
    if (minutes >= 0 && minutes <= 9) {
       minutes = "0" + minutes;
     }
    if (seconds >= 0 && seconds <= 9) {
       seconds = "0" + seconds;
    }
    return year + "_" + month + "_" + day + "_" + hour+ "_" + minutes + "_" + seconds
}

export const getNow = () => {
    var date = new Date()
    var sign2 = ":"
    var year = date.getFullYear() // 年
    var month = date.getMonth() + 1 // 月
    var day = date.getDate() // 日
    var hour = date.getHours() // 时
    var minutes = date.getMinutes() // 分
    var seconds = date.getSeconds() //秒

     // 给一位数的数据前面加 “0”
    if (month >= 1 && month <= 9) {
         month = "0" + month;
    }
     if (day >= 0 && day <= 9) {
         day = "0" + day;
     }
     if (hour >= 0 && hour <= 9) {
      hour = "0" + hour;
      }
    if (minutes >= 0 && minutes <= 9) {
       minutes = "0" + minutes;
     }
    if (seconds >= 0 && seconds <= 9) {
       seconds = "0" + seconds;
    }
    return year + "-" + month + "-" + day + " " + hour + sign2 + minutes + sign2 + seconds
}

export const replaceSpecialCharacter = (str) => {
    str = str.replaceAll('%', '/%')
    str = str.replaceAll('//', '/%2F/%2F/%2F/%2F')
    str = str.replaceAll('/', '/%2F/%2F')
    str = str.replaceAll('[', '/[')
    str = str.replaceAll(']', '/]')
    str = str.replaceAll('&', '/&')
    str = str.replaceAll('_', '/_')
    str = str.replaceAll('(', '/(')
    str = str.replaceAll(')', '/)')
    str = str.replaceAll("'", "''")
    return str
}

export const restartReplaceSpecial = (str) => {
    str = str.replaceAll('/%2F/%2F', '/')
    str = str.replaceAll('/%2F/%2F/%2F/%2F', '//')
    str = str.replaceAll('/[', '[')
    str = str.replaceAll('/]', ']')
    str = str.replaceAll('/%', '%')
    str = str.replaceAll('/&', '&')
    str = str.replaceAll('/_', '_')
    str = str.replaceAll('/(', '(')
    str = str.replaceAll('/)', ')')
    str = str.replaceAll("''", "'")
    return str
}
// 判断子字符串是否存在
export const hasString = (parent,child) => {
    var re = new RegExp(child,"g"); 
    if (parent){
        let has = parent.match(re)
        if (has){ return true } else { return false }
    }
    
}
// 判断子字符串是否存在
export const hasStr = (parent,reg) => {
    // var re = new RegExp(child,"g"); 
    if (parent){
        let has = parent.match(reg)
        if (has){ return true } else { return false }
    }
    
}
export const RandomIndex = (min, max, i) => {
    let index = Math.floor(Math.random()*(max-min+1)+min),
        numStart = _charStr.length - 10;
    //如果字符串第一位是数字，则递归重新获取
    if(i==0&&index>=numStart){
        index = RandomIndex(min, max, i);
    }
    //返回最终索引值
    return index;
}
export const getRandomString = (len) => {
    let min = 0, max = _charStr.length-1, _str = '';
    //判断是否指定长度，否则默认长度为15
    len = len || 15;
    //循环生成字符串
    for(var i = 0, index; i < len; i++){
        index = RandomIndex(min, max, i);
        _str += _charStr[index];
    }
    return _str;
}
export const regInsertStr = (text,reg,start,end) => {
    let regs = []
    let startStr = getRandomString(10)
    while (hasStr(startStr,reg)){
        startStr = getRandomString(10)
    }
    let endStr = getRandomString(10)
    while (hasStr(startStr,reg) || startStr == endStr){
        endStr = getRandomString(10)
    }
    const regList = text.match(reg)
    if (regList){
        regList.forEach(re => {
            if (!regs.includes(re)) { regs.push(re)}
        })
    }
    regs.forEach(re => {
        text = text.replaceAll(re, startStr + re + endStr)
    })
    text = text.replaceAll(startStr,start)
    text = text.replaceAll(endStr,end)
    return text
}