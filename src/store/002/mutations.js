import axios from 'axios';
const mutations = {
    getList(state){
        console.log(state.formInline);
        axios.get('/manage/icon', {
            params: {}
        })
            .then(function (response) {
                let reqData = response.data;
                if(reqData){
                    state.tableData = reqData;
                }
                /*if(reqData.responseObject.responseData.totalCount){
                    //t.count = reqData.responseObject.responseData.totalCount;
                }*/
            })
            .catch(function (error) {
                console.log(error);
            });
        axios.get('/manage/column/list', {
            params: {
                columnIndex:0
            }
        })
            .then(function (response) {

                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    createIcon(state,data){
        console.log(data);
        let t = this;
        axios({
            method: 'post',
            url: '/manage/icon',
            transformRequest: [function(data) {
                return "paramJson=" + JSON.stringify(data);
            }],
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            data: {
                adminId:1,
                iconName:data.iconName
            }
        }).then(function(response) {
            let reqData = response.data;
            state.addMessage = true;
            if(reqData.responseObject.responseStatus){
                state.message = reqData.responseObject.responseMessage;
                state.messageType = 'success';
                state.dialogVisible = false;
                mutations.getList(state);
            }else{
                state.message = reqData.responseObject.responseMessage;
                state.messageType = 'warning';
            }
            console.log(response.data);
        });
    },
    showLayer(state){
        state.dialogVisible = true;
        console.log(state.dialogVisible)
    },
    hideLayer(state){
        state.dialogVisible = false;
    },
    hideMsg(state){
        state.addMessage = false;
    }
};
export default mutations;
