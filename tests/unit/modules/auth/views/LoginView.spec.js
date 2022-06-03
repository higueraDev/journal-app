const { shallowMount } = require("@vue/test-utils");
import LoginView from "@/modules/auth/views/LoginView.vue";
import Swal from "sweetalert2";
import createVuexStore from "../../../mock-data/mockStore";

const mockRouter = {
	push: jest.fn(),
};

jest.mock("vue-router", () => ({
	useRouter: () => mockRouter,
}));

jest.mock("sweetalert2", () => ({
	fire: jest.fn(),
	showLoading: jest.fn(),
	close: jest.fn(),
}));

describe("Pruebas en el login", () => {
	const store = createVuexStore({
		status: "authenticating",
		user: null,
		idToken: null,
		refreshToken: null,
	});
	store.dispatch = jest.fn();
	beforeEach(() => jest.clearAllMocks());

	test("Debe hacer match con el snapshot", () => {
		const wrapper = shallowMount(LoginView, {
			global: {
				plugins: [store],
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});

	test("Login Credenciales incorrectas manda error en SWAL", async () => {
		store.dispatch.mockReturnValueOnce({
			ok: false,
			message: "Error en credenciales",
		});
		const wrapper = shallowMount(LoginView, {
			global: {
				plugins: [store],
			},
		});

		await wrapper.find("form").trigger("submit");

		expect(store.dispatch).toHaveBeenCalledWith("authModule/signInUser", {
			email: "",
			password: "",
		});
		expect(Swal.fire).toHaveBeenCalledWith(
			"Error",
			"Error en credenciales",
			"error"
		);
	});

	test("Login Credenciales correctas redirecciona a no-entry", async () => {
		store.dispatch.mockReturnValueOnce({
			ok: true,
		});
		const wrapper = shallowMount(LoginView, {
			global: {
				plugins: [store],
			},
		});

		const [email, password] = wrapper.findAll("input");

		await email.setValue("test@test.com");
		await password.setValue("123456");
		await wrapper.find("form").trigger("submit");

		expect(store.dispatch).toHaveBeenCalledWith("authModule/signInUser", {
			email: "test@test.com",
			password: "123456",
		});

		expect(mockRouter.push).toHaveBeenCalledWith({ name: "no-entry" });
	});
});
