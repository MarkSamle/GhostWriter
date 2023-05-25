<template>
    <div class="ocr-show">
      <el-row>
        <el-col :span="12">
            <div style="display: flex;justify-content: center;height:500px;">
                <div class="show-list" id="imgList" v-if="sidentifyShow" style="width:98%;height:500px;overflow-y: auto;border: solid 1px #5d558f;">
                    <div v-for="(img,index) in imgList" :key="index" @click="toDownload(img)">
                        <img style="width:100%;" :src="img"/>
                    </div>
                </div>
            </div>
        </el-col>
        <el-col :span="12">
            <div style="display: flex;justify-content: center;height:500px;">
                <div  class="show-list"  style="width:98%;height:500px;overflow-y: auto;border: solid 1px #5d558f;">
                    <div class="ocrText" v-html="ocrtext" v-if="sidentifyShow" style="margin:15px 15px;" @click="copyData(ocrtext)"></div>
                </div>
            </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
const ipcRenderer = window.require('electron').ipcRenderer
const fs = window.require('fs')
const path = require("path")
export default {
    name: 'ocrShow',
    components: {},
    data () {
      return {
        sidentifyShow: true
      }
    },
    props: {
      imgList: {
        type: Array,
        require: true,
        default: () => [],
      },
      ocrtext: {
        type: String,
        require: true,
        default: ''
      }
    },
    mounted () {},
    watch:{
        ocrtext(){
            this.sidentifyShow=false
            this.$nextTick(()=>{
                this.sidentifyShow=true
            })
        },
        imgList(){
            this.sidentifyShow=false
            this.$nextTick(()=>{
                this.sidentifyShow=true
            })
            // this.$nextTick(()=>{
            //     this.showPic(this.imgList)
            // })
        }
  },
    methods: {
        // showPic(images){
        //     // 重置
        //     var imgList = document.querySelector('.imgList')
        //     if (imgList) {
        //         var child = imgList.lastElementChild;  
        //         while (child) { 
        //             imgList.removeChild(child); 
        //             child = imgList.lastElementChild; 
        //         } 
        //     }
        //     // 重新获取
        //     imgList = document.querySelector('.imgList')
        //     let i = 1
        //     images.forEach(image => {
        //         var oDiv = document.createElement('div')
        //         oDiv.id = "ocr-img-" + i
        //         imgList.appendChild(oDiv)
        //         var oImg = document.createElement("img")
        //         oImg.width="100%"
        //         oImg.src=image
        //         oDiv = document.getElementById("ocr-img-" + i)
        //         oDiv.appendChild(oImg)
        //         i = i + 1
        //     })
        // }
        copyData (msg) {
            const save = function(e) {
                e.clipboardData.setData('text/plain', msg)
                e.preventDefault() // 阻止默认行为
            }
            document.addEventListener('copy', save) // 添加一个copy事件
            document.execCommand('copy') // 执行copy方法
            this.$message({ message: '复制成功', type: 'success' })
        },
        toDownload(pic){
            var that = this;
            ipcRenderer.send('open-directory-dialog', 'openDirectory');
            ipcRenderer.on('selectedItem', function (e, files) {
                if (files) {
                    var base64Data = pic.replace(/data:.*?;base64,/, "");
                    fs.writeFileSync(files + "/out.png", base64Data, 'base64')
                    that.$message({ message: '下载成功！', center: true, offset: 300, type: 'success' })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.ocr-show{
    width: 100%;
    height: auto;
}
.show-list::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
.show-list::-webkit-scrollbar-track {
    background-color:#F5F5F5;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius:2em;
}
.show-list::-webkit-scrollbar-thumb {
    background-color:#565252;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius:2em;
}
</style>