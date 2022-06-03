const { shallowMount } = require("@vue/test-utils");
import NavBar from "@/modules/daybook/components/Navbar.vue";
import createVuexStore from "../../../mock-data/mockStore.js";

const mockRouter = {
	push: jest.fn(),
};
jest.mock("vue-router", () => ({
	useRouter: () => mockRouter,
}));

describe("Pruebas en el NavbarComponent", () => {
	const store = createVuexStore({
		status: "authenticated",
		user: {
			name: "test",
			email: "test@test.com",
		},
		idToken: "ABC-123",
		refreshToken: "XYZ-123",
	});

	beforeEach(() => jest.clearAllMocks());

	test("Debe mostrar el componente correctamente", () => {
		const wrapper = shallowMount(NavBar, {
			global: {
				plugins: [store],
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});

	test("Logout debe cerrar sesion y redireccionar", async () => {
		const wrapper = shallowMount(NavBar, {
			global: {
				plugins: [store],
			},
		});

		await wrapper.find("button").trigger("click");

		expect(mockRouter.push).toHaveBeenCalledWith({ name: "login" });
		expect(store.state.authModule).toEqual({
			status: "not-authenticated",
			user: null,
			idToken: null,
			refreshToken: null,
		});
	});
});
