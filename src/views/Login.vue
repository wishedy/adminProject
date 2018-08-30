<template>
    <section class="adminLogin">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" v-if="!registerOnOff">
            <!--<i class="el-icon-close"></i>-->
            <el-form-item label="账号" prop="pass">
                <el-input type="email" v-model="ruleForm2.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
                <el-button type="info" @click.stop="register">注册</el-button>
            </el-form-item>
        </el-form>
        <el-form  label-width="100px" class="demo-ruleForm" :rules='registerRules' v-if="registerOnOff" :model="registerForm" status-icon  ref="registerForm">
            <el-form-item label="姓名" prop="registerName">
                <el-input v-model="registerForm.registerName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="E-mail" prop="registerEmail">
                <el-input v-model="registerForm.registerEmail" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="registerPhoneNum">
                <el-input v-model="registerForm.registerPhoneNum" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="registerIdentityNum">
                <el-input v-model="registerForm.registerIdentityNum" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="管理级别" prop="registerGrade">
                <el-select v-model="registerForm.registerGrade" clearable placeholder="请选择" style="width:256px;" @change="changeGrade" auto-complete="off">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="密码"  prop="registerPassWord">
                <el-input type="password" v-model="registerForm.registerPassWord" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"  @click.stop="submitRegisterForm('registerForm')">提交</el-button>
                <el-button @click="resetForm('registerForm')">重置</el-button>
                <el-button type="info" @click.stop="login">登录</el-button>
            </el-form-item>
        </el-form>
    </section>
</template>
<style lang="scss">
    @import "../styleComponent/mask";
    .adminLogin{
        @include maskBg();
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .el-form{
            width: 356px;
            padding: 30px 60px 30px 0;
            background: #ffffff;
            position: relative;
            border-radius: 10px;
            .el-icon-close{
                position: absolute;
                right:0;
                top:0;
                font-size: 24px;
                padding: 5px;

            }
        }
    }
</style>
<script>
    import AV from 'leancloud-storage';
    import {mapActions} from 'vuex';
    import regularTest from '../utils/regularTest.js';
    import axios from 'axios';
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入账号'));
                } else {
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validateName = (rule,value,callBack)=>{
              if(value===''){
                  callBack(new Error('请输入名字'));
              }else{
                  if(regularTest.testName(value)){
                      this.$refs.registerForm.validateField('registerName');
                      return false;
                  }else{
                      return callBack(new Error('请输入正确的名字'));
                  }
              }

            };
            var validateEmail = (rule,value,callBack)=>{
                if(value===''){
                    callBack(new Error('请输入邮件'));
                }else{
                    if(regularTest.testEmail(value)){
                        this.$refs.registerForm.validateField('registerEmail');
                    }else{
                        callBack(new Error('请输入正确的邮件'));
                    }
                    callBack();
                }

            };
            var validateIdentityNum = (rule,value,callBack)=>{
                if(value===''){
                    callBack(new Error('请输入身份号'));
                }else{
                    if(regularTest.testID(value)){
                        this.$refs.registerForm.validateField('registerIdentityNum');
                    }else{
                        callBack(new Error('请输入正确的身份号'));
                    }
                    callBack();
                }

            };
            var validateGrade = (rule,value,callBack)=>{
                if(value===''){
                    callBack(new Error('请选择管理员级别'));
                }else{
                    callBack();
                }
            };
            var validatePhoneNum = (rule,value,callBack)=>{
                if(value===''){
                    callBack(new Error('请输入手机号'));
                }else{
                    if(regularTest.testPhoneNum(value)){
                        this.$refs.registerForm.validateField('registerPhoneNum');
                    }else{
                        callBack(new Error('请输入正确的手机号'));
                    }
                    callBack();
                }

            };
            var validatePassWord = (rule,value,callBack)=>{
                if(value===''){
                    callBack(new Error('请输入名字'));
                }else{
                   callBack();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }  else {
                    callback();
                }
            };
            return {
                options: [{
                    value: '0',
                    label: '超级管理员'
                }, {
                    value: '1',
                    label: '管理员'
                }],
                ruleForm2: {
                    pass: '',
                    checkPass: ''
                },
                registerForm:{
                    registerName:'',
                    registerEmail:'',
                    registerPhoneNum:'',
                    registerIdentityNum:'',
                    registerGrade:'',
                    registerPassWord:''
                },
                registerRules:{
                    registerName:[
                        {
                            validator:validateName,trigger:'blur'
                        }
                    ],
                    registerEmail:[
                        {
                            validator:validateEmail,trigger:'blur'
                        }
                    ],
                    registerPhoneNum:[
                        {
                            validator:validatePhoneNum,trigger:'blur'
                        }
                    ],
                    registerIdentityNum:[
                        {
                            validator:validateIdentityNum,trigger:'blur'
                        }
                    ],
                    registerPassWord:[
                        {
                            validator:validatePassWord,trigger:'blur'
                        }
                    ],
                    registerGrade:[
                        {
                            validator:validateGrade,trigger:'change'
                        }
                    ]
                },
                rules2: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                },
                registerOnOff:true
            };
        },
        methods: {
            ...mapActions(['login']),
            submitRegisterForm(formName){
              let t = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        t.registerAdmin()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            registerAdmin(){
              let t = this;
                axios({
                    method: 'post',
                    url: '/call/admin/register',
                    transformRequest: [function(data) {
                        return "paramJson=" + JSON.stringify(data);
                    }],
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    data: {
                        registerGrade:t.registerForm.registerGrade,//管理员等级，0超级管理员，1普通管理员
                        registerName:t.registerForm.registerName,//管理员姓名
                        registerEmail:t.registerForm.registerEmail,//管理员邮箱
                        registerPhoneNum:t.registerForm.registerPhoneNum,//管理员电话号
                        registerIdentityNum:t.registerForm.registerIdentityNum,//管理员身份证号
                        registerPassWord:t.registerForm.registerPassWord//
                    }
                }).then(function(response) {
                    console.log(response.data);
                });
            },
            changeGrade(state){
              let t = this;
              console.log(state);
            },
            checkLogin(){
                let t = this;
                var APP_ID = '4LMtHfKrTfiVrDcRNV936FoT-gzGzoHsz';
                var APP_KEY = 'c9hWsdUsGA5kMWTbqNEWiV2d';
                AV.init({
                    appId: APP_ID,
                    appKey: APP_KEY
                });
                var task  = new AV.Query("adminLogin");
                task.find().then(function(data){
                    var info = data[0].attributes;
                    if((t.ruleForm2.pass===info.userName)&&(t.ruleForm2.checkPass===info.passWord)){
                        t.$message({
                            type: 'success',
                            message: '登录成功!'
                        });
                        t.login(info.userName);
                        localStorage.setItem('userName',info.userName);
                    }
                },function(err) {
                    //错误信息 err
                });
            },
            register(){
              let t = this;
              t.registerOnOff = true;
            },
            login(){
              let t = this;
                t.registerOnOff = false;
            },
            submitForm(formName) {
                let t = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        t.checkLogin()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
