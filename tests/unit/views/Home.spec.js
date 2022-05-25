const { shallowMount } = require("@vue/test-utils")
import Home from '@/views/Home'

describe('Pruebas en el Home view', () => { 
    test(('Debe hacer match con el snapshot'),()=>{
        const wrapper = shallowMount(Home);
        expect(wrapper.html()).toMatchSnapshot()
    })
    test('Debe redireccionar a no-entry al hacer click en el boton', () => { 
        const mockRouter = {
            push: jest.fn()
        };

        const wrapper = shallowMount(Home, {
            global:{
                mocks:{
                    $router:mockRouter
                }
            }
        });

        wrapper.find('button').trigger('click')
        expect(mockRouter.push).toHaveBeenCalled()
        expect(mockRouter.push).toHaveBeenCalledWith({name:'no-entry'})
     })
 })