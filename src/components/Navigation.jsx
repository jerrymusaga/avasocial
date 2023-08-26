import { useConnect } from 'wagmi'

export function Profile() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()

  return (
    <div>
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'}
        </button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  )
}



const Navigation = () => {

  return (
    <div className='w-4/5 flex justify-between md:justify-center items-center py-4 mx-auto'>
        <div className='md:flex-[0.5] flex-initial justify-center items-center text-gradient text-5xl font-bold'>
            AvaSocial
        </div>
        <ul className='md:flex-[0.5] text-white md:flex hidden list-none justify-between items-center flex-initial'  >
            <li className='mx-4 cursor-pointer'>Market</li>
            <li className='mx-4 cursor-pointer'>Blog</li>
            <li className='mx-4 cursor-pointer'>Token</li>
            <li className='mx-4 cursor-pointer'>Profile(jerry.eth)</li>
        </ul>
        <button className='shadow-xl shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] md:text-xs p-2 rounded-full '><Profile /></button>
    </div>
  )
}

export default Navigation