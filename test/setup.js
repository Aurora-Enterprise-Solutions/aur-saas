import Vue from 'vue'
import { config } from '@vue/test-utils'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'
import AurDesign from '@aurora-enterprise-solutions/aur-design'
import locales from '../src/static/locales'
import ResizeObserver from './__mocks__/ResizeObserver'

config.showDeprecationWarnings = false
process.on('unhandledRejection', function(_error) {} )

Vue.use(VueI18n)
Vue.use(Vuex)
Vue.use(AurDesign)

global.i18n = new VueI18n( {
    locale         : 'es',
    fallbackLocale : 'es',
    messages       : locales,
} )

window.ResizeObserver = ResizeObserver
