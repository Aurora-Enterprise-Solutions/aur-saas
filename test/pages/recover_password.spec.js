import { mount } from '@vue/test-utils'
import RecoverPassword from '@/pages/recover_password/index.vue'
import RecoverPasswordConfirm from '@/pages/recover_password/_email/_cdn/index.vue'
import { mocks } from './../__mocks__/global'

const i18n = global.i18n

const commonOptions = {
    i18n,
    mocks,
}

describe('Page Recover Password', () => {

    test('renderiza dos botones (send_code, inser_code)', () => {

        const wrapper = mount(RecoverPassword, {
            ...commonOptions,
        } )

        const buttons = wrapper.findAll('.au-button > button')
        expect(buttons.length).toBe(2)

    } )

    test('botón para obtener código llama método submit', () => {

        const submit = jest.fn()
        const wrapper = mount(RecoverPassword, {
            ...commonOptions,
            methods: {
                submit,
            },
        } )

        const buttons = wrapper.findAll('.au-button > button')
        buttons.wrappers[0].trigger('click')

        expect(submit).toHaveBeenCalled()

    } )

    test('botón de ya poseo código llama método toConfirm', () => {

        const toConfirm = jest.fn()
        const wrapper = mount(RecoverPassword, {
            ...commonOptions,
            methods: {
                toConfirm,
            },
        } )

        const buttons = wrapper.findAll('.au-button > button')
        buttons.wrappers[1].trigger('click')

        expect(toConfirm).toHaveBeenCalled()

    } )

    test('submit arroja error cuando no se cumplen las reglas del formulario', async() => {

        const wrapper = mount(RecoverPassword, {
            ...commonOptions,
        } )
        await wrapper.vm.submit()
        expect(wrapper.findAll('.au-form-item .message').length).toBeGreaterThan(0)

    } )

    test('toConfirm arroja error cuando no se cumplen las reglas del formulario', async() => {

        const wrapper = mount(RecoverPassword, {
            ...commonOptions,
        } )
        await wrapper.vm.toConfirm()
        expect(wrapper.findAll('.au-form-item .message').length).toBeGreaterThan(0)

    } )

    test('toConfirm redirecciona a /recover_password/confirm', async() => {

        const wrapper = mount(RecoverPassword, {
            ...commonOptions,
            data() {

                return {
                    modelForm: {
                        email : 'test',
                        cdn   : 'cl.aurora.aur',
                    },
                }

            },
        } )

        await wrapper.vm.toConfirm()
        expect(wrapper.vm.$router.push).toHaveBeenCalledWith( { path: `/recover_password/confirm/${wrapper.vm.modelForm.email.toLowerCase()}/${wrapper.vm.modelForm.cdn.toLowerCase()}` } )

    } )

} )

describe('Page Recover Password Confirm', () => {

    test('submit arroja error cuando no se cumplen las reglas del formulario', async() => {

        const setEmail = jest.fn()
        const wrapper = mount(RecoverPasswordConfirm, {
            ...commonOptions,
            methods: {
                setEmail,
            },
        } )
        await wrapper.vm.submit()
        expect(wrapper.findAll('.au-form-item .message').length).toBeGreaterThan(0)

    } )

} )
