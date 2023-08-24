import { createGlobalState } from "react-hooks-global-state";

const {setGlobalState, getGlobalState, useGlobalState} = createGlobalState({
    modal: 'scale-0',
    nftDetailModal: 'scale-0',
    updateNFTModal: 'scale-0',
    reactionModal: 'scale-0',
    loading: {show: false, msg: ''},
    alert: {show:false, msg:'', color:''},
});

const setAlert = (msg,color='green') => {
    setGlobalState('loading', {show:false,msg:''})
    setGlobalState('alert', {show:true, msg, color})
    setTimeout(() => {
        setGlobalState('alert',{show:false, msg, color})
    }, 6000)
}

const setLoadingMsg = (msg) => {
    const loading = getGlobalState('loading')
    setGlobalState('loading', {...loading, msg})
}


export {setGlobalState, getGlobalState, useGlobalState, setAlert, setLoadingMsg}