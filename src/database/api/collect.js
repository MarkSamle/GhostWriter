const fs = window.require('fs')
// var initSqlJs = require('@/database/js/sql-asm.js')
// const md5 = require("md5-node")
const path = require("path")
const dbPath = path.join(__static.replace('app.asar','app'),'db/sqlite.db')
import { getNow,replaceSpecialCharacter } from '@/database/api/unit.js'

// 创建表
export const createCollect = (db) => {
    db.run("CREATE TABLE IF NOT EXISTS collect (id INTEGER PRIMARY KEY AUTOINCREMENT, name varchar(30) unique, icon varchar(50), remark TEXT, typ varchar(50), level INTEGER, update_date datetime, userby INTEGER)")
    var data = db.export();
    var buffer = new Buffer(data)
    const dbFile = fs.writeFileSync(dbPath, buffer)
    return dbFile
}
// 增
export const addCollect = (db,form) => {
    createCollect(db)
    db.run("INSERT INTO collect (name,icon,remark,typ,level,update_date,userby) VALUES(?,?,?,?,?,?,?)", [form.name,form.icon,form.remark,form.typ,0,getNow(),form.userby]);
    var data = db.export();
    var buffer = new Buffer(data)
    fs.writeFileSync(dbPath, buffer)
    return db
}
// 删
export const delCollect = (db,id) => {
    db.run(`DELETE FROM collect WHERE id = ${id}`)
    var data = db.export();
    var buffer = new Buffer(data)
    fs.writeFileSync(dbPath, buffer)
    return db
}
// 改
export const updateCollect = (db,form) => {
    db.run(`UPDATE collect SET name = '${replaceSpecialCharacter(form.name)}', icon = '${form.icon}', remark = '${replaceSpecialCharacter(form.remark)}', typ = '${form.typ}', level = '${form.level}', update_date = '${getNow()}', userby = ${form.userby} WHERE id = ${form.id}`)
    var data = db.export();
    var buffer = new Buffer(data)
    fs.writeFileSync(dbPath, buffer)
    return db
}
// 查
export const getCollectById = (db,userby,id) => {
    var stmt = db.prepare(`SELECT * FROM collect WHERE userby = ${userby} and id = $id`)
    var row = stmt.getAsObject({$id:id})
    row.doc = getDocCountByCollect(db,userby,row.id)
    return row
}
export const getCollectBySearch = (db,userby,search) => {
    search = replaceSpecialCharacter(search)
    var collectList = []
    var stmt = db.prepare(`SELECT * FROM collect WHERE userby = ${userby} and (name LIKE '%${search}%' or remark LIKE '%${search}%' or typ LIKE '%${search}%')`)
    while (stmt.step()) {
        collectList.push(stmt.getAsObject())
    }
    return collectList
}
export const getCollect = (db,userby) => {
    var collectList = []
    var stmt = db.prepare(`SELECT * FROM collect WHERE userby = ${userby}`)
    while (stmt.step()) {
        var obj = stmt.getAsObject()
        obj.doc = getDocCountByCollect(db,userby,obj.id)
        collectList.push(obj)
    }
    return collectList
}
export const getOrderCollect = (db,param) => {
    var collectList = []
    var stmt = db.prepare(`SELECT * FROM collect 
        WHERE userby = ${param.userby}
        ${param.typ != null && param.typ != ""?" and typ = '" + param.typ + "' ":""}
        ${param.order != null && param.order != ""?" order by update_date " + param.order + " ":""}
        `)
    while (stmt.step()) {
        var obj = stmt.getAsObject()
        obj.doc = getDocCountByCollect(db,param.userby,obj.id)
        collectList.push(obj)
    }
    return collectList
}
// 获取文集下文档数量和最后编辑的三个文档
export const getDocCountByCollect = (db,userby,collect) => {
    var docList = []
    var count = 0
    var sqlCount = db.exec(`SELECT * FROM doc WHERE userby = ${userby} and collect = ${collect}`)
    if (sqlCount.length>0 && sqlCount[0].values){
        count = sqlCount[0].values.length
    }
    var stmt = db.prepare(`SELECT * FROM doc WHERE userby = ${userby} and collect = ${collect} order by update_date desc`)
    var index = 0
    while (stmt.step() && index < 3) {
        var doc = stmt.getAsObject()
        doc.collect_data = getDocCollect(db,collect)
        docList.push(doc)
        // docList.push(stmt.getAsObject())
        index = index + 1
    }
    return {num:count,list:docList}
}

// getDocCollect
export const getDocCollect = (db,id) => {
    var stmt = db.prepare("SELECT * FROM collect WHERE id = $id")
    var row = stmt.getAsObject({$id:id})
    return row
}
