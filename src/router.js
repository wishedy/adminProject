import index from './views/components/Calendar/index.vue'
import manage from './views/column/001/001.vue';
import icon from './views/column/002/002.vue';
import Tabid1 from './views/tab/tabContent/tabid1.vue';
import Tabid2 from './views/tab/tabContent/tabid2.vue';
import Tabid3 from './views/tab/tabContent/tabid3.vue';
import Tabid4 from './views/tab/tabContent/tabid4.vue';
import Tabid5 from './views/tab/tabContent/tabid5.vue';
import Tabid6 from './views/tab/tabContent/tabid6.vue';
import Tabid22 from './views/tab/tabContent/tabid022.vue';
import Tabid21 from './views/tab/tabContent/tabid021.vue';
import Tabid26 from './views/tab/tabContent/tabid026.vue';
import Tabid23 from './views/tab/tabContent/tabid023.vue';
import Tabid24 from './views/tab/tabContent/tabid024.vue';
import Tabid25 from './views/tab/tabContent/tabid025.vue';
import Tabid32 from './views/tab/tabContent/tabid032.vue';
import Tabid52 from './views/tab/tabContent/tabid052.vue';
import Tabid53 from './views/tab/tabContent/tabid053.vue';
import aside from './views/tab/tabContent/aside.vue';
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
            path:"/manage",
            component: manage
        },
        {
            path:"/icon",
            component: icon
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
            path:"/021",
            component: Tabid21
        },
        {
            path:"/026",
            component: Tabid26
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
        },
        {
            path:"/052",
            component: Tabid52
        },
        {
            path:"/053",
            component: Tabid53
        },
        {
            path:"/054",
            component: aside
        },
    ]
}
