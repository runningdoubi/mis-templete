<template>
    <div class="header">
        <img src="../assets/hao123_logo.png" alt="">
        <timer></timer>
        <p>我是计数器{{$store.state.global.globalCounter}}</p>
    </div>
</template>
<script>
import timer from './timer';
    export default {
        components: {
            timer
        }
    }
</script>
<style lang=less scoped>
div {
    position: relative;
    p {
        margin: 0px;
        font-size: 14px;
    }
}
</style>