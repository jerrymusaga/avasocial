import { useState } from 'react'
import {FaTimes} from 'react-icons/fa'
import artwork1 from '../images/artwork1.png'
import { setGlobalState, useGlobalState } from '../store'
import {MdOutlineAddReaction} from 'react-icons/md'
import Image from 'next/image'
import * as React from 'react';



const ReactionsModal = () => {

    const [modal] = useGlobalState('reactionModal')

    const cancelModal = () => {
        setGlobalState('reactionModal', 'scale-0')
        
    }

  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${modal}`}>
        <div className='bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6'>
            <div className='flex flex-col'>
                <div className='flex justify-between items-center text-gray-400'>
                    <p className='font-semibold '>Make Reactions on NFT</p>
                    <button type='button' className='border-0 bg-transparent focus:outline-none'>
                        <FaTimes onClick={cancelModal}/>
                    </button>
                </div>
                <div className='flex justify-center items-center rounded-xl mt-5'>
                    <div className='shrink-0 rounded-xl overflow-hidden h-20 w-20'>
                        <Image className='h-full w-full object-cover cursor-pointer' src={artwork1} alt='nft-image'/>
                    </div>
                </div>
                <p className='flex justify-center items-center font-semibold '>React by sending 0.5avax</p>
                <div className='flex justify-center items-center space-x-2'>
                    
                    <button className='flex justify-center items-center w-full shadow-lg shadow-black text-white mt-5 font-bold bg-[#e32970] hover:bg-[#bd255f] rounded-full p-2'>React on NFT</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ReactionsModal