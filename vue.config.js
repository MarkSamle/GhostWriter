module.exports = {
    pluginOptions: {
        electronBuilder: {
            // nodeIntegration: true,// 不能写在这里，会导致Cannot set properties of undefined (setting 'exports')
            // mainProcessWatch: ["public","static","app"], // 开发中打开这个会英文文件变更重启项目导致数据丢失
            nodeModulesPath: ['../../node_modules', './node_modules'],
            chainWebpackMainProcess: (config) => {
                config.output.filename('background.js');
            },
            builderOptions: {
                icon: "./public/favicon.ico",
                asar: false,// 不加的话操作不了静态文件夹 同时需要使用__static.replace('app.asar','app')，因为默认文件夹不再打包成app.asar而是app文件夹
                //解决用户不能自己选择安装目录
                nsis: {
                    oneClick: false,
                    allowToChangeInstallationDirectory: true,
                    installerIcon: "./public/favicon.ico",
                    uninstallerIcon: "./public/favicon.ico",
                    installerHeaderIcon: "./public/favicon.ico",
                }
            }
        }
    },
    chainWebpack: config => {
        config.module.rule('wasm').test(/\.wasm$/).type('javascript/auto')
    },
    devServer: {
        overlay: {
            warnings: false, //不显示警告
            errors: false	//不显示错误
        },
        disableHostCheck: true,
        proxy: {
            '/ocrapi': {
                target: 'http://ocr.a8a8a8.top/api/tr-run/', //后台接口的服务地址
                changeOrigin: true, //changes the origin of the host header to the target URL 设置是否将host更换为代理url
                ws: false, //websocket是否代理
                secure: false, //true/false, if you want to verify the SSL Certs，https协议的情况下为true
                pathRewrite: { //object/function, rewrite target's url path. Object-keys will be used as RegExp to match paths. 重写url路径
                    '^/ocrapi': '' //需要代理的路径
                }
            }
        }
    },
    lintOnSave:false //关闭eslint检查
}