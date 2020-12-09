<template>
    <div>
        <button v-on:click="test">点我一下</button>
    </div>
</template>

<script>
export default {
    name: 'demo-child',
    components: {},
    props: [],
    data() {
        return {}
    },
    methods: {
        test(){
            //第一个参数是事件名称
            this.$emit('event','这个是事件触发后发送的数据，v-on的回调函数参数接收');
        }
    },
    mounted() {
    }
}
</script>

<style scoped>
</style>