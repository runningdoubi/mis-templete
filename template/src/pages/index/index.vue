<template>
<div>
    <p>
        Hello, World!
    </p>
    <button @click.prevent="addCounter">点我计数器加1</button>
    <router-link to='/{{name}}/list'>
        去列表页
    </router-link>
</div>
</template>
<script>
export default {
    methods: {
        addCounter() {
            this.$store.commit('increment');
            }
        }
    }
</script>
<style lang=less scoped>
div {
    text-align: center;
}
    p {
        font-size: 16px;
        color: #666;
        text-align: center;
    }
    img {
        margin: 0 auto;
    }
    a {
        padding-top: 10px;
        width: 100px;
        font-size: 18px;
        font-weight: 500;
        color: #222;
        text-decoration: none;
        display: block;
        margin: 0 auto;
    }
</style>