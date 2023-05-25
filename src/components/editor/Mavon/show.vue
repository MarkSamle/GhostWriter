<template>
    <div class="markdown-container">
      <div class="container">
        <mavon-editor
            class="markdown"
            ref="md"
            :value="content"
            :subfield="false"
            :ishljs = "true"
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
            defaultOpen="preview"
            :toolbars="toolbars"
            :editable="false"
            :scrollStyle="true"
            :toolbarsFlag="toolShow"
            :style="editorStyle"
        ></mavon-editor>
        <!-- :toolbarsFlag="false" -->
        <!-- <mavon-editor
            v-model="content"
            ref="md"
            @imgAdd="imgAdd"
            @imgDel="imgDel"
            @change="change"
            style="height: calc(100vh - 70px);width: 100%;"
            :ishljs = "true"
            :toolbars="toolbars"
            :codeStyle="codeStyle"
            :externalLink="externalLink"
        /> -->
      </div>
    </div>
  </template>
  <script>
  //该组件中注释掉的代码为局部注册的方式。
  import { mapGetters, mapMutations } from 'vuex'
  import { mavonEditor } from "mavon-editor";
  import "mavon-editor/dist/css/index.css";
  // import codeStyleList from "@/assets/codeStyle.json"
  export default {
    components: { mavonEditor },
    data: function() {
      return {
        // screenWidth: null,
        // codeStyleList:codeStyleList.codeStyle,
        // content:this.default,
        // codeStyle:"",
        toolbars: {
          header: false, // 标题
          bold: false, // 粗体
          italic: false, // 斜体
          underline: false, // 下划线
          strikethrough: false, // 中划线
          mark: false, // 标记
          superscript: false, // 上角标
          subscript: false, // 下角标
          quote: false, // 引用
          ol: false, // 有序列表
          ul: false, // 无序列表
          link: false, // 链接
          imagelink: false, // 图片链接
          code: false, // code
          table: false, // 表格
          fullscreen: false, // 全屏编辑
          readmodel: false, // 沉浸式阅读
          htmlcode: false, // 展示html源码
          help: false, // 帮助
          /* 1.3.5 */
          undo: false, // 上一步
          redo: false, // 下一步
          trash: false, // 清空
          save: false, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: false, // 左对齐
          aligncenter: false, // 居中
          alignright: false, // 右对齐
          /* 2.2.1 */
          subfield: false, // 单双栏模式
          preview: false // 预览
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
      };
    },
    props: {
        content: {
          type: String,
          require: true,
          default: ''
        },
        toolShow: {
          type: Boolean,
          require: true,
          default: true
        },
        editorStyle: {
          type: String,
          require: true,
          default: "height: calc(100vh - 70px);width: 100%;"
        }
      },
    watch: {
      // screenWidth: {
      //   // 宽度变化时修改编辑器高度
      //   handler: function (val) {
      //     // console.log(val)
      //   },
      //   immediate: true,
      //   deep:true
      // },
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
      ...mapGetters('storeData', [ 'storeDataFrom' ])
    },
    methods: {
      ...mapMutations('storeData', ['setColor', 'setCodeStyle']),
      imgDel(pos){
        console.log(pos);
      },
      // 将图片上传到服务器，返回地址替换到md中
      imgAdd(pos, $file) {
        console.log($file);
      },
      change(value, render) {
        // render 为 markdown 解析后的结果
        this.$emit('onChange',{val:value,data:render});
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