const fs = window.require('fs')
const md5 = require("md5-node")
const path = require("path")
const dbPath = path.join(__static.replace('app.asar','app'),'db/sqlite.db')
import { replaceSpecialCharacter } from '@/database/api/unit.js'
// 创建表
export const createUsers = (db) => {
    db.run("CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT,username varchar(30) unique, password TEXT, name varchar(30), remark TEXT, is_super bool)")
    var data = db.export();
    var buffer = new Buffer(data)
    const dbFile = fs.writeFileSync(dbPath, buffer)
    return dbFile
}
// 增
export const addUser = (db,form) => {
    createUsers(db)
    db.run("INSERT INTO user (username,password,name,remark,is_super) VALUES(?,?,?,?,?)", [form.username,md5(form.password),form.name,form.remark,0]);
    var data = db.export();
    var buffer = new Buffer(data)
    fs.writeFileSync(dbPath, buffer)
    return db
}
// 删
export const delUser = (db,id) => {
    db.run(`DELETE FROM user WHERE id = ${id}`)
    var data = db.export();
    var buffer = new Buffer(data)
    fs.writeFileSync(dbPath, buffer)
    return db
}
// 改
export const updateUser = (db,form) => {
    db.run(`UPDATE user SET username = '${replaceSpecialCharacter(form.username)}', password = '${md5(form.password)}', name = '${replaceSpecialCharacter(form.name)}', remark = '${replaceSpecialCharacter(form.remark)}',  is_super = ${form.is_super} WHERE id = ${form.id}`)
    var data = db.export();
    var buffer = new Buffer(data)
    fs.writeFileSync(dbPath, buffer)
    return db
}
// 查
export const userLogin = (db,form) => {
    var stmt = db.prepare("SELECT * FROM user WHERE username = $username and password = $password")
    var row = stmt.getAsObject({$username:form.username,$password:md5(form.password)})
    return row
}
export const getUserById = (db,id) => {
    var stmt = db.prepare("SELECT * FROM user WHERE id = $id")
    var row = stmt.getAsObject({$id:id})
    return row
}
export const getUser = (db) => {
    var userList = []
    var stmt = db.prepare("SELECT * FROM user")
    while (stmt.step()) {
        userList.push(stmt.getAsObject())
    }
    return userList
}
export const getUserIdBetwween = (db,start,end) => {
    var userList = []
    var stmt = db.prepare("SELECT * FROM user WHERE id BETWEEN $start AND $end");
    stmt.bind({ $start: start, $end: end });
    while (stmt.step()) {
        userList.push(stmt.getAsObject())
    }
    return userList
}

