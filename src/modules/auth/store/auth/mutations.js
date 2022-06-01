//export const myAction = (state,payload) =>{}

export const signInUser = (state, { storeUser, idToken, refreshToken }) => {
	localStorage.setItem("idToken", idToken);
	state.idToken = idToken;
	localStorage.setItem("refreshToken", refreshToken);
	state.refreshToken = refreshToken;

	state.user = storeUser;
	state.status = "authenticated";
};

export const logout = async (state) => {
	state.user = null;
	state.idToken = null;
	state.refreshToken = null;
	state.status = "not-authenticated";
	/* LocalStorage */
	localStorage.removeItem("idToken");
	localStorage.removeItem("refreshToken");
};

