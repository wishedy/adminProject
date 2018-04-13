<template>

        <aside class="adminSide" :class="{'active':!toggleOnOff}">
            <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                     :collapse="toggleOnOff" text-color="#BFCBD9" >
                <el-submenu :index="item.index" v-for="(item,i) in tabList" :key="i">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span slot="title">{{item.title}}</span>
                    </template>
                    <el-menu-item :index="inItem.index" v-for="(inItem,index) in item.tabList" :key="index" @click.native.stop="routerDirec(inItem)" @mouseup.native.stop="runFn(inItem)">
                        <i :class="inItem.icon"></i>
                        {{inItem.title}}
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </aside>
</template>
<style lang="scss">
    .el-menu--popup{
        .el-menu-item{
            color: #303133 !important;
        }
    }
    .adminSide{
        width: 36px;
        background-color: rgb(48, 65, 86);
        height: 100%;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
        transition: width .28s ease;
        .el-submenu .el-menu-item{
            min-width: 180px;
            transition: width  .28s ease;
            /*background: rgb(38,52,69);*/
            &:hover,&:focus{
                background: rgb(38,52,69);
            }

        }
        .el-menu-item:hover,.el-submenu__title:hover{
            background: rgb(38,52,69);
        }
        .el-menu-item-group__title,.el-menu-item{
            /*color: rgb(191, 203, 217) !important;*/
            span{
                /*color: rgb(191, 203, 217) !important;*/
            }
        }
        .el-submenu__title,.el-menu--vertical{
            /*background: rgb(38,52,69);*/
        }
        &.active{
            width: 180px;
            transition: width .28s ease;
            .el-menu{
                width: 180px !important;
                transition: width .28s ease;
            }
        }
        .el-menu{
            width: 36px !important;
            background-color: rgb(48, 65, 86);
            border-right: none;
        }
        .el-tooltip,.el-submenu__title{
            padding: 0px 5px !important;
            transition: width .28s ease;
        }
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
</style>

<script>
    import {mapGetters,mapActions} from 'vuex';
    import axios from 'axios';
    export default {
        data() {
            return {
                tabList:[]
            };
        },
        computed:{
            ...mapGetters(['toggleOnOff'])
        },
        mounted(){
            let t = this;
            axios({
                url: '/src/tabData/tabJson.json',
                method: "GET",
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                timeout: 30000
            }).then(function (res) {
                t.tabList = res.data.tabList;
            }).catch(function (err) {
            });
        },
        methods: {
            ...mapActions(['addTab','outLoginOne']),
            runFn(v){
                let t = this;
                t[v.eventFn]&&t[v.eventFn]();
            },
            routerDirec(v){
                let t = this;
                t.addTab(v);
                t.$router.push({ path: v.routerLink });
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>
