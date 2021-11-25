export const state = () => ( {
    title           : '',
    searchText      : '',
    showSearchInput : false,
    user            : {},
    org             : {},
    onSearch        : () => true,
} )

export const mutations = {
    setTitle(state, text) {

        state.title = text

    },

    setSearchText(state, text) {

        state.searchText = text

    },

    setShowSearchInput(state, value) {

        state.showSearchInput = value

    },

    setUser(state, user) {

        state.user = user

    },

    setOrg(state, org) {

        state.org = org

    },

    setOnSearch(state, onSearch) {

        state.onSearch = onSearch

    },

    setState(state, options) {

        if (options.title)
            state.title = options.title

        if (options.searchText)
            state.searchText = options.searchText

        state.showSearchInput = options.showSearchInput || false

        if (options.user)
            state.user = options.user

        if (options.org)
            state.org = options.org

        state.onSearch = options.onSearch || function() { return true }

    },

    reset(state) {

        state.title = ''
        state.searchText = ''
        state.showSearchInput = false
        state.user = {}
        state.org = {}

    },
}

export const getters = {
    getTitle: (state) => {

        return state.title

    },

    getSearchText: (state) => {

        return state.searchText

    },

    getUser: (state) => {

        return state.user

    },

    getOrg: (state) => {

        return state.org

    },

    getShowSearchInput: (state) => {

        return state.showSearchInput

    },

    getOnSearch: (state) => {

        return state.onSearch

    },
}
