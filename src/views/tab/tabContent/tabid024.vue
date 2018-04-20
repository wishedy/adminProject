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
                        prop="recommendId"
                        label="推荐ID">
                    </el-table-column>
                    <el-table-column
                        prop="resourceId"
                        label="资源ID">
                    </el-table-column>
                    <el-table-column
                        prop="resourceType"
                        label="资源类型">
                    </el-table-column>
                    <el-table-column
                        prop="recommendPosition"
                        label="推荐位置">
                    </el-table-column>
                    <el-table-column
                        prop="recommendOrder"
                        label="推荐优先级">
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
                        <!--<el-form-item>
                            <el-button  type="primary" @click.native="editArticle(0)">编辑</el-button>
                        </el-form-item>-->
                        <el-form-item>
                            <el-button @click.native="pushContent(0)" type="primary">编辑</el-button>
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
            :visible.sync="pushOnOff"
            center
            append-to-body>
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="推送类型" :inline="true">
                    <el-select v-model="formInline.region" placeholder="推送类型">
                        <el-option label="个性化推送" value="0"></el-option>
                        <el-option label="全站推送" value="1"></el-option>
                        <el-option label="单独推送" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="推送位置" :inline="true">
                    <el-select v-model="formInline.region" placeholder="推送位置">
                        <el-option label="遇见栏目" value="0"></el-option>
                        <el-option label="消息栏目" value="1"></el-option>
                        <el-option label="首页全部" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="推送优先级" :inline="true">
                    <el-select v-model="formInline.region" placeholder="推送位置">
                        <el-option label="按序推送" value="0"></el-option>
                        <el-option label="优先推送" value="1"></el-option>
                        <el-option label="延后推送" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="推送ID" :inline="true">
                    <el-input v-model="formInline.user" placeholder="请输入推送ID"></el-input>
                </el-form-item>
            </el-form>
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="个性化推送条件" :inline="true">
                    <el-button class="tag">个性化标签</el-button>
                    <el-button class="tag">个性化标签</el-button>
                    <el-button class="tag">个性化标签</el-button>
                    <el-button class="tag">个性化标签</el-button>
                    <el-button class="tag">个性化标签</el-button>
                    <el-button class="tag">个性化标签</el-button>
                    <el-button class="tag">个性化标签</el-button>
                    <el-button class="tag">个性化标签</el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="pushOnOff = false">取 消</el-button>
                <el-button type="primary" @click="pushContent(1)">确 定</el-button>
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
                        <el-input v-model="formInline.user" placeholder="请输入文章标题" class="paragraphTitle" disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="文章副标题" :inline="true" size="medium">
                        <el-input v-model="formInline.user" placeholder="请输入文章副标题" type="input" class="paragraphTitle"  disabled="disabled"></el-input>
                    </el-form-item>
                </el-form>
                <div class="block templatePreview">
                    <el-aside class="templateItem" width="49%">
                        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524054334359&di=8222adebfed9c9f02b8b9ae3c8e9245d&imgtype=0&src=http%3A%2F%2Fpic40.nipic.com%2F20140417%2F18460687_100054352164_2.jpg" alt="" class="templateImage">
                    </el-aside>
                    <el-aside class="templateItem" width="49%">
                        <div class="block sectionContent">
                            <swiper :options="swiperOption" class="sectionSwiperContent">
                                <swiper-slide>
                                    <div class="paragraphItem">
                                        <span class="paragraphItemTitle">第一段文本</span>
                                        <article class="paragraphItemArticle">
                                            <textarea name=""  cols="30" rows="10" class="paragraphArticleInput"></textarea>
                                        </article>
                                    </div>
                                    <div class="paragraphItem">
                                        <span class="paragraphItemTitle">标题</span>
                                        <article class="paragraphItemInput">
                                            <input type="text" class="paragraphTitleInput" placeholder="段落标题"/>
                                        </article>
                                    </div>
                                    <div class="paragraphItem">
                                        <span class="paragraphItemTitle">副标题</span>
                                        <article class="paragraphItemInput">
                                            <input type="text" class="paragraphTitleInput" placeholder="段落副标题"/>
                                        </article>
                                    </div>
                                    <div class="paragraphItem">
                                        <span class="paragraphItemTitle">插图</span>
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
                                </swiper-slide>
                                <swiper-slide>
                                    <div class="paragraphItem">
                                        <span class="paragraphItemTitle">第一段文本</span>
                                        <article class="paragraphItemArticle">
                                            <textarea name=""  cols="30" rows="10" class="paragraphArticleInput"></textarea>
                                        </article>
                                    </div>
                                    <div class="paragraphItem">
                                        <span class="paragraphItemTitle">标题</span>
                                        <article class="paragraphItemInput">
                                            <input type="text" class="paragraphTitleInput" placeholder="段落标题"/>
                                        </article>
                                    </div>
                                    <div class="paragraphItem">
                                        <span class="paragraphItemTitle">副标题</span>
                                        <article class="paragraphItemInput">
                                            <input type="text" class="paragraphTitleInput" placeholder="段落副标题"/>
                                        </article>
                                    </div>
                                    <div class="paragraphItem">
                                        <span class="paragraphItemTitle">插图</span>
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
                                </swiper-slide>
                                <swiper-slide>
                                    <div class="paragraphItem">
                                        <span class="paragraphItemTitle">第一段文本</span>
                                        <article class="paragraphItemArticle">
                                            <textarea name=""  cols="30" rows="10" class="paragraphArticleInput"></textarea>
                                        </article>
                                    </div>
                                    <div class="paragraphItem">
                                        <span class="paragraphItemTitle">标题</span>
                                        <article class="paragraphItemInput">
                                            <input type="text" class="paragraphTitleInput" placeholder="段落标题"/>
                                        </article>
                                    </div>
                                    <div class="paragraphItem">
                                        <span class="paragraphItemTitle">副标题</span>
                                        <article class="paragraphItemInput">
                                            <input type="text" class="paragraphTitleInput" placeholder="段落副标题"/>
                                        </article>
                                    </div>
                                    <div class="paragraphItem">
                                        <span class="paragraphItemTitle">插图</span>
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
                                </swiper-slide>
                                <div class="swiper-pagination" slot="pagination"></div>
                                <div class="swiper-button-prev" slot="button-prev"></div>
                                <div class="swiper-button-next" slot="button-next"></div>
                            </swiper>
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
    import userData from '../../../virtualData/recommendData';
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
                pushOnOff:false,
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
            pushContent(type){
                let t = this;
                if(!t.selectedOne){
                    t.$message.error('请选择您要编辑的推送!');
                }else{
                    if(type===0){
                        t.pushOnOff = true;
                    }else if(type===1){
                        t.pushOnOff = false;
                        t.$message({
                            message: t.selectedData.articleTitle+'文章已推送',
                            type: 'success'
                        });
                    }

                }
              console.log('推送');
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
    .tag{
        margin: 10px;
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
    .paragraphItem{
        width: 100%;
        height: auto;
        .paragraphItemTitle{
            width: 100%;
            font-size: 22px;
            padding: 20px 0 ;
            display: block;
        }
        .paragraphItemArticle{
            width: 100%;
            height: 400px;
            display: block;
            .paragraphArticleInput{
                width: 90%;
                height: 100%;
                margin: 0 auto;
                resize: none;
                display: block;
                font-size: 22px;
                overflow: auto;
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
