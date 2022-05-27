import { shallowMount } from "@vue/test-utils";
import EntryComponent from "@/modules/daybook/components/EntryComponent.vue";
import { journalState } from "../../../mock-data/test-journal-state";
import getDayMonthYear from "@/modules/daybook/helpers/getDayMonthYear";

describe("Pruebas en el EntryComponent", () => {
	const mockRouter = {
		push: jest.fn(),
	};
	const [entry] = journalState.entries;
	const wrapper = shallowMount(EntryComponent, {
		props: {
			entry,
		},
		global: {
			mocks: {
				$router: mockRouter,
			},
		},
	});
	test("Debe hacer match con el snapshot", () => {
		expect(wrapper.html()).toMatchSnapshot();
	});
	test("Debe redireccionar al hacer click en el entry-container", () => {
		const entryContainer = wrapper.find(".entry-container");
		entryContainer.trigger("click");
		expect(mockRouter.push).toBeCalled();
		expect(mockRouter.push).toBeCalledWith({
			name: "entry",
			params: { id: entry.id },
		});
	});
	test("Pruebas en las propiedades computadas", () => {
		const { day, month, yearDay } = getDayMonthYear(entry.date);

		expect(wrapper.vm.day).toBe(day);
		expect(wrapper.vm.month).toBe(month);
		expect(wrapper.vm.yearDay).toBe(yearDay);
	});
});
