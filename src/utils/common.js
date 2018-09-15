class Common {
    constructor(){
        this.sexFormat = this.sexFormat.bind(this);
    }
    sexFormat(type){
        console.log(type,'11111');
        return parseInt(type,10)===0?'女':'男';
    }
}
export default  new Common();
