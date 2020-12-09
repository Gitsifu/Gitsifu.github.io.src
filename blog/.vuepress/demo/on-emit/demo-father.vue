<template>
    <div>
        <demo-child v-on:event="clickButton"></demo-child>
        <div>{{msg}}</div>
    </div>
</template>

<script>
import DemoChild from "./demo-child";

export default {
    name: 'demo-father',
    components: {DemoChild},
    props: [],
    data() {
        return {
            msg: '这个是原始数据'
        }
    },
    methods: {
        clickButton(data) {
            this.msg = data;
        }
    },
    mounted() {
    }
}
</script>

<style scoped>
</style>