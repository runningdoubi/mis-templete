<template>
<div id='bd'>
    <app-header></app-header>
    <transition name="router-switch">
        <router-view></router-view>
    </transition>
</div>
</template>
<script>
    import AppHeader from 'components/header';
    export default {
        components: {
            AppHeader
        }
    }
</script>
<style lang=less>
    html {
        background-color: #f5f5f5;
    }
    body {
        margin: 0px;
    }
    .router-switch-enter {
        transform: translateX(100%);
    }
    .router-switch-leave-active {
        transform: translateX(-100%);
    }
    .router-switch-enter-active, .router-switch-leave-active{
        position: absolute;
        top: 87px;
        bottom: 0;
        left: 0;
        right: 0;
        transition: all .3s;
    }
</style>