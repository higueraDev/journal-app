<template>
	<template v-if="entry">
		<div class="entry-title d-flex justify-content-between p-2">
			<div>
				<span class="text-success fs-3 fw-bold">{{ day }}</span>
				<span class="mx-1 fs-3">{{ month }}</span>
				<span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
			</div>
			<div>
				<button
					v-if="entry.id"
					@click="onDeleteEntry"
					class="btn btn-danger mx-2"
				>
					Borrar
					<i class="fa fa-trash-alt"></i>
				</button>
				<input
					v-show="false"
					ref="inputFile"
					@change="onSelectedImage"
					type="file"
					accept="image/*"
				/>
				<button @click="onUploadImage" class="btn btn-primary">
					Subir foto
					<i class="fa fa-upload"></i>
				</button>
			</div>
		</div>
		<hr />
		<div class="d-flex flex-column px-3 h-75">
			<textarea
				placeholder="¿Que sucedió hoy?"
				v-model="entry.text"
			></textarea>
		</div>
		<img
			v-if="entry.image"
			class="img-thumbnail"
			:src="entry.image"
			alt="entry-picture"
		/>
	</template>
	<fab-component @on:click="saveEntry" icon="fa-save"></fab-component>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";
import getDayMonthYear from "../helpers/getDayMonthYear";
import uploadImage from "../helpers/uploadImage";
export default {
	name: "EntryView",
	props: {
		id: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			entry: null,
			imageFile: null,
		};
	},
	components: {
		FabComponent: defineAsyncComponent(() =>
			import("../components/FabComponent.vue")
		),
	},
	watch: {
		id() {
			if (this.entry) this.loadEntry();
		},
	},
	computed: {
		...mapGetters("journalModule", ["getEntryById"]),
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
	methods: {
		...mapActions("journalModule", [
			"updateEntry",
			"createEntry",
			"deleteEntry",
		]),
		async saveEntry() {
			new Swal({
				title: "Espere por favor",
				allowOutsideClick: false,
			});
			Swal.showLoading();

			let storedImage = null;

			if (this.imageFile) storedImage = await uploadImage(this.imageFile);
			this.entry.image = storedImage;

			if (this.entry.id) {
				await this.updateEntry(this.entry);
			} else {
				const id = await this.createEntry(this.entry);
				this.$router.push({ name: "entry", params: { id } });
			}

			Swal.fire("Guardado", "Entrada registrada con éxito", "success");
		},
		async onDeleteEntry() {
			const { isConfirmed } = await Swal.fire({
				title: "¿Estás seguro?",
				text: "Una vez borrado, no se puede recuperar",
				showDenyButton: true,
				confirmButtonText: "Si, estoy seguro",
			});
			if (isConfirmed) {
				new Swal({
					title: "Espere por favor",
					allowOutsideClick: false,
				});
				Swal.showLoading();
				await this.deleteEntry(this.id);
				this.$router.push({ name: "no-entry" });
				Swal.fire("Eliminado correctamente", "", "success");
			}
		},
		loadEntry() {
			let entry;
			if (this.id == "new") {
				entry = {
					text: "",
					date: new Date().getTime(),
				};
			} else {
				entry = this.getEntryById(this.id);
				if (!entry) return this.$router.push({ name: "no-entry" });
			}
			this.entry = entry;
		},
		onSelectedImage($event) {
			const image = $event.target.files[0];

			if (image) {
				const fr = new FileReader();
				fr.onload = () => (this.entry.image = fr.result);
				fr.readAsDataURL(image);
				this.imageFile = image;
			}
		},
		onUploadImage() {
			this.$refs.inputFile.click();
		},
	},
	created() {
		this.loadEntry();
	},
};
</script>

<style lang="scss" scoped>
textarea {
	border: none;
	font-size: 20px;
	height: 100%;

	&:focus {
		outline: none;
	}
}

img {
	bottom: 150px;
	box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
	position: fixed;
	right: 20px;
	width: 200px;
}
</style>
