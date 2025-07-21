import { useState } from 'react'
import { NavLink } from "react-router-dom";


function Content(props) {

  return (
    <div className='bg-white h-full font-mono overflow-x-hidden justify-center items-center flex flex-col'>
      <div className='w-screen h-[10vh] bg-[#001526] px-10 flex justify-center p-5'>
        <div className='max-w-300 w-full h-full px-15 grid grid-cols-2 items-center'>
          <div>
            <p className='text-white text-3xl font-bold'>
              marimba solos
            </p>
          </div>
          <div className='flex flex-row gap-10 justify-end items-center'>
            <NavLink to="/add" end>
              <div className='p-1 bg-white text-black rounded-full w-30 text-center cursor-pointer'>
                add a solo
              </div>
            </NavLink>
            <NavLink to="/" end>
              <div className='p-1 bg-white text-black rounded-full w-30 text-center cursor-pointer'>
                list
              </div>
            </NavLink>
          </div>
        </div>
      </div>


      {props.content}
    </div>
  )
}

export default Content
