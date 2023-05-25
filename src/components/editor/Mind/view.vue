<template>
    <div id="diagramsView" class="diagrams-editor">
      <div id="xfc" ></div>
    </div>
</template>

<script>
import xfc from '@oxoyo/xfc'
import '@oxoyo/xfc/dist/xfc.css'
import { getToolList, getShortcutMap, getMaterials } from './tools'
export default {
  name: 'diagramsView',
  data() {
    return {
      xfcEditor: null,
    };
  },
  props: {
    default: {
      type: String,
      require: true,
      default: '{"nodes":[],"edges":[],"combos":[],"groups":[]}'
    },
  },
  mounted() {
    this.init()
  },
  created () {
  },
  methods: {
    init(){
      const system = {
        version: '1.1.1',
        name: 'ChostWriter',
        author: 'Samle',
        description: 'ChostWriter',
        title: 'ChostWriter',
        logo: require('@/assets/logo.png'),
        github: 'https://github.com/OXOYO/X-Flowchart-Vue',
        githubPages: 'http://oxoyo.co/X-Flowchart-Vue/',
        feedback: 'https://github.com/OXOYO/X-Flowchart-Vue/issues/new',
        copyright: 'XFC ©2019 - 2020 OXOYO All Rights Reserved.',
      }
      // 初始化
      this.xfcEditor = xfc({
        el: '#xfc', 
        props: { 
          system: system,
          tools: {
            toolList: getToolList(),
            shortcutMap: getShortcutMap()
          },
          materials: getMaterials(),
        },
      })
      this.$nextTick(function () {
        console.log(this.default)
        if (this.default != null && this.default != '') {
          this.xfcEditor.read(JSON.parse(this.default))
        } else {
          this.xfcEditor.read({"nodes":[],"edges":[],"combos":[],"groups":[]})
        }
        console.log(this.xfcEditor)
        // 设置编辑器缩放
        this.xfcEditor.editorRef.doZoom({ name: 'actualSize' })
        // this.xfcEditor.editorRef.handleEditorClick()
        // 设置编辑器状态：add || edit || preview
        this.xfcEditor.editorRef.doSetMode('preview')
      })
      // 保存图片
      // xfcEditor.downloadImage()
    },
    getEditorData(){
      return this.xfcEditor.save()
    },
    getEditorImage(){
      return this.xfcEditor.downloadImage()
    }
  },
}
</script>

<style lang="scss" scoped>
.diagrams-editor {
  height: calc(100vh - 75px) !important;
}
#xfc {
  height: inherit !important;
  width: inherit !important;
  position:relative !important;
}
::v-deep .materials-editor{
  position: relative !important;
}
::v-deep .tool-bar{
  position: absolute !important;
}

::v-deep .card-body::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::v-deep .card-body::-webkit-scrollbar-track {
  background-color:#F5F5F5;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius:2em;
}
::v-deep .card-body::-webkit-scrollbar-thumb {
  background-color:#565252;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius:2em;
}
::v-deep .sketchpad-box::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::v-deep .sketchpad-box::-webkit-scrollbar-track {
  background-color:#F5F5F5;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius:2em;
}
::v-deep .sketchpad-box::-webkit-scrollbar-thumb {
  background-color:#565252;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius:2em;
}

</style>