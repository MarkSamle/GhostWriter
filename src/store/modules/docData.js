const state = () => ({
    id: '',
    name: '',
    remark: '', 
    collect: '',
    collect_data: {}, 
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
  })

// 获取vuex状态
const getters = {
    docDataFrom: state => {
        return {
        id: state.id,
        name: state.name,
        remark: state.remark, 
        collect: state.collect, 
        collect_data: state.collect_data, 
        parent: state.parent, 
        tier: state.tier,  
        path: state.path,
        editor: state.editor, 
        keys: state.keys, 
        tags: state.tags, 
        text: state.text, 
        md: state.md,  
        html: state.html,
        level: state.level,   
        userby: state.userby 
    }
}
}
const mutations = {
    setDoc (state, value) {
        state.id = value.id ?? ''
        state.name = value.name??''
        state.remark = value.remark??''
        state.collect = value.collect??''
        state.collect_data = value.collect_data??{}
        state.parent = value.parent??''
        state.tier = value.tier??''
        state.path = value.path??''
        state.editor = value.editor??''
        state.keys = value.keys??''
        state.tags = value.tags??''
        state.text = value.text??''
        state.md = value.md??''
        state.html = value.html??''
        state.level = value.level??''
        state.userby = value.userby??''
    },
}

const actions = {
}
  
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}