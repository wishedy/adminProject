import Mock from 'mockjs';
const data = Mock.mock({
    'dataList|10-20':[
        {
            'id':'@datetime(T)',
            'job':"@ctitle(8)",
            'jobPhoto':"@image('200x100', '#894FC4', '#FFF', 'png','demo')",
            'jobNum':"@datetime(T)",
            'idNum':/^\d{17}(\d|x)$/,
            'idState|1':['通过','无效'],
            'studyNum':"@datetime(T)",
            'studyPhoto':"@image('200x100', '#894FC4', '#FFF', 'png','demo')",
            'sexType|1':['男','女'],
            'age|18-42':13,
            'name': '@cname',
            'phone':/^1[3578]\d{9}$/,
            'email':"@email()",
            'auditTime':'@date("yyyy-MM-dd")',
            'registerTime':'@date("yyyy-MM-dd")',
            'auditer':"@cname",
            'address': '@province' + '@city'
        }
    ]
});
export default {
    data
}
