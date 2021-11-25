import { mount } from '@vue/test-utils'
import Login from '@/pages/login.vue'
import { mocks } from './../__mocks__/global'

const i18n = global.i18n

const commonOptions = {
    i18n,
    mocks,
}

describe('Page Login', () => {

    test('renderiza dos botones (login, recover)', () => {

        const wrapper = mount(Login, {
            ...commonOptions,
        } )

        const buttons = wrapper.findAll('.au-button > button')
        expect(buttons.length).toBe(2)
    
    } )

    test('botón para iniciar sesión llama método submit', () => {

        const submit = jest.fn()
        const wrapper = mount(Login, {
            ...commonOptions,
            methods: {
                submit,
            },
        } )

        const buttons = wrapper.findAll('.au-button > button')
        buttons.wrappers[0].trigger('click')

        expect(submit).toHaveBeenCalled()
    
    } )

    test('botón para recuperar contraseña llama método recover', () => {

        const recover = jest.fn()
        const wrapper = mount(Login, {
            ...commonOptions,
            methods: {
                recover,
            },
        } )

        const buttons = wrapper.findAll('.au-button > button')
        buttons.wrappers[1].trigger('click')

        expect(recover).toHaveBeenCalled()
    
    } )

    test('submit arroja error cuando no se cumplen las reglas del formulario', async() => {

        const wrapper = mount(Login, {
            ...commonOptions,
        } )
        await wrapper.vm.submit()
        expect(wrapper.findAll('.au-form-item .message').length).toBeGreaterThan(0)
    
    } )

    test('submit redirecciona a /modules cuando se loguea correctamente', async() => {

        const wrapper = mount(Login, {
            ...commonOptions,
            data() {

                return {
                    modelForm: {
                        email    : 'test',
                        password : 'secret',
                        cdn      : 'cl.test.aur',
                    },
                }
            
            },
        } )

        await wrapper.vm.submit()

        expect(wrapper.vm.$router.push).toHaveBeenCalledWith( { path: '/modules' } )
    
    } )

    test('recover redirecciona a /recover_password', () => {

        const wrapper = mount(Login, {
            ...commonOptions,
        } )

        wrapper.vm.recover()
        expect(wrapper.vm.$router.push).toHaveBeenCalledWith( { path: '/recover_password' } )
    
    } )

} )
