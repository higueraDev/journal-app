<template>
	<div class="entry-list-container">
		<div class="px-2 pt-2">
			<input
				type="text"
				class="form-control"
				placeholder="Buscar entradas"
				v-model="term"
			/>
		</div>
		<div class="mt-2 d-flex flex-column">
			<button @click="goNewEntry" class="btn btn-primary mx-3">
				<i class="fa fa-plus-circle"></i> Nueva Entrada
			</button>
		</div>
		<div class="entry-list-scrollarea">
			<entry-component
				v-for="entry in entriesByTerm"
				:key="entry.id"
				:entry="entry"
			></entry-component>
		</div>
	</div>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";
import { mapGetters } from "vuex";
export default {
	components: {
		EntryComponent: defineAsyncComponent(() =>
			import("../components/EntryComponent.vue")
		),
	},
	data() {
		return {
			term: "",
		};
	},
	computed: {
		...mapGetters("journalModule", ["getEntriesByTerm"]),
		entriesByTerm() {
			return this.getEntriesByTerm(this.term);
		},
	},
	methods: {
		goNewEntry() {
			this.$router.push({ name: "entry", params: { id: "new" } });
		},
	},
};
</script>

<style lang="scss" scoped>
.entry-list-container {
	border-right: 1px solid #123e50;
	height: calc(100% - 56px);
}

.entry-list-scrollarea {
	height: calc(100vh - 110px);
	overflow: scroll;
}
</style>
