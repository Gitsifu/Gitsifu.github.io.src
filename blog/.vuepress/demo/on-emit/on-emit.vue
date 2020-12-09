<template>
    <div>
        <button v-on:click="clickFunc">点击一下</button>
    </div>
</template>

<script>
export default {
    name: 'on-emit',
    data() {
        return {}
    },
    methods: {
        clickFunc() {
            this.$emit('eventName', '这个是数据啦！！！')
        }
    },
    //在创建时执行，并监听 ‘eventName’事件,$on这个方法监听本组件中的事件一般都都是写在created生命周期函数里
    mounted() {
        this.$on('eventName', function (data) {
            alert('监听eventName事件收到了数据：\n' + data)
        })
    },
}
</script>

<style scoped>

</style>