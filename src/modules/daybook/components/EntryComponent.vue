<template>
	<div @click="$router.push({name:'entry', params:{id: 1}})" class="entry-container mb-3 pointer p-2">
		<div class="entry-title d-flex">
			<span class="text-success fs-5 fw-bold">23</span>
			<span class="mx-2 fs-5">Mayo</span>
			<span class="mx-2 fw-light">2022, Lunes</span>
		</div>
		<div class="entry-description">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
			dolores autem possimus inventore deserunt accusantium enim
			laboriosam ea non sit suscipit asperiores sed exercitationem,
			tempora voluptatem, quibusdam incidunt perspiciatis provident.
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.entry-container{
    border-bottom: 1px solid #2c3e50;
    transition: 0.2s all ease-in;

    &:hover{
        background-color: lighten($color: gray, $amount: 45);
    }
}

.entry-description{
    font-size: 12px;
}
</style>
