<template>
    <au-row class="page page-maintainer" direction="column">
        <au-col :grow="1">
            <au-table :columns="tableColums" />
        </au-col>
    </au-row>
</template>

<script>
import NavbarSetupMixin from '@/mixins/navbar-setup'
import Modules from '@/static/configuration/modules.ts'

export default {
    mixins: [ NavbarSetupMixin ],
    data() {

        return {
            tableColums: [
                { id: 'email', label: 'Correo Electrónico' },
                { id: 'group', label: 'Grupo' },
                { id: 'rol', label: 'Rol' },
            ],
        }
    
    },

    beforeMount() {

        const modulesLinks = Modules.reduce( (acc, { links } ) => [ ...acc, ...links ], [] )
        const { label } = modulesLinks.find( ( { id } ) => id === this.$route.params.entity)

        this._setupNavbar( {
            title: label[this.$i18n.locale] || '',
        } )
    
    },
}
</script>
