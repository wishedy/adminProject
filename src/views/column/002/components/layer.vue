<template>
    <el-dialog
        :visible.sync="dialogVisible"
        width="61.8%"
        :before-close="handleClose"
        center>
        <div class="block">
            <el-form ref="form" :model="addForm" label-width="80px">
                <el-form-item label="ICON类名">
                    <el-input v-model="addForm.iconName"></el-input>
                </el-form-item>
                <el-form-item label="查看">
                    <div class="block icon-template" :class="addForm.iconName"></div>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="addIcon">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    const { mapGetters,mapActions } = createNamespacedHelpers('module002');
    export default {
        data(){
            return {
                addForm:{
                    iconName:''
                }
            }
        },
        computed:{
            ...mapGetters(['dialogVisible','addMessage','message','messageType'])
        },
        watch:{
            addForm:{
                handler(n){
                    console.log(n)
                },
                deep:true

            },
            dialogVisible(n){
              let t = this;
              if(!n){
                  t.addForm = {
                      iconName:''
                  };
              }
            },
            addMessage(n){
                let t = this;
                if(n){
                    console.log(t.messageType,t.message);
                    t.$message({
                        showClose: true,
                        message: t.message,
                        type: t.messageType
                    });
                    t.hideMsg();
                }
            }
        },
        methods:{
            ...mapActions(['showLayer','hideLayer','createIcon','hideMsg']),
            handleClose(){
                let t = this;
                t.hideLayer();
                t.addForm = {
                    iconName:''
                };
            },
            addIcon(){
                let t = this;
                let addOnOff = t.addForm.iconName.length>0;
                if(addOnOff){
                    t.createIcon(JSON.parse(JSON.stringify(t.addForm)));
                }else{
                    t.$message({
                        message: '添加字段不足',
                        type: 'warning'
                    });
                }

            }
        }
    }
</script>
<style lang="scss" scoped>
    .el-icon-item{
        width: 150px;
        height: 80px;
        display: inline-block;
        text-align: center;
        .el-item-center{
            display: block;
            margin: 0 auto;
            height: 30px;
            width: 30px;
            padding: 10px 0;
            font-size: 30px;
            line-height: 30px;
        }
        .el-item-des{
            font-size: 16px;
            width: 100%;
            margin: 0 auto;
            display: block;
            height: 40px;
            word-wrap: break-word;
            word-break: normal;
        }
    }
    .el-icon-list{
        height: 320px;
        overflow-y: auto;
    }
    .icon-template{
        border:1px solid #bfc7d3;
        width: 300px;
        height: 300px;
        text-align: center;
        line-height: 300px;
        font-size: 90px;
    }
</style>
