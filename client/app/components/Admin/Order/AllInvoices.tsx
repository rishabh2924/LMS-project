import React, { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useTheme } from "next-themes";
import { format } from "timeago.js";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { useGetOrdersQuery } from "@/redux/features/orders/ordersApi";
import { AiOutlineMail } from "react-icons/ai";
import Loader from "../../Loader/Loader";

type Props = {
  isDashboard?: boolean;
};

const AllInvoices = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetOrdersQuery({});
  const { theme, setTheme } = useTheme();
  const { data: coursesData } = useGetAllCoursesQuery({});
  const { data: usersData } = useGetAllUsersQuery({});

  const [orderData, setOrderData] = React.useState<any>([]);

  useEffect(() => {
    if (data) {
      const temp = data?.orders?.map((item: any) => {
        const user = usersData?.users.find(
          (user: any) => user._id === item.userId
        );
        const course = coursesData?.courses.find(
          (course: any) => course._id === item.courseId
        );
        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: "$" + course?.price,
        };
      });
      setOrderData(temp);
    }
  }, [data, usersData, coursesData]);

  const columns: any = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "userName", headerName: "Name", flex: isDashboard ? 0.6 : 0.5 },
    ...(isDashboard
      ? []
      : [
          { field: "userEmail", headerName: "Email", flex: 1 },
          { field: "title", headerName: "Course Title", flex: 1 },
        ]),
    { field: "price", headerName: "Price", flex: 0.5 },
    ...(isDashboard
      ? [{ field: "created_at", headerName: "Created At", flex: 0.5 }]
      : [
          {
            field: " ",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => {
              return (
                <a href={`mailto:${params.row.userEmail}`}>
                  <AiOutlineMail
                    className="dark:text-white text-black"
                    size={20}
                  />
                </a>
              );
            },
          },
        ]),
  ];

  const rows: any = [
    {
        id: "11234e344555243",
        userName: "Rishabh Aggarwal",
        userEmail: "Rishabhaggarwal@gmail.com",
        title: "React",
        price: "$200",
        created_at: "2 days ago"
    },
    {
        id: "22345e689543245",
        userName: "John Doe",
        userEmail: "johndoe@example.com",
        title: "Angular",
        price: "$250",
        created_at: "1 day ago"
    },
    {
        id: "33456e785432123",
        userName: "Alice Smith",
        userEmail: "alice.smith@example.com",
        title: "Vue.js",
        price: "$180",
        created_at: "3 days ago"
    },
    {
        id: "44567e987654321",
        userName: "Emily Johnson",
        userEmail: "emily.johnson@example.com",
        title: "Node.js",
        price: "$220",
        created_at: "5 days ago"
    },
    {
        id: "55678e234567890",
        userName: "Michael Brown",
        userEmail: "michael.brown@example.com",
        title: "Express.js",
        price: "$190",
        created_at: "4 days ago"
    },
    {
        id: "66789e678954321",
        userName: "Sophia Garcia",
        userEmail: "sophia.garcia@example.com",
        title: "MongoDB",
        price: "$270",
        created_at: "6 days ago"
    },
    {
        id: "77890e765432198",
        userName: "William Taylor",
        userEmail: "william.taylor@example.com",
        title: "Python",
        price: "$300",
        created_at: "7 days ago"
    },
    {
        id: "88901e876543290",
        userName: "Emma Martinez",
        userEmail: "emma.martinez@example.com",
        title: "Django",
        price: "$280",
        created_at: "8 days ago"
    },
    {
        id: "99012e987654321",
        userName: "James Wilson",
        userEmail: "james.wilson@example.com",
        title: "Flutter",
        price: "$320",
        created_at: "9 days ago"
    },
    {
        id: "10123e876543290",
        userName: "Olivia Lee",
        userEmail: "olivia.lee@example.com",
        title: "Java",
        price: "$270",
        created_at: "10 days ago"
    },
    // Additional rows
    {
        id: "11234e344555244",
        userName: "Sarah Johnson",
        userEmail: "sarah.johnson@example.com",
        title: "HTML",
        price: "$150",
        created_at: "11 days ago"
    },
    {
        id: "22345e689543246",
        userName: "Daniel Smith",
        userEmail: "daniel.smith@example.com",
        title: "CSS",
        price: "$170",
        created_at: "12 days ago"
    },
    {
        id: "33456e785432124",
        userName: "Sophie Brown",
        userEmail: "sophie.brown@example.com",
        title: "JavaScript",
        price: "$230",
        created_at: "13 days ago"
    },
    {
        id: "44567e987654322",
        userName: "Matthew Wilson",
        userEmail: "matthew.wilson@example.com",
        title: "React Native",
        price: "$280",
        created_at: "14 days ago"
    },
    {
        id: "55678e234567891",
        userName: "Isabella Martinez",
        userEmail: "isabella.martinez@example.com",
        title: "Python Django",
        price: "$350",
        created_at: "15 days ago"
    }
];


orderData &&
orderData.forEach((item: any) => {
rows.push({
id: item._id,
userName: item. userName,
userEmail: item.userEmail,
title: item.title,
price: item.price,
created_at: format (item. createdAt),
});
});


  return <div className={!isDashboard ? 'mt-[120px]' : 'mt-[px]'}>
  {isLoading ? (
    <Loader />
  ) : (
    <Box m={isDashboard ? "0" : "40px"}>
      <Box
        m={isDashboard ? "0" : "40px 0 0 0"}
        height={isDashboard ? "35vh" : "90vh"}
        overflow={"hidden"}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            outline: "none",
          },
          "&.css-pqjvzy-MuiSvg Icon-root-MuiSelect-icon": {
            color: theme === "dark" ? "#fff" : "#000",
          },
          "& .MuiDataGrid-sortIcon": {
            color: theme === "dark" ? "#fff" : "#000",
          },
          "& .MuiDataGrid-row": {
            color: theme === "dark" ? "#fff" : "#000",
            borderBottom:
              theme === "dark"
                ? "1px solid #ffffff30!important"
                : "1px solid #ccc!important",
          },
          "& .MuiTablePagination-root": {
            color: theme === "dark" ? "#fff" : "#000",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none!important",
          },
          "& .name-column--cell": {
            color: theme === "dark" ? "#fff" : "#000",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
            borderBottom: "none",
            color: theme === "dark" ? "#fff" : "#000",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
          },
          "& .MuiDataGrid-footerContainer": {
            color: theme === "dark" ? "#fff" : "#000",
            borderTop: "none",
            backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
          },
          "& .MuiCheckbox-root": {
            color: theme === "dark" ? "#b7ebde" : "#000",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: "#fff",
          },
        }}
      >
        <DataGrid
          checkboxSelection={isDashboard ? false : true}
          rows={rows}
          columns={columns}
          components={isDashboard ? {} : { Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  )}
</div>
}


export default AllInvoices;
