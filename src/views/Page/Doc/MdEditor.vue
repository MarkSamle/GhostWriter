<template>
    <div class="md-editor-page">
        <el-container  style="height:100%;">
            <!-- 左侧操作台 -->
            <el-aside width='280px' v-if="isCollapse" style="height:100%;background-color:#FFFFFF;border-right: 1px solid #E4E7ED;">
                <div style="width: 100%;height: 30px;display: flex;align-items: center;justify-content: center;">
                    <div><span style="font-size:20px;font-weight:600;">Ghost Writer</span></div>
                </div>
                <div style="width: 100%;height: 25px;display: flex;align-items: center;justify-content: center;">
                    <div><span style="font-size:12px;font-weight:300;">你正在 <span style="font-size:12px;font-weight:600;">{{createForm.id == ''?'新建文档':'修改文档'}}</span></span></div>
                </div>
                <!-- 选择所属文集 -->
                <div style="width: 100%;height: 50px;display: flex;align-items: center;justify-content: center;">
                    <el-select v-model="createForm.collect" clearable filterable placeholder="请选择一个文集（必选）" style="width: 90%;" size="small">
                        <el-option
                          v-for="item in collectList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <!-- 文档树结构 style="width: inherit;"  -->
                <div style="overflow-x:auto;overflow-y: auto;height: calc(100% - 120px);width: 260px;padding:5px;margin-left:5px;" class="doc-list">
                    <el-tree 
                    :data="docList" 
                    :props="defaultProps"
                    @node-click="handleNodeClick"
                    :default-expand-all="true"
                    :highlight-current="true"
                    :expand-on-click-node="false"
                    ></el-tree>
                </div>
                
            </el-aside>
            <el-main>
                <!-- 头部 -->
                <myEditHead :style="isCollapse?'width:calc(100% - 330px)':'width:calc(100% - 50px)'"
                    v-if="restartData"
                    :default="createForm.name"
                    :showAdd="true"
                    @showTable="isCollapse = !isCollapse"
                    @onChange="(val)=>{createForm.name=val}"
                    @save="saveEdit"
                    @back="back"
                    @add="addNewDoc"
                    ></myEditHead>
                <div style="height:40px;" ></div>
                <!-- 编辑器 -->
                <MdEditor v-if="restartData" @onChange="(val)=>{createForm.md = val.val;createForm.text = val.val;createForm.html = val.data;docData = createForm}" :default="restartReplaceSpecial(createForm.md)"/>
            </el-main>
        </el-container>
        <!-- 保存确认框 -->
        <el-dialog title="确认保存" :visible.sync="createDocDialogShow" width="400px">
            <el-form :model="createForm" :rules="createDocRules" ref="createDocFormRef">
                <el-form-item label="文档名称" label-width="80px" prop="name">
                    <el-input v-model="createForm.name" placeholder="请输入文档名称"></el-input>
                </el-form-item>
                <el-form-item label="所属文集" label-width="80px" prop="collect">
                    <el-select v-model="createForm.collect" clearable filterable placeholder="请选择所属文集" style="width:100%;">
                    <el-option
                        v-for="item in collectList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                    </el-select>
                </el-form-item>
        
                <el-form-item label="使用编辑" label-width="80px" prop="editor">
                    <el-select v-model="createForm.editor" clearable filterable placeholder="请选择使用编辑器" style="width:100%;" disabled>
                    <el-option
                        v-for="item in editorList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                    </el-select>
                </el-form-item>
        
                <el-form-item label="文档说明" label-width="80px" prop="remark">
                    <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入120字以内的文档说明" maxlength="120" show-word-limit v-model="createForm.remark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="createDocDialogShow = false">取 消</el-button>
              <el-button type="primary" @click="checkSaveEdit">确 定</el-button>
            </div>
        </el-dialog>


        <!-- 新建文档信息预填 -->
        <el-dialog title="新建文档" :visible.sync="createNewDocDialogShow" width="400px">
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
          <el-button @click="createNewDocDialogShow = false">取 消</el-button>
          <el-button type="primary" @click="toDocPage">确 定</el-button>
        </div>
      </el-dialog>
        
    </div>
</template>

<script>
import myEditHead from '@/components/editor/Mavon/head.vue'
import MdEditor from '@/components/editor/Mavon/index.vue'
import { getRows,restartReplaceSpecial } from '@/database/api/unit.js'
import { createCollect, getCollect } from '@/database/api/collect.js'
import { createDoc, getDocByCollect, getDocTreeByCollect, getDoc, addDoc, delDoc, updateDoc, getDocBySearch } from '@/database/api/doc.js'
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'MdEditorPage',
    components: {
        MdEditor,myEditHead
    },
    data () {
        return {
            restartData: true,
            userId: window.sessionStorage.getItem('userid'),
            isCollapse: true,
            collectList: [],
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
            createDocDialogShow: false,
            createNewDocDialogShow: false,
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
            },
            createForm: {
                id: '',
                name: '',
                remark: '', 
                collect: '', 
                parent: '', 
                tier: 1,  
                path: '', 
                editor: '', 
                keys: '', 
                tags: '', 
                text: '', 
                md: '',  
                html: '',  
                level: '',   
                userby: ''
            },
        }
    },
    watch: {
        'createForm.collect': {
            handler() {
                this.getDocList()
            },
        }
    },
    created () {
        this.getDocData()
        this.getCollectList()
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
        docData: {
            get () {
                return this.$store.state.docData
            },
            set (value) {
                this.setDoc(value)
            }
        },
        ...mapGetters('storeData', ['storeDataFrom']),
        ...mapGetters('docData', ['docDataFrom'])
    },
    methods: {
        restartReplaceSpecial,
        ...mapMutations('storeData', ['setColor', ]),
        ...mapMutations('docData', ['setDoc', ]),
        getDocData(){
            this.createForm.id = this.docData.id ??''
            this.createForm.name=this.docData.name
            this.createForm.remark=this.docData.remark
            this.createForm.collect=this.docData.collect
            this.createForm.parent=this.docData.parent??''
            this.createForm.tier=this.docData.tier??1
            this.createForm.path=this.docData.path??'' 
            this.createForm.editor=this.docData.editor??''
            this.createForm.keys=this.docData.keys??'' 
            this.createForm.tags=this.docData.tags??'' 
            this.createForm.text=this.docData.text??''
            this.createForm.md=this.docData.md??''
            this.createForm.html=this.docData.html??''  
            this.createForm.level=this.docData.level??''   
            this.createForm.userby=this.docData.userby??'' 
        },
        // 获取文集列表
        getCollectList(){
            try {
                this.collectList = getCollect(this.$db,this.userId)
            } catch {
                createCollect(this.$db)
                this.collectList = getCollect(this.$db,this.userId)
            }
        },
        getDocList(){
            if (this.createForm.collect != '' && this.createForm.collect != null) {
                try {
                    this.docList = getDocTreeByCollect(this.$db,this.userId,this.createForm.collect)
                } catch {
                    createCollect(this.$db)
                    createDoc(this.$db)
                    this.docList = getDocTreeByCollect(this.$db,this.userId,this.createForm.collect)
                }
            } else {
                this.$message({
                    message: '所属文集不允许为空！',
                    center: true,
                    offset: 300,
                    type: 'error'
                })
            }
            // this.docList = getDocTreeByCollect(this.$db,this.userId,this.createForm.collect)
            // console.log('doc',this.docList)
        },
        // 保存文档
        saveEdit(){
            if (this.createForm.name == '') {
                this.$message({
                    message: '标题不允许为空！',
                    center: true,
                    offset: 300,
                    type: 'error'
                })
            } else {
                this.createDocDialogShow = true
            }
        },
        checkSaveEdit(){
            if (this.createForm.id == '') {
                this.createForm.userby = this.userId
                // 创建前缓存数据，并获取新ID
                var cacheData = this.createForm
                cacheData.id = getRows(this.$db,'doc') + 1
                this.docData = cacheData
                // console.log('docData缓存值',this.docData)
                this.$db = addDoc(this.$db,this.createForm)
                this.$message({
                    message: '新建文档成功！',
                    center: true,
                    offset: 300,
                    type: 'success'
                })
                this.createDocDialogShow = false
                this.getDocData()
                this.getCollectList()
                this.getDocList()
                // that.$router.go(-1)
            } else {
                // 创建前缓存数据
                this.docData = this.createForm
                // console.log('docData修改值',this.docData)
                this.$db = updateDoc(this.$db,this.createForm)
                this.$message({
                    message: '文档修改成功！',
                    center: true,
                    offset: 300,
                    type: 'success'
                })
                this.createDocDialogShow = false
                this.getDocData()
                this.getCollectList()
                this.getDocList()
            }
        },
        // 返回
        back(){
            let that = this
            this.$confirm('是否已经保存数据?', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                if (that.$route.query.type == 'edit'){
                    that.$router.go(-1)
                } else {
                    that.docData = {}
                    that.$router.go(-1)
                }
            })
        },
        addNewDoc(){
            let that = this
            this.$confirm('是否已经保存数据?', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                that.createDocForm.collect = that.docData.collect
                that.createDocForm.collect_data = that.docData.collect_data
                that.createNewDocDialogShow = true
            })  
        },
        // 前往编辑页面-创建
        toDocPage(){
            this.$refs.createDocFormRef.validate(async valid => {
                if (!valid) return
                if (this.createDocForm.editor == 'MarkDown') {
                    // this.createDocForm.id = ''
                    // this.createForm.name= ''
                    // this.createForm.remark= ''
                    // this.createDocForm.parent= ''
                    // this.createDocForm.path= '' 
                    // this.createForm.editor= ''
                    // this.createDocForm.keys= '' 
                    // this.createDocForm.tags= '' 
                    // this.createDocForm.text= ''
                    // this.createDocForm.md= ''
                    // this.createDocForm.html= ''  
                    // this.createDocForm.level= ''   
                    this.createDocForm.collect = this.docData.collect
                    this.createDocForm.collect_data = this.docData.collect_data
                    this.createDocForm.userby=this.docData.userby??'' 
                    this.createDocForm.tier= 1
                    this.restartData = false
                    this.docData = this.createDocForm
                    this.getDocData()
                    this.$nextTick(()=>{
                        this.restartData = true
                        this.createDocForm = {
                            id: '',
                            tier: 1,
                            name: '',
                            collect: null,
                            remark: '',
                            editor: 'DiagramsEditor'
                        }
                    })
                    this.createNewDocDialogShow = false
                } else if (this.createDocForm.editor == 'DiagramsEditor') {
                    this.createDocForm.collect = this.docData.collect
                    this.createDocForm.collect_data = this.docData.collect_data
                    this.createDocForm.userby=this.docData.userby??'' 
                    this.createDocForm.tier= 1
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
            if (this.createForm.id == data.id) {
                this.$message({
                    message: `不能选择自己作为上级文档！`,
                    center: true,
                    offset: 300,
                    type: 'error'
                })
            } else if (this.createForm.parent == data.id) {
                this.createForm.parent = ''
                this.createForm.tier = 1
                this.createForm.path = ''
                this.$message({
                    message: `已取消【${data.name}】为上级文档！`,
                    center: true,
                    offset: 300,
                    type: 'warning'
                })
            } else {
                this.createForm.parent = data.id
                this.createForm.tier = data.tier + 1
                this.createForm.path = data.path + ',' + data.id
                this.$message({
                    message: `已选择【${data.name}】为上级文档！`,
                    center: true,
                    offset: 300,
                    type: 'success'
                })
            }
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
    background: url(../../../assets/img/open.png) no-repeat 0 3px;
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
    background: url(../../../assets/img/close.png) no-repeat 0 3px;
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
    background: url(../../../assets/img/doc3.png) no-repeat 0 3px;
    content: '';
    display: block;
    width: 16px;
    height: 16px;
    font-size: 16px;
    background-size: 16px;
    cursor:pointer;
}
</style>

</style>
