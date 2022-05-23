<template>
    <navbar></navbar>
    <div class="d-flex">
        <div class="col-4">
            <entry-list></entry-list>
        </div>
        <div class="col">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import { defineAsyncComponent } from '@vue/runtime-core'
export default {
    components:{
        Navbar: defineAsyncComponent(() => import('../components/Navbar.vue')),
        EntryList: defineAsyncComponent(() => import('../components/EntryList.vue')),
    }
}
</script>