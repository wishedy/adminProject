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
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                    <el-table-column
                        type="selection"
                        width="35">
                    </el-table-column>
                    <el-table-column
                        prop="id"
                        label="会员ID"
                        width="130">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="姓名"
                        width="70">
                    </el-table-column>
                    <el-table-column
                        prop="sexType"
                        label="性别"
                        width="60">
                    </el-table-column>
                    <el-table-column
                        prop="age"
                        label="年龄"
                        width="50">
                    </el-table-column>
                    <el-table-column
                        prop="job"
                        label="职业"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="state"
                        label="状态"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        prop="activeVal"
                        label="活跃值"
                        width="70">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="所在地"
                        width="90">
                    </el-table-column>
                    <el-table-column
                        prop="email"
                        label="邮件"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="手机号"
                        width="110">
                    </el-table-column>
                    <el-table-column
                        prop="registerTime"
                        label="注册时间"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="auditTime"
                        label="审核时间"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="auditer"
                        label="审核人"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="操作"
                        width="100">
                        <template slot-scope="scope">
                            <el-button
                                size="mini">
                                详情
                            </el-button>
                        </template>
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
           padding: 10px 0;
       }
   }
</style>
<script>
    export default {
        data() {
            return {
                currentPage4: 4,
                formInline: {
                    user: ''
                },
                demoData:[
                    {
                        id:111111111,
                        name:111111111,
                        sex:"男",
                        age:"91",
                        job:"前端工程师",
                        activeValue:122,
                        address:"这是我的家乡",
                        locationAdd:"这是我的所在地",
                        state:0,
                        email:"",
                        phone:"",
                        createTime:111111111,
                        auditTime:"",
                        auditer:'张三'
                    }
                ],
                tableData: [{
                    id:1356987451236,
                    job:"前端工程师",
                    state:"已注册",
                    sexType:"男",
                    age:13,
                    phone:"13568954745",
                    email:"webheng@126.com",
                    activeVal:"124",
                    auditTime:"2016-05-02",
                    registerTime:"2016-05-02",
                    date: '2016-05-02',
                    name: '王小虎',
                    auditer:"会飞的鸟",
                    address: '山东济南'
                }, {
                    id:1356987451236,
                    job:"前端工程师",
                    state:"已注册",
                    sexType:"男",
                    age:13,
                    phone:"13568954745",
                    email:"webheng@126.com",
                    activeVal:"124",
                    auditTime:"2016-05-02",
                    registerTime:"2016-05-02",
                    date: '2016-05-04',
                    name: '王小虎',
                    auditer:"会飞的鸟",
                    address: '山东济南'
                }, {
                    id:1356987451236,
                    job:"前端工程师",
                    state:"已注册",
                    sexType:"男",
                    age:13,
                    phone:"13568954745",
                    email:"webheng@126.com",
                    activeVal:"124",
                    auditTime:"2016-05-02",
                    registerTime:"2016-05-02",
                    date: '2016-05-01',
                    name: '王小虎',
                    auditer:"会飞的鸟",
                    address: '山东济南'
                }, {
                    id:1356987451236,
                    job:"前端工程师",
                    state:"已注册",
                    sexType:"男",
                    age:13,
                    phone:"13568954745",
                    email:"webheng@126.com",
                    activeVal:"124",
                    auditTime:"2016-05-02",
                    registerTime:"2016-05-02",
                    date: '2016-05-03',
                    name: '王小虎',
                    auditer:"会飞的鸟",
                    address: '山东济南'
                }]
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
