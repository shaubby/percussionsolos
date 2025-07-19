import { useState } from 'react'
import Cards from './Cards.jsx'
function Home() {

  return (
    <div className='bg-white h-full font-mono overflow-x-hidden'>
          <div className='w-screen h-[10vh] bg-[#001526] px-10 flex items-center'>
              <p className='text-white text-3xl h-full relative font-bold pt-4'>
                  marimba solos
              </p>
          </div>
          

          <Cards/>
    </div>
  )
}

export default Home
