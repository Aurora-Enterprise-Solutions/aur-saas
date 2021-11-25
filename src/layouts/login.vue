<template>
    <div class="layout layout-login">
        <div class="au-logo">
            <au-logo />
        </div>

        <div class="form">
            <Nuxt />
        </div>

        <div class="rigths">
            <span>{{ $t('global.rigths', { year: new Date().getFullYear() }) }}</span>
        </div>
    </div>
</template>
