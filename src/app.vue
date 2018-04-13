<template>
    <el-container class="adminContainer" @click.native.stop="closeMask($event)">
        <SideBar></SideBar>
        <ContentBar></ContentBar>
        <LoginBar v-show="!(loginOnOff.length>0)"></LoginBar>
        <OutLoginDialog></OutLoginDialog>
    </el-container>
</template>
<style lang="scss" scoped >
    .adminContainer{
        position: relative;
        top: 0;
        /* bottom: 0; */
        left: 0;
        right: 0;
        height: 100vh; // 或 100%
        /*height: auto;*/
        overflow: auto;
        background: #fdfdfd;
    }
</style>
<script>
    import OutLoginDialog from './views/Dialog/OutLogin.vue'
    import jquery from 'jquery';
    import LoginBar from './views/Login.vue'
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
            ContentBar,
            LoginBar,
            OutLoginDialog
        },
        watch:{
            nowTabData(){
                console.log("改变");
            }
        },
        mounted(){
            console.log(this.nowTabData.length===0)
            if(this.nowTabData.length===0){
                this.$router.push({ path: '/' });
            }
        },
        computed:{
            ...mapGetters(['nowTabData','loginOnOff'])
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
