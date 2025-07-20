import { useState } from 'react'
import Cards from './Cards.jsx'
import Content from '../App/Content.jsx'
function Home() {

  return (
    <Content content={<Cards/>} />
  )
}

export default Home
