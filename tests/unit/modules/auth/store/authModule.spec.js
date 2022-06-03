import axios from "axios";
import createVuexStore from "../../../mock-data/mockStore";

describe("Vuex: Pruebas en el auth-module", () => {
	test("Estado inicial", () => {
		const store = createVuexStore({
			status: "authenticating",
			user: null,
			idToken: null,
			refreshToken: null,
		});
		const resp = store.state.authModule;
		expect(resp).toEqual({
			status: "authenticating",
			user: null,
			idToken: null,
			refreshToken: null,
		});
	});
	/* MUTATIONS */
	test("Mutation: signInUser", () => {
		const store = createVuexStore({
			status: "authenticating",
			user: null,
			idToken: null,
			refreshToken: null,
		});

		const payload = {
			storeUser: {
				name: "Fernando",
				email: "fernando@gmail.com",
			},
			idToken: "ABC-123",
			refreshToken: "XYZ-123",
		};

		store.commit("authModule/signInUser", payload);

		const { status, user, ...tokens } = store.state.authModule;

		expect(status).toBe("authenticated");
		expect(user).toEqual(payload.storeUser);
		expect(tokens).toEqual({ idToken: "ABC-123", refreshToken: "XYZ-123" });
	});

	test("Mutation: logout", () => {
		const store = createVuexStore({
			status: "authenticated",
			user: {
				name: "Fernando",
				email: "fernando@gmail.com",
			},
			idToken: "ABC-123",
			refreshToken: "XYZ-123",
		});
		let idToken = localStorage.getItem("idToken");
		let refreshToken = localStorage.getItem("refreshToken");
		expect(idToken).toBeTruthy();
		expect(refreshToken).toBeTruthy();

		/* TARGET */
		store.commit("authModule/logout");

		const { status, ...sessionInfo } = store.state.authModule;

		expect(status).toBe("not-authenticated");
		expect(sessionInfo).toEqual({
			user: null,
			idToken: null,
			refreshToken: null,
		});
		idToken = localStorage.getItem("idToken");
		refreshToken = localStorage.getItem("refreshToken");
		expect(idToken).toBeFalsy();
		expect(refreshToken).toBeFalsy();
	});

	/* GETTERS */
	test("Getter: currentState getName", () => {
		const store = createVuexStore({
			status: "authenticating",
			user: {
				name: "Fernando",
				email: "fernando@gmail.com",
			},
			idToken: null,
			refreshToken: null,
		});

		expect(store.getters["authModule/currentState"]).toBe("authenticating");
		expect(store.getters["authModule/getName"]).toBe("Fernando");
	});

	/* ACTIONS */
	test("Action: createUser - Error usuario ya existe", async () => {
		const store = createVuexStore({
			status: "authenticating",
			user: null,
			idToken: null,
			refreshToken: null,
		});

		const newUser = {
			name: "Test User",
			email: "test@test.com",
			password: "123456",
		};

		const resp = await store.dispatch("authModule/createUser", newUser);
		expect(resp).toEqual({ ok: false, message: "EMAIL_EXISTS" });
		const storeStatus = store.state.authModule;
		expect(storeStatus).toEqual({
			status: "authenticating",
			user: null,
			idToken: null,
			refreshToken: null,
		});
	});

	test("Action: createUser - crea el usuario", async () => {
		const store = createVuexStore({
			status: "authenticating",
			user: null,
			idToken: null,
			refreshToken: null,
		});

		const newUser = {
			name: "Test User",
			email: "test@test.com",
			password: "123456",
		};

		await store.dispatch("authModule/signInUser", newUser);

		let { idToken } = store.state.authModule;

		await axios.post(
			"https://identitytoolkit.googleapis.com/v1/accounts:delete",
			{ idToken },
			{
				params: {
					key: "AIzaSyBvmj4H-NnUvBXJLeqDZczm5eJAa-80Y-c",
				},
			}
		);
		/* TARGET */
		const resp = await store.dispatch("authModule/createUser", newUser);
		idToken = store.state.authModule.idToken;

		expect(resp).toEqual({ ok: true });
		const storeStatus = store.state.authModule;
		expect(storeStatus).toEqual(
			expect.objectContaining({
				status: "authenticated",
				idToken: idToken,
				user: {
					name: newUser.name,
					email: newUser.email,
				},
				refreshToken: expect.any(String),
			})
		);
	});

	test("Actions: checkAuth => TRUE", async () => {
		const store = createVuexStore({
			status: "authenticating",
			user: null,
			idToken: null,
			refreshToken: null,
		});
		const newUser = {
			name: "Test User",
			email: "test@test.com",
			password: "123456",
		};

		await store.dispatch("authModule/signInUser", newUser);

		const checkResp = await store.dispatch("authModule/checkAuth");

		expect(checkResp).toEqual({ ok: true });
		const storeStatus = store.state.authModule;
		expect(storeStatus).toEqual(
			expect.objectContaining({
				status: "authenticated",
				idToken: expect.any(String),
				user: {
					name: newUser.name,
					email: newUser.email,
				},
				refreshToken: expect.any(String),
			})
		);
	});
	test("Actions: checkAuth => FALSE ", async () => {
		const store = createVuexStore({
			status: "authenticating",
			user: null,
			idToken: null,
			refreshToken: null,
		});

		localStorage.removeItem("idToken");

		const checkResp = await store.dispatch("authModule/checkAuth");

		expect(checkResp).toEqual({
			ok: false,
			message: "Usuario no autenticado",
		});
		const storeStatus = store.state.authModule;
		expect(storeStatus).toEqual(
			expect.objectContaining({
				status: "not-authenticated",
				idToken: null,
				user: null,
				refreshToken: null,
			})
		);
	});

});
