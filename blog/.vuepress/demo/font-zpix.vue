<template>
    <h1 class="zpix">你好zpix</h1>
</template>

<script>
export default {
    name: "font-zpix",
    data() {
        return {}
    },
    mounted() {
    },
    methods: {},
}
</script>

<style scoped>
@font-face {
    font-family: 'zpix';
    src: url('/blog/assets/font/zpix.ttf') format('truetype');
}
.zpix{
    font-family: 'zpix';
}
</style>