/* eslint-disable no-unused-vars */
import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";
import journalModule from "@/modules/daybook/store/journal";
import { journalState } from "../../../mock-data/test-journal-state";
import EntryView from "@/modules/daybook/views/EntryView";
import Swal from "sweetalert2";
const createVuexStore = (initialState) =>
	createStore({
		modules: {
			journalModule: {
				...journalModule,
				state: { ...initialState },
			},
		},
	});

jest.mock("sweetalert2", () => ({
	fire: jest.fn(),
	showLoading: jest.fn(),
	close: jest.fn(),
}));

describe("EntryView", () => {
	const store = createVuexStore(journalState);
    store.dispatch = jest.fn();

	const mockRouter = {
		push: jest.fn(),
	};

	const [sampleEntry] = journalState.entries;

	const { id } = sampleEntry;

	let wrapper;

	beforeEach(() => {
		jest.clearAllMocks();
		wrapper = shallowMount(EntryView, {
			props: { id },
			global: {
				mocks: {
					$router: mockRouter,
				},
				plugins: [store],
			},
		});
	});

	test("Debe de redireccionar al usuario si el Id no existe", () => {
		wrapper = shallowMount(EntryView, {
			props: { id: "Id que no existe" },
			global: {
				mocks: {
					$router: mockRouter,
				},
				plugins: [store],
			},
		});
		expect(mockRouter.push).toHaveBeenCalledWith({ name: "no-entry" });
	});

	test("Debe cargar la Etrada con el Id correcto", () => {
		expect(mockRouter.push).not.toHaveBeenCalled();
		expect(wrapper.html()).toMatchSnapshot();
	});

	test("Debe borrar la entrada y redireccionar a no-entry", async () => {
        Swal.fire.mockReturnValueOnce(Promise.resolve({isConfirmed : true}))
        await wrapper.find(".btn-danger").trigger("click");
        expect(Swal.fire).toHaveBeenCalledWith({
            title: "¿Estás seguro?",
            text: "Una vez borrado, no se puede recuperar",
            showDenyButton: true,
            confirmButtonText: "Si, estoy seguro",
        })
        expect(mockRouter.push).toHaveBeenCalled()
        expect(store.dispatch).toHaveBeenCalled()
	});
});
