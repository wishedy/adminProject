<template>
    <section class="adminContentContainer">
        <section class="adminContentInner">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="动态ID">
                    <el-input v-model="formInline.user" placeholder="动态ID"></el-input>
                </el-form-item>
                <el-form-item label="作者ID">
                    <el-input v-model="formInline.user" placeholder="作者ID"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="formInline.user" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="动态类型">
                    <el-select v-model="formInline.region" placeholder="动态类型">
                        <el-option label="脱单" value="0"></el-option>
                        <el-option label="话题" value="1"></el-option>
                        <el-option label="普通" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="动态状态">
                    <el-select v-model="formInline.region" placeholder="动态状态">
                        <el-option label="有效" value="0"></el-option>
                        <el-option label="无效" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-date-picker
                    v-model="value2"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1">
                </el-date-picker>
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
                        prop="dynamicId"
                        label="动态ID">
                    </el-table-column>
                    <el-table-column
                        prop="authorId"
                        label="作者ID">
                    </el-table-column>
                    <el-table-column
                        prop="author"
                        label="姓名">
                    </el-table-column>
                    <el-table-column
                        prop="imgHave"
                        label="图片上传">
                    </el-table-column>
                    <el-table-column
                        prop="dynamicType"
                        label="动态类型">
                    </el-table-column>
                    <el-table-column
                        prop="browseNum"
                        label="浏览">
                    </el-table-column>
                    <el-table-column
                        prop="praiseNum"
                        label="点赞">
                    </el-table-column>
                    <el-table-column
                        prop="commentNum"
                        label="评论">
                    </el-table-column>
                    <el-table-column
                        prop="valid"
                        label="状态">
                    </el-table-column>
                    <el-table-column
                        prop="registerTime"
                        label="创建时间">
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
                <div class="block adminAuditControl">
                    <el-form :inline="true" class="demo-form-inline">
                        <el-form-item>
                            <el-button @click.native="detailInfo">详情</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" @click="isValidDynamic(0)">激活</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" @click.native="isNotValidDynamic(0)">无效</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </section>
        <el-dialog
            width="30%"
            title="提示"
            :visible.sync="isValid"
            center
            append-to-body>
            <el-main>确定要激活这条动态？</el-main>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isValid = false">取消</el-button>
                <el-button type="success" @click="isValidDynamic(1)">有效</el-button>
                </span>
        </el-dialog>
        <el-dialog
            width="30%"
            title="提示"
            :visible.sync="isNotValid"
            center
            append-to-body>
            <el-main>确定要无效这条动态？</el-main>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isNotValid = false">取消</el-button>
                <el-button type="danger" @click="isNotValidDynamic(1)">无效</el-button>
                </span>
        </el-dialog>
        <el-dialog
            :title="selectedData.author+'的'+selectedData.dynamicType"
            :visible.sync="centerDialogVisible"
            width="35%"
            center>
            <div class="block">
                <p>
                    {{selectedData.feedBackcontent}}
                </p>
            </div>
            <div class="block">
                <h1 class="dynamicTitle">动态内容</h1>
                <el-main class="feedBackArea">{{selectedData.dynamicContent}}</el-main>
            </div>
            <div class="block feedBackImgContainer">
                <ul class="feedBackImgList">
                    <li class="feedBackAreaImgItem" v-for="(item,index) in selectedData.imgList">
                        <img :src="item" alt="" v-bind:key="index">
                    </li>
                </ul>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">关闭</el-button>
            </span>
        </el-dialog>
    </section>
</template>
<script>
    import userData from '../../../virtualData/dynamicData';
    export default {
        data() {
            return {
                formInline: {
                    user: '',
                    region:''
                },
                isValid:false,
                isNotValid:false,
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
                value2: '',
                innerVisible:false,
                centerDialogVisible:false,
                selectedOne:false,
                selectedData:{},
                currentPage4:4,
                tableData:userData.data.dataList
            }
        },
        methods:{
            detailInfo(){
                let t = this;
                if(!t.selectedOne){
                    t.$message.error('请选择您要变更的用户!');
                }else{
                    t.centerDialogVisible = true;
                }
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
                let t = this;
                t.selectedOne = true;
                t.selectedData = val;
                console.log(`当前页: ${val}`);
            },
            isValidDynamic(type){
                let t = this;
                if(!t.selectedOne){
                    t.$message.error('请选择您要激活的动态!');
                }else{
                    if(type===0){
                        t.isValid = true;
                    }else if(type===1) {
                        t.isValid = false;
                        t.$message({
                            message: '动态已被激活',
                            type: 'success'
                        });
                    }
                }
            },
            isNotValidDynamic(type){
                let t = this;
                if(!t.selectedOne){
                    t.$message.error('请选择您要无效的动态!');
                }else{
                    if(type===0){
                        t.isNotValid = true;
                    }else if(type===1) {
                        t.isNotValid = false;
                        t.$message({
                            message: '动态已被无效',
                            type: 'success'
                        });
                    }
                }
            },
            validDynamic(type){
                let t = this;
                if(!t.selectedOne){
                    t.$message.error('请选择您要无效的动态!');
                }else{
                    if(type===0){
                        t.innerVisible = true;
                    }else if(type===1) {
                        t.innerVisible = false;
                        t.$message({
                            message: '动态已被无效',
                            type: 'success'
                        });
                    }
                }

            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../../styleComponent/ContentInner";
    .adminContentInner{
        @include ContentInner()
    }
    .block{
        padding: 20px 0;
    }
    .feedBackImgContainer{
        height: 399px;
        width: 100%;
    }
    .feedBackImgList{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 399px;
        flex-wrap: wrap;
        .feedBackAreaImgItem{
            width: 191.85px;
            height: 132.9px;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .rejectAuditInline,.feedBackArea{
        width: 100%;
        height: 100%;
        margin: 0 auto;
    }
    .dynamicTitle{
        font-size: 24px;
    }
</style>
