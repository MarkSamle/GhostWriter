import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const Head = () => import(/* webpackChunkName: "head" */ '../views/Home/Head.vue')
const Login = () => import(/* webpackChunkName: "login" */ '../views/Login/Login.vue')
const Register = () => import(/* webpackChunkName: "register" */ '../views/Login/Register.vue')
const Retrieve = () => import(/* webpackChunkName: "retrieve" */ '../views/Login/Retrieve.vue')
const Home = () => import(/* webpackChunkName: "home" */ '../views/Page/Home/Homepage.vue')
const Search = () => import(/* webpackChunkName: "Search" */ '../views/Page/Home/SearchPage.vue')
const TypeView = () => import(/* webpackChunkName: "typeview" */ '../views/Page/Home/TypeView.vue')
const Collect = () => import(/* webpackChunkName: "collect" */ '../views/Page/Collect/Collect.vue')
const CollectView = () => import(/* webpackChunkName: "collectview" */ '../views/Page/Collect/CollectView.vue')
const Doc = () => import(/* webpackChunkName: "doc" */ '../views/Page/Doc/Doc.vue')
const MdEditor = () => import(/* webpackChunkName: "mdeditor" */ '../views/Page/Doc/MdEditor.vue')
const DiagramsEditor = () => import(/* webpackChunkName: "mindeditor" */ '../views/Page/Doc/DiagramsEditor.vue')
const DiagramsView = () => import(/* webpackChunkName: "mindeditor" */ '../views/Page/Doc/DiagramsView.vue')
const MdView = () => import(/* webpackChunkName: "mdview" */ '../views/Page/Doc/MdView.vue')
const Table = () => import(/* webpackChunkName: "table" */ '../views/Page/Editor/Table.vue')
const Files = () => import(/* webpackChunkName: "files" */ '../views/Page/Files/Files.vue')
const News = () => import(/* webpackChunkName: "news" */ '../views/Page/Setup/News.vue')
const Help = () => import(/* webpackChunkName: "help" */ '../views/Page/Setup/Help.vue')
const Setup = () => import(/* webpackChunkName: "setup" */ '../views/Page/Setup/Setup.vue')
const EditorSet = () => import(/* webpackChunkName: "editorSet" */ '../views/Page/Setup/EditorSet.vue')
const Tool = () => import(/* webpackChunkName: "tool" */ '../views/Page/Tool/Tool.vue')
const DbTool = () => import(/* webpackChunkName: "dbtool" */ '../views/Page/Tool/dbTool.vue')

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: Login, meta: { title: 'Ghost Writer', isLoginRequest: true } },
  { path: '/register', name: 'register', component: Register, meta: { title: 'Ghost Writer', isLoginRequest: true } },
  { path: '/retrieve', name: 'retrieve', component: Retrieve, meta: { title: 'Ghost Writer', isLoginRequest: true } },
  {
    path: '/head',
    name: 'head',
    component: Head,
    meta: { title: 'Home' },
    children: [
      { path: '/home', name: 'home', meta: { title: 'Ghost Writer' }, component: Home },
      { path: '/search', name: 'search', meta: { title: 'Ghost Writer' }, component: Search },
      { path: '/types', name: 'types', meta: { title: 'Ghost Writer' }, component: TypeView },
      { path: '/table', name: 'table', meta: { title: 'Ghost Writer' }, component: Table },
      { path: '/collect', name: 'collect', meta: { title: 'Ghost Writer' }, component: Collect },
      { path: '/collectview', name: 'collectview', meta: { title: 'Ghost Writer' }, component: CollectView },
      { path: '/doc', name: 'doc', meta: { title: 'Ghost Writer' }, component: Doc },
      { path: '/mdeditor', name: 'mdeditor', meta: { title: 'Ghost Writer' }, component: MdEditor },
      { path: '/mindeditor', name: 'mindeditor', meta: { title: 'Ghost Writer' }, component: DiagramsEditor },
      { path: '/mindview', name: 'mindview', meta: { title: 'Ghost Writer' }, component: DiagramsView },
      { path: '/mdview', name: 'mdview', meta: { title: 'Ghost Writer' }, component: MdView },
      { path: '/files', name: 'files', meta: { title: 'Ghost Writer' }, component: Files },
      { path: '/tool', name: 'tool', meta: { title: 'Ghost Writer' }, component: Tool },
      { path: '/dbtool', name: 'dbtool', meta: { title: 'Ghost Writer' }, component: DbTool },
      { path: '/news', name: 'news', meta: { title: 'Ghost Writer' }, component: News },
      { path: '/help', name: 'help', meta: { title: 'Ghost Writer' }, component: Help },
      { path: '/setup', name: 'setup', meta: { title: 'Ghost Writer' }, component: Setup },
      { path: '/editorset', name: 'editorset', meta: { title: 'Ghost Writer' }, component: EditorSet },
    ]
  }
]

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history', // history模式下electron打包后页面空白
  routes
})

export default router
