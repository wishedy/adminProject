<template>
    <section class="adminContentContainer">
        <section class="adminContentInner">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="会员ID">
                    <el-input v-model="formInline.user" placeholder="会员ID"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="formInline.user" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <div class="block">
                <el-table
                    :data="tableData"
                    border
                    highlight-current-row
                    @current-change="handleCurrentChange"
                    style="width: 100%">
                    <el-table-column
                        prop="id"
                        label="会员ID">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="姓名">
                    </el-table-column>
                    <el-table-column
                        prop="sexType"
                        label="性别">
                    </el-table-column>
                    <el-table-column
                        prop="age"
                        label="年龄">
                    </el-table-column>
                    <el-table-column
                        prop="job"
                        label="职业">
                    </el-table-column>
                    <el-table-column
                        prop="educationLevel"
                        label="学历或学位">
                    </el-table-column>
                    <el-table-column
                        prop="state"
                        label="状态">
                    </el-table-column>
                    <el-table-column
                        prop="activeVal"
                        label="活跃值">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="所在地">
                    </el-table-column>
                    <el-table-column
                        prop="email"
                        label="邮件">
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="手机号">
                    </el-table-column>
                    <el-table-column
                        prop="registerTime"
                        label="注册时间">
                    </el-table-column>
                    <el-table-column
                        prop="auditTime"
                        label="审核时间">
                    </el-table-column>
                    <el-table-column
                        prop="auditer"
                        label="审核人">
                    </el-table-column>
                </el-table>
                <div class="block adminPage">
                    <!--<span class="demonstration">完整功能</span>-->
                    <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage4"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                    </el-pagination>
                </div>
            </div>
            <div class="block adminAuditControl">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-button>详情</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger">拉黑</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </section>

    </section>

</template>
<style lang="scss" scoped>

    @import "../../../styleComponent/ContentInner";
   .adminContentInner{
       @include ContentInner();
       .adminUserControl{
           padding: 0 0 10px 0;
       }
       .adminPage{
           padding: 20px 0;
       }
       .adminAuditControl{
           padding: 20px 0;
       }
   }
</style>
<script>
    import userData from '../../../virtualData/UserStatistics'
    export default {
        data() {
            return {
                currentPage4: 4,
                formInline: {
                    user: ''
                },
                tableData:userData.data.dataList
            }
        },
        methods:{
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            onSubmit() {
                console.log('submit!');
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        }
    }
</script>
