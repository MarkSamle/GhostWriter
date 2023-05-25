const fs = window.require('fs')
// var initSqlJs = require('@/database/js/sql-asm.js')
// const md5 = require("md5-node")
const path = require("path")
const dbPath = path.join(__static.replace('app.asar','app'),'db/sqlite.db')
import { getNow,replaceSpecialCharacter } from '@/database/api/unit.js'

// 创建表 文档名 说明 所属文集 上级文档 层级 路径 编辑器 关键字 标签 text内容 md内容 html内容 排序 创建时间 修改时间 归属用户
export const createDoc = (db) => {
    db.run(`CREATE TABLE IF NOT EXISTS doc (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name varchar(50),
        remark TEXT, 
        collect INTEGER, 
        parent INTEGER, 
        tier INTEGER, 
        path TEXT,
        editor TEXT,
        keys TEXT,
        tags TEXT,
        text TEXT, 
        md TEXT, 
        html TEXT,
        level INTEGER, 
        create_date datetime,
        update_date datetime, 
        userby INTEGER)`)
    var data = db.export();
    var buffer = new Buffer(data)
    const dbFile = fs.writeFileSync(dbPath, buffer)
    return dbFile
}
// 增
export const addDoc = (db,form) => {
    createDoc(db)
    db.run(`INSERT INTO doc (
        name,
        remark, 
        collect, 
        parent, 
        tier, 
        path,
        editor,
        keys,
        tags,
        text, 
        md, 
        html,
        level, 
        create_date,
        update_date,
        userby
    ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [
        form.name,
        form.remark, 
        form.collect, 
        form.parent, 
        form.tier, 
        form.path,
        form.editor,
        form.keys,
        form.tags,
        form.text, 
        form.md, 
        form.html,
        0, 
        getNow(),
        getNow(),
        form.userby]);
    var data = db.export();
    var buffer = new Buffer(data)
    fs.writeFileSync(dbPath, buffer)
    return db
}
// 删
export const delDoc = (db,id) => {
    db.run(`DELETE FROM doc WHERE id = ${id}`)
    var data = db.export();
    var buffer = new Buffer(data)
    fs.writeFileSync(dbPath, buffer)
    return db
}
// 改
export const updateDoc = (db,form) => {
    db.run(
        `UPDATE doc SET 
        ${form.name != null && form.name != ""?"name = '" + replaceSpecialCharacter(form.name) + "', ":""}
        ${form.remark != null && form.remark != ""?"remark = '" + replaceSpecialCharacter(form.remark) + "', ":""}
        ${form.collect != null && form.collect != ""?"collect = '" + form.collect + "', ":""}
        ${form.parent != null ?"parent = '" + form.parent + "', ":""}
        ${form.tier != null && form.tier != ""?"tier = '" + form.tier + "', ":""}
        ${form.path != null ?"path = '" + form.path + "', ":""}
        ${form.editor != null && form.editor != ""?"editor = '" + form.editor + "', ":""}
        ${form.keys != null && form.keys != ""?"keys = '" + replaceSpecialCharacter(form.keys) + "', ":""}
        ${form.tags != null && form.tags != ""?"tags = '" + replaceSpecialCharacter(form.tags) + "', ":""}
        ${form.text != null && form.text != ""?"text = '" + replaceSpecialCharacter(form.text) + "', ":""}
        ${form.md != null && form.md != ""?"md = '" + replaceSpecialCharacter(form.md) + "', ":""}
        ${form.html != null && form.html != ""?"html = '" + replaceSpecialCharacter(form.html) + "', ":""}
        ${form.level != null && form.level != ""?"level = '" + form.level + "', ":""}
        update_date = '${getNow()}' 
        WHERE id = ${form.id}`
    )
    var data = db.export();
    var buffer = new Buffer(data)
    fs.writeFileSync(dbPath, buffer)
    return db
}
// 查
export const getDocById = (db,userby,id) => {
    var stmt = db.prepare(`SELECT * FROM doc WHERE userby = ${userby} and id = $id`)
    var row = stmt.getAsObject({$id:id})
    return row
}
export const getDocBySearch = (db,userby,search) => {
    search = replaceSpecialCharacter(search)
    var docList = []
    var sql = `SELECT * FROM doc WHERE  userby = ${userby} and ( name LIKE '%${search}%' or remark LIKE '%${search}%' or text LIKE '%${search}%' or md LIKE '%${search}%' or html LIKE '%${search}%')`
    var stmt = db.prepare(sql)
    while (stmt.step()) {
        var doc = stmt.getAsObject()
        doc.collect_data = getDocCollect(db,doc.collect)
        docList.push(doc)
    }
    return docList
}
export const getDocByCollect = (db,userby,collect) => {
    var docList = []
    var stmt = db.prepare(`SELECT * FROM doc WHERE userby = ${userby} and collect = ${collect}`)
    while (stmt.step()) {
        var doc = stmt.getAsObject()
        doc.collect_data = getDocCollect(db,collect)
        docList.push(doc)
    }
    return docList
}
export const getDoc = (db,userby) => {
    var docList = []
    var stmt = db.prepare(`SELECT * FROM doc WHERE userby = ${userby}`)
    while (stmt.step()) {
        var doc = stmt.getAsObject()
        doc.collect_data = getDocCollect(db,doc.collect)
        docList.push(doc)
    }
    return docList
}
// 递归文档树
export const getDocTreeByCollect = (db,userby,collect,search='') => {
    var docParent = []
    var sql = `SELECT * FROM doc WHERE userby = ${userby} and collect = ${collect} and ( parent = '' or parent is NULL ) and tier = 1  and ( path = '' or path is NULL)`
    if (search != '') {
        sql = `SELECT * FROM doc WHERE userby = ${userby} and collect = ${collect} and ( parent = '' or parent is NULL ) and tier = 1  and ( path = '' or path is NULL)
        and ( name LIKE '%${search}%' or remark LIKE '%${search}%' or text LIKE '%${search}%' or md LIKE '%${search}%' or html LIKE '%${search}%')`
    }
    var stmt = db.prepare(sql)
    while (stmt.step()) {
        var doc = stmt.getAsObject()
        doc.child = getDocChildByCollect(db,userby,collect,doc.id)
        doc.collect_data = getDocCollect(db,collect)
        docParent.push(doc)
    }
    return docParent
}
export const getDocChildByCollect = (db,userby,collect,parent) => {
    var docChild = []
    var stmt = db.prepare(`SELECT * FROM doc WHERE userby = ${userby} and collect = ${collect} and parent = ${parent}`)
    while (stmt.step()) {
        var doc = stmt.getAsObject()
        doc.child = getDocChildByCollect(db,userby,collect,doc.id)
        doc.collect_data = getDocCollect(db,collect)
        docChild.push(doc)
    }
    return docChild
}

// getDocCollect
export const getDocCollect = (db,id) => {
    var stmt = db.prepare("SELECT * FROM collect WHERE id = $id")
    var row = stmt.getAsObject({$id:id})
    return row
}