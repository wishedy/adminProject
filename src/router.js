import index from './views/index.vue'
import Tabid1 from './views/tab/tabContent/tabid1.vue'
import Tabid2 from './views/tab/tabContent/tabid2.vue'
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
            path:"/011",
            component: Tabid1
        },
        {
            path:"/012",
            component: Tabid2
        }
    ]
}
