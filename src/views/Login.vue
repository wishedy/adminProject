<template>
    <section class="adminLogin">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
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
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }  else {
                    callback();
                }
            };
            return {
                ruleForm2: {
                    pass: '',
                    checkPass: ''
                },
                rules2: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            ...mapActions(['login']),
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
