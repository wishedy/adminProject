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
                    <el-input v-model="formInline.userId" placeholder="会员ID" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="formInline.userName" placeholder="请输入姓名" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="formInline.userSex" placeholder="性别" class="adminInputEl">
                        <el-option label="男" value="0"></el-option>
                        <el-option label="女" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="formInline.userAge" placeholder="请输入年龄" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="用户状态">
                    <el-select v-model="formInline.userState" placeholder="用户状态" class="adminInputEl">
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
                    <el-input v-model="formInline.userEmail" placeholder="邮件" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="formInline.userPhoneNumber" placeholder="手机号" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="注册时间">
                    <el-date-picker
                        v-model="formInline.userRegisterTime"
                        align="right"
                        type="date"
                        class="adminInputEl"
                        placeholder="注册时间"
                        :picker-options="pickerOptions1">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="审核时间">
                    <el-date-picker
                        v-model="formInline.userAuditTime"
                        align="right"
                        type="date"
                        placeholder="审核时间"
                        class="adminInputEl"
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
    import userData from '../../../virtualData/UserStatistics';
    import axios from 'axios';
    export default {
        data() {
            return {
                activateOnOff:false,
                innerVisible:false,
                rejectDialogVisible:false,
                currentPage4: 4,
                blacklist:{
                    region:1,
                    textarea2:''
                },
                formInline: {
                    userId: '',
                    userName: '',
                    userSex: '',
                    userAge: '',
                    userState: '',
                    userEmail: '',
                    userPhoneNumber: '',
                    userRegisterTime: '',
                    userAuditTime: '',
                },
                selectedData:{},
                selectedOne:false,
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                            console.log('今天'    ,picker)
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
        watch:{
            formInline:{
                handler(newVal, oldVal){
                    console.log(newVal,oldVal);
                },
                deep:true
            }
        },
        mounted(){
          console.log('开始');
            axios({
                url: "/mcall/cms/course/getHotAuthorList/",
                method: "GET",
                data: {"sortType":4,"courseSubjectTeamId":1,"platformId":"1"},
                transformRequest: [function(data) {
                    return "paramJson=" + JSON.stringify(data);
                }],
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                timeout: 30000
            }).then(function(res){
                console.log(res);
            });
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
            onSubmit() {
                console.log('submit!');
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                let t = this;
                console.log(`当前页: ${val}`);
                t.selectedData = val;
                t.selectedOne = true;
                console.log(t.selectedOne);
            }
        }
    }
</script>
