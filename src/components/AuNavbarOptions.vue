<template>
    <div class="component component-navbar-options">
        <div class="option" @click="logout">
            <au-icon icon="logout" />
            <a>{{ $t('components.navbar.logout') }}</a>
        </div>
    </div>
</template>

<script>
export default {
    name    : 'AuNavbarOptions',
    methods : {
        async logout() {

            await this.$notification( {
                type         : 'confirm',
                message      : this.$t('global.confirm.LOGOUT'),
                closeTimeout : 0,
            } )
                .then(async(confirmed) => {

                    if (confirmed)
                        await this.$auth.logout()
                
                } )
        
        },
    },
}
</script>
