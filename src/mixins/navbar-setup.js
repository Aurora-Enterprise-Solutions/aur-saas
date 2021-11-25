export default {
    methods: {
        _setupNavbar(options) {

            this.$store.commit('navbar/setState', options)
        
        },
    },
}
