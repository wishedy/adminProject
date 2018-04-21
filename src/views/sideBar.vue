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
            t.tabList = [
                {
                    "index":"1",
                    "title":"会员管理",
                    "icon":"el-icon-ump-VIP",
                    "tabList":[
                        {
                            "index":"1-1",
                            "title":"会员统计",
                            "icon":"el-icon-ump-VIP",
                            "routerLink":"011"
                        },
                        {
                            "index":"1-2",
                            "title":"会员审核",
                            "icon":"el-icon-ump-Audit",
                            "routerLink":"012"
                        },
                        {
                            "index":"1-3",
                            "title":"信息变更",
                            "icon":"el-icon-ump-edit",
                            "routerLink":"013"
                        },
                        {
                            "index":"1-4",
                            "title":"会员反馈",
                            "icon":"el-icon-ump-ico_feedback",
                            "routerLink":"014"
                        },
                        {
                            "index":"1-5",
                            "title":"会员举报",
                            "icon":"el-icon-ump-chakantiezigengduojubao",
                            "routerLink":"015"
                        },
                        {
                            "index":"1-6",
                            "title":"黑名单",
                            "icon":"el-icon-ump-heimingdan",
                            "routerLink":"016"
                        }
                    ]
                },
                {
                    "index":"2",
                    "title":"CMS管理",
                    "icon":"el-icon-ump-heads",
                    "tabList":[
                        {
                            "index":"2-1",
                            "title":"消息",
                            "icon":"el-icon-ump-msg",
                            "routerLink":"021"
                        },
                        {
                            "index":"2-2",
                            "title":"动态",
                            "icon":"el-icon-ump-talk",
                            "routerLink":"022"
                        },
                        {
                            "index":"2-3",
                            "title":"文章",
                            "icon":"el-icon-ump-article",
                            "routerLink":"023"
                        },
                        {
                            "index":"2-4",
                            "title":"推荐",
                            "icon":"el-icon-ump-recommend",
                            "routerLink":"024"
                        },
                        {
                            "index":"2-5",
                            "title":"话题",
                            "icon":"el-icon-ump-ictopic",
                            "routerLink":"025"
                        }
                    ]
                },
                {
                    "index":"3",
                    "title":"建站管理",
                    "icon":"el-icon-ump-web2",
                    "tabList":[
                        {
                            "index":"3-1",
                            "title":"模板创建",
                            "icon":"el-icon-ump-template-o",
                            "routerLink":"032"
                        }
                    ]
                },
                {
                    "index":"4",
                    "title":"数据可视化",
                    "icon":"el-icon-ump-database"
                },{
                    "index":"5",
                    "title":"系统管理",
                    "icon":"el-icon-setting",
                    "tabList":[
                        {
                            "index":"5-1",
                            "title":"权限",
                            "icon":"el-icon-ump-password",
                            "routerLink":"052"
                        },
                        {
                            "index":"5-2",
                            "title":"修改密码",
                            "icon":"el-icon-ump-password",
                            "routerLink":"053"
                        },
                        {
                            "index":"5-3",
                            "title":"退出登录",
                            "icon":"el-icon-ump-exittoapp",
                            "routerLink":"054",
                            "eventFn":"outLoginOne"
                        }
                    ]
                }
            ];
            /*axios({
                url: '.tabJson.json',
                method: "GET",
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                timeout: 30000
            }).then(function (res) {
                t.tabList = res.data.tabList;
            }).catch(function (err) {
            });*/
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
