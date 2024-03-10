'use client'

import AllUsers from '@/app/components/Admin/users/AllUsers'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <AllUsers isTeam={true}/>
    </div>
  )
}

export default page