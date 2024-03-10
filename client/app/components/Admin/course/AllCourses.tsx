import { Box, Button } from "@mui/material";
import { useTheme } from "next-themes";
import React from "react";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import {format} from "timeago.js"

type Props = {};

const AllCourses = (props: Props) => {
  const { theme, setTheme } = useTheme();

  const {isLoading,data,error } = useGetAllCoursesQuery({});

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
              <Button>
                <AiFillEdit
                  className="dark:text-white text-black"
                  size={20}
                />
              </Button>
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
            <Button>
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
      </Box>)
      }
    </div>
  );
};

export default AllCourses;
