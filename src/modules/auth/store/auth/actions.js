//export const myAction = async({commit}) =>{}

import authApi from "@/api/authApi";

export const createUser = async ({ commit }, user) => {
	const { name, ...body } = user;
	try {
		const { data } = await authApi.post(":signUp", {
			...body,
			returnSecureToken: true,
		});
		const { idToken, refreshToken } = data;

		const { data: userCreated } = await authApi.post(":update", {
			idToken,
			displayName: name,
		});

		const storeUser = {
			name: userCreated.displayName,
			email: userCreated.email,
		};

		commit("signInUser", { storeUser, idToken, refreshToken });

		return { ok: true };
	} catch (error) {
		return { ok: false, message: error.response.data.error.message };
	}
};

export const signInUser = async ({ commit }, user) => {
	const { email, password } = user;
	try {
		const { data } = await authApi.post(":signInWithPassword", {
			email,
			password,
			returnSecureToken: true,
		});

		const { idToken, refreshToken, email: emailLogged, displayName } = data;

		const storeUser = {
			name: displayName,
			email: emailLogged,
		};

		commit("signInUser", { storeUser, idToken, refreshToken });

		return { ok: true };
	} catch (error) {
		return { ok: false, message: error.response.data.error.message };
	}
};

export const checkAuth = async ({ commit }) => {
	const idToken = localStorage.getItem("idToken");
	const refreshToken = localStorage.getItem("refreshToken");

	if (!idToken) {
		commit("logout");
		return { ok: false, message: "Usuario no autenticado" };
	}

	try {
		const { data } = await authApi.post(":lookup", { idToken });
		const { displayName, email } = data.users[0];

		const storeUser = {
			name: displayName,
			email,
		};

		commit("signInUser", { storeUser, idToken, refreshToken });

		return { ok: true };
	} catch (error) {
		commit("logout");
		return { ok: false, message: error.response.data.error.message };
	}
};
