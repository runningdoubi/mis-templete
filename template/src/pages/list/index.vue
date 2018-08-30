<template>
    <div>
        <img src="../../assets/woqu.gif">
        <p>什么情况！</p>
        <button @click.prevent="addCounter">点我也能让计数器加1</button>
        <router-link to="/{{name}}/detail">
            去详情页
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
    img {
        width: 200px;
    }
    p {
        font-size: 16px;
        color: #666;
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
}   
</style>