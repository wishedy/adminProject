<template>
    <section class="adminContentContainer">
        <section class="adminContentInner">
            <HandleForm></HandleForm>
            <TableList></TableList>
            <Pagination></Pagination>
            <ControlModule></ControlModule>
        </section>
        <AddLayer></AddLayer>
    </section>
</template>
<!--栏目:demo-->
<script>
    import HandleForm from './components/handleForm';
    import TableList from './components/tableList';
    import Pagination from './components/pagination';
    import ControlModule from './components/controlModule';
    import AddLayer from './components/layer';
    import { createNamespacedHelpers } from 'vuex'
    const { mapGetters,mapActions } = createNamespacedHelpers('module001');
    export default {
        data(){
            return {
                name:'demo模块'
            }
        },
        mounted(){
          let t = this;
        },
        components:{
            HandleForm,
            TableList,
            Pagination,
            ControlModule,
            AddLayer,
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../../static/scss/column/column.scss";
</style>
