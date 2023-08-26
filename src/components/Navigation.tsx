import * as React from 'react';
import { setGlobalState, useGlobalState, setLoadingMsg, truncate } from '../store'
import Image from 'next/image'
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi'

export function MetaMask() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()

  return (
    <div>
      {connectors.map((connector) => (
        <button
          className='shadow-xl shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] md:text-xl p-2 rounded-full'
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          Connect {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'}
        </button>
      ))}

      {/* {error && <div> {setLoadingMsg(error.message)}</div>} */}
    </div>
  )
}



const Navigation = () => {
  const { address, connector, isConnected } = useAccount()
  const { data: ensAvatar } = useEnsAvatar({ address })
  const { data: ensName } = useEnsName({ address })
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()
  return (
    <div className='w-4/5 flex justify-between md:justify-center items-center py-4 mx-auto'>
        <div className='md:flex-[0.5] flex-initial justify-center items-center text-gradient text-5xl font-bold'>
            AvaSocial
        </div>
        
        <ul className='md:flex-[0.5] text-white md:flex hidden list-none justify-between items-center flex-initial'  >
            {
              isConnected ? (
                <>
                  <li className='mx-4 cursor-pointer'>Market</li>
                  <li className='mx-4 cursor-pointer'>Blog</li>
                  <li className='mx-4 cursor-pointer'>Token</li>
                  <Image src={ensAvatar} alt="ENS Avatar" />
                  <div>{ensName ? `${ensName} (${truncate(address, 4,4,11)})` : truncate(address, 4,4,11)}</div>
                  <li className='mx-4 cursor-pointer'>{!ensName ? 'Check ENS status' : null }</li>
                  <button className='shadow-xl shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] md:text-xl p-2 rounded-full' onClick={disconnect}>Disconnect</button>
                </>
              ) : (
                <>
                  <li className='mx-4 cursor-pointer'>Market</li>
                  <li className='mx-4 cursor-pointer'>Blog</li>
                  <li className='mx-4 cursor-pointer'>Token</li>
                  <MetaMask />
                </>
              )
              }
            
        </ul>
        
    </div>
  )
}

export default Navigation