<template>
    <div class="md-editor-page">
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
                    <div><span style="font-size:12px;font-weight:300;">你正在 <span style="font-size:12px;font-weight:600;">查看文档</span></span></div>
                </div>
                <!-- 选择所属文集 -->
                <div class="card-title" :style="{'color':chosecolor}" :title="collectData.name" @click="seeCollect(collectData.id)"><i :class="collectData.icon"></i>
                    <span style="margin-left:10px;">{{collectData.name}}</span></div>
                <!-- 文档树结构 style="width: inherit;" -->
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
                    :default="docData.name"
                    :showAdd="true"
                    button="编辑"
                    @showTable="isCollapse = !isCollapse"
                    @onChange="(val)=>{docData.name=val}"
                    @save="toEdit"
                    @back="back"
                    @add="addNewDoc"
                    ></myEditHead>
                <div style="height:40px;" ></div>
                <!-- 编辑器 -->
                <MdShow :content="restartReplaceSpecial(docData.md)"/>
            </el-main>
        </el-container>

        <!-- 新建文档信息预填 -->
    <el-dialog title="新建文档" :visible.sync="createDocDialogShow" width="400px">
        <el-form :model="createDocForm" :rules="createDocRules" ref="createDocFormRef">
          <el-form-item label="文档名称" label-width="80px" prop="name">
            <el-input v-model="createDocForm.name" placeholder="请输入文档名称"></el-input>
          </el-form-item>
          <el-form-item label="所属文集" label-width="80px" prop="collect">
            <el-select v-model="createDocForm.collect" filterable clearable placeholder="请选择所属文集" style="width:100%;" disabled>
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
import MdShow from '@/components/editor/Mavon/show.vue'
import { restartReplaceSpecial } from '@/database/api/unit.js'
import { createCollect, getCollect, getCollectById, getOrderCollect } from '@/database/api/collect.js'
import { createDoc, getDocByCollect, getDocTreeByCollect, getDoc, addDoc, delDoc, updateDoc, getDocBySearch } from '@/database/api/doc.js'
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'MdEditorPage',
    components: {
        MdShow,myEditHead
    },
    data () {
        return {
            search: '',
            userId: window.sessionStorage.getItem('userid'),
            isCollapse: true,
            docList: [],
            defaultProps: {
                children: 'child',
                label: 'name'
            },
            collectData: {},
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
                this.collectData = getCollectById(this.$db,this.userId,this.docData.collect)
            } catch {
                this.$router.go(-1)
            }
        },
        getDocList(){
            if (this.docData.collect != '' && this.docData.collect != null) {
                try {
                    this.docList = getDocTreeByCollect(this.$db,this.userId,this.docData.collect,this.search)
                } catch {
                    createCollect(this.$db)
                    createDoc(this.$db)
                    this.docList = getDocTreeByCollect(this.$db,this.userId,this.docData.collect,this.search)
                }
            } else {
                this.$message({
                    message: '所属文集不允许为空！',
                    center: true,
                    offset: 300,
                    type: 'error'
                })
            }
        },
        // 编辑文档
        toEdit(){
            this.$router.push({
                path: '/mdeditor',
                query: {
                    type: 'edit'
                }
            })
        },
        // 返回
        back(){
            this.$router.go(-1)
        },
        addNewDoc(){
            this.createDocForm.collect = this.docData.collect
            this.createDocForm.collect_data = this.docData.collect_data
            this.createDocDialogShow = true
        },
        // 前往编辑页面-创建
        toDocPage(){
            this.$refs.createDocFormRef.validate(async valid => {
                if (!valid) return
                if (this.createDocForm.editor == 'MarkDown') {
                    this.docData = this.createDocForm
                    this.$router.push({
                        path: '/mdeditor',
                        query: {
                            type: 'edit'
                        }
                    })
                } else if (this.createDocForm.editor == 'DiagramsEditor') {
                    this.docData = this.createDocForm
                    this.$router.push({
                        path: '/mindeditor',
                        query: {
                            type: 'edit'
                        }
                    })
                }
            })
        },
        // 点击文集文档列表
        handleNodeClick(data) {
            this.docData = data
            if (this.docData.editor == 'DiagramsEditor') {
                this.$router.push('/mindview')
            }
        },
        seeCollect(id){
            this.collectId = id
            this.$router.push('/collectview')
        }
    }
}
</script>

<style lang="scss" scoped>
.md-editor-page {
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
</style>
