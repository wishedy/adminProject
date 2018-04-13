<template>
    <el-container class="adminContainer" @click.native.stop="closeMask($event)">
        <SideBar></SideBar>
        <ContentBar></ContentBar>
    </el-container>
</template>
<style lang="scss" scoped >
    .adminContainer{
        position: absolute;
        top: 0;
        /* bottom: 0; */
        left: 0;
        right: 0;
        min-height: 100vh; // 或 100%
        background: #fdfdfd;
    }
</style>
<script>
    import jquery from 'jquery'
    import SideBar from './views/sideBar';
    import ContentBar from './views/MainContent';
    import {mapGetters,mapActions} from 'vuex';
    export default {
        data(){
            return {
                mag:"",
                Context:false
            }
        },
        components:{
            SideBar,
            ContentBar
        },
        watch:{
            nowTabData(){
                console.log("改变");
            }
        },
        computed:{
            ...mapGetters(['nowTabData'])
        },
        methods:{
            ...mapActions(['ContextOff']),
            closeMask(e){
                let t = this;
                t.ContextOff();
            }
        }
    }
</script>
