// https://blog.51cto.com/u_15080020/2593623
const fs = window.require('fs')
var initSqlJs = require('@/database/js/sql-asm.js')
const path = require("path")
const dbPath = path.join(__static.replace('app.asar','app'),'db/sqlite.db')
// 读取数据库
export const readDb = () => {
    var filebuffer = fs.readFileSync(dbPath)
    initSqlJs().then(function(SQL){
        var db = new SQL.Database(filebuffer)
        return db
    })
}

// 保存数据库
export const saveDb = (db) => {
    // var db = readDb()
    var data = db.export();
    var buffer = new Buffer(data);
    fs.writeFileSync(dbPath, buffer);
}