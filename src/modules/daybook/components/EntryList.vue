<template>
	<div class="entry-list-container">
		<div class="px-2 pt-2">
			<input
				type="text"
				class="form-control"
				placeholder="Buscar entradas"
			/>
		</div>
		<div class="entry-list-scrollarea">
			<div v-for="item in 100" :key="item">
				<entry-component></entry-component>
			</div>
		</div>
	</div>
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core';
export default {
	components:{
		EntryComponent: defineAsyncComponent(()=>import('../components/EntryComponent.vue')),
	}
};
</script>

<style lang="scss" scoped>
.entry-list-container{
    border-right: 1px solid #123e50;
    height: calc(100% - 56px);
}

.entry-list-scrollarea{
    height: calc(100vh - 110px);
    overflow: scroll;
}
</style>
