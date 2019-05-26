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
<style  lang="scss">
    @import "../../../static/scss/column/002.scss";
</style>
<style scoped lang="scss">
    .adminAuditControl{
        padding: 90px;
    }
</style>
