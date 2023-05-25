<template>
    <div class="menu-list">
        <menuListItem v-for="(item,index) in menuData" :key="index" :menuItemData="item" @onClick="onClick"></menuListItem>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import menuListItem from '@/components/page/menu/item.vue'
export default {
    name: 'menuList',
    components: {
        menuListItem
    },
    data () {
        return {}
    },
    props: {
        menuData: {
            type: Array,
        },
    },
    methods: {
        onClick(data){
            this.$emit('onClick',data);
        },
    }
}
</script>