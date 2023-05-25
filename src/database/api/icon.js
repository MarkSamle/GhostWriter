const fs = window.require('fs')
const path = require("path")
const dbPath = path.join(__static.replace('app.asar','app'),'db/sqlite.db')
// 创建表
export const createIcons = (db) => {
    db.run("CREATE TABLE IF NOT EXISTS icons (id INTEGER PRIMARY KEY AUTOINCREMENT, name varchar(50) unique)")
    var data = db.export();
    var buffer = new Buffer(data)
    const dbFile = fs.writeFileSync(dbPath, buffer)
    return dbFile
}
// 增
export const addIcons = (db,form) => {
    createIcons(db)
    db.run("INSERT INTO icons (name) VALUES(?)", [form.name]);
    var data = db.export();
    var buffer = new Buffer(data)
    fs.writeFileSync(dbPath, buffer)
    return db
}
// 删
export const delIcons = (db,id) => {
    db.run(`DELETE FROM icons WHERE id = ${id}`)
    var data = db.export();
    var buffer = new Buffer(data)
    fs.writeFileSync(dbPath, buffer)
    return db
}
// 改
export const updateIcons = (db,form) => {
    db.run(`UPDATE icons SET name = '${form.name}' WHERE id = ${form.id}`)
    var data = db.export();
    var buffer = new Buffer(data)
    fs.writeFileSync(dbPath, buffer)
    return db
}
// 查
export const getIconsById = (db,id) => {
    var stmt = db.prepare("SELECT * FROM icons WHERE id = $id")
    var row = stmt.getAsObject({$id:id})
    return row
}
export const getIconsBySearch = (db,search) => {
    search = replaceSpecialCharacter(search)
    var iconsList = []
    var stmt = db.prepare(`SELECT * FROM icons WHERE name LIKE '%${search}%'`)
    while (stmt.step()) {
        iconsList.push(stmt.getAsObject())
    }
    return iconsList
}
export const getIcons = (db) => {
    var iconsList = []
    var stmt = db.prepare("SELECT * FROM icons")
    while (stmt.step()) {
        iconsList.push(stmt.getAsObject())
    }
    return iconsList
}
