import React, { Component } from 'react'
import {Modal,Box} from "@mui/material"

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem:any;
    Component:any;
    setRoute?:(route:string)=>void;
}

const CustomModel:React.FC<Props> = ({open,setOpen,activeItem,Component,setRoute}) => {
  return (
    <Modal
    open={open}
    onClose={() => setOpen(false)}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  
    >
<Box
className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[300px] bg-white dark:bg-slate-900 rounded-lg shadoww p-4 outline-none "

>
    <Component setOpen={setOpen} setRoute={setRoute}/>

</Box>
    </Modal>
  )
}

export default CustomModel