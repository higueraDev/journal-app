import FabComponent from '@/modules/daybook/components/FabComponent'
import { shallowMount } from '@vue/test-utils'

describe('Pruebas en el FabComponent', () => { 
    test('Debe mostrar el icono por defecto', () => { 
        const wrapper = shallowMount(FabComponent);
        const icon = wrapper.find('i');
        expect(icon.classes('fa-plus')).toBeTruthy()
     })
    test('Debe mostrar el icono por argumento', () => { 
        const wrapper = shallowMount(FabComponent,{
            props:{
                icon:'fa-save'
            }
        });
        const icon = wrapper.find('i');
        expect(icon.classes('fa-save')).toBeTruthy()
     })
    test('Debe mostrar emitir el evento on:click cuando se hace click', () => { 
        const wrapper = shallowMount(FabComponent);
        const button = wrapper.find('button');
        button.trigger('click');
        expect(wrapper.emitted('on:click')).toBeTruthy();
        expect(wrapper.emitted('on:click')).toHaveLength(1);
     })
 })