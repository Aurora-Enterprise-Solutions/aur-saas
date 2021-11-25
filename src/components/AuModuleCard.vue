<template>
    <div class="component component-module-card">
        <au-card :title="localeTitle" :description="localeDescription" hoverable collapsible @collapse="onCollapse($event)">
            <div slot="title" slot-scope="headerProps" class="card-title" @click="goToModule">
                <au-text tag="h5">
                    {{ headerProps.header.title }}
                </au-text>
                <au-text tag="p">
                    {{ headerProps.header.description }}
                </au-text>
            </div>
            <div class="link-container">
                <nuxt-link v-for="(link, index) in links" :key="index" :to="link.to">
                    {{ localeLinkLabel(link.label) }}
                </nuxt-link>
            </div>
        </au-card>
    </div>
</template>

<script>
export default {
    name  : 'AuModuleCard',
    props : {
        /**
             * Títulos del módulo en los distintos idiomas.
             */
        title: {
            type     : Object,
            required : true,
        },

        /**
             * Descripción del módulo.
             */
        description: {
            type     : Object,
            required : false,
            default  : undefined,
        },

        /**
             * Link del módulo.
             */
        to: {
            type     : String,
            required : false,
            default  : undefined,
        },

        /**
             * Lista con los links a las páginas que se redireccionarán.
             */
        links: {
            type     : Array,
            required : false,
            default  : () => [],
        },
    },

    computed: {
        localeTitle() {

            return this.title[this.$i18n.locale] || this.title[this.$i18n.fallbackLocale]
        
        },

        localeDescription() {

            return this.description ? (this.description[this.$i18n.locale] || this.description[this.$i18n.fallbackLocale] ) : undefined
        
        },
    },

    methods: {
        goToModule() {

            if (this.to) {

                this.$router.push( {
                    path: this.to,
                } )
            
            }
        
        },

        localeLinkLabel(label) {

            return label[this.$i18n.locale] || label[this.$i18n.fallbackLocale]
        
        },

        onCollapse(value) {

            this.$emit('collapse', value)
        
        },
    },
}
</script>
