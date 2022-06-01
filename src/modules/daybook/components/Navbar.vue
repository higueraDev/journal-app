<template>
	<nav class="navbar bg-primary">
		<a class="navbar-brand text-white">
			<img
				src="@/assets/logo.png"
				class="d-inline-block align-text-top mx-2"
				alt="Vue Logo"
				height="24"
			/>
			{{ name }}
		</a>
		<div class="d-flex">
			<button @click="onLogout" class="btn btn-outline-info">
				<i class="fa fa-sign-out"></i>
			</button>
		</div>
	</nav>
</template>

<script>
import { useRouter } from "vue-router";
import useAuth from "@/modules/auth/composables/useAuth";

export default {
	setup() {
		const router = useRouter();
		const { getName: name, logout } = useAuth();
		return {
			name,
			onLogout: () => {
				router.push({ name: "login" });
				logout();
			},
		};
	},
};
</script>
