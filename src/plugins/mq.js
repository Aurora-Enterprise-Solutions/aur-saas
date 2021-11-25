import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
    breakpoints: {
        sm  : 500,
        md  : 800,
        lg  : 1100,
        xl  : 1980,
        xxl : Infinity,
    },

    defaultBreakpoint: 'lg',
} )
