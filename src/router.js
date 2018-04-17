import index from './views/index.vue'
import Tabid1 from './views/tab/tabContent/tabid1.vue';
import Tabid2 from './views/tab/tabContent/tabid2.vue';
import Tabid3 from './views/tab/tabContent/tabid3.vue';
import Tabid4 from './views/tab/tabContent/tabid4.vue';
import Tabid5 from './views/tab/tabContent/tabid5.vue';
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
        },
        {
            path:"/013",
            component: Tabid3
        },
        {
            path:"/014",
            component: Tabid4
        },
        {
            path:"/015",
            component: Tabid5
        }
    ]
}
