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
                        type="selection">
                    </el-table-column>
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
                        prop="address"
                        label="职业审核">
                        <template slot-scope="scope">
                            <el-button
                                size="mini">
                                职业审核
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="学历审核">
                        <template slot-scope="scope">
                            <el-button
                                size="mini">
                                职业审核
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="idState"
                        label="身份审核">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="所在地">
                    </el-table-column>
                    <el-table-column
                        prop="registerTime"
                        label="注册时间">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="操作">
                        <template slot-scope="scope">
                            <el-button
                                size="mini">
                                通过
                            </el-button>
                            <el-button
                                size="mini"
                                type="danger">
                                驳回
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
<script>
    import userData from '../../../virtualData/auditInformation';
    export default {
        data() {
            return {
                formInline: {
                    user: ''
                },
                currentPage4: 4,
                tableData:userData.data.dataList,
                tableData3: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }]
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
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
    }
</style>
