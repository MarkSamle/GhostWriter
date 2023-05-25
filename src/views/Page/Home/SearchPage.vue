<template>
    <div class="search-page">
        <!-- 头部 -->
        <div class="head" style="width:100%;" :style="{'background-color':chosecolor}">
            <!-- 行元素 -->
            <el-row class="head-box" style="height:100%;">
                <!-- 左侧输入框 -->
                <el-col :span="16" style="height:100%;">
                    <div style="margin-left:50%;width:40%;height:100%;display: flex;align-items: center;">
                    <el-input size="mini" v-model="search" clearable @change="onSearch">
                        <i class="el-icon-search el-input__icon" slot="suffix" @click="onSearch" style="cursor:pointer;" ></i>
                    </el-input>
                    </div>
                </el-col>
                <!-- 右侧功能按钮组 -->
                <el-col :span="4" style="height:100%;">
                    <div style="display: flex;align-items: center;height:100%;justify-content: flex-end;">
                        <el-button type="text" @click="back()" size="mini" style="font-size:15px;color:#FFFFFF;" ><i class="el-icon-s-home" style="font-size:18px;" ></i>  首页</el-button>
                    </div>
                </el-col>
                <el-col :span="4"></el-col>
            </el-row>
        </div>
  
        <!-- 高度占位 -->
        <div style="height:40px;"></div>

        <div class="search-list" style="width: inherit;height:calc( 100vh - 105px );overflow-y: auto;display: flex;justify-content: center;"  ref="searchList" id="searchList">
            <div style="margin:10px 20px;width: 100%;max-width:1400px;min-width:900px;">
                <el-empty description="暂无数据，请重新查询" :image-size="200" v-if="docList.length==0"></el-empty>
                <div v-for="(doc,index) in docList" :key="index" class="docList-item" v-else>
                    <div class="docList-item-name-box" @click="toDoc(doc)"><span class="docList-item-name">{{doc.name}}</span></div>
                    <div class="docList-item-text-box">
                        <div class="docList-item-text">
                            <!-- <span :v-html="newdoc.html"></span> -->
                            <!-- {{makeText(restartReplaceSpecial(doc.md))}} -->
                            <div v-html="doc.newMd" style="width:100%"></div>
                        </div>
                    </div>
                    <div class="docList-item-time-box"><span class="docList-item-time">
                        <span class="docList-item-collect" @click="toCollect(doc)">{{doc.collect_data.name}}</span> · <i class="el-icon-user-solid"></i> {{userName}} - <i class="el-icon-timer"></i> {{doc.update_date}}
                    </span></div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getRows,restartReplaceSpecial,regInsertStr } from '@/database/api/unit.js'
import { createDoc, getDoc,getDocBySearch,delDoc } from '@/database/api/doc.js'
export default {
data () {
    return {
        search: this.$route.query.search,
        docList:[],
        userName: window.sessionStorage.getItem('username'),
        userId: window.sessionStorage.getItem('userid'),
    }
},
    created () {
    },
    mounted () {
        this.onSearch()
        document.getElementById('searchList').style.setProperty( '--thecolor', this.chosecolor )
        // this.$refs.searchList.$el.style.setProperty( '--thecolor', this.chosecolor )
    },
    watch: {
        chosecolor(){
            document.getElementById('searchList').style.setProperty( '--thecolor', this.chosecolor )
            // this.$refs.searchList.$el.style.setProperty( '--thecolor', this.chosecolor )
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
        regInsertStr,
        restartReplaceSpecial,
        ...mapMutations('storeData', ['setColor', ]),
        ...mapMutations('docData', ['setDoc', ]),
        ...mapMutations('collectData', ['setCollectId', ]),
        // 搜索框触发
        onSearch(){
            if (this.search == ''){
                this.docList = []
            } else {
                this.docList = getDocBySearch(this.$db,this.userId,this.search)
                this.docList.forEach(doc => {
                    doc.newMd = this.makeText(restartReplaceSpecial(doc.md))
                })
            }
        },
        back(){
            this.$router.push('/home')
        },
        findStr(find,text){
            find = find.toLowerCase()//转为小写
            text = text.toLowerCase()//转为小写
            let findList = []
            let index = text.indexOf(find)
            while (index !== -1) {
                findList.push(index)
                index = text.indexOf(find, index + 1)
            }
            return findList
        },
        makeText(text){
            var newText = text.replace(/(\s|\n|\r|\r\n|↵|#)/g,' ')
            newText = newText.replace(/<.*?\/>/g,' ')
            let searchStr = this.search
            var searchText = ''
            if (searchStr != ''){
                const findList = this.findStr(searchStr,newText)
                var start = 0
                var end = 0
                var sign = ''
                for (let i = 0; i < findList.length; i++) {
                    if (i == 0) {
                        start = findList[i]-50<=0?0:findList[i]-50
                        end = findList[i]+150>newText.length-1?newText.length-1:findList[i]+150
                    } else {
                        if (findList[i]-50<=end){
                            start = end
                            sign = ''
                        } else {
                            sign = '……'
                            start =findList[i]-50
                        }
                        end = findList[i]+150>newText.length-1?newText.length-1:findList[i]+150
                    }
                    searchText = searchText + sign + newText.substring(start,end)
                }
            }
            searchText = searchText==''?'': searchText + '……'
            if (searchText.length > 500) {
                searchText = searchText.slice(0, 500) + '……'
            }
            var newRegExp = new RegExp(searchStr, 'gmi');
            // searchText = searchText.replace(newRegExp, '<span style="color:red;font-weight:600;">' + searchStr + '</span>') // 会修改原字符大小写
            searchText = regInsertStr(searchText,newRegExp,'<span style="color:red;font-weight:600;">','</span>')
            // searchText = searchText.replaceAll(searchStr, '<span style="color:red;font-weight:600;border-bottom: 1px solid red;">' + searchStr + '</span>')
            return searchText//newText
        },
        toDoc(data){
            this.collectId = data.collect
            this.docData = data
            if (this.docData.editor == 'MarkDown') {
                this.$router.push('/mdview')
            } else if (this.docData.editor == 'DiagramsEditor') {
                this.$router.push('/mindview')
            }
        },
        toCollect(data){
            this.collectId = data.collect
            this.$router.push('/collectview')
        }
    }
}
</script>

<style lang="scss" scoped>
.search-page {
    height: 100%;
}
.el-empty {
    height: 100%;
}
.head {
    width: 100%;
    height: 40px;
    border-bottom: 2px solid #e9e9e9e0;
    position: fixed;
    top: 30px;
    // top: 30;
}
.search-list::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
.search-list::-webkit-scrollbar-track {
    background-color:#F5F5F5;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius:2em;
}
.search-list::-webkit-scrollbar-thumb {
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
.docList-item-collect {
    color: var(--thecolor);
    cursor: pointer;
    &:hover {
        color:var(--thecolor);
        border-bottom: 1px solid var(--thecolor);
    }
}
// 使用CSS预处理器scoped让样式只在局部页面生效
</style>
