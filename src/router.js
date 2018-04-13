import index from './views/index.vue'
import Tabid1 from './views/tab/tabContent/tabid1.vue'
/*import css from './views/css.vue'
import stylus from './views/stylus.vue'
import less from './views/less.vue'
import sass from './views/sass.vue'
import image from './views/image.vue'
import iconfont from './views/iconfont.vue'*/
export default {
    linkActiveClass: 'active',
    routes: [
        {
        path: '/',
        component: index
        },
        {
            path: '*',
            component: index
        },
        {
            path:"/tabid1",
            component: Tabid1
        }
    ]
}
