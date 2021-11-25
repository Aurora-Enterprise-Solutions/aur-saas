<template>
    <div class="component component-version">
        <label>{{ version }}</label>
    </div>
</template>

<script>
import packageJson from '@@/package.json'

export default {
    name     : 'AuVersion',
    computed : {
        version() {

            return `ver ${packageJson['version']}`
        
        },
    },
}
</script>
