'use strict'

import { app, protocol, BrowserWindow, ipcMain, Notification, dialog} from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
// import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import './menu'
const path = require("path")
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    minWidth: 1050,
    minHeight: 650,
    width: 1050,
    height: 650,
    frame: false, // 隐藏菜单
    icon: path.join(__static.replace('app.asar','app'),"/favicon.ico"),
    transparent: true,
    backgroundColor: '#00000000',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false, //此参数禁用当前窗口的同源策略，跨域必须设置这个
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      // nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      // contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools() // 临时注释
    // win.webContents.openDevTools() // 临时增加
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
    // win.webContents.openDevTools() // 临时增加
  }

  ipcMain.on('open-directory-dialog', function (event, p) {
    dialog.showOpenDialog({
        properties: [p],
        title: '请选择保存目录',
        buttonLabel: '选择',
        icon: path.join(__static.replace('app.asar','app'),"/favicon.ico"),
    }).then(result => {
        event.sender.send('selectedItem', result.filePaths[0])
    })
  })
  // 自定义按钮
  // 控制台
  ipcMain.on('f12-tool', () => {
    win.webContents.openDevTools()
  })

  // 退出
  ipcMain.on('closed-window', () => {
    app.exit()
  })
  // 小化
  ipcMain.on('hide-window', () => {
    win.minimize()
  })
  // 最大化
  ipcMain.on('show-window', () => {
    win.maximize()
  })
  // 还原
  ipcMain.on('orignal-window', () => {
    win.unmaximize()
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  // if (isDevelopment && !process.env.IS_TEST) {
  //   // Install Vue Devtools
  //   try {
  //     await installExtension(VUEJS_DEVTOOLS)
  //   } catch (e) {
  //     console.error('Vue Devtools failed to install:', e.toString())
  //   }
  // }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

ipcMain.on('show-notice', (event, news) => {
  notice(news)
})

export const notice = function (news) {
  const notification = new Notification(news)
  notification.show()// 展示
}
