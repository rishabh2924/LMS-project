import { Box, Button, Modal } from "@mui/material";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDeleteCourseMutation, useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import {format} from "timeago.js"
import { styles } from "../../styles/style";
import toast from "react-hot-toast";
import Link from "next/link";

type Props = {};

const AllCourses = (props: Props) => {
  const { theme, setTheme } = useTheme();

  const [deleteCourse,{error:deleteError,isSuccess}] = useDeleteCourseMutation();

  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("")

  const {isLoading,data,error,refetch } = useGetAllCoursesQuery({},{refetchOnMountOrArgChange:true});

  useEffect(()=>{
    if(isSuccess){
        refetch();
        toast.success("Course Deleted Successfulyy")
    }
    if(deleteError){
        if('data'in deleteError){
            const errorMessage= deleteError as any;
            toast.error(errorMessage.data.message as string)
        }
    }
  },[isSuccess,deleteError])

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
        field: "edit",
        headerName: "Edit",
        flex: 0.2,
        renderCell: (params: any) => {
          return (
            <>
              <Link
                href={`/admin/edit-course/${params.row.id}`}
              >
                <AiFillEdit
                  className="dark:text-white text-black"
                  size={20}
                />
              </Link>
            </>
          );
        
      }
      },
    {
      field: "",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
            onClick={() => {
                setOpen(!open);
                setCourseId(params.row.id);
              }}>
              <AiOutlineDelete
                className="dark:text-white text-black"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
      
  ];
  const rows:any= [
   
  ];

  {
    data && data.courses.forEach((item:any) => {
        rows.push({
            id: item._id,
            title: item.name,
            ratings: item.rating,
            purchased: item.purchased,
            created_at: format(item.createdAt)

        })
    });
  }

  const handleDelete = async () => {
      await deleteCourse(courseId);
      setOpen(false)
  }

 
  return (
    <div className="mt-[120px]">
      {
        isLoading?(<Loader/>):(<Box m="20px">
        <Box m="40px 0 0 0" height="80vh" sx={{
            "& .MuiDAtaGrid-root": {
                border: "none",
                outline: "none"
            },
            "& .css-pqjvzy-MuiButtonBase-root-MuiSelect-icon": {
                color: theme === "dark" ? "white" : "black"
            },
            "& .MuiDataGeid-sortIcon": {
                color: theme === "dark" ? "white" : "black"
            },
            "& .MuiDataGrid-row": {
                borderBottom: theme === "dark" ? "1px solid #ffffff30" : "1px solid #ccc",
                color: theme === "dark" ? "white" : "black"
            },
            "& .MuiTablePagination-root":{
                color:theme==="dark"?"white":"black"
            },
            "& .MuiTablePagination-selectLabel":{
                color:theme==="dark"?"white":"black"
            },
            "& .MuiTablePagination-displayedRows":{
                color:theme==="dark"?"white":"black"
            },
            "& .MuiTablePagination-selectIcon":{
                color:theme==="dark"?"white":"black"
            },
            "& .MuiDataGrid-cell":{
                borderBottom:"none",
            },
            "& .name-column--cell":{
                color:theme==='dark'?"white":"black"
            },

            "& .MuiDataGrid-columnHeaders":{
                backgroundColor:theme==="dark"?"#3e4396":"#A4A9FC",
                borderBottom:"none",
                color: theme ==='dark'? "white":"black"
            },
            "& .MuiDataGrid-virtualScroller":{
                backgroundColor:theme==="dark"?"#1F2A40":"#F2F0F0",
            },
            "& .MuiDataGrid-footerContainer":{
                backgroundColor:theme==="dark"?"#3e4396":"#A4A9FC",
                borderTop:"none",
                color: theme ==='dark'? "white":"black"
            },
            "& .MuiCheckbox-root":{
                color:theme==="dark"?"#b7ebde":"black"
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text":{
                color:"white"
            }


        }}>
          <DataGrid checkboxSelection rows={rows} columns={columns} />
        </Box>
        {
            open &&(
                <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-4 w-[450px] dark:bg-slate-900 rounded-lg shadow outline-none">
                <h1 className={`${styles.title}`}>Are sure ? you want to delete this Course</h1>
                <div className="mt-4 flex justify-between gap-12 mx-8">
                  
                 
                  <div className={`${styles.button} text-center   h-[30px] `}
                  onClick={() =>{ setOpen(!open);
                setCourseId("")}}
                   >
                    Cancel
                  </div>
                  <div className={`${styles.button} text-center bg-red-800  h-[30px] `}
                   onClick={handleDelete}>
                    Delete
                  </div>
                </div>
              </Box>
            </Modal>
            )
          }

      </Box>)
      }
    </div>
  );
};

export default AllCourses;
