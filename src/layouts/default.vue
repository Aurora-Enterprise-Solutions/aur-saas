<template>
    <div class="layout layout-default">
        <au-navbar v-bind="navbar" @search="onSearch($event)" />

        <div class="layout-content">
            <Nuxt />
        </div>
    </div>
</template>

<script>
import AuNavbar from '@/components/AuNavbar.vue'

export default {
    components: { AuNavbar },
    data() {

        return {
            navbar: {
                showSearchInput : true,
                user            : {
                    name           : 'jesús',
                    secondName     : 'Alberto',
                    lastName       : 'barrientos',
                    secondLastName : 'gonzález',
                    degree         : 'consulting analyst',
                    avatar         : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSpINRxilsxu9AldotOSirz-KeZEQrczDwATFWDpwlHTFzSMgTxmIpOLZXy6zvzd940nyQIA6WbyPdp9AniiVS8_OOZZLiOkKfJ1Q&usqp=CAU&ec=45707744',
                    notification   : 100,
                },

                org: {
                    // logo: 'https://pbs.twimg.com/profile_images/1280170112386052098/hIzck93__400x400.png'
                },
            },
        }
    
    },
}
</script>
