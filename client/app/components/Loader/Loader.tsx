
import React from "react";

import { CircularProgress } from "@mui/material";

type Props = {};

const Loader = (props: Props) => {
  return (
    <div className="flex items-center justify-center  h-screen">

           <CircularProgress/>
    </div>
  );
};

export default Loader;
