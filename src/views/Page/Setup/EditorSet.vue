<template>
    <div class="editor-setup-page">
        <div style="margin-bottom: 10px;border-bottom: 1px solid #c0ccda;;">
            <el-button type="text" @click="back()" size="mini" style="font-size:20px;color:#525252;"><i class="el-icon-arrow-left" style="font-size:20px;"></i>  编辑器设置</el-button>
        </div>

        <div style="padding: 0 15px;">
          <el-form label-position="right" label-width="200px">
            <el-form-item label="Mavon Editor 代码样式切换">
              <el-select v-model="codeStyle" filterable placeholder="请选择" style="width:50%">
                <el-option
                    v-for="(item,index) in codeStyleList"
                    :key="index"
                    :label="item"
                    :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="OCR-识别功能接口切换">
              <el-input v-model="ocrApi" placeholder="请输入OCR识别接口地址"  style="width:50%"></el-input>
            </el-form-item>
            <el-form-item label="AI-智能续写接口切换">
              <el-input v-model="aiApi" placeholder="请输入AI智能续写接口地址"  style="width:50%"></el-input>
            </el-form-item>
            <el-form-item label="AI-智能续写返回字数">
              <el-input-number v-model="aiNum" :min="10" :max="500" label="智能续写返回字数" style="width:50%"></el-input-number>
              <!-- <el-input v-model="aiApi" placeholder="请输入AI智能续写接口地址"  style="width:50%"></el-input> -->
            </el-form-item>
          </el-form>
        </div>

    </div>
    
</template>

<script>
import codeStyleList from "@/assets/codeStyle.json"
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      userId: window.sessionStorage.getItem('userid'),
      codeStyleList:codeStyleList.codeStyle,
    //   codeStyle:"",
    }
  },
  created () {
    // console.log(this.chosecolor)
  },
  mounted() {
    //   let that = this
    //   that.codeStyle = "vs2015";
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
    ...mapMutations('storeData', ['setColor', 'setCodeStyle','setOcrApi','setAiApi','setAiNum']),
    back(){
      this.$router.go(-1)
    },
  }
}
</script>

<style lang="scss" scoped>
.editor-setup-page {
  height: 100%;
}
.el-empty {
  height: 100%;
}
// 使用CSS预处理器scoped让样式只在局部页面生效
</style>
