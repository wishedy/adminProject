<template>
    <div class="block adminAuditControl">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-button type="default" @click.native="showLayer">新增</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default">编辑</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click.native="showPassDialog">激活</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click.native="rejectDialog">无效</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    const { mapGetters,mapActions } = createNamespacedHelpers('module001');
    export default {
        methods:{
            ...mapActions(['showLayer']),
            showPassDialog(){
                this.$confirm('您确定要激活会员管理栏目', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '已激活!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            rejectDialog(){
                this.$confirm('您确定要无效会员管理栏目', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '已无效!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
        }
    }
</script>
