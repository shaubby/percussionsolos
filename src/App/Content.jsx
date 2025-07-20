import { useState } from 'react'
function Content(props) {

  return (
    <div className='bg-white h-full font-mono overflow-x-hidden justify-center items-center flex flex-col'>
          <div className='w-screen h-[10vh] bg-[#001526] px-10 flex items-center justify-center'>
              <div className='max-w-300 w-full items-end content-center h-full px-15 bg-blue-200'>
                <p className='text-white text-3xl h-full relative font-bold inline'>
                    marimba solos
                </p>
                <div></div>
             
              </div>
          </div>
          

          {props.content}
    </div>
  )
}

export default Content
