import Mock from 'mockjs';
const data = Mock.mock({
    'dataList|10':[
        {
            'id':'@datetime(T)',
            'changeId':'@datetime(T)',
            'auditState|1':['新建','已回复'],
            'name': '@cname',
            'phone':/^1[3578]\d{9}$/,
            'email':"@email()",
            'imgList|9':["@image('383x265', '#894FC4')"],
            'feedBackcontent':"@ctitle(38)",
            'registerTime':'@datetime()',
            'auditer':"@cname",
        }
    ]
});
export default {
    data
}
