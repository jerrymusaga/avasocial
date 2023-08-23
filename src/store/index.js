import { createGlobalState } from "react-hooks-global-state";

const {setGlobalState, getGlobalState, useGlobalState} = createGlobalState({
    modal: 'scale-0',
    nftDetailModal: 'scale-0',
    updateNFTModal: 'scale-0',
    reactionModal: 'scale-0',
});

export {setGlobalState, getGlobalState, useGlobalState}