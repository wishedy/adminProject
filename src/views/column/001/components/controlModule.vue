<template>
    <div class="block adminAuditControl">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-button type="default" @click.native="addColumn">新增</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click.native="editColumn">编辑</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click.native="showSortDialog">排序</el-button>
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
    import Common from '../../../../utils/common';
    import { createNamespacedHelpers } from 'vuex'
    const { mapGetters,mapActions } = createNamespacedHelpers('module001');
    export default {
        methods:{
            ...mapActions(['showLayer',"changeEditType","showSort"]),
            addColumn(){
              let _this = this;
              _this.changeEditType(0);
              _this.showLayer();
            },
            editColumn(){
              let _this = this;
              if(Common.isEmptyObject(_this.selectTableData)){
                  _this.changeEditType(1);
                  _this.showLayer();
              }else{
                  _this.$message.error('请选择一条数据');
              }
            },
            showSortDialog(){
              let _this = this;
                if(Common.isEmptyObject(_this.selectTableData)){
                    _this.$message.error('请选择一条数据');
                }else{
                    _this.showSort();
                }
            },
            showPassDialog(){
                let _this = this;
                if(Common.isEmptyObject(_this.selectTableData)){
                    _this.$message.error('请选择一条数据');
                }else{
                    _this.$confirm('您确定要激活该栏目', '提示', {
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
                }
            },
            rejectDialog(){
                let _this = this;
                if(Common.isEmptyObject(_this.selectTableData)){
                    _this.$message.error('请选择一条数据');
                }else{
                    _this.$confirm('您确定要无效会员管理栏目', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        _this.$message({
                            type: 'success',
                            message: '已无效!'
                        });
                    }).catch(() => {
                        _this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }
            },
        },
        computed:{
            ...mapGetters(['selectTableData'])
        }
    }
</script>
