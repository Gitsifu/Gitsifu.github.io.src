import SomeDemo from './demo/demo'
import FontZpix from './demo/font-zpix'
import RichText from './demo/rich-text'
import VAnimated from './demo/v-animated'
import OnEmit from './demo/on-emit/on-emit'
import DemoChild from './demo/on-emit/demo-child'
import DemoFather from './demo/on-emit/demo-father'
import VueBottomSheetVue2Demo from "./demo/vue-bottom-sheet-vue2/vue-bottom-sheet-vue2-demo";
import Watermark from './demo/watermark'
import RenderDocx from './demo/render-docx'
import copy from "./utils/copy";
import tongji from "./utils/tongji";

export default ({
                  Vue, // VuePress 正在使用的 Vue 构造函数
                  options, // 附加到根实例的一些选项
                  router, // 当前应用的路由实例
                  siteData, // 站点元数据
                  isServer // 当前应用配置是处于 服务端渲染 或 客户端
                }) => {
  Vue.component(SomeDemo.name, SomeDemo)
  Vue.component(FontZpix.name, FontZpix)
  Vue.component(RichText.name, RichText)
  Vue.component(VAnimated.name, VAnimated)
  Vue.component(OnEmit.name, OnEmit)
  Vue.component(DemoChild.name, DemoChild)
  Vue.component(DemoFather.name, DemoFather)
  Vue.component(VueBottomSheetVue2Demo.name, VueBottomSheetVue2Demo)
  Vue.component(Watermark.name, Watermark)
  Vue.component(RenderDocx.name, RenderDocx)

  copy()
  tongji(router)
}
