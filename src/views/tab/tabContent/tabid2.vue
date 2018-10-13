<template>
    <section class="adminContentContainer">
        <section class="adminContentInner">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px" label-position="left">
                <el-form-item label="会员ID">
                    <el-input v-model="formInline.customerId" placeholder="会员ID" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="formInline.customerName" placeholder="请输入姓名" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="formInline.customerSex" placeholder="性别" class="adminInputEl">
                        <el-option label="男" value="0"></el-option>
                        <el-option label="女" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item label="年龄">
                    <el-input v-model="formInline.customerName" placeholder="请输入年龄" class="adminInputEl"></el-input>
                </el-form-item>-->
                <!--<el-form-item label="用户状态">
                    <el-select v-model="formInline.region" placeholder="用户状态" class="adminInputEl">
                        <el-option label="游客" value="0"></el-option>
                        <el-option label="已注册" value="1"></el-option>
                        <el-option label="已完善信息" value="2"></el-option>
                        <el-option label="已审核" value="2"></el-option>
                        <el-option label="正在审核" value="2"></el-option>
                        <el-option label="更改信息" value="2"></el-option>
                        <el-option label="拉黑" value="2"></el-option>
                    </el-select>
                </el-form-item>-->
                <!--<el-form-item label="邮件">
                    <el-input v-model="formInline.user" placeholder="邮件" class="adminInputEl"></el-input>
                </el-form-item>-->
                <!--<el-form-item label="手机号">
                    <el-input v-model="formInline.user" placeholder="手机号" class="adminInputEl"></el-input>
                </el-form-item>-->
                <!--<el-form-item label="审核时间">
                    <el-date-picker
                        class="adminInputEl"
                        v-model="value2"
                        align="right"
                        type="date"
                        placeholder="审核时间"
                        :picker-options="pickerOptions1">
                    </el-date-picker>
                </el-form-item>-->
                <el-form-item label="审核状态">
                    <el-select v-model="formInline.auditType" placeholder="审核状态" class="adminInputEl">
                        <el-option label="新建" value="0"></el-option>
                        <el-option label="结束" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核结果">
                    <el-select v-model="formInline.auditResult" placeholder="审核结果" class="adminInputEl">
                        <el-option label="驳回" value="0"></el-option>
                        <el-option label="通过" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <div class="block">
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="default" @click="reset">重置</el-button>
                    </el-form-item>
                </div>

            </el-form>
            <div class="block">
                <el-table
                    :data="tableData"
                    border
                    highlight-current-row
                    :default-sort = "{prop: 'updateTime', order: 'descending'}"
                    @current-change="tableCurrentChange"
                    style="width: 100%">
                    <el-table-column
                        prop="customerId"
                        label="会员ID">
                    </el-table-column>
                    <el-table-column
                        prop="customerName"
                        label="姓名">
                    </el-table-column>
                    <el-table-column
                        prop="customerSex"
                        :formatter="sexFormat"
                        label="性别">
                    </el-table-column>
                    <el-table-column
                        prop="customerBirthday"
                        :formatter="jsGetAge"
                        sortable
                        label="年龄">
                    </el-table-column>
                    <el-table-column
                        prop="customerProfession"
                        label="职业">
                    </el-table-column>
                    <el-table-column
                        prop="customerDegree"
                        :formatter="customerDegree"
                        label="学历或学位">
                    </el-table-column>
                    <el-table-column
                        prop="auditType"
                        :formatter="auditType"
                        label="身份审核">
                    </el-table-column>
                    <el-table-column
                        prop="customerLocation"
                        label="所在地">
                    </el-table-column>
                    <el-table-column
                        prop="updateTime"
                        sortable
                        label="更新时间">
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        sortable
                        label="审核时间">
                    </el-table-column>
                    <el-table-column
                        prop="auditResult"
                        :formatter="auditResult"
                        label="审核结果">
                    </el-table-column>
                </el-table>
                <div class="block adminPage">
                    <!--<span class="demonstration">完整功能</span>-->
                    <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="formInline.pageIndex"
                        :page-sizes="[10, 20, 30]"
                        :page-size="formInline.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="count">
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
            <span>是否确认通过{{selectedData.customerName}}的审核信息</span>
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
    import Common from '../../../utils/common.js';
    import AuditDialog from '../../Dialog/auditDialog';
    import userData from '../../../virtualData/auditInformation';
    import axios from 'axios';
    import {mapGetters,mapActions} from 'vuex';
    export default {
        data() {
            return {
                formInline: {
                    customerId: '',
                    customerName: '',
                    customerSex: '',
                    auditResult:'',
                    auditType:'',
                    getType:1,
                    pageSize:10,
                    pageIndex:1
                },
                pageSize:10,
                pageIndex:1,
                count:0,
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
                tableData:[]
            }
        },
        watch:{
            pageIndex(newVal){
                let t = this;
                t.formInline.pageIndex = newVal;
                t.getAuditList();
            },
            pageSize(newVal){
                let t = this;
                t.formInline.pageSize = newVal;
                t.getAuditList();
            }
        },
        methods: {
            ...mapActions(['tab2ShowDialog']),
            tableCurrentChange(val){
                let t = this;
                if(val){
                    console.log(val);
                    t.selectedOne = true;
                    t.selectedData = val;
                }

            },
            auditResult(row,column){
                let t = this;
                let type = row['auditResult'];
                return Common.auditResult(type);
            },
            auditType(row,column){
                let t = this;
                let type = row['auditType'];
                return Common.auditType(type);
            },
            customerDegree(row,column){
                let t = this;
                let type = row['customerDegree'];
                return Common.customerDegree(type);
            },
            jsGetAge(row,column){
                let t = this;
                let birthDay = row['customerBirthday'];
                return Common.jsGetAge(birthDay);
            },
            sexFormat(row, column){
                let t = this;
                let type = row['customerSex'];
                return Common.sexFormat(type);
            },
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
            reset(){
                let t = this;
                t.formInline = {
                    customerId: '',
                    customerName: '',
                    customerSex: '',
                    auditResult:'',
                    auditType:'',
                    getType:1,
                    pageSize:10,
                    pageIndex:1
                };
                t.getAuditList();
            },
            rejectAudit(step){
              let t = this;
                if(!t.selectedOne){
                    t.$message.error('请选择您要审核的用户!');
                }else{
                    if(step===0){
                        t.rejectDialogVisible = true;
                    }else{
                        axios({
                            url: '/call/customer/rejectAudit',
                            method: "POST",
                            data: {
                                auditId:t.selectedData.auditId,
                                customerId:t.selectedData.customerId,
                                adminId:localStorage.getItem('adminId'),
                                updateState:3,
                                adminName:localStorage.getItem('userName')
                            },
                            transformRequest: [function (data) {
                                return "paramJson=" + JSON.stringify(data);
                            }],
                            headers: {
                                'X-Requested-With': 'XMLHttpRequest'
                            },
                            timeout: 30000
                        }).then(function(req){
                            t.rejectDialogVisible = false;
                            if(req.data.responseObject.responseCode===4){
                                t.$message({
                                    message: t.selectedData.customerName+'审核已驳回',
                                    type: 'success'
                                });
                                t.getAuditList();
                            }else{
                                t.$message({
                                    message:'激活失败',
                                    type: 'warning'
                                });
                            }
                        });
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
                let t = this;
                t.getAuditList();
                console.log('submit!');
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                let t = this;
                t.pageSize = val;
            },
            handleCurrentChange(val) {
                let t = this;
                t.pageIndex = parseInt(val,10);
            },
            getAuditList(){
                let t = this;
                t.selectedData = {};
                axios.get('/call/customer/getAuditList', {
                    params: t.formInline
                })
                    .then(function (response) {
                        let reqData = response.data;
                        console.log(reqData);
                        if(reqData.responseObject.responseData['data_list']){
                            t.tableData = reqData.responseObject.responseData['data_list'];

                        }
                        if(reqData.responseObject.responseData.totalCount){
                            t.count = reqData.responseObject.responseData.totalCount;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            awakenUserInfo(){
                let t = this;
                if(t.selectedOne){
                    t.dialogInfo ={
                        title:t.selectedData.customerName+"的审核信息",
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
          let t = this;
          t.getAuditList();
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
        .adminInputEl{
            width:200px;
        }
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
