<template>
    <el-dialog
        :visible.sync="sortOnOff"
        width="64%"
        :before-close="handleClose"
        center>
        <div class="columnContainer block">
            <div
                class="column-item"
                v-for="color in colors" v-dragging="{ item: color, list: colors, group: 'color' }"
                :key="color.text"
            >{{color.text}}</div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="sortColumn">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
    import Common from '../../../../utils/common';
    import { createNamespacedHelpers } from 'vuex';
    const { mapGetters,mapActions } = createNamespacedHelpers('module001');
    export default {
        data(){
            let adminId = Common.checkInvalid(localStorage.getItem('adminId'))?'':localStorage.getItem('adminId');
            return {
                colors: [{
                    text: "Aquamarine"
                }, {
                    text: "Hotpink"
                }, {
                    text: "Gold"
                }, {
                    text: "Crimson"
                }, {
                    text: "Blueviolet"
                }, {
                    text: "Lightblue"
                }, {
                    text: "Cornflowerblue"
                }, {
                    text: "Skyblue"
                }, {
                    text: "Burlywood"
                }]
            }
        },
        computed:{
            ...mapGetters(['sortOnOff'])
        },
        methods:{
            ...mapActions(['hideSort']),
            handleClose(){

            },
            sortColumn(){
                let _this = this;
                console.log('确定排序');
            }
        },
        mounted() {
            this.$dragging.$on('dragged', ({ value }) => {
                console.log(value.item)
                console.log(value.list)
                console.log(value.otherData)
            })
            this.$dragging.$on('dragend', (res) => {
                console.error(res);
            })
        }
    }
</script>
<style lang="scss" scoped>
    .columnContainer{
        &:before,&:after {
            content: "";
            display: block;
            clear: both;
        }
    }
    .column-item{
        width: 200px;
        height: 200px;
        border: 1px solid rgba(98,111,140,.15);
        box-shadow: 0 3px 8px 0 hsla(207,6%,72%,.35);
        border-radius: 4px;
        margin: 8px;
        float: left;
    }

</style>
