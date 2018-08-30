<template>
    <p>
    你在本页面已停留<span>
    {{ time }}</span>
    秒
    </p>
</template>
<script>
    export default {
        data: () => {
            return {
                time: 0
            }
        },
        mounted: function () {
            setInterval(() => {
                ++(this.time);
            }, 1000)
        }
    }
</script>
<style lang=less scoped>
    span {
        display: inline-block;
        width: 70px;
    }
</style>
