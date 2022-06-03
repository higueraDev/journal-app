import useAuth from "@/modules/auth/composables/useAuth";

const mockStore = {
	dispatch: jest.fn(),
	commit: jest.fn(),
	getters: {
		"authModule/currentState": "authenticated",
		"authModule/getName": "Test User",
	},
};

jest.mock("vuex", () => ({
	useStore: () => mockStore,
}));

describe("Composable useAuth", () => {
	beforeEach(() => jest.clearAllMocks());

	test("createUser => true", async () => {
		const { createUser } = useAuth();

		const newUser = {
			name: "Test User",
			email: "test@test.com",
			password: "123456",
		};

		mockStore.dispatch.mockReturnValueOnce({ ok: true });

		const createResp = await createUser(newUser);

		expect(mockStore.dispatch).toHaveBeenCalledWith(
			"authModule/createUser",
			newUser
		);

		expect(createResp).toEqual({ ok: true });
	});

	test("createUser => false", async () => {
		const { createUser } = useAuth();

		const newUser = {
			name: "Test User",
			email: "test@test.com",
			password: "123456",
		};

		mockStore.dispatch.mockReturnValueOnce({
			ok: false,
			message: "EMAIL_EXISTS",
		});

		const createResp = await createUser(newUser);

		expect(mockStore.dispatch).toHaveBeenCalledWith(
			"authModule/createUser",
			newUser
		);

		expect(createResp).toEqual({ ok: false, message: "EMAIL_EXISTS" });
	});

	test("signInUser => true", async () => {
		const { signInUser } = useAuth();

		const userForm = {
			email: "test@test.com",
			password: "123456",
		};

		mockStore.dispatch.mockReturnValueOnce({
			ok: true,
		});

		const signInRes = await signInUser(userForm);

		expect(mockStore.dispatch).toHaveBeenCalledWith(
			"authModule/signInUser",
			userForm
		);

		expect(signInRes).toEqual({ ok: true });
	});

	test("signInUser => false", async () => {
		const { signInUser } = useAuth();

		const userForm = {
			email: "test@test.com",
			password: "xxxxxxx",
		};

		mockStore.dispatch.mockReturnValueOnce({
			ok: false,
			message: "PASSWORD_INCORRECT",
		});

		const signInRes = await signInUser(userForm);

		expect(mockStore.dispatch).toHaveBeenCalledWith(
			"authModule/signInUser",
			userForm
		);

		expect(signInRes).toEqual({ ok: false, message: "PASSWORD_INCORRECT" });
	});

	test("checkAuth => true", async () => {
		const { checkAuth } = useAuth();

		mockStore.dispatch.mockReturnValueOnce({
			ok: true,
		});

		const checkRes = await checkAuth();

		expect(mockStore.dispatch).toHaveBeenCalledWith("authModule/checkAuth");

		expect(checkRes).toEqual({ ok: true });
	});

	test("logout exitoso", () => {
		const { logout } = useAuth();

		logout();
		expect(mockStore.commit).toHaveBeenCalledWith("authModule/logout");
		expect(mockStore.commit).toHaveBeenCalledWith(
			"journalModule/CLEAR_ENTRIES"
		);
	});

	test("Getters: currentState getName", () => {
		const { currentState, getName } = useAuth();

		expect(currentState.value).toBe("authenticated");
		expect(getName.value).toBe("Test User");
	});
});
