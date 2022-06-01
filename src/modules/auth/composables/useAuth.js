import { computed } from "vue";
import { useStore } from "vuex";

const useAuth = () => {
	const store = useStore();

	const createUser = async (user) => {
		const resp = await store.dispatch("authModule/createUser", user);
		return resp;
	};

	const signInUser = async (user) => {
		const resp = await store.dispatch("authModule/signInUser", user);
		return resp;
	};

	const checkAuth = async () => {
		const resp = await store.dispatch("authModule/checkAuth");
		return resp;
	};

	const logout = () => {
		store.commit("authModule/logout");
		store.commit("journalModule/CLEAR_ENTRIES");
	};

	return {
		checkAuth,
		createUser,
		logout,
		signInUser,
		currentState: computed(() => store.getters["authModule/currentState"]),
		getName: computed(() => store.getters["authModule/getName"]),
	};
};

export default useAuth;
