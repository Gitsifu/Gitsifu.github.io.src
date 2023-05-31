<template>
    <div>

        <h1>签字画板</h1>
        <div>
            画笔粗细：
            <select v-model="lineWidth">
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
                <option value="10">10</option>
            </select>
            画笔颜色：
            <input type="color" v-model="lineColor"></input>
            画布背景:
            <input type="color" v-model="bgColor"></input>
            是否裁剪：
            <input type="checkbox" v-model="isCrop"></input>
        </div>
        <br/>
        <vue-esign
            style="border: 1px solid #82848a;"
            ref="esign"
            :width="800"
            :height="300"
            :isCrop="isCrop"
            :lineWidth="lineWidth"
            :lineColor="lineColor"
            :bgColor.sync="bgColor"
        />
        <br/>
        <button @click="handleReset">清空画板</button>
        <button @click="handleGenerate">生成图片</button>
        <br/>
        <img :src="resultImg"/>
    </div>
</template>

<script>
// https://github.com/JaimeCheng/vue-esign   canvas手写签字 电子签名
import VueEsign from 'vue-esign'
export default {
    name: "demo",
    components:{
        VueEsign
    },
    data () {
        return {
            lineWidth: 6,
            lineColor: '#000000',
            bgColor: '#ffffff',
            resultImg: '',
            isCrop: false
        }
    },
    methods: {
        handleReset () {
            this.$refs.esign.reset()
            this.bgColor = '#ffffff'
        },
        handleGenerate () {
            this.$refs.esign.generate().then(res => {
                this.resultImg = res
            }).catch(err => {
                alert(err) // 画布没有签字时会执行这里 'Not Signned'
            })
        }
    }
}
</script>

<style scoped>

</style>
