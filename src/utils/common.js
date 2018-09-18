class Common {
    constructor(){
        this.sexFormat = this.sexFormat.bind(this);
        this.accountState = this.accountState.bind(this);
        this.jsGetAge = this.jsGetAge.bind(this);
        this.customerDegree = this.customerDegree.bind(this);
        this.blackReason = this.blackReason.bind(this);
    }
    sexFormat(type){
        return parseInt(type,10)===0?'女':'男';
    }
    jsGetAge(strBirthday){
        var returnAge;
        var strBirthdayArr=strBirthday.split("-");
        var birthYear = strBirthdayArr[0];
        var birthMonth = strBirthdayArr[1];
        var birthDay = strBirthdayArr[2];

        var d = new Date();
        var nowYear = d.getFullYear();
        var nowMonth = d.getMonth() + 1;
        var nowDay = d.getDate();

        if(nowYear == birthYear){
            returnAge = 0;//同年 则为0岁
        }
        else{
            var ageDiff = nowYear - birthYear ; //年之差
            if(ageDiff > 0){
                if(nowMonth == birthMonth) {
                    var dayDiff = nowDay - birthDay;//日之差
                    if(dayDiff < 0)
                    {
                        returnAge = ageDiff - 1;
                    }
                    else
                    {
                        returnAge = ageDiff ;
                    }
                }
                else
                {
                    var monthDiff = nowMonth - birthMonth;//月之差
                    if(monthDiff < 0)
                    {
                        returnAge = ageDiff - 1;
                    }
                    else
                    {
                        returnAge = ageDiff ;
                    }
                }
            }
            else
            {
                returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
            }
        }

        return returnAge;//返回周岁年龄

    }
    customerDegree(type){
        let str = '';
        switch (parseInt(type)){
            //用户学位0大学专科，1大学本科，2研究生，3博士，4博士后
            case 0:
            str='大学专科';
            break;
            case 1:
            str='大学本科';
            break;
            case 2:
            str='研究生';
            break;
            case 3:
            str='博士';
            break;
            case 4:
            str='博士后';
            break;
        }
        return str;
    }
    blackReasonFormat(type){
        let str = '';
        switch (parseInt(type)){
            case 0:
                str='营销诈骗';
                break;
            case 1:
                str='淫秽色情';
                break;
            case 2:
                str='不友善行为';
                break;
            case 3:
                str='诱导欺骗';
                break;
            case 4:
                str='虚假资料';
                break;
        }
        return str;
    }
    blackState(type){
        let str = '';
        switch (parseInt(type)){
            case 0:
                str='拉黑';
                break;
            case 1:
                str='激活';
                break;
        }
        return str;
    }
    blackReason(){
        return [
            {
                reasonName:'营销诈骗',
                reasonType:0
            },
            {
                reasonName:'淫秽色情',
                reasonType:1
            },
            {
                reasonName:'不友善行为',
                reasonType:2
            },
            {
                reasonName:'诱导欺骗',
                reasonType:3
            },
            {
                reasonName:'虚假资料',
                reasonType:4
            }
        ]
    }
    accountState(type){
        let str = '';
        switch (parseInt(type)){
            //用户账户状态，0注册，1提交认证，等待审核，2,认证通过,3驳回认证,4拉黑
            case 0:
            str='注册';
            break;
            case 1:
            str='提交认证';
            break;
            case 2:
            str='认证通过';
            break;
            case 3:
            str='驳回认证';
            break;
            case 4:
            str='拉黑';
            break;
        }
        return str;
    }
}
export default  new Common();
