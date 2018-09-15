<template>
    <section class="adminContentContainer">
        <section class="adminContentInner">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px" label-position="left"><!--userId: '',
                    userName: '',
                    userSex: '',
                    userAge: '',
                    userState: '',
                    userEmail: '',
                    userPhoneNumber: '',
                    userRegisterTime: '',
                    userAuditTime: '',-->
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
                <el-form-item label="用户状态">
                    <el-select v-model="formInline.customerAccountStatus" placeholder="用户状态" class="adminInputEl">
                        <!--0注册，1提交认证，等待审核，2,认证通过,3驳回认证,4拉黑-->
                        <el-option label="注册" value="0"></el-option>
                        <el-option label="提交认证" value="1"></el-option>
                        <el-option label="认证通过" value="2"></el-option>
                        <el-option label="认证驳回" value="3"></el-option>
                        <el-option label="拉黑" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="邮件">
                    <el-input v-model="formInline.customerEmail" placeholder="邮件" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="formInline.customerPhoneNum" placeholder="手机号" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getUserList">查询</el-button>
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
                        label="年龄">
                    </el-table-column>
                    <el-table-column
                        prop="customerProfession"
                        label="职业">
                    </el-table-column>
                    <el-table-column
                        prop="customerDegree"
                        label="学历或学位">
                    </el-table-column>
                    <el-table-column
                        prop="customerAccountStatus"
                        label="状态">
                    </el-table-column>
                    <el-table-column
                        prop="customerActiveVaule"
                        label="活跃值">
                    </el-table-column>
                    <el-table-column
                        prop="customerLocation"
                        label="所在地">
                    </el-table-column>
                    <el-table-column
                        prop="customerEmail"
                        label="邮件">
                    </el-table-column>
                    <el-table-column
                        prop="customerPhoneNum"
                        label="手机号">
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="注册时间">
                    </el-table-column>
                    <el-table-column
                        prop="updateTime"
                        label="审核时间">
                    </el-table-column>
                    <el-table-column
                        prop="adminName"
                        label="审核人">
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
                        <el-button>详情</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">查看权限</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger"  @click.native="rejectAudit(0)">拉黑</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click.native="activate(0)" type="success">激活</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </section>
        <el-dialog
            width="30%"
            title="提示"
            :visible.sync="activateOnOff"
            append-to-body>
            <span>确定要激活该用户？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="activateOnOff = false">取 消</el-button>
                <el-button type="primary" @click="activate(1)">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            :title="'拉黑'+selectedData.name"
            width="40%"
            :visible.sync="rejectDialogVisible">
            <section class="block">
                <el-form  :model="blacklist" class="demo-form-inline" label-width="80px" label-position="left">
                    <el-form-item label="拉黑原因">
                        <el-select v-model="blacklist.region" placeholder="用户状态" class="adminInputElDialog">
                            <el-option label="原因1" value="0"></el-option>
                            <el-option label="原因2" value="1"></el-option>
                            <el-option label="原因3" value="2"></el-option>
                            <el-option label="原因4" value="3"></el-option>
                            <el-option label="原因5" value="4"></el-option>
                            <el-option label="原因6" value="5"></el-option>
                            <el-option label="原因7" value="6"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="拉黑回复">
                        <el-input
                            type="textarea"
                            autosize
                            class="adminInputElDialog"
                            placeholder="请输入内容"
                            v-model="blacklist.textarea2">
                        </el-input>
                    </el-form-item>
                </el-form>
            </section>
            <div slot="footer" class="dialog-footer">
                <el-button @click="rejectDialogVisible = false">取 消</el-button>
                <el-button type="primary"  @click="rejectAudit(1)">确定</el-button>
            </div>
        </el-dialog>
    </section>

</template>
<style lang="scss" scoped>
    .adminInputElDialog{
        width:300px;
    }
    @import "../../../styleComponent/ContentInner";
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
<script>
    import Common from '../../../utils/common.js';
    import axios from 'axios';
    export default {
        data() {
            return {
                activateOnOff:false,
                innerVisible:false,
                rejectDialogVisible:false,
                count:0,
                blacklist:{
                    region:1,
                    textarea2:''
                },
                formInline: {
                    customerId: '',
                    customerName: '',
                    customerSex: '',
                    customerAccountStatus: '',
                    customerEmail: '',
                    customerPhoneNum: '',
                    getType:0,
                    pageSize:10,
                    pageIndex:1
                },
                selectedData:{},
                selectedOne:false,
                value2:"",
                tableData:[]
            }
        },
        watch:{
            formInline:{
                handler(newVal, oldVal){
                    let t = this;
                    console.log(newVal,oldVal);
                    if((newVal.pageIndex!==oldVal.pageIndex)||(newVal.pageSize!==oldVal.pageSize)){
                        t.getUserList();
                    }
                },
                deep:true
            }
        },
        mounted(){
            let t = this;
            t.getUserList();
        },
        methods:{
            activate(type){
                let t = this;
                if(!t.selectedOne){
                    t.$message.error('请选择您要激活的会员!');
                }else{
                    if(type===0){
                        t.activateOnOff = true;
                    }else if(type===1){
                        t.activateOnOff = false;
                        t.$message({
                            message: t.selectedData.name+'已被激活',
                            type: 'success'
                        });
                    }

                }
            },
            getUserList(){
                let t = this;
                axios.get('/call/customer/getCustomerList', {
                    params: t.formInline
                })
                    .then(function (response) {
                        console.log(response.data);
                        let reqData = response.data;
                        if(reqData.responseObject.responseData['data_list']){
                            t.tableData = reqData.responseObject.responseData['data_list'];
                        }
                        console.log(reqData.responseObject.responseData.responseCount);
                        if(reqData.responseObject.responseData.totalCount){
                            t.count = reqData.responseObject.responseData.totalCount;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            rejectAudit(step){
                let t = this;
                if(!t.selectedOne){
                    t.$message.error('请选择您要拉黑的用户!');
                }else{
                    if(step===0){
                        console.log('拉黑');
                        t.rejectDialogVisible = true;
                    }else{
                        t.$message({
                            message: t.selectedData.name+'已拉黑',
                            type: 'success'
                        });
                        t.rejectDialogVisible = false;
                        console.log(t.rejectDialogVisible);
                    }
                }
            },
            handleSelectionChange(val) {
                let t = this;
                this.multipleSelection = val;

            },
            handleSizeChange(val) {
                let t = this;
                t.formInline.pageSize = val;
            },
            handleCurrentChange(val) {
                let t = this;
                console.log(`当前页: ${val}`);
                t.selectedData = val;
                t.selectedOne = true;
                console.log(t.selectedOne);
            },
            sexFormat(row, column){
                let t = this;
                var type = row['customerSex'];
                return Common.sexFormat(type);
            }
        }
    }
</script>
