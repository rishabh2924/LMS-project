'use client'

import React , {FC, useState} from 'react'
import Heading from './utils/Heading'
import Header from './components/Header'
import Hero from './components/Route/Hero'
import Courses from './components/Route/Courses'

interface Props{}

const exampleImageUrl = '/images/hero.webp';
const exampleText = 'Expand Your Knowledge with Online Courses';

const Page:FC<Props> = (props) => {
  const [open,setOpen] = useState(false)
  const [activeItem,setActiveItem] = useState(0)
  const [route,setRoute] = useState('Login')

  return (
    <div>
      <Heading
        title="Elearning"
        description="Online learning platform"
        keywords='elearning,MERN,Programing, learning, online'
      />
      <Header open={open} setOpen={setOpen} route={route} setRoute={setRoute} activeItem={activeItem}/>
      <Hero imageUrl={exampleImageUrl} text={exampleText}/>
      <Courses/>
    </div>
  )
}

export default Page;