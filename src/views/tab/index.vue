<template>
    <section class="el-tabs__header">
        <ul class="adminTabList">
            <router-link tag="li" active-class="is-active" v-for="(item,i) in nowTabData" :key="i" class="el-tabs__item" :to="'/'+item.routerLink" @contextmenu.native.prevent="rightClose($event,item)">
                {{item.title}}<span class="el-icon-close" @click.stop="closeTab(item)"></span>
            </router-link>
            <ContextCom :style="styleJson"  v-show="Context&&editOnOff" @deleteAll="closeAll" @deleteIt="closeIt" @deleteOthers="closeOthers"></ContextCom>
        </ul>
    </section>
</template>
<script>
    import ContextCom from '../contextmenu/Contextmenu'
    import {mapGetters,mapActions} from "vuex";
    export default {
        data() {
            return {
                list:{},
                editableTabsValue: '2',
                tabIndex: 2,
                editOnOff:true,
                contextData:null,
                styleJson:{
                    position:'absolute',
                    left:0,
                    top:0
                }

            }
        },
        props:['menuDeleta'],
        computed:{
            nowTabData(){
                let t = this;
                return (t.$store.state.nowTabData.length)?JSON.parse(t.$store.state.nowTabData):{};
            },
            Context(){
                return this.menuDeleta;
            }
        },
        components:{
            ContextCom
        },
        methods: {
            ...mapActions(['deleteTab']),
            closeAll(){
                let t = this;
                for(let key in t.nowTabData){
                    t.closeTab(t.nowTabData[key]);
                }
            },
            closeIt(){
                let t = this;
                t.closeTab(t.contextData);
            },
            closeOthers(){
                let t = this;
                for(let key in t.nowTabData){
                    if(t.nowTabData[key].routerLink!==t.contextData.routerLink){
                        t.closeTab(t.nowTabData[key]);
                    }
                }
            },
            rightClose(e,v){
                let t = this;
                t.contextData = v;
                t.styleJson.left = (e.clientX)+'px';
                t.styleJson.top= e.offsetY+'px';
                t.editOnOff = true;
            },
            closeTab(v){
                let t = this;
                let nowPathname = this.$route.path.substring(1,1000);
                console.log(v);
                this.deleteTab(v);
                let  lastKey = '';
                if((v.routerLink)&&(nowPathname===v.routerLink)){
                    for(let key in t.nowTabData){
                        lastKey = key;
                    }
                    if(lastKey.length){
                        t.$router.push({ path: t.nowTabData[lastKey].routerLink});
                    }else{
                        t.$router.push({ path: '/' });
                    }
                }
                t.editOnOff = false;

            }
        },
        mounted(){
            console.log(this.nowTabData)
        }
    }
</script>
<style lang="scss">
    .el-tabs__header{
        border-bottom: none;
        margin: 0 0 10px;
    }
    .el-tabs__new-tab{
        margin: 5px 0 9px 10px;
    }
    .el-tabs__item{
        display: inline-block;
        position: relative;
        height: 26px;
        line-height: 26px;
        border: 1px solid #d8dce5 !important;
        color: #495060;
        background: #fff;
        padding: 0 8px;
        font-size: 12px;
        margin-left: 5px;
        margin-top: 4px;
        &.is-active{
            &:before{
                content:"•";
            }
            background-color: #42b983;
            color: #fff;
            border-color: #42b983;
        }
    }
</style>
