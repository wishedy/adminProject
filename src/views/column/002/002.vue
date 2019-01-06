<template>
    <section class="adminContentContainer">
        <section class="adminContentInner iconContainer">
            <div class="el-icon-item" v-for="(item,index) in tableData">
                <span class="el-item-center" :class="item.iconName"></span>
                <p class="el-item-des" v-text="item.iconName"></p>
            </div>
        </section>
        <div class="block adminAuditControl">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-button type="default" @click.native="showLayer">新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <AddLayer></AddLayer>
    </section>
</template>
<!--栏目:demo-->
<script>
    import { createNamespacedHelpers } from 'vuex'
    const { mapGetters,mapActions } = createNamespacedHelpers('module002');
    import AddLayer from './components/layer';
    export default {
        data(){
            return {
                name:'demo模块'
            }
        },
        computed:{
            ...mapGetters(['tableData'])
        },
        methods:{
            ...mapActions(['getList','showLayer'])
        },
        mounted(){
            let t = this;
            t.getList();
        },
        components:{
            AddLayer
        }
    }
</script>
<style scoped lang="scss">
    .iconContainer{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
        min-height:400px;
        max-height: 800px;
        overflow-y: auto;
        .el-icon-item{
            width: 160px;
            height: 100px;
            display: inline-block;
            text-align: center;
            margin: 10px;
            border: 1px solid #c7d0da;
            .el-item-center{
                display: block;
                margin: 0 auto;
                height: 30px;
                width: 30px;
                padding: 10px 0;
                font-size: 30px;
                line-height: 30px;
            }
            .el-item-des{
                font-size: 16px;
                width: 100%;
                margin: 0 auto;
                display: block;
                height: 40px;
                word-wrap: break-word;
                word-break: normal;
            }
        }
    }
    .adminAuditControl{
        padding: 90px;
    }
</style>
