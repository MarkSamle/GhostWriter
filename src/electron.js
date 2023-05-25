const ipcRenderer = window.require('electron').ipcRenderer

export const notice = function (data) {
  ipcRenderer.send('show-notice', data)
}
