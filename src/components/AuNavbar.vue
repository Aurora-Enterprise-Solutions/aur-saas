<template>
    <div class="component component-navbar">
        <div class="org-logo-side">
            <img v-if="orgLogo" :src="orgLogo">
            <img v-else src="./../assets/images/company_default_logo.svg">
        </div>

        <div class="title-side">
            <h4 class="title">
                {{ title }}
            </h4>
        </div>

        <div class="extra-container">
            <div class="extra-side">
                <au-input v-if="showSearchInput" v-model="searchText" type="search" :placeholder="$t('components.navbar.search.placeholder')" class="search-input" />
            </div>

            <div class="user-side">
                <mq-layout mq="xl+">
                    <div class="user-info">
                        <label class="name">{{ fullName }}</label>
                        <label class="degree">{{ degree }}</label>
                    </div>
                </mq-layout>

                <div class="user-pic">
                    <img v-if="avatar" :src="avatar">
                    <img v-else src="./../assets/images/avatars/009-antilope.svg">
                </div>
            </div>

            <div class="notification-side">
                <au-badge v-if="user.notification > 0" :count="user.notification">
                    <au-icon icon="bell" animatable clickable />
                </au-badge>

                <!-- Notification icon -->
                <au-icon v-else icon="bell" animatable clickable />

                <!-- Options icon -->
                <au-icon icon="point" animatable clickable :showing-options="showOptionsMenu" @click="showOptions" />
            </div>
        </div>

        <!-- Options from Options icon -->
        <div v-show="showOptionsMenu" class="cascade-options">
            <au-navbar-options />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import voca from 'voca'
import AuNavbarOptions from './AuNavbarOptions.vue'

export default {
    name       : 'AuNavbar',
    components : { AuNavbarOptions },
    data() {

        return {
            searchText      : '',
            showOptionsMenu : false,
        }
    
    },

    computed: {
        ...mapGetters( {
            title           : 'navbar/getTitle',
            user            : 'navbar/getUser',
            org             : 'navbar/getOrg',
            showSearchInput : 'navbar/getShowSearchInput',
            onSearch        : 'navbar/getOnSearch',
        } ),

        fullName() {

            const fullName = `${this.user['name'] || ''} ${this.user['secondName'] || ''} ${this.user['lastName'] || ''} ${this.user['secondLastName'] || ''}`

            return voca.titleCase(fullName).trim()
        
        },

        degree() {

            const degree = this.user['degree'] || ''

            return voca.titleCase(degree).trim()
        
        },

        avatar() {

            return this.user.avatar != null ? this.user.avatar : undefined
        
        },

        orgLogo() {

            return this.org.logo != null ? this.org.logo : undefined
        
        },
    },

    watch: {
        searchText(newValue) {

            if (this.onSearch)
                this.onSearch(newValue)
        
        },
    },

    methods: {
        showOptions() {

            this.showOptionsMenu = !this.showOptionsMenu
        
        },
    },
}
</script>
