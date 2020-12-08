<template>
    <div>
        <h1 class="wow animate__bounce">animate__bounce</h1>
        <h1 class="wow animate__flash">animate__flash</h1>
        <h1 class="wow animate__pulse">animate__pulse</h1>
        <h1 class="wow animate__rubberBand">animate__rubberBand</h1>
    </div>
</template>

<script>
import 'animate.css'
export default {
    name: "v-animated",
    mounted(){
        import('wowjs').then(module => {
            let WOW =  module.default.WOW
            new WOW(
                {
                    boxClass:     'wow',      // default
                    animateClass: 'animate__animated', // default
                    offset:       0,          // default
                    mobile:       true,       // default
                    live:         true        // default
                }
            ).init()
        })
    },
    methods: {
    }
}
</script>

<style scoped>

</style>