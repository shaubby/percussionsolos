import { useState } from 'react'
import Cards from './Cards.jsx'
function Home() {

  return (
    <div className='w-screen h-screen flex justify-center bg-[#acb6bd] font-mono'>
        <div className='w-2/3 bg-white'>
        <div className='w-full h-1/10 bg-[#001526] px-20'>
            <p className='text-white text-3xl relative font-bold pt-4'>
                marimba solos
            </p>
        </div>
        <div className='px-10 overflow-y-auto h-9/10'>
            <Cards/>
        </div>
        </div>
    </div>
  )
}

export default Home
