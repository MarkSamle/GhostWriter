<template>
  <div class="markdown-container">
    <div class="container">
      <!-- 编辑器主体 -->
      <mavon-editor v-model="content" ref="md" style="height: calc(100vh - 70px);width: 100%;"
        @imgAdd="imgAdd"
        @imgDel="imgDel"
        @change="change"
        :ishljs = "true"
        :toolbars="toolbars"
        :codeStyle="codeStyle"
        :externalLink="externalLink"
        :html="true"
        :xssOptions="{
            whiteList: {
              iframe: ['src', 'height', 'width'],
              div: ['style', 'height', 'width', 'align'],
              img: ['style', 'height', 'width', 'align','src'],
              span: ['style', 'height', 'width', 'align'],
              a: ['target','href'],
              p:[]
            },
          }"
      >
      <template v-slot:left-toolbar-after>
        <!--打开上传视频对话框-->
        <el-button type="text" @click="dialogFormVisible=true" aria-hidden="true" class="op-icon fa" title="插入视频资源">
          <i class="el-icon-video-camera-solid" />
        </el-button>
        <!-- 打开添加附件对话框 -->
        <el-button type="text" @click="fileDialogFormVisible=true" aria-hidden="true" class="op-icon fa" title="插入附件资源">
          <i class="el-icon-upload" />
        </el-button>

        <el-button type="text" @click="aiwriter" aria-hidden="true" class="op-icon fa" title="智能续写">
          <i class="el-icon-edit" />
        </el-button>

        <ocrShowView style="float:left;width:30px;" @onChange="(val)=>{ocrResText=val}"></ocrShowView>
      </template>
     </mavon-editor>

     <!-- 插入视频链接的dialog提示框，表单对话框 -->
    <el-dialog title="插入视频资源" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="视频链接" :label-width="formLabelWidth">
          <el-input v-model="form.link" autocomplete="off" style="width:100%;">
            <el-upload slot="append"
              v-if="form.region == 'update'"
              accept=".mp4, .avi"
              class="upload-box"
              action=""
              :show-file-list="false"
              :auto-upload="false"
              :multiple="false"
              :file-list="files"
              :on-change="changeFile">
              <el-button slot="trigger" size="small" >直接上传</el-button>
            </el-upload>
          </el-input>
        </el-form-item>
        <el-form-item label="链接类型" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择链接类型" style="width:100%;">
            <el-option label="iframe标签" value="iframe"></el-option>
            <el-option label="url链接" value="url"></el-option>
            <el-option label="直接上传" value="update"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="videoLink">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 插入附件资源 -->
    <el-dialog title="插入附件资源" :visible.sync="fileDialogFormVisible">
      <el-form :model="form">
        <el-form-item label="附件地址" :label-width="formLabelWidth">
          <el-input v-model="form.link" autocomplete="off" style="width:100%;">
            <el-upload slot="append"
              v-if="form.region == 'update'"
              class="upload-box"
              action=""
              :show-file-list="false"
              :auto-upload="false"
              :multiple="false"
              :file-list="files"
              :on-change="changeFile">
              <el-button slot="trigger" size="small" >直接上传</el-button>
            </el-upload>
          </el-input>
        </el-form-item>
        <el-form-item label="地址类型" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择地址类型" style="width:100%;">
            <el-option label="外部链接" value="url"></el-option>
            <el-option label="直接上传" value="update"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="fileDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="FileLink">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 错误提示框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" id="link-error">
      <span>资源格式错误，请重新确认后再输入！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    </div>
  </div>
</template>

<script>
//该组件中注释掉的代码为局部注册的方式。
import { mapGetters, mapMutations } from 'vuex'
import { mavonEditor } from "mavon-editor";
import { getMonth,getNowStr } from '@/database/api/unit.js'
import { addFiles } from '@/database/api/files.js'
import ocrShowView from '@/components/page/ocr/index.vue'
import axios from "axios"
import { Loading } from 'element-ui'
// import codeStyleList from "@/assets/codeStyle.json"
import "mavon-editor/dist/css/index.css";
const fs = window.require('fs')
const path = require("path")
export default {
  components: { mavonEditor,ocrShowView },
  data: function() {
    return {
      // screenWidth: null,
      files: [],
      upPath: '',
      dialogFormVisible: false,	// 用于控制表单对话框的开启和关闭
      fileDialogFormVisible: false,
      dialogVisible: false,		// 用于控制错误提示对话框的开启和关闭
      formLabelWidth: '120px',	// 设定表单对话框内表单是宽度
      form: {		// 表单对话框内表单的数据
        link: '',
        region: 'update'
      },
      userId: window.sessionStorage.getItem('userid'),
      // codeStyleList:codeStyleList.codeStyle,
      content:this.default,
      // codeStyle:"",
      toolbars: {
        header: true, // 标题
        bold: true, // 粗体
        italic: true, // 斜体
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: false, // 全屏编辑
        readmodel: false, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      externalLink: {
        markdown_css: function() {
          // 这是你的markdown css文件路径
          return '/mavon-editor/markdown/github-markdown.min.css';
        },
        hljs_js: function() {
          // 这是你的hljs文件路径
          return '/mavon-editor/highlightjs/highlight.min.js';
        },
        hljs_css: function(css) {
          // 这是你的代码高亮配色文件路径
          return '/mavon-editor/highlightjs/styles/' + css + '.min.css';
        },
        hljs_lang: function(lang) {
          // 这是你的代码高亮语言解析路径
          return '/mavon-editor/highlightjs/languages/' + lang + '.min.js';
        },
        katex_css: function() {
          // 这是你的katex配色方案路径路径
          return '/mavon-editor/katex/katex.min.css';
        },
        katex_js: function() {
          // 这是你的katex.js路径
          return '/mavon-editor/katex/katex.min.js';
        },
      },
      ocrResText: '',
    };
  },
  props: {
      default: {
        type: String,
        require: true,
        default: ''
      },
    },
  watch: {
    ocrResText(){
      if (this.ocrResText != ''){
        // 获取文本域中当前光标起始位置、结束位置以及滚动条位置（滚动条位置我认为没有必要，如有需要可以自己取消注释）
        let textarea = document.getElementsByClassName("auto-textarea-input")[0];
        let posStart = textarea.selectionStart;
        let posEnd = textarea.selectionEnd;
        let subStart = this.$refs.md.d_value.substring(0, posStart);
        let subEnd = this.$refs.md.d_value.substring(posEnd, this.$refs.md.d_value.length);
        // 拼接并替换文本域内容
        let resText = this.ocrResText.replace(/<p>/g,'')
        resText = resText.replace(/<\/p>/g,'\n')
        this.$refs.md.d_value = subStart + '\n' + resText  + '\n' + subEnd;
      }
    }
    // screenWidth: {
    //   // 宽度变化时修改编辑器高度
    //   handler: function (val) {
    //     // console.log(val)
    //   },
    //   immediate: true,
    //   deep:true
    // },
  },
  created () {
    this.testDir('media')
  },
  mounted() {
    // console.log('代码样式:',this.codeStyle)
    // this.screenWidth = document.body.clientWidth
    // window.onresize = () => {
    //   return (() => {
    //     this.screenWidth = document.body.clientWidth
    //   })()
    // }
    // let that = this
    // that.codeStyle = "vs2015";//"github";
    // that.content="``` ```";
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
    codeStyle: {
        get () {
            return this.$store.state.storeData.myCodeStyle
        },
        set (value) {
            this.setCodeStyle(value)
        }
    },
    aiApi: {
      get () {
        return this.$store.state.storeData.myAiApi
      },
      set (value) {
        this.setAiApi(value)
      }
    },
    aiNum: {
      get () {
        return this.$store.state.storeData.ainum
      },
      set (value) {
        this.setAiNum(value)
      }
    },
    ...mapGetters('storeData', [ 'storeDataFrom' ])
  },
  methods: {
    ...mapMutations('storeData', ['setColor', 'setCodeStyle','setAiApi','setAiNum']),
    imgDel(pos){
      // console.log(pos);
    },
    async getAiApi(context,num) {
      const obj = new FormData()
      obj.append('context',  context)
      obj.append('num', num)
      const { data: res } = await axios.post(this.aiApi, obj)
      return res.data
    },
    async aiwriter(){
      let that = this
      let loading = Loading.service({fullscreen: true, text: `AI续写中……`})
      // 获取文本域中当前光标起始位置、结束位置以及滚动条位置（滚动条位置我认为没有必要，如有需要可以自己取消注释）
      let textarea = document.getElementsByClassName("auto-textarea-input")[0];
      let posStart = textarea.selectionStart;
      let posEnd = textarea.selectionEnd;
      let subStart = this.$refs.md.d_value.substring(0, posStart);
      let subEnd = this.$refs.md.d_value.substring(posEnd, this.$refs.md.d_value.length);
      // console.log(subStart,subEnd)
      await this.getAiApi(subStart,this.aiNum).then((res)=>{
        // console.log(res)
        that.$refs.md.d_value = subStart + res.data[0] + subEnd;
        loading.close()
      }).catch(err => {
        console.log(err)
        loading.close()
        that.$message.error('接口异常')
      })
    },
    // 用于判断文件夹是否存在，不存在就创建
    testDir(dirname){
      var dirPath = path.join(__static.replace('app.asar','app'),dirname)
      const isExistDir = fs.existsSync(dirPath)
      if (!isExistDir) {
        fs.mkdirSync(dirPath)
      }
    },
    // 将图片上传到服务器，返回地址替换到md中
    imgAdd(pos, $file) {
      // 获取图片缓存
      var buffer = fs.readFileSync($file.path)
      // 判断有没有当月文件夹，没有则创建
      const dirname = 'media/' + getMonth()
      this.testDir(dirname)
      // 保存图片
      const imgname = dirname + '/' + getNowStr() + '.png'
      this.$db = addFiles(this.$db,{path:imgname,userby:this.userId})
      const savePath = path.join(__static.replace('app.asar','app'),imgname)
      fs.writeFileSync(savePath, buffer)
      // 返回相对地址
      this.$refs.md.$img2Url(pos, '/' + imgname);
    },
    change(value, render) {
      // render 为 markdown 解析后的结果
      this.$emit('onChange',{val:value,data:render});
    },
    changeFile(file, fileList) {
      if (fileList.length > 1) {
          fileList.splice(0, 1)
      }
      if (fileList[0].raw.path == '') return
      var filebuffer = fs.readFileSync(fileList[0].raw.path)
      let houzui = fileList[0].raw.path.substring(fileList[0].raw.path.lastIndexOf("."))
      // 判断有没有当月文件夹，没有则创建
      const dirname = 'media/' + getMonth()
      this.testDir(dirname)
      // 保存视频
      const fileName = dirname + '/' + getNowStr() + houzui
      // this.$db = addFiles(this.$db,{path:fileName,userby:this.userId})
      const savePath = path.join(__static.replace('app.asar','app'),fileName)
      fs.writeFileSync(savePath, filebuffer)
      // 返回相对地址
      // this.$refs.md.$img2Url(pos, '/' + fileName);
      this.form.link = '/' + fileName
    },
    videoLink() {
    	// 准备链接模板
      let linkFrame = '';
      let linkFrameStart = "<div align=center width=100%><iframe height=300 width=80% src='"
      let linkFrameEnd = "' frameborder=0 'allowfullscreen'></iframe></div>"
      // 创建一个div盒子，为提取src做准备
      var box = document.createElement("div");
      // 将原始链接插入到盒子中
      box.innerHTML=this.form.link;
      // 判断不同的视频原链接类型
      if(this.form.region == "url"){
        linkFrame = linkFrameStart + this.form.link + linkFrameEnd;
      }else if(this.form.region == "update") {
        linkFrame = linkFrameStart + this.form.link + linkFrameEnd;
      }else if(this.form.region == "iframe" && box.getElementsByTagName("iframe").length > 0) {
        // 从iframe标签中提取src属性
        linkFrame = linkFrameStart + box.getElementsByTagName("iframe")[0].getAttribute("src") + linkFrameEnd;
      }else {
        // 原始链接格式错误时弹出错误提示
        this.dialogFormVisible=false;
        this.dialogVisible=true;
      }
      // 获取文本域中当前光标起始位置、结束位置以及滚动条位置（滚动条位置我认为没有必要，如有需要可以自己取消注释）
      let textarea = document.getElementsByClassName("auto-textarea-input")[0];
      let posStart = textarea.selectionStart;
      let posEnd = textarea.selectionEnd;
      // let posScroll = document.getElementsByClassName("v-note-edit")[0].scrollTop;
      // 获取文本域中未选中的的前半部分和后半部分，以被选中内容起始和结束位置做分割点
      let subStart = this.$refs.md.d_value.substring(0, posStart);
      let subEnd = this.$refs.md.d_value.substring(posEnd, this.$refs.md.d_value.length);
      // 拼接并替换文本域内容
      this.$refs.md.d_value = subStart + '\n' + linkFrame + '\n' + subEnd;
      // document.getElementsByClassName("v-note-edit")[0].scrollTop = posScroll;
      // 关闭对话框
      this.dialogFormVisible = false;
      // 复原表单文本框内容
      const fileName = this.form.link .split(1)
      this.form.link = '';
      this.form.region = '';
      this.$db = addFiles(this.$db,{path:fileName,userby:this.userId})
    },
    FileLink() {
    	// 准备链接模板 这种点击不了
      // <a :href="/media/2022_11/2022_11_13_01_04_33.xlsx" target="downloadFile">测试</a>
      // <iframe style="display: none;" name="downloadFile"></iframe>
      let linkFrame = '';
      if (this.form.region == "url" || this.form.region == "update"){
        linkFrame = `[【附件：${this.form.link}】](${this.form.link})`
      } else {
        // 原始链接格式错误时弹出错误提示
        this.fileDialogFormVisible=false;
        this.dialogVisible=true;
      }
      // 获取文本域中当前光标起始位置、结束位置以及滚动条位置（滚动条位置我认为没有必要，如有需要可以自己取消注释）
      let textarea = document.getElementsByClassName("auto-textarea-input")[0];
      let posStart = textarea.selectionStart;
      let posEnd = textarea.selectionEnd;
      // let posScroll = document.getElementsByClassName("v-note-edit")[0].scrollTop;
      // 获取文本域中未选中的的前半部分和后半部分，以被选中内容起始和结束位置做分割点
      let subStart = this.$refs.md.d_value.substring(0, posStart);
      let subEnd = this.$refs.md.d_value.substring(posEnd, this.$refs.md.d_value.length);
      // 拼接并替换文本域内容
      this.$refs.md.d_value = subStart + '\n' + linkFrame + '\n' + subEnd;
      // document.getElementsByClassName("v-note-edit")[0].scrollTop = posScroll;
      
      // 关闭对话框
      this.fileDialogFormVisible = false;
      // 复原表单文本框内容
      const fileName = this.form.link .split(1)
      this.form.link = '';
      this.form.region = '';
      this.$db = addFiles(this.$db,{path:fileName,userby:this.userId})
    },

  }
};
</script>

<style lang="sass" scoped>

.markdown-container
  .title-tag-type-content
    margin-bottom: 20px
    .title
      font-size: 30px
      font-weight: bold
    .title-item
      display: flex
      margin-bottom: 10px
      line-height: 40px
      .title-div
        width: 100px
        font-size: 18px
        font-weight: bold
      .title-input
        font-size: 16px
        font-weight: bold
        height: 40px
        width: 1100px
    .sketch-item
      display: flex
      margin-bottom: 10px
      line-height: 40px
      .sketch-div
        width: 100px
        font-size: 18px
        font-weight: bold
      .sketch-textarea
        font-size: 16px
        width: 1100px
    .tag-type-item
      display: flex
      line-height: 40px
      font-size: 18px
      font-weight: bold
      .type-div
        width: 100px
      .select-category
        width: 150px
      .tag-div
        margin-left: 20px
        width: 60px
      .select-tag
        width: 300px
      .button-item
        display: flex
        margin-left: auto
        .drafts
          height: 40px
        .issue
          height: 40px
  .container
    width: 100%
    .v-note-wrapper
      z-index: 1499 !important
      border-radius: 0px
    .v-note-wrapper.fullscreen
      z-index: 1501 !important
      border-radius: 0px
  .editor-btn
    margin-top: 10px
</style>