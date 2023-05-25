<template>
    <div class="head" style="width:100%;" :style="{'background-color':chosecolor}">
        <!-- 折叠按钮 -->
        <div style="width:50px;height:100%;display: flex;align-items: center;margin-left:10px;float:left;">
            <el-button type="text" @click="showTable" :style="{'color':chosecolor,'filter': 'invert(100%)','font-size': '20px','padding': '0'}" ><i class="el-icon-s-operation"></i></el-button>
        </div>
        <el-row class="head-box" style="height:100%;width:calc(100% - 60px);float:right;">
            <!-- 标题输入框 -->
            <el-col :span="12" style="height:100%;">
                <div style="height:100%;display: flex;align-items: center;">
                    <el-input size="mini" v-model="docName" placeholder="请输入标题" clearable :disabled="disabled"></el-input>
                </div>
            </el-col>
            <!-- 保存按钮 -->
            <el-col :span="10" style="height:100%;">
                <div style="height:100%;display: flex;align-items: center;justify-content: flex-end;">
                    <el-button type="text" @click="back" :style="{'color':chosecolor,'filter': 'invert(100%)','font-size': '15px','padding': '0', 'margin-left': '10px'}">返回</el-button>
                    <el-button type="text" @click="save" :style="{'color':chosecolor,'filter': 'invert(100%)','font-size': '15px','padding': '0'}">{{button}}</el-button>
                    <el-button type="text" @click="add" :style="{'color':chosecolor,'filter': 'invert(100%)','font-size': '15px','padding': '0'}" v-if="showAdd">{{button2}}</el-button>
                    <el-button type="text" @click="backHome" :style="{'color':chosecolor,'filter': 'invert(100%)','font-size': '15px','padding': '0', 'margin-left': '10px'}">
                        <i class="el-icon-s-home"></i>首页
                    </el-button>
                </div>
            </el-col>   
        </el-row>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'myEditHead',
    data () {
        return {
            docName: this.default,
        }
    },
    props: {
        default: {
            type: String,
            require: true,
            default: ''
        },
        button: {
            type: String,
            require: true,
            default: '保存'
        },
        button2: {
            type: String,
            require: true,
            default: '新建文档'
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        showAdd: {
            type: Boolean,
            required: false,
            default: false
        },
    },
    mounted () {},
    watch: {
        docName(){ this.$emit('onChange',this.docName);} 
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
        ...mapGetters('storeData', [ 'storeDataFrom' ])
    },
    methods: {
        ...mapMutations('storeData', ['setColor', ]),
        // 折叠
        showTable() {
            this.$emit('showTable');
        },
        // 保存
        save() {
            this.$emit('save');
        },
        add(){
            this.$emit('add');
        },
        // 返回
        back() {
            this.$emit('back');
        },
        backHome(){
            let that = this
            if (this.$router.history.current.name == 'mdeditor') {
                that.$confirm('是否已经保存数据?', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(function () {
                    that.$router.push('/home')
                })
            } else {
                that.$router.push('/home')
            }
            
            
        }
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