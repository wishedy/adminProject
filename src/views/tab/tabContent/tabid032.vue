<template>
    <section class="adminContentContainer">
        <section class="adminContentInner">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="模板ID">
                    <el-input v-model="formInline.user" placeholder="会员ID"></el-input>
                </el-form-item>
                <el-form-item label="作者">
                    <el-input v-model="formInline.user" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-date-picker
                    v-model="value2"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1">
                </el-date-picker>
                <el-form-item label="状态" :inline="true">
                    <el-select v-model="formInline.region" placeholder="模板状态">
                        <el-option label="有效" value="0"></el-option>
                        <el-option label="无效" value="1"></el-option>
                    </el-select>
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
                        prop="templateId"
                        label="模板ID">
                    </el-table-column>
                    <el-table-column
                        prop="useTime"
                        label="使用次数">
                    </el-table-column>
                    <el-table-column
                        prop="browseTime"
                        label="浏览次数">
                    </el-table-column>
                    <el-table-column
                        prop="author"
                        label="作者">
                    </el-table-column>
                    <el-table-column
                        prop="valid"
                        label="状态">
                    </el-table-column>
                    <el-table-column
                        prop="updateTime"
                        label="更新时间">
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
                            <el-button @click.native="detailCheck(0)">详情</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button  type="primary" @click.native="editArticle(0)">编辑</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click.native="detailInfo(0)" type="danger">无效</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </section>
        <el-dialog
            width="30%"
            title="提示"
            :visible.sync="innerVisible"
            append-to-body>
            <span>确定要无效这条模板？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="innerVisible = false">取 消</el-button>
                <el-button type="primary" @click="detailInfo(1)">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            width="80%"
            title="模板详情"
            :visible.sync="infoOnOff"
            center
            append-to-body>
            <el-main class="detailInfo">
                <div class="detailItem">
                    <h1 class="detailItemTitle">效果图</h1>
                    <section class="detailItemImg">
                        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524054334359&di=8222adebfed9c9f02b8b9ae3c8e9245d&imgtype=0&src=http%3A%2F%2Fpic40.nipic.com%2F20140417%2F18460687_100054352164_2.jpg" alt="">
                    </section>
                </div>
                <div class="detailItem">
                    <h1 class="detailItemTitle">模板结构</h1>
                </div>
            </el-main>
        </el-dialog>
        <el-dialog
            width="60%"
            title="模板编辑"
            :visible.sync="articleDialog"
            center
            append-to-body>
            <el-main class="templateContent">
                <textarea name="" id="" cols="30" rows="10" class="templateContentArea"></textarea>
            </el-main>
            <span slot="footer" class="dialog-footer">
                <el-button @click="articleDialog = false">取 消</el-button>
                <el-button type="primary" @click="editArticle(1)">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>
<script>
    import userData from '../../../virtualData/templateResource';
    export default {
        data() {
            return {
                formInline: {
                    user: '',
                    region:''
                },
                swiperOption: {
                    spaceBetween: 30,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                },
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
                labelPosition: 'left',
                formLabelAlign: {
                    name: '',
                    region: '',
                    type: ''
                },
                infoOnOff:false,
                articleDialog:false,
                innerVisible:false,
                centerDialogVisible:false,
                selectedOne:false,
                selectedData:{},
                currentPage4:4,
                tableData:userData.data.dataList
            }
        },
        mounted() {

        },
        methods:{
            callback(){
                console.log('执行');
            },
            imgInit(e){
              console.log(e);
            },
            detailCheck(type){
              let t = this;
                if(!t.selectedOne){
                    t.$message.error('请选择您要查看的模板!');
                }else{
                    if(type===0){
                        t.infoOnOff = true;
                    }else if(type===1){
                        t.infoOnOff = false;
                    }
                }
            },
            detailInfo(type){
                let t = this;
                if(!t.selectedOne){
                    t.$message.error('请选择您要无效的话题!');
                }else{
                    if(type===0){
                        t.innerVisible = true;
                    }else if(type===1){
                        t.innerVisible = false;
                        t.$message({
                            message: t.selectedData.articleTitle+'话题已被无效',
                            type: 'success'
                        });
                    }

                }
            },
            editArticle(type){
              let t = this;
                if(!t.selectedOne){
                    t.$message.error('请选择您要无效的话题!');
                }else{
                    if(type===0){
                        t.articleDialog = true;
                    }else if(type===1){

                        t.articleDialog = false;
                        t.$message({
                            message: t.selectedData.articleTitle+'话题已生成',
                            type: 'success'
                        });
                    }

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
    .articleTemplateContent{
        width: 100%;
    }
    .articleTitle{
        font-size: 26px !important;
        font-weight: bold;
        text-align: center;
        color: #333 !important;
    }
    .detailInfo{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .detailItem{
            width: 49%;
            min-height: 300px;
            font-size: 24px;
            text-align: center;
            line-height: 32px;
            .detailItemTitle{
                padding: 10px 0 ;
            }
            .detailItemImg{
                width: 100%;
                img{
                    width: 100%;
                    height:100% ;
                }
            }
        }
    }
    .templateContentArea{
        width: 100%;
        height: 100%;
        margin: 0 auto;
        resize: none;
        display: block;
        font-size: 14px;
        overflow: auto;
        line-height: 32px;
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #606266;
        outline: 0;
        padding: 0 15px;
        -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    }
</style>
