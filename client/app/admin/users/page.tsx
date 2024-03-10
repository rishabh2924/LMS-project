'use client'
import AllUsers from '@/app/components/Admin/users/AllUsers'
import AdminProtected from '@/app/hooks/useAdminProtected'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
   //<AdminProtected>
    <div>
      <AllUsers isTeam={false}/>
    </div>
   //</AdminProtected>
  )
}

export default page