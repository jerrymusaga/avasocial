import { createGlobalState } from "react-hooks-global-state";

const {setGlobalState, getGlobalState, useGlobalState} = createGlobalState({
    modal: 'scale-0',
    nftDetailModal: 'scale-0',
    updateNFTModal: 'scale-0',
    reactionModal: 'scale-0',
    loading: {show: false, msg: ''},
    alert: {show:false, msg:'', color:''},
});

const setAlert = (msg: string,color='green') => {
    setGlobalState('loading', {show:false,msg:''})
    setGlobalState('alert', {show:true, msg, color})
    setTimeout(() => {
        setGlobalState('alert',{show:false, msg, color})
    }, 2000)
}

const setLoadingMsg = (msg: string) => {
    const loading = getGlobalState('loading')
    setGlobalState('loading', {...loading, msg})
}

const truncate = (text: string, startChars: number, endChars: number, maxLength: number) => {
    if (text.length > maxLength) {
      var start = text.substring(0, startChars)
      var end = text.substring(text.length - endChars, text.length)
      while (start.length + end.length < maxLength) {
        start = start + '.'
      }
      return start + end
    }
    return text
  }


export {setGlobalState, getGlobalState, useGlobalState, setAlert, setLoadingMsg, truncate}