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
                <el-form-item label="性别">
                    <el-select v-model="formInline.region" placeholder="性别">
                        <el-option label="男" value="0"></el-option>
                        <el-option label="女" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="formInline.user" placeholder="请输入年龄"></el-input>
                </el-form-item>
                <el-form-item label="用户状态">
                    <el-select v-model="formInline.region" placeholder="用户状态">
                        <el-option label="游客" value="0"></el-option>
                        <el-option label="已注册" value="1"></el-option>
                        <el-option label="已完善信息" value="2"></el-option>
                        <el-option label="已审核" value="2"></el-option>
                        <el-option label="正在审核" value="2"></el-option>
                        <el-option label="更改信息" value="2"></el-option>
                        <el-option label="拉黑" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="邮件">
                    <el-input v-model="formInline.user" placeholder="邮件"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="formInline.user" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item label="注册时间">
                    <el-date-picker
                        v-model="value2"
                        align="right"
                        type="date"
                        placeholder="注册时间"
                        :picker-options="pickerOptions1">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="审核时间">
                    <el-date-picker
                        v-model="value2"
                        align="right"
                        type="date"
                        placeholder="审核时间"
                        :picker-options="pickerOptions1">
                    </el-date-picker>
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
                        <el-button type="primary">查看权限</el-button>
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
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                value2:"",
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
