const Menu = require('electron').Menu
var template = [
  // {
  //   label: '登录',
  //   submenu:[
  //       {label:'重新登录',accelerator: 'CmdOrCtrl+L',click:function(){}},// 重新指向登录页面|用于切换账号
  //       {type: 'separator'},
  //       {label:'退出',accelerator: 'CmdOrCtrl+U',click:function(){window.closed;console.log("关闭")}},// 关闭程序
  //       {type: 'separator'},
  //       ]
  // }
]
var menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
