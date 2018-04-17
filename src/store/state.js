import tab2Data from './contentData/tabid2';
const state = {
    toggleOnOff:true,
    nowTabData: '',
    Context:false,
    outLoginDialogOnOff:false,
    loginOnOff:localStorage.getItem("userName")?localStorage.getItem("userName"):'',
    tab2Data:tab2Data
};
export default  state;
