var path = require('path');
var fs = require('fs');

function resolve(relPath) {
    return path.resolve(__dirname, relPath);
}
var columnData = fs.readFileSync(resolve('../column.json'),'utf-8');
var columnJson = JSON.parse(columnData);
var msg = [
    '请输入您的名字：\n',
    '请输入正确的名字\n',
    '请输入您要创建的路由名称(En.)：',
    '请输入正确的路由名\n',
    '请输入英文路由名！\n',
    '该模块已被创建请重新输入路由名称！\n'
];
var routerName = '';
var createStep = 0;
var checkColumnName = function(list,name){
    var result = true;
  for(var num = 0;num<list.length;num++){
      var item = list[num];
      if(name===item.routerName){
          result = false;
          break;
      }
  }
  return result;
};
var createTime = function(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return year+''+month+''+day+''+hour+''+minute+''+second;
}
process.stdout.write(msg[2]);
process.stdin.on('data',(input)=>{
    input=input.toString().trim();
    switch (createStep) {
        case 0:
            if(input.length===0){
                process.stdout.write(msg[3]);
            }else{
                var re = new RegExp("^[a-zA-Z0-9]+$");
                if (!re.test(input)) {
                    process.stdout.write(msg[4]);
                }else{
                    if(checkColumnName(columnJson.columnList,input)){
                        routerName = input;
                        process.stdout.write(msg[0]);
                        createStep = 1;
                    }else{
                        process.stdout.write(msg[5]);
                    }
                }
            }
            //console.log(columnJson);
            break;
        case 1:
            if(input.length===0){
                process.stdout.write(msg[1]);
            }else{
                fs.readFile(resolve('../src/views/components/createDemo/index.vue'), 'utf-8', function(err, data) {
                    if (err) {
                        console.log("读取失败");
                    } else {
                        fs.writeFile(path.join(__dirname, '..', '/src/views/column/'+routerName+'.vue'),data,function(error){
                            if(error){
                                throw error;
                            }else{
                                columnJson.columnList.push({
                                    "authorName":input,
                                    "createTime":createTime(),
                                    "routerName":routerName
                                });
                                fs.writeFile(path.join(__dirname, '..', '/column.json'),JSON.stringify(columnJson),function(error){
                                    if(error){
                                        throw error;
                                    }else{
                                        console.log("模块已更新");
                                        process.exit();
                                    }
                                });
                            }
                        });
                        return data;
                    }
                });
            }
            break;
    }
});
