import index from './views/index.vue'
import Tabid1 from './views/tab/tabContent/tabid1.vue'
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
        }
    ]
}
