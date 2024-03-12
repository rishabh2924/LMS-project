'use client'
import EditHero from '@/app/components/Admin/Customisation/EditHero'
import AdminProtected from '@/app/hooks/useAdminProtected'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    //<AdminProtected>
    <div>
        <EditHero/>
    </div>
    //</AdminProtected>
  )
}

export default page