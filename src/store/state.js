const state = {
    toggleOnOff:true,
    nowTabData: '',
    Context:false,
    outLoginDialogOnOff:false,
    loginOnOff:localStorage.getItem("userName")?localStorage.getItem("userName"):''
};
export default  state;
