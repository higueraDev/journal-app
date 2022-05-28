import { shallowMount } from "@vue/test-utils";
const { createStore } = require("vuex");
import journalModule from "@/modules/daybook/store/journal";
import EntryList from "@/modules/daybook/components/EntryList";
import {journalState} from "../../../mock-data/test-journal-state";

describe("Pruebas en el EntryList Component", () => {
    const createVuexStore = (initialState) =>
	createStore({
		modules: {
			journalModule: {
				...journalModule,
				state: { ...initialState },
			},
		},
	});

    const store = createVuexStore(journalState);

    const mockRouter = {
        push: jest.fn()
    }

	let wrapper = shallowMount(EntryList, {
		global: {
			mocks: {
				$router: mockRouter,
			},
			plugins: [store],
		},
	});

    beforeEach(()=>{
        jest.clearAllMocks()
        wrapper = shallowMount(EntryList, {
            global: {
                mocks: {
                    $router: mockRouter,
                },
                plugins: [store],
            },
        });
    })


	test("Pruebas en el EntryList", () => {
        expect(wrapper.findAll('entry-component-stub')).toHaveLength(7)
	});

    test('Debe llamar el getEntruesByTerm y filtrar las entradas', async() => { 
        const input = wrapper.find("input");
        await input.setValue('xbox');
        expect(wrapper.findAll('entry-component-stub')).toHaveLength(1);
     })

     test('El boton de nuevo debe redireccionar a /new', () => { 
         const button = wrapper.find('button');
         button.trigger('click');
         expect(mockRouter.push).toHaveBeenCalledWith({name:'entry',params:{id:'new'}})
      })
});
