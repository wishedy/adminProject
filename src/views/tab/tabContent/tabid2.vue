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
                        prop="auditState"
                        label="审核状态">
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
                        <el-button @click.native="awakenUserInfo">详情</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click.native="passAudit(0)">审核通过</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger" @click.native="rejectAudit(0)">驳回</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </section>
        <AuditDialog :DialogInfo="dialogInfo"></AuditDialog>
        <el-dialog
            title="提示"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
            <span>是否确认通过{{selectedData.name}}的审核信息</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="passAudit(1)">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="rejectDialogVisible"
            width="30%"
            center>
            <span class="rejectAuditTitle">是否确认驳回{{selectedData.name}}的审核信息</span>
            <section class="rejectAuditInline">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="选择驳回理由" :inline="true" class="rejectAuditInline">
                        <el-select v-model="formInline.region" placeholder="驳回审核的理由">
                            <el-option label="第一个驳回理由" value="0"></el-option>
                            <el-option label="第二个驳回理由" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="输入驳回理由" :inline="true" class="rejectAuditInline">
                        <el-input type="textarea" v-model="rejectAuditReason" placeholder="驳回审核的理由"></el-input>
                    </el-form-item>
                </el-form>
            </section>
            <span slot="footer" class="dialog-footer">
            <el-button @click="rejectDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="rejectAudit(1)">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>
<script>
    import AuditDialog from '../../Dialog/auditDialog';
    import userData from '../../../virtualData/auditInformation';
    import {mapGetters,mapActions} from 'vuex';
    export default {
        data() {
            return {
                formInline: {
                    user: '',
                    region:''
                },
                selectedOne:false,
                selectedData:{},
                dialogInfo:{
                    title:"审核信息",
                    degreeImg:"",
                    degreeNum:"",
                    professionImg:"",
                    professionNum:"",
                    otherImg:"",
                    otherNum:""
                },
                rejectAuditReason:'',
                rejectDialogVisible:false,
                centerDialogVisible:false,
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
            ...mapActions(['tab2ShowDialog']),
            passAudit(step){
                let t = this;
                    if(!t.selectedOne){
                        t.$message.error('请选择您要审核的用户!');
                    }else{
                        if(step===0){
                            t.centerDialogVisible = true;
                        } else if(step===1){
                            t.$message({
                                message: t.selectedData.name+'审核已通过',
                                type: 'success'
                            });
                            t.centerDialogVisible = false;
                        }

                    }


            },
            rejectAudit(step){
              let t = this;
                if(!t.selectedOne){
                    t.$message.error('请选择您要审核的用户!');
                }else{
                    if(step===0){
                        t.rejectDialogVisible = true;
                    }else{
                        t.$message({
                            message: t.selectedData.name+'审核已驳回',
                            type: 'success'
                        });
                        t.rejectDialogVisible = false;
                    }
                }
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            tryClick(a,b){
                console.log(a,b);
            },
            onSubmit() {
                console.log('submit!');
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                let t = this;
                t.selectedOne = true;
                t.selectedData = val;
            },
            awakenUserInfo(){
                let t = this;
                if(t.selectedOne){
                    t.dialogInfo ={
                        title:t.selectedData.name+"审核信息",
                        degreeImg:t.selectedData.jobPhoto,
                        degreeNum:t.selectedData.jobNum,
                        professionImg:t.selectedData.studyPhoto,
                        professionNum:t.selectedData.studyNum,
                        otherImg:t.selectedData.otherPhoto,
                        otherNum:t.selectedData.otherNum
                    };
                    t.tab2ShowDialog();
                }else{
                    t.$message.error('请选择您要审核的用户!');
                }

            }
        },
        computed:{
            ...mapGetters(['tab2Data'])
        },
        components:{
            AuditDialog
        },
        mounted(){

        }
    }
</script>
<style lang="scss" scoped>

    @import "../../../styleComponent/ContentInner";
    .rejectAuditInline{
        padding: 20px 0;
    }
    .rejectAuditTitle{
        font-size: 22px;
    }
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
