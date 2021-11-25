<template>
    <div class="page page-modules">
        <div class="module-list">
            <client-only>
                <div
                    v-masonry
                    transition-duration="0.1s"
                    column-width=".module-item"
                    item-selector=".module-item"
                    class="masonry-container"
                    :fit-width="true"
                >
                    <au-module-card
                        v-for="(module, index) in modules"
                        :key="index"
                        v-masonry-tile
                        v-bind="module"
                        class="module-item"
                        @collapse="onCollapse($event)"
                    />
                </div>
            </client-only>
        </div>

        <div class="version">
            <div class="version-wrapper">
                <au-version />
            </div>
        </div>
    </div>
</template>

<script>
import voca from 'voca'
import AuModuleCard from '@/components/AuModuleCard.vue'
import AuVersion from '@/components/AuVersion.vue'
import Modules from '@/static/configuration/modules.ts'
import NavbarSetupMixin from '@/mixins/navbar-setup'

export default {
    name       : 'Modules',
    components : { AuModuleCard, AuVersion },
    mixins     : [ NavbarSetupMixin ],
    data() {

        return {
            filteredModules: Modules.filter( (module) => module.enable),
        }
    
    },

    computed: {
        modules() {

            return this.filteredModules
        
        },
    },

    beforeMount() {

        this._setupNavbar( {
            title           : this.$t('pages.modules.title'),
            showSearchInput : true,
            onSearch        : this.onSearch,
        } )
    
    },

    methods: {
        onSearch(text) {

            if (!voca.isEmpty(text) ) {

                this.filteredModules = Modules.filter( (module) => {

                    const title = module.title[this.$i18n.locale] || module.title[this.$i18n.fallbackLocale]

                    return module.enable && (voca.matches(title, text, 'i') || this.linkContainsText(module, text) )
                
                } )
            
            }
            else { this.filteredModules = Modules.filter( (module) => module.enable) }
        
        },

        linkContainsText(module, text) {

            let contains = false

            if (module['links'] && module['links'].length > 0) {

                for (let i = 0; i < module['links'].length; i++) {

                    const label = module['links'][i].label[this.$i18n.locale] || module['links'][i].label[this.$i18n.fallbackLocale]

                    if (voca.matches(label, text, 'i') ) {

                        contains = true

                        break
                    
                    }
                
                }
            
            }

            return contains
        
        },

        onCollapse() {

            const interval = setInterval( () => {

                this.$redrawVueMasonry()
            
            }, 1)

            setTimeout( () => {

                clearInterval(interval)
            
            }, 710)
        
        },
    },
}
</script>
