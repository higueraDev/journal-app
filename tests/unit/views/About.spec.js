const { shallowMount } = require("@vue/test-utils");
import About from '@/views/About';

describe('Pruebas en el About View', () => { 
    test('Debe hacer match con el snapshot',()=>{
        const wrapper = shallowMount(About);
        expect(wrapper.html()).toMatchSnapshot()
    })
 });