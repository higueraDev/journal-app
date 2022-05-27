<template>
	<div
		@click="$router.push({ name: 'entry', params: { id: entry.id } })"
		class="entry-container mb-3 pointer p-2"
	>
		<div class="entry-title d-flex">
			<span class="text-success fs-5 fw-bold">{{day}}</span>
			<span class="mx-2 fs-5">{{month}}</span>
			<span class="mx-2 fw-light">{{yearDay}}</span>
		</div>
		<div class="entry-description text-start">
			{{ shortText }}
		</div>
	</div>
</template>

<script>
import getDayMonthYear from "@/modules/daybook/helpers/getDayMonthYear";
export default {
	props: {
		entry: {
			type: Object,
			required: true,
		},
	},
	computed: {
		shortText() {
			return this.entry.text.length > 130
				? this.entry.text.slice(0, 130) + "..."
				: this.entry.text;
		},
		day() {
			const { day } = getDayMonthYear(this.entry.date);
			return day;
		},
		month() {
			const { month } = getDayMonthYear(this.entry.date);
			return month;
		},
		yearDay() {
			const { yearDay } = getDayMonthYear(this.entry.date);
			return yearDay;
		},
	},
};
</script>

<style lang="scss" scoped>
.entry-container {
	border-bottom: 1px solid #2c3e50;
	transition: 0.2s all ease-in;

	&:hover {
		background-color: lighten($color: gray, $amount: 45);
	}
}

.entry-description {
	font-size: 12px;
}
</style>
