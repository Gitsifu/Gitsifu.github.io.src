<template>
    <div class="container pt-5" style="padding-bottom: 1000px;">
        <h1>Vue Bottom Sheet</h1>
        <p>
            A nice clean and touch-friendly bottom sheet component based on
            <a target="_blank" href="https://vuejs.org/">vue.js</a> and
            <a target="_blank" href="https://hammerjs.github.io/">hammer.js</a>
        </p>
        <h3 class="mb-3">Settings</h3>
        <hr style="opacity: 0.1" />
        <div class="row">
            <div class="col-md-4 col-12">
                <div class="form-check form-switch mb-3">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckChecked"
                        v-model="overlay"
                        checked
                    />
                    <label class="form-check-label" for="flexSwitchCheckChecked">Overlay</label>
                </div>
                <div class="form-check form-switch mb-3">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="closeSwitchCheckChecked"
                        v-model="clickToClose"
                        checked
                    />
                    <label class="form-check-label" for="closeSwitchCheckChecked"
                    >Click outside card to close</label
                    >
                </div>
                <div class="form-check form-switch mb-3">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="canSwipe"
                        v-model="canSwipe"
                        checked
                    />
                    <label class="form-check-label" for="canSwipe"
                    >Enable swipe to close</label
                    >
                </div>
            </div>
            <div class="col-md-4 col-12">
                <div class="mb-3">
                    <h6>Overlay Color</h6>
                    <sketch-picker v-model="overlayColorSelect"/>
                </div>
            </div>
            <div class="col-md-4 col-12">
                <div class="form-group mb-3">
                    <label for="maxWidthInput" class="form-label">Max width (px):</label>
                    <input
                        name="maxWidthInput"
                        type="number"
                        id="maxWidthInput"
                        v-model.number="maxWidth"
                        class="form-control"
                    />
                </div>
                <div class="form-group mb-3">
                    <label for="maxHeightInput" class="form-label">Max height (px):</label>
                    <input
                        name="maxHeightInput"
                        type="number"
                        id="maxHeightInput"
                        v-model.number="maxHeight"
                        class="form-control"
                    />
                </div>
                <div class="form-group mb-3">
                    <label for="closeHeightPercent" class="form-label">Close Height Percent (%):</label>
                    <input
                        name="closeHeightPercentInput"
                        type="number"
                        min="0"
                        max="100"
                        id="closeHeightPercentInput"
                        v-model.number="closeHeightPercent"
                        class="form-control"
                    />
                </div>
            </div>
        </div>
        <button class="btn btn-primary" type="button" @click="open">Open bottom sheet</button>
        <component
            v-if="vueBottomSheetVue2"
            :is="vueBottomSheetVue2"
            :overlay-click-close="clickToClose"
            :transition-duration="0.5"
            :max-width="maxWidth"
            :max-height="maxHeight"
            :close-height-percent="closeHeightPercent"
            :overlay="overlay"
            :can-swipe="canSwipe"
            :overlay-color="overlayColorSelect"
            ref="myBottomSheet"
        >
            <div class="sheet-content">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime neque sed tempore ullam.
                    Accusamus animi at autem beatae est, hic inventore iste minima, non quibusdam quisquam
                    quos velit veritatis voluptatem?
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime neque sed tempore ullam.
                    Accusamus animi at autem beatae est, hic inventore iste minima, non quibusdam quisquam
                    quos velit veritatis voluptatem?
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime neque sed tempore ullam.
                    Accusamus animi at autem beatae est, hic inventore iste minima, non quibusdam quisquam
                    quos velit veritatis voluptatem?
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime neque sed tempore ullam.
                    Accusamus animi at autem beatae est, hic inventore iste minima, non quibusdam quisquam
                    quos velit veritatis voluptatem?
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime neque sed tempore ullam.
                    Accusamus animi at autem beatae est, hic inventore iste minima, non quibusdam quisquam
                    quos velit veritatis voluptatem?
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime neque sed tempore ullam.
                    Accusamus animi at autem beatae est, hic inventore iste minima, non quibusdam quisquam
                    quos velit veritatis voluptatem?
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime neque sed tempore ullam.
                    Accusamus animi at autem beatae est, hic inventore iste minima, non quibusdam quisquam
                    quos velit veritatis voluptatem?
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime neque sed tempore ullam.
                    Accusamus animi at autem beatae est, hic inventore iste minima, non quibusdam quisquam
                    quos velit veritatis voluptatem?
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime neque sed tempore ullam.
                    Accusamus animi at autem beatae est, hic inventore iste minima, non quibusdam quisquam
                    quos velit veritatis voluptatem?
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime neque sed tempore ullam.
                    Accusamus animi at autem beatae est, hic inventore iste minima, non quibusdam quisquam
                    quos velit veritatis voluptatem?
                </p>
                <button type="button" class="btn btn-danger" @click="close">Close</button>
            </div>
        </component>
    </div>
</template>

<script>
import sketch from 'vue-color/src/components/Chrome'

export default {
    name: 'vue-bottom-sheet-vue2-demo',

    data() {
        return {
            overlay: true,
            maxWidth: 640,
            maxHeight: 640,
            closeHeightPercent: 100,
            overlayColorSelect: "#0000004D",
            backgroundScrollable: false,
            backgroundClickable: false,
            clickToClose: true,
            canSwipe: true,
            vueBottomSheetVue2: null,
        };
    },
    components: {
        'sketch-picker': sketch,
    },
    mounted() {
        import('@nclsm/vue-bottom-sheet-vue2').then(module => {
            // use code
            this.vueBottomSheetVue2 = module.default
        })
    },
    methods: {
        open() {
            this.$refs.myBottomSheet.open();
        },
        close() {
            this.$refs.myBottomSheet.close();
        }
    },
    computed: {
        overlyHexColor() {
            if (this.overlayColorSelect != null)
                return this.overlayColorSelect.hex8;
        }
    }
}
</script>

<style>
@import "./bootstrap.min.css";

.sheet-content {
    padding: 20px;
}
</style>
