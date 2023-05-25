<template>
    <div class="collect-view-page">
        <el-container  style="height:100%;">
            <!-- 左侧操作台 -->
            <el-aside width='280px' v-if="isCollapse" style="height:100%;background-color:#FFFFFF;border-right: 1px solid #E4E7ED;">
                <div style="height:10px;"></div>
                <div style="width: 100%;height: 30px;display: flex;align-items: center;justify-content: center;">
                    <!-- <div><span style="font-size:20px;font-weight:600;">Ghost Writer</span></div> -->
                    <!-- <el-input style="width: 90%;" v-model="search" placeholder="在文集内搜索文档" clearable ></el-input> -->

                    <el-input style="width: 90%;" v-model="search" placeholder="在文集内搜索文档" clearable @change="getDocList">
                        <i class="el-icon-search el-input__icon" slot="suffix" @click="getDocList" style="cursor:pointer;" ></i>
                    </el-input>

                </div>
                <div style="height:5px;"></div>
                <div style="width: 100%;height: 25px;display: flex;align-items: center;justify-content: center;">
                    <div><span style="font-size:12px;font-weight:300;">你正在 <span style="font-size:12px;font-weight:600;">查看文集</span></span></div>
                </div>
                <!-- 选择所属文集 -->
                <div class="card-title" :style="{'color':chosecolor}" :title="collectData.name" ><i :class="collectData.icon"></i>
                    <span style="margin-left:10px;">{{collectData.name}}</span></div>
                <!-- 文档树结构 style="width: inherit;"  -->
                <div style="overflow-x:auto;overflow-y: auto;height: calc(100% - 120px);width: 260px;padding:5px;margin-left:5px;" class="doc-list">
                    <el-tree 
                    :data="docList" 
                    :props="defaultProps"
                    @node-click="handleNodeClick"
                    :default-expand-all="true"
                    :highlight-current="true"
                    ></el-tree>
                </div>
                
            </el-aside>
            <el-main>
                <!-- 头部 -->
                <myEditHead :style="isCollapse?'width:calc(100% - 330px)':'width:calc(100% - 50px)'"
                    :disabled="true"
                    :default="collectData.name"
                    button="新建文档"
                    @showTable="isCollapse = !isCollapse"
                    @save="addNewDoc"
                    @back="back"
                    ></myEditHead>
                <div style="height:40px;" ></div>
                <!-- 信息面板 -->
                <div style="height: calc(100vh - 70px);width: 100%;">
                    <el-tabs v-model="activeName" @tab-click="handleClick" style="padding:0px 10px" ref="myTab">
                        <el-tab-pane label="文集简介" name="remark">
                            <div style="padding:0px 15px;height:calc(100vh - 130px);">
                                <MdShow :content="collectData.remark" :toolShow="false" editorStyle="height:calc(100vh - 140px) !important;"/>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="文集目录" name="contents">
                            <div style="padding:0px 15px;height:calc(100vh - 130px);overflow-y: auto;" class="menuList-box">
                                <menuList :menuData="docList" style="width:100%" ref="menuList" @onClick="handleNodeClick"></menuList>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="最新文档" name="lastdoc">
                            <div style="padding:0px 15px;height:calc(100vh - 130px);overflow-y: auto;">
                                <div v-for="(newdoc,index) in collectData.doc.list" :key="index" class="docList-item">
                                    <div class="docList-item-name-box" @click="toDoc(newdoc)"><span class="docList-item-name">{{newdoc.name}}</span></div>
                                    <div class="docList-item-text-box">
                                        <div class="docList-item-text">
                                            <!-- <span :v-html="newdoc.html"></span> -->
                                            {{makeText(restartReplaceSpecial(newdoc.md))}}
                                        </div>
                                    </div>
                                    <div class="docList-item-time-box"><span class="docList-item-time">
                                        <i class="el-icon-user-solid"></i> {{userName}} - <i class="el-icon-timer"></i> {{newdoc.update_date}}
                                    </span></div>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-main>
        </el-container>

        <!-- 新建文档信息预填 -->
    <el-dialog title="新建文档" :visible.sync="createDocDialogShow" width="400px">
        <el-form :model="createDocForm" :rules="createDocRules" ref="createDocFormRef">
          <el-form-item label="文档名称" label-width="80px" prop="name">
            <el-input v-model="createDocForm.name" placeholder="请输入文档名称"></el-input>
          </el-form-item>
          <el-form-item label="所属文集" label-width="80px" prop="collect">
            <el-select v-model="createDocForm.collect" filterable clearable placeholder="请选择所属文集" style="width:100%;">
              <el-option
                v-for="item in collectList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
  
          <el-form-item label="使用编辑" label-width="80px" prop="editor">
            <el-select v-model="createDocForm.editor" filterable clearable placeholder="请选择使用编辑器" style="width:100%;">
              <el-option
                v-for="item in editorList"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
  
          <el-form-item label="文档说明" label-width="80px" prop="remark">
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入120字以内的文档说明" maxlength="120" show-word-limit v-model="createDocForm.remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="createDocDialogShow = false">取 消</el-button>
          <el-button type="primary" @click="toDocPage">确 定</el-button>
        </div>
      </el-dialog>

    </div>
</template>

<script>
import myEditHead from '@/components/editor/Mavon/head.vue'
import menuList from '@/components/page/menu/index.vue'
import MdShow from '@/components/editor/Mavon/show.vue'
import { getRows,restartReplaceSpecial } from '@/database/api/unit.js'
import { createCollect, getCollect, getCollectById, getOrderCollect } from '@/database/api/collect.js'
import { createTypes,getTypes } from '@/database/api/types.js'
import { createDoc, getDocByCollect, getDocTreeByCollect, getDoc, addDoc, delDoc, updateDoc, getDocBySearch } from '@/database/api/doc.js'
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'MdEditorPage',
    components: {
        MdShow,myEditHead,menuList
    },
    data () {
        return {
            userName: window.sessionStorage.getItem('username'),
            activeName: 'remark',
            search: '',
            userId: window.sessionStorage.getItem('userid'),
            isCollapse: true,
            collectData: {},
            docList: [],
            defaultProps: {
                children: 'child',
                label: 'name'
            },
            editorList: [
                {
                    name: 'Mavon MarkDown',
                    value: 'MarkDown'
                },
                {
                    name: 'Diagrams Editor',
                    value: 'DiagramsEditor'
                },
            ],
            collectList: [],
            createDocDialogShow: false,
            createDocForm: {
                id: '',
                tier: 1,
                name: '',
                collect: null,
                remark: '',
                editor: 'MarkDown'
            },
            createDocRules: {
                name: [
                    { required: true, message: '请输入文档名称', trigger: 'blur' },
                    { max: 50, message: '50 个字符以内', trigger: 'blur' }
                ],
                collect: [
                    { required: true, message: '请选择所属文集', trigger: 'blur' },
                ],
                editor: [
                    { required: true, message: '请选择使用编辑器', trigger: 'blur' },
                ],
            }
        }
    },
    created () {
        this.getCollectList()
        this.getCollectData()
        this.getDocList()
    },
    mounted () {
        this.$refs.myTab.$el.style.setProperty( '--thecolor', this.chosecolor )
        this.$refs.menuList.$el.style.setProperty( '--thecolor', this.chosecolor )
    },
    watch: {
        chosecolor(){
            this.$refs.myTab.$el.style.setProperty( '--thecolor', this.chosecolor )
            this.$refs.menuList.$el.style.setProperty( '--thecolor', this.chosecolor )
        }
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
        collectId: {
            get () {
                return this.$store.state.collectData.collectId
            },
            set (value) {
                this.setCollectId(value)
            }
        },
        docData: {
            get () {
                return this.$store.state.docData
            },
            set (value) {
                this.setDoc(value)
            }
        },
        ...mapGetters('storeData', ['storeDataFrom']),
        ...mapGetters('docData', ['docDataFrom']),
        ...mapGetters('collectData', ['collectDataFrom'])
    },
    methods: {
        restartReplaceSpecial,
        ...mapMutations('storeData', ['setColor', ]),
        ...mapMutations('docData', ['setDoc', ]),
        ...mapMutations('collectData', ['setCollectId', ]),
        // 获取文集数据
        getCollectList(){
            try {
                var param = {userby:this.userId, typ:this.typ, order:this.timeOrder}
                this.collectList = getOrderCollect(this.$db,param)
            } catch {
                createCollect(this.$db)
                createDoc(this.$db)
                var param = {userby:this.userId, typ:this.typ, order:this.timeOrder}
                this.collectList = getOrderCollect(this.$db,param)
            }
        },
        // 获取文集数据
        getCollectData(){
            try {
                this.collectData = getCollectById(this.$db,this.userId,this.collectId)
            } catch {
                this.$router.go(-1)
            }
        },
        // 获取文档列表
        getDocList(){
            // try {
            //     this.docList = getDocTreeByCollect(this.$db,this.userId,this.collectId,this.search)
            // } catch {
            //     createCollect(this.$db)
            //     createDoc(this.$db)
            //     this.docList = getDocTreeByCollect(this.$db,this.userId,this.collectId,this.search)
            // }
            this.docList = getDocTreeByCollect(this.$db,this.userId,this.collectId,this.search)
        },
        // 点击标签切换回调
        handleClick(tab, event) {
            // console.log(tab, event);
        },
        // 返回
        back(){
            this.$router.go(-1)
        },
        // 新增文档
        addNewDoc(){
            this.createDocForm.collect = this.collectId
            this.createDocDialogShow = true
        },
        // 前往编辑页面-创建
        toDocPage(){
            this.$refs.createDocFormRef.validate(async valid => {
                if (!valid) return
                if (this.createDocForm.editor == 'MarkDown') {
                    this.docData = this.createDocForm
                    this.$router.push('/mdeditor')
                } else if (this.createDocForm.editor == 'DiagramsEditor') {
                    this.docData = this.createDocForm
                    this.$router.push('/mindeditor')
                }
            })
        },
        // 点击文集文档列表
        handleNodeClick(data) {
            this.docData = data
            if (this.docData.editor == 'MarkDown') {
                this.$router.push('/mdview')
            } else if (this.docData.editor == 'DiagramsEditor') {
                this.$router.push('/mindview')
            }
        },
        makeText(text){
            let newText = text.replace(/(\s|\n|\r|\r\n|↵)/g,' ')
            if (newText.length > 240) {
                newText = newText.slice(0, 240) + '……'
            }
            return newText
        },
        toDoc(data){
            this.docData = data
            if (this.docData.editor == 'MarkDown') {
                this.$router.push('/mdview')
            } else if (this.docData.editor == 'DiagramsEditor') {
                this.$router.push('/mindview')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.collect-view-page {
    height: 100%;
}
.el-empty {
    height: 100%;
}
.el-header {
    margin:0;
    padding:0;
}
.el-aside {
    margin:0;
    padding:0;
}
.el-main {
    margin:0;
    padding:0;
}
.card-title {
    width: 100%;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor:pointer;
    border-bottom: 1px solid #c0ccda;
    font-size:18px;
    font-weight:600;
  }

.doc-list::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
.doc-list::-webkit-scrollbar-track {
    background-color:#F5F5F5;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius:2em;
}
.doc-list::-webkit-scrollbar-thumb {
    background-color:#565252;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius:2em;
}
/deep/.el-tabs__item:hover {
    color: var(--thecolor) !important;
}
/deep/.el-tabs__item.is-active {
    color: var(--thecolor) !important;
}
/deep/.el-tabs__active-bar {
    background-color: var(--thecolor) !important;
}
// 树形列表
/deep/.el-tree .el-tree-node__expand-icon.expanded {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    cursor:pointer;
}
//有子节点 且未展开
/deep/.el-tree .el-icon-caret-right:before {
    background: url(../../../assets/img/doc2.png) no-repeat 0 3px;
    content: '';
    display: block;
    width: 18px;
    height: 18px;
    font-size: 16px;
    background-size: 16px;
    cursor:pointer;
}

//有子节点 且已展开
/deep/.el-tree .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
    background: url(../../../assets/img/doc2.png) no-repeat 0 3px;
    content: '';
    display: block;
    width: 18px;
    height: 18px;
    font-size: 16px;
    background-size: 16px;
    cursor:pointer;
}

//没有子节点
/deep/.el-tree .el-tree-node__expand-icon.is-leaf::before {
    background: url(../../../assets/img/doc1.png) no-repeat 0 3px;
    content: '';
    display: block;
    width: 16px;
    height: 16px;
    font-size: 16px;
    background-size: 16px;
    cursor:pointer;
}

.menuList-box::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
.menuList-box::-webkit-scrollbar-track {
    background-color:#F5F5F5;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius:2em;
}
.menuList-box::-webkit-scrollbar-thumb {
    background-color:#565252;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius:2em;
}
.docList-item {
    border-bottom: 1px solid var(--thecolor);
    padding-bottom: 15px;
}
.docList-item-name-box {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-bottom: 10px;
}
.docList-item-name {
    font-weight: 600;
    cursor:pointer;
    &:hover {
        color:var(--thecolor);
        border-bottom: 1px solid var(--thecolor);
    }
}
.docList-item-text-box {
    width: 100%;
    margin-bottom: 10px;
}
.docList-item-text {

}
.docList-item-time-box {
    width: 100%;
}
.docList-item-time {
    color: #565252;
    font-weight: 600;
    font-size: 13px;
}
</style>
