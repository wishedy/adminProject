<template>
    <div class="block adminAuditControl">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-button type="default" @click.native="showLayer">新增</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default">编辑</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default">激活</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default">无效</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    const { mapGetters,mapActions } = createNamespacedHelpers('module001');
    export default {
        methods:{
            ...mapActions(['showLayer'])
        }
    }
</script>
