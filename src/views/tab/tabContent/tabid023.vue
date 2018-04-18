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
                        prop="dynamicId"
                        label="文章ID">
                    </el-table-column>
                    <el-table-column
                        prop="authorId"
                        label="作者ID">
                    </el-table-column>
                    <el-table-column
                        prop="author"
                        label="作者">
                    </el-table-column>
                    <el-table-column
                        prop="articleTitle"
                        label="文章标题">
                    </el-table-column>
                    <el-table-column
                        prop="linkUrl"
                        label="文章链接">
                    </el-table-column>
                    <el-table-column
                        prop="templateId"
                        label="模板ID">
                    </el-table-column>
                    <el-table-column
                        prop="shareNum"
                        label="转发">
                    </el-table-column>
                    <el-table-column
                        prop="collectNum"
                        label="收藏">
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
            <span>确定要无效这条动态？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="innerVisible = false">取 消</el-button>
                <el-button type="primary" @click="detailInfo(1)">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            width="80%"
            :title="selectedData.articleTitle"
            :visible.sync="articleDialog"
            center
            append-to-body
            class="articleTitle">
            <div class="block articleTemplateContent">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="文章模板" :inline="true">
                        <el-select v-model="formInline.region" placeholder="文章模板">
                            <el-option label="第一个模板" value="0"></el-option>
                            <el-option label="第二个模板" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="文章标题" :inline="true" size="medium">
                        <el-input v-model="formInline.user" placeholder="请输入文章标题" class="paragraphTitle"></el-input>
                    </el-form-item>
                    <el-form-item label="文章副标题" :inline="true" size="medium">
                        <el-input v-model="formInline.user" placeholder="请输入文章副标题" type="input" class="paragraphTitle"></el-input>
                    </el-form-item>
                </el-form>
                <div class="block templatePreview">
                    <el-aside class="templateItem" width="49%">
                        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524054334359&di=8222adebfed9c9f02b8b9ae3c8e9245d&imgtype=0&src=http%3A%2F%2Fpic40.nipic.com%2F20140417%2F18460687_100054352164_2.jpg" alt="" class="templateImage">
                    </el-aside>
                    <el-aside class="templateItem" width="49%">
                        <div class="block sentionContent">
                            <el-form :inline="true" class="demo-form-inline paragraphSection"  :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
                                <el-form-item label="第一段" :inline="true" size="medium" class="rejectAuditInline" style="width: 100%;">
                                    <textarea class="paragraphContent" name="" id="" cols="30" rows="10"></textarea>
                                </el-form-item>
                                <el-form-item label="插图" :inline="true" size="medium" class="rejectAuditInline block paragraphImg" style="width: 100%;">
                                    <section class="paragraphImgItem" v-for="(item,index) in selectedData.imgList" >
                                        <img :src="item" alt="">
                                    </section>
                                </el-form-item>
                            </el-form>
                            <el-form :inline="true" class="demo-form-inline paragraphSection" :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
                                <el-form-item label="第一段" :inline="true" size="medium" class="rejectAuditInline" style="width: 100%;">
                                    <textarea class="paragraphContent" name="" id="" cols="30" rows="10"></textarea>
                                </el-form-item>
                                <el-form-item label="插图" :inline="true" size="medium" class="rejectAuditInline block paragraphImg" style="width: 100%;">
                                    <section class="paragraphImgItem" v-for="(item,index) in selectedData.imgList" >
                                        <img :src="item" alt="">
                                    </section>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-aside>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="articleDialog = false">取 消</el-button>
                <el-button type="primary" @click="editArticle(1)">确 定</el-button>
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
                labelPosition: 'left',
                formLabelAlign: {
                    name: '',
                    region: '',
                    type: ''
                },
                articleDialog:false,
                innerVisible:false,
                centerDialogVisible:false,
                selectedOne:false,
                selectedData:{},
                currentPage4:4,
                tableData:userData.data.dataList
            }
        },
        methods:{
            imgInit(e){
              console.log(e);
            },
            detailInfo(type){
                let t = this;
                if(!t.selectedOne){
                    t.$message.error('请选择您要无效的文章!');
                }else{
                    if(type===0){
                        t.innerVisible = true;
                    }else if(type===1){

                        t.innerVisible = false;
                        t.$message({
                            message: t.selectedData.articleTitle+'文章已被无效',
                            type: 'success'
                        });
                    }

                }
            },
            editArticle(type){
              let t = this;
                if(!t.selectedOne){
                    t.$message.error('请选择您要无效的文章!');
                }else{
                    if(type===0){
                        t.articleDialog = true;
                    }else if(type===1){

                        t.articleDialog = false;
                        t.$message({
                            message: t.selectedData.articleTitle+'文章已生成',
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
        margin: 0 auto;
        padding:10px 0;
    }
    .dynamicTitle{
        font-size: 24px;
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
    .templatePreview{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: auto;
        .templateItem{
            width: 49%;
            overflow-x:auto ;
            height: 820px;
            .block{
                padding: 0;
            }
            .sentionContent{
                width: auto;
                white-space: nowrap;
                /*display: inline;*/
                zoom: 1;
                &::after {
                    content: ".";
                    clear: both;
                    display: block;
                    overflow: hidden;
                    font-size: 0;
                    height: 0;
                }
            }
            .paragraphSection{
                width: 485px;
                display: inline-block;
                &:nth-child(n+2){
                    padding: 0 40px;
                }
                height: 800px;
            }
            .templateImage{
                width: 100%;
            }
            .paragraphTitle{
                width: 300px;
            }
            .paragraphContent{
                width: 300px;
                height: 160px;
                resize: none;
                overflow: auto;
                -webkit-appearance: none;
                background-color: #fff;
                background-image: none;
                border-radius: 4px;
                border: 1px solid #dcdfe6;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                color: #606266;
                display: inline-block;
                font-size: inherit;
                line-height: 40px;
                outline: 0;
                padding: 0 15px;
                -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
                transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            }
            .paragraphImg{
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: space-between;
                .paragraphImgItem{
                    width: 89%;
                    img{
                        width: 100%;
                    }
                }
            }
        }
    }
</style>
