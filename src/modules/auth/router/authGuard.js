import store from "@/store";
const isAuthenticatedGuard = async (to, from, next) => {
	const { ok } = await store.dispatch("authModule/checkAuth");
	ok ? next() : next({ name: "login" });
};

export default isAuthenticatedGuard;
