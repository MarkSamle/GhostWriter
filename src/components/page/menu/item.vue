<template>
    <div class="menu-list-item" ref="menuListItem">
        <div v-if="menuItemData.child.length > 0">
            <div class="menu-row" >
                <div class="menu-name">
                    <div :style="{'background-color':chosecolor}" >
                        <div style="background-color: rgba(255, 255, 255, 0.8);" :style="{'padding-left': menuItemData.tier <= 3? (menuItemData.tier - 1)  * 10 + 'px': '30px'}">
                            <div class="name-box" @click="onClick(menuItemData)">{{menuItemData.name}}</div>
                        </div>
                    </div>
                </div>
                <div class="menu-time"><div :style="{'background-color':chosecolor}"><span style="background-color: rgba(255, 255, 255, 0.8);">{{menuItemData.update_date}}</span></div></div>
                <div class="menu-line"></div>
            </div>
            <menuListItem v-for="(item,index) in menuItemData.child" :key="index" class="menu-list-item" :menuItemData="item" @onClick="onClick"></menuListItem>
        </div>
        <div v-else>
            <div class="menu-row" >
                <div class="menu-name">
                    <div :style="{'background-color':chosecolor}" >
                        <div style="background-color: rgba(255, 255, 255, 0.8);" :style="{'padding-left': menuItemData.tier <= 3? (menuItemData.tier - 1)  * 10 + 'px': '30px'}">
                            <div class="name-box" @click="onClick(menuItemData)">{{menuItemData.name}}</div>
                        </div>
                    </div>
                </div>
                <div class="menu-time"><div :style="{'background-color':chosecolor}"><span style="background-color: rgba(255, 255, 255, 0.8);">{{menuItemData.update_date}}</span></div></div>
                <div class="menu-line"></div>
            </div>
        </div>     
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'menuListItem',
    components: {},
    data () {
        return {}
    },
    props: {
        menuItemData: {
            type: Object,
        },
    },
    // mounted () { this.$refs.menuListItem.$el.style.setProperty( '--thecolor', this.chosecolor ) },
    // watch: { chosecolor(){ this.$refs.menuListItem.$el.style.setProperty( '--thecolor', this.chosecolor ) }},
    computed: {
        chosecolor: {
            get () { return this.$store.state.storeData.mycolor },
            set (value) { this.setColor(value) }
        },
        ...mapGetters('storeData', [ 'storeDataFrom' ])
    },
    methods: {
        onClick(data){
            this.$emit('onClick',data);
        },
        ...mapMutations('storeData', ['setColor', ]),
    }
}
</script>

<style lang="scss" scoped>
.menu-list-item {
    width: 100%;
}
.menu-row {
    width: 100%;
    display: flex;
    align-items: center;
    position:relative;
}
.menu-line {
    position: absolute;
    height: 1px;
    top:18px;
    border-bottom: 1px dashed var(--thecolor);
    width: 100%;
}
.menu-name {
    float:left;
    width: calc(100% - 250px);
    height: 35px;
    display: flex;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    // background-color: var(--thecolor) !important;
    // border-bottom: 1px solid #c0ccda;
    font-size:15px;
    font-weight:600;
    z-index: 1;
    
}
.name-box{
    cursor:pointer;
    &:hover {
        color:var(--thecolor);
        border-bottom: 1px solid var(--thecolor);
    }
}
.menu-time {
    float: right;
    width: 250px;
    height: 35px;
    display: flex;
    font-size: 13px;
    color: #3f3f3f;
    align-items: center;
    justify-content: flex-end;
    z-index: 1;
}
</style>