import index from './views/index.vue'
import Tabid1 from './views/tab/tabContent/tabid1.vue';
import Tabid2 from './views/tab/tabContent/tabid2.vue';
import Tabid3 from './views/tab/tabContent/tabid3.vue';
import Tabid4 from './views/tab/tabContent/tabid4.vue';
import Tabid5 from './views/tab/tabContent/tabid5.vue';
import Tabid6 from './views/tab/tabContent/tabid6.vue';
import Tabid22 from './views/tab/tabContent/tabid022.vue';
import Tabid23 from './views/tab/tabContent/tabid023.vue';
import Tabid24 from './views/tab/tabContent/tabid024.vue';
import Tabid25 from './views/tab/tabContent/tabid025.vue';
import Tabid32 from './views/tab/tabContent/tabid032.vue';
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
        },
        {
            path:"/016",
            component: Tabid6
        },
        {
            path:"/022",
            component: Tabid22
        },
        {
            path:"/023",
            component: Tabid23
        },
        {
            path:"/032",
            component: Tabid32
        },
        {
            path:"/024",
            component: Tabid24
        },
        {
            path:"/025",
            component: Tabid25
        }
    ]
}
