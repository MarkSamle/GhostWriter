<template>
    <div class="head" style="width:100%;" :style="{'background-color':chosecolor}">
        <!-- 行元素 -->
        <el-row class="head-box" style="height:100%;width:100%;">
            <el-col :span="4" style="height:100%;">
                <div style="height:100%;display: flex;align-items: center;margin-left:10px;">
                    <el-button type="text" @click="back" :style="{'color':chosecolor,'filter': 'invert(100%)','font-size': '20px','padding': '0'}" ><i class="el-icon-d-arrow-left"></i></el-button>
                    <span :style="{'color':chosecolor,'filter': 'invert(100%)','font-size': '15px','padding': '0','margin-left': '5px'}">{{title}}</span>
                </div>
            </el-col>
          <!-- 左侧输入框 -->
          <el-col :span="12" style="height:100%;">
            <div style="margin-left:30%;width:60%;height:100%;display: flex;align-items: center;">
              <el-input size="mini" v-model="childSearch" clearable @change="onSearchChange">
                <i class="el-icon-search el-input__icon" slot="suffix" @click="handleIconClick" style="cursor:pointer;" ></i>
              </el-input>
            </div>
          </el-col>
          <!-- 右侧功能按钮组 -->
          <el-col :span="6" style="height:100%;">
            <div style="display: flex;align-items: center;height:100%;justify-content: flex-end;" v-if="showButton">
              <el-button type="text" @click="open" :style="{'color':chosecolor,'filter': 'invert(100%)','font-size': '15px','padding': '0'}">{{button}}</el-button>
            </div>
          </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'myHead',
    data () {
        return {
            childSearch: '',
        }
    },
    props: {
        title: {
            type: String,
            require: true,
            default: ''
        },
        button: {
            type: String,
            require: true,
            default: ' + '
        },
        showButton: {
            type: Boolean,
            require: true,
            default: true
        }
    },
    mounted () {},
    watch: {
        childSearch(){ this.$emit('onChange',this.childSearch);} 
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
        ...mapGetters('storeData', [
            'storeDataFrom'
        ])
    },
    methods: {
        ...mapMutations('storeData', ['setColor', ]),
        // 返回
        back() {
            this.$emit('back');
        },
        // 查询
        onSearchChange() {
            this.$emit('onSearch');
        },
        // 查询
        handleIconClick() {
            this.$emit('handle');
        },
        // 打开
        open() {
            this.$emit('open');
        },
    }
}
</script>

<style lang="scss" scoped>
.head {
    width: 100%;
    height: 40px;
    border-bottom: 2px solid #e9e9e9e0;
    position: fixed;
    top: 30px;
    // top: 30;
  }
</style>