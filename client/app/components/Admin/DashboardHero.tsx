import React from 'react'
import DashboardHeader from './DashboardHeader'
import DashboardWidgets from './widegets/DashboardWidgets';

type Props = {
  isDashboard?: boolean;
}

const DashboardHero = ({isDashboard}: Props) => {
  const [open , setOpen] = React.useState(false)
  return (
    <>
    {
      isDashboard && (
        <DashboardWidgets open= {open}/>
      )
    }
    </>
  )
}

export default DashboardHero