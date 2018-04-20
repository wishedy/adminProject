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
                        label="话题ID">
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
                        label="话题标题">
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
            width="50%"
            :title="selectedData.articleTitle"
            :visible.sync="articleDialog"
            center
            append-to-body
            class="articleTitle">
            <div class="block articleTemplateContent">
                <div class="block templatePreview">
                    <el-aside class="templateItem" width="100%">
                        <div class="paragraphItem">
                            <span class="paragraphItemTitle">话题标题</span>
                            <article class="paragraphItemInput">
                                <input type="text" class="paragraphTitleInput" placeholder="话题标题"/>
                            </article>
                        </div>
                        <div class="paragraphItem">
                            <span class="paragraphItemTitle">话题封面</span>
                            <!--paragraphItemNothing paragraphItemHave无图片-->
                            <article class="paragraphItemImage paragraphItemHave">
                                <section class="paragraphItemContent">
                                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524054334359&di=8222adebfed9c9f02b8b9ae3c8e9245d&imgtype=0&src=http%3A%2F%2Fpic40.nipic.com%2F20140417%2F18460687_100054352164_2.jpg" alt="">
                                    <i class="close el-icon-close"></i>
                                </section>

                                <section class="paragraphItemEdit">
                                    <i class="el-icon-upload upload">
                                    </i>
                                    <i class="uploadDes">上传图片</i>
                                </section>
                            </article>
                        </div>
                        <div class="paragraphItem">
                            <span class="paragraphItemTitle">话题缩略内容</span>
                            <article class="paragraphItemArticle">
                                <textarea name=""  cols="30" rows="10" class="paragraphArticleInput"></textarea>
                            </article>
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
        mounted() {

        },
        methods:{
            callback(){
                console.log('执行');
            },
            imgInit(e){
              console.log(e);
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
    .paragraphItem{
        width: 100%;
        height: auto;
        .paragraphItemTitle{
            width: 100%;
            font-size: 22px;
            padding: 10px 0 ;
            display: block;
        }
        .paragraphItemArticle{
            width: 100%;
            height: 300px;
            display: block;
            .paragraphArticleInput{
                width: 90%;
                margin: 0 auto;
                resize: none;
                display: block;
                font-size: 22px;
                /*overflow: auto;*/
            }
        }
        .paragraphItemInput{
            width: 100%;
            height: 32px;
            .paragraphTitleInput{
                width: 90%;
                margin: 0 auto;
                font-size: 22px;
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
                display: block;
                -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
                transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            }
        }
        .paragraphItemImage{
            width: 90%;
            display: block;
            margin: 0 auto;
            height:300px;
            position: relative;
            &.paragraphItemNothing{
                z-index: 1;
            }
            .paragraphItemEdit{
                width: 100%;
                height: 100%;
                position: absolute;
                top:0;
                left: 0;
                bottom:0;
                right: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border: 1px dashed #333;
                .upload{
                    width: 160px;
                    height: 160px;
                    font-size: 82px;
                    line-height: 160px;
                    text-align: center;
                    color: #3598DB;
                }
                .uploadDes{
                    font-size: 22px;
                    font-weight: normal;
                }
            }
            &.paragraphItemHave{
                .paragraphItemContent{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top:0;
                    left: 0;
                    bottom:0;
                    right: 0;
                    z-index: 2;
                    border: 1px solid #ffffff;
                    .close{
                        opacity: 0;
                    }
                    &:hover{
                        .close{
                            position: absolute;
                            top:0;
                            opacity: 1;
                            right: 0;
                            width: 30px;
                            height: 30px;
                            line-height: 30px;
                            text-align: center;
                            font-size: 22px;
                            color:#fff;
                            background: rgba(0,0,0,.5);
                            transition: opacity .3s ease;
                        }
                    }
                }

            }
            img{
                width: 100%;
                height: 100%;
            }

        }
    }
    .templatePreview{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: auto;
        .templateItem{
            width: 49%;
            .sectionContent{
                height:100%;
                width: 100%;
                padding: 0;
                &::after {
                    content: ".";
                    clear: both;
                    display: block;
                    overflow: hidden;
                    font-size: 0;
                    height: 0;
                }
                .sectionSwiperContent{
                    height:100%;
                    width: 100%;
                }
            }

        }
    }
</style>
