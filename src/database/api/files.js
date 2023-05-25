const fs = window.require('fs')
const path = require("path")
const dbPath = path.join(__static.replace('app.asar','app'),'db/sqlite.db')
import { replaceSpecialCharacter } from '@/database/api/unit.js'

// 创建表
export const createFiles = (db) => {
    db.run("CREATE TABLE IF NOT EXISTS files (id INTEGER PRIMARY KEY AUTOINCREMENT, path TEXT,  userby INTEGER)")
    var data = db.export();
    var buffer = new Buffer(data)
    const dbFile = fs.writeFileSync(dbPath, buffer)
    return dbFile
}
// 增
export const addFiles = (db,form) => {
    createFiles(db)
    db.run("INSERT INTO files (path,userby) VALUES(?,?)", [form.path,form.userby]);
    var data = db.export();
    var buffer = new Buffer(data)
    fs.writeFileSync(dbPath, buffer)
    return db
}
// 删
export const delFiles = (db,id) => {
    var stmt = db.prepare(`SELECT * FROM files WHERE id = $id`)
    var row = stmt.getAsObject({$id:id})
    const filePath = path.join(__static.replace('app.asar','app'),row.path)
    try {
        fs.unlinkSync(filePath)
        db.run(`DELETE FROM files WHERE id = ${id}`)
        var data = db.export();
        var buffer = new Buffer(data)
        fs.writeFileSync(dbPath, buffer)
        return db
    } catch {
        db.run(`DELETE FROM files WHERE id = ${id}`)
        var data = db.export();
        var buffer = new Buffer(data)
        fs.writeFileSync(dbPath, buffer)
        return db
    }
    
}
// 改
export const updateFiles = (db,form) => {
    db.run(`UPDATE files SET path = '${replaceSpecialCharacter(form.path)}',  userby = ${form.userby} WHERE id = ${form.id}`)
    var data = db.export();
    var buffer = new Buffer(data)
    fs.writeFileSync(dbPath, buffer)
    return db
}
// 查
export const getFilesById = (db,userby,id) => {
    var stmt = db.prepare(`SELECT * FROM files WHERE userby = ${userby} and id = $id`)
    var row = stmt.getAsObject({$id:id})
    return row
}
export const getFilesBySearch = (db,userby,search) => {
    search = replaceSpecialCharacter(search)
    var filesList = []
    var stmt = db.prepare(`SELECT * FROM files WHERE userby = ${userby} and path LIKE '%${search}%'`)
    while (stmt.step()) {
        filesList.push(stmt.getAsObject())
    }
    return filesList
}
export const getFiles = (db,userby) => {
    var filesList = []
    var stmt = db.prepare(`SELECT * FROM files WHERE userby = ${userby}`)
    while (stmt.step()) {
        filesList.push(stmt.getAsObject())
    }
    return filesList
}
