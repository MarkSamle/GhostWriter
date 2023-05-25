const fs = window.require('fs')
const path = require("path")
const dbPath = path.join(__static.replace('app.asar','app'),'db/sqlite.db')
import { replaceSpecialCharacter } from '@/database/api/unit.js'
// 创建表
export const createTypes = (db) => {
    db.run("CREATE TABLE IF NOT EXISTS types (id INTEGER PRIMARY KEY AUTOINCREMENT, name varchar(30) unique, key varchar(30), remark TEXT, userby INTEGER)")
    var data = db.export();
    var buffer = new Buffer(data)
    const dbFile = fs.writeFileSync(dbPath, buffer)
    return dbFile
}
// 增
export const addTypes = (db,form) => {
    createTypes(db)
    db.run("INSERT INTO types (name,key,remark,userby) VALUES(?,?,?,?)", [form.name,form.key,form.remark,form.userby]);
    var data = db.export();
    var buffer = new Buffer(data)
    fs.writeFileSync(dbPath, buffer)
    return db
}
// 删
export const delTypes = (db,id) => {
    db.run(`DELETE FROM types WHERE id = ${id}`)
    var data = db.export();
    var buffer = new Buffer(data)
    fs.writeFileSync(dbPath, buffer)
    return db
}
// 改
export const updateTypes = (db,form) => {
    db.run(`UPDATE types SET name = '${replaceSpecialCharacter(form.name)}', key = '${replaceSpecialCharacter(form.key)}', remark = '${replaceSpecialCharacter(form.remark)}',  userby = ${form.userby} WHERE id = ${form.id}`)
    var data = db.export();
    var buffer = new Buffer(data)
    fs.writeFileSync(dbPath, buffer)
    return db
}
// 查
export const getTypesById = (db,userby,id) => {
    var stmt = db.prepare(`SELECT * FROM types WHERE userby = ${userby} and id = $id`)
    var row = stmt.getAsObject({$id:id})
    return row
}
export const getTypesBySearch = (db,userby,search) => {
    search = replaceSpecialCharacter(search)
    var typesList = []
    var stmt = db.prepare(`SELECT * FROM types WHERE userby = ${userby} and name LIKE '%${search}%' or remark LIKE '%${search}%' or key LIKE '${search}%'`)
    while (stmt.step()) {
        typesList.push(stmt.getAsObject())
    }
    return typesList
}
export const getTypes = (db,userby) => {
    var typesList = []
    var stmt = db.prepare(`SELECT * FROM types WHERE userby = ${userby}`)
    while (stmt.step()) {
        typesList.push(stmt.getAsObject())
    }
    return typesList
}
