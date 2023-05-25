<template>
    <div>
        <!-- 样式一 文字按钮 text -->
        <div class="ocr-button" @click="showUpdate = true" v-if="ocrType == 'text'"><span>{{ocrText}}</span></div>
        <!-- 样式二 图标按钮 icon -->
        <el-button type="text" @click="showUpdate = true" aria-hidden="true" class="op-icon fa" :title="ocrText" v-if="ocrType == 'icon'" style="width:30px;">
            <i class="el-icon-view" />
        </el-button>
        <!-- 样式三 组合按钮 div -->
        <div style="padding:15px;width:60px;text-align: center;" v-if="ocrType == 'div'">
            <div><el-button type="text" @click="showUpdate = true" size="mini" style="font-size:50px;color:#525252;"><i class="el-icon-view" style="font-size:50px;"></i></el-button></div>
            <div>{{ocrText}}</div>
        </div>

        <el-dialog :title="ocrText" :visible.sync="showUpdate" width="50%" :before-close="handleClose" :append-to-body="true">
            <el-upload  class="upload-box" action="" :show-file-list="false" :auto-upload="false" :multiple="false" :file-list="files" :on-change="changeFile" >
                <i class="el-icon-upload" v-if="!isUploadFile" style="margin:0;font-size:50px;"></i>
                <div class="el-upload__text" v-if="!isUploadFile">
                    将文件拖到此处，或<em>点击上传</em>
                    <div class="el-upload__tip" slot="tip"> 请上传PNG/JPG或者PDF文件 </div>
                </div>
                <div v-if="isUploadFile">
                    <div v-if="isUploadFile">
                        <i class="el-icon-tickets"  style="margin:0;font-size:50px;"></i>
                    </div>
                    <div class="el-upload__text" v-if="isUploadFile">
                    <em>更换文件</em>
                    </div>
                </div>
            </el-upload>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleClose" size="mini">取 消</el-button>
                <el-button size="mini"  :disabled="imageList.length == 0" @click="useOcr">开始识别</el-button>

                <el-button size="mini"  :disabled="imageList.length == 0 || resList.length == 0" @click="checkOcr" v-if="imageList.length > 0 && resList.length > 0 && showPic == false">确认</el-button>
                <el-button size="mini"  :disabled="imageList.length == 0 || resList.length == 0" @click="showOcrDialog" v-if="imageList.length > 0 && resList.length > 0 && showPic == true">查看</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="ocrText" :visible.sync="showOcr" width="98%" :append-to-body="true">
            <ocrShowView :imgList="imageList" :ocrtext="resText" ref="ocrShowView"></ocrShowView>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showOcr = false;imageList = [];resText=''" size="mini">取 消</el-button>
                <el-button size="mini"  :disabled="imageList.length == 0 || resList.length == 0" @click="checkOcr">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import * as PDFJS from "pdfjs-dist"
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker
import { Loading } from 'element-ui'
// import { request } from '@/api/service'
import { hasString } from '@/database/api/unit.js'
import ocrShowView from '@/components/page/ocr/show.vue'
import axios from "axios"
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'ocrButton',
    components: {
        ocrShowView,
    },
    data () {
      return {
        showOcr: false,
        showUpdate: false,
        isUploadFile: false,
        imageUrl: '',
        imageList: [],
        resList:[],
        resText: '',
        ocrRaw : '',
        files: [],
        canvasArr: [],
        loading: false,
        scale: 2,
        interval: 0,
        renderImgArr: [],
        ds: [],
        oldData: '',
        newData: '',
      }
    },
    props: {
        ocrType: {
            type: String,
            require: true,
            default: 'icon'
        },
        ocrText: {
            type: String,
            require: true,
            default: 'OCR识别'
        },
        showPic: {
            type: Boolean,
            require: true,
            default: true
        },
        showHtml: {
            type: Boolean,
            require: true,
            default: true
        },
        comHtml: {
            type: String,
            require: true,
            default: ''
        },
        comText: {
            type: String,
            require: true,
            default: ''
        }
    },
    mounted () {},
    watch:{
    },
    computed: {
        chosecolor: {
            get () {
                return this.$store.state.storeData.mycolor
            },
            set (value) {
                this.setColor(value)
            }
        },
        ocrApi: {
            get () {
                return this.$store.state.storeData.myOcrApi
            },
            set (value) {
                this.setOcrApi(value)
            }
        },
        codeStyle: {
            get () {
                return this.$store.state.storeData.myCodeStyle
            },
            set (value) {
                this.setCodeStyle(value)
            }
        },
        ...mapGetters('storeData', [ 'storeDataFrom' ])
    },
    methods: {
        ...mapMutations('storeData', ['setColor', 'setCodeStyle','setOcrApi']),
        async getOcr(baseImg) {
            const obj = new FormData()
            obj.append('img',  `${baseImg}`)
            obj.append('compress', 0)
            obj.append('is_draw', 0)
            // const { data: res } = await this.$http.post('/ocrapi', obj)
            const { data: res } = await axios.post(this.ocrApi, obj)
            // http://ocr.a8a8a8.top/api/tr-run/
            // const { data: res } = await request({ url: '/ocrapi', method: 'post', data: obj })
            return res.data
        },
        changeFile(file, fileList) {
            if (fileList.length > 1) { fileList.splice(0, 1) }
            this.imageList = []
            let that = this
            var reader = new FileReader();
            reader.readAsDataURL(fileList[0].raw);
            reader.onload = function(e){ 
                this.result // 这个就是base64编码了
                that.imageUrl = this.result
                that.isUploadFile = true
                if (hasString(this.result,'data:application/pdf;base64,')){
                    that.submitHandler(fileList)
                } else {
                    that.imageList.push(this.result)//this.imageUrl.replace(/data:.*?;base64,/,''))
                }
            }
        },
        handleClose(done) {
            this.showUpdate = false
            this.isUploadFile =false
            this.imageUrl = ''
        },
        submitHandler (fileList) {
            this.loading = true
            const fObj = new FileReader()
            fObj.readAsDataURL(fileList[0].raw);
            fObj.onloadend = e => {
                this.transformImage(e.target.result)
            }
        },
        async transformImage (value) {
            // const pdfList = document.querySelector('.pdfList')
            // if (pdfList) {
            //     var child = pdfList.lastElementChild;  
            //     while (child) { 
            //         pdfList.removeChild(child); 
            //         child = pdfList.lastElementChild; 
            //     } 
            // }
            const loadingTask = PDFJS.getDocument(value)
            loadingTask.promise.then(async (pdf) => {
                // pdf 总页数
                let pages = pdf.numPages //声明一个pages变量等于当前pdf文件的页数
                for (let i = 1; i <= pages; i++) { //循环页数
                    let canvas = document.createElement('canvas')
                    canvas.width = 200
                    let page = await pdf.getPage(i) //调用getPage方法传入当前循环的页数,返回一个page对象
                    let scale = this.scale;//缩放倍数，1表示原始大小
                    let viewport = page.getViewport({ scale });
                    let context = canvas.getContext('2d'); //创建绘制canvas的对象
                    canvas.height = viewport.height; //定义canvas高和宽
                    canvas.width = viewport.width;
                    let renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };
                    await page.render(renderContext)
                    canvas.className = `canvas-${i}` //给canvas节点定义一个class名,这里我取名为canvas
                    this.imageList.push(canvas.toDataURL('image/png'))
                    // pdfList.appendChild(canvas) //插入到pdfList节点的最后
                }
                this.loading = false
                // console.log(pdfList.toDataURL('image/png'))
            })
            // html2canvas(newPdfList).then(canvas => {
            //     let dataURL = canvas.toDataURL("image/png");
            //     console.log(dataURL)
            // })
        },
        openFullScreen2() {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            setTimeout(() => {
            loading.close();
            }, 2000);
        },
        async useOcr () {
            // console.log(this.imageList)
            let that = this
            let loading = Loading.service({fullscreen: true, text: `正在识别【 0 / ${that.imageList.length} 】`})
            that.resList = []
            for (let i = 0; i < that.imageList.length; i++) {
                await that.getOcr(that.imageList[i].replace(/data:.*?;base64,/,'')).then((res)=>{
                    loading.setText(`已识别 【 ${i+1} / ${that.imageList.length} 】`)
                    that.resList.push(res)
                    that.resText = that.resText  + that.getOneText(res.raw_out)
                }).catch(err => {
                    console.log(err)
                    loading.close()
                    that.$message.error('识别失败')
                })
            }
            loading.close()
            that.$message.success('识别完成')
        },
        getOneText(raw_data){
            var ocrText = ''
            let nextLineHeight = 0
            for (let i = 0; i < raw_data.length; i++) {
                if (i < raw_data.length - 1) { 
                    nextLineHeight = raw_data[i + 1][0][1]
                    if ( Math.abs(raw_data[i][0][1] - nextLineHeight) < raw_data[i][0][3] / 2 ) {
                        ocrText += raw_data[i][1] + ' '
                    } else {
                        ocrText += raw_data[i][1] + '\n'
                    }
                } else {
                    ocrText += raw_data[i][1]
                }
            }
            ocrText ='<p>'+ ocrText.replace(/\n*$/g,'').replace(/\n/g,'</p><p>')+'</p>'
            return ocrText
        },
        showOcrDialog(){
            this.handleClose()
            this.showOcr = true
        },
        checkOcr(){
            // this.getChildInfo(数据)
            this.$emit('onChange',this.resText)
            this.showOcr = false
            this.imageList = []
            this.resText=''
        }
    }
}
</script>
<style lang="scss" scoped>
.ocr-button{
    font-size: 12px;
    // color: #525252;
    cursor:pointer;
    &:hover {
        color: #409EFF;
        border-bottom: 1px solid #409EFF;
    }
}
.upload-box {
    width: 100%;
    height: 30vh !important;
    display: flex;
    justify-content: center;    /* 实现子元素在父元素中的水平居中 */
    align-items: center;        /* 实现子元素在父元素中的垂直居中 */
}
::v-deep .el-upload-dragger {
    width: 50vw;
    display: flex;
    justify-content: center;    /* 实现子元素在父元素中的水平居中 */
    align-items: center;        /* 实现子元素在父元素中的垂直居中 */
}
</style>