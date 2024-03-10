import { Box, Button, Modal } from "@mui/material";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import {
  AiFillEdit,
  AiFillMail,
  AiOutlineDelete,
  AiOutlineMail,
} from "react-icons/ai";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { format } from "timeago.js";
import Loader from "../../Loader/Loader";
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserRoleMutation } from "@/redux/features/user/userApi";
import { styles } from "../../styles/style";
import toast from "react-hot-toast";

type Props = {
  isTeam: boolean;
};

const AllUsers = ({ isTeam }: Props) => {
  const { theme, setTheme } = useTheme();

  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const { isLoading, data, error } = useGetAllUsersQuery({});
  const [updateUserRole,{error:updateError,isSuccess }]= useUpdateUserRoleMutation()

  const [deleteUser,{error:deleteError,isSuccess:deleteSuccess}]= useDeleteUserMutation()


  useEffect(() => {
      if(isSuccess){
        toast.success("Role updated successfully")
        setActive(false)
      }
      if(deleteSuccess){
        toast.success("User deleted successfully")
        setOpen(false);
      }
      if(updateError){
      if("data" in updateError){
        const errorMessage= updateError as any;
        toast.error(errorMessage.data.message as string)
      }}
      if(deleteError){
      if("data" in deleteError){
        const errorMessage= deleteError as any;
        toast.error(errorMessage.data.message as string)
      }}
  },[isSuccess,updateError,deleteSuccess,deleteError])

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
    { field: "created_at", headerName: "Joined On", flex: 0.5 },

    {
      field: "",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
            onClick={() => {setOpen(true);
            setUserId(params.row.id)}}>
              <AiOutlineDelete
                className="dark:text-white text-black"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
    {
      field: " ",
      headerName: "email",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <a href={`mailto:${params.row.email}`}>
              <AiOutlineMail className="dark:text-white text-black" size={20} />
            </a>
          </>
        );
      },
    },
  ];
  const rows: any = [];

  if (isTeam) {
    const newData =
      data && data.users.filter((item: any) => item.role === "admin");

    {
      newData &&
        newData.forEach((item: any) => {
          rows.push({
            id: item._id,
            name: item.name,
            email: item.email,
            role: item.role,
            courses: item.courses.length,
            created_at: format(item.createdAt),
          });
        });
    }
  } else {
    data &&
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  }

  const handleSubmit = async (e: any) => {
     await  updateUserRole({email,role})
  }

  const handleDelete= async()=>{
      await deleteUser(userId)
  }

  return (
    <div className="">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} w-[200px] bg-[#37a39a] text-lg text-white text-center`}
              onClick={() => setActive(!active)}
            >
              Add Member
            </div>
          </div>

          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDAtaGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiButtonBase-root-MuiSelect-icon": {
                color: theme === "dark" ? "white" : "black",
              },
              "& .MuiDataGeid-sortIcon": {
                color: theme === "dark" ? "white" : "black",
              },
              "& .MuiDataGrid-row": {
                borderBottom:
                  theme === "dark" ? "1px solid #ffffff30" : "1px solid #ccc",
                color: theme === "dark" ? "white" : "black",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "white" : "black",
              },
              "& .MuiTablePagination-selectLabel": {
                color: theme === "dark" ? "white" : "black",
              },
              "& .MuiTablePagination-displayedRows": {
                color: theme === "dark" ? "white" : "black",
              },
              "& .MuiTablePagination-selectIcon": {
                color: theme === "dark" ? "white" : "black",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "white" : "black",
              },

              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                borderBottom: "none",
                color: theme === "dark" ? "white" : "black",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                borderTop: "none",
                color: theme === "dark" ? "white" : "black",
              },
              "& .MuiCheckbox-root": {
                color: theme === "dark" ? "#b7ebde" : "black",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: "white",
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
          {active && (
            <Modal
              open={active}
              onClose={() => setActive(!active)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-4 w-[450px] dark:bg-slate-900 rounded-lg shadow outline-none">
                <h1 className={`${styles.title}`}>Add New Member</h1>
                <div className="mt-4">
                  <input
                    type="emial"
                    placeholder="Enter Email"
                    className={`${styles.input}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <select name="ro" id="" className={`${styles.input} dark:bg-slate-900 mt-6`}>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                  <br />
                  <br />
                  <div className={`${styles.button} mt06 h-[30px] `}
                   onClick={handleSubmit}>
                    Submit
                  </div>
                </div>
              </Box>
            </Modal>
          )}
          {
            open &&(
                <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-4 w-[450px] dark:bg-slate-900 rounded-lg shadow outline-none">
                <h1 className={`${styles.title}`}>Are sure ? you want to delete this user</h1>
                <div className="mt-4 flex justify-between gap-12 mx-8">
                  
                 
                  <div className={`${styles.button} text-center   h-[30px] `}
                  onClick={() =>{ setOpen(!open);
                setUserId("")}}
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

        </Box>
      )}
    </div>
  );
};

export default AllUsers;
