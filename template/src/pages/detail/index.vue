<template>
    <div>
        <p>哇偶！</p>
        <router-link to="/{{name}}/index">
            返回首页
        </router-link>
    </div>
</template>
<script>
    
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