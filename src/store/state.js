const state = {
    toggleOnOff:true,
    nowTabData: {},
    Context:false,
    outLoginDialogOnOff:false,
    loginOnOff:localStorage.getItem('adminId')?localStorage.getItem('adminId'):"",
};
export default  state;
