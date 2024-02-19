import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../styles/style";

type Props = {
  setRoute: (route: string) => void;
};
const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
  password: Yup.string()
    .required("please enter your password")
    .min(6, "minimum 6 characters"),
});

const SignUp: React.FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: {name:"", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      setRoute("verification");
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className="w-full ">
      
      <h1 className={`${styles.title}`}>Sign-up with ECademy</h1>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
        <label htmlFor="email" className={`${styles.label} `}>
          Enter your Name
        </label>
        <input
          type="name"
          name=""
          value={values.name}
          onChange={handleChange}
          id="name"
          placeholder="johndoe"
          className={`${errors.name && touched.name && "border-red-500"} ${
            styles.input
          }`}
        />
        {errors.name && touched.name && (
          <span className="text-red-500 pt-2 block">{errors.name}</span>
        )}
        </div>
        <label htmlFor="email" className={`${styles.label} `}>
          Enter your Email
        </label>
        <input
          type="email"
          name=""
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="loginmail@gmail.com"
          className={`${errors.email && touched.email && "border-red-500"} ${
            styles.input
          }`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}
        <div className="w-full mt-3 relative mb-1">
          <label htmlFor="password" className={`${styles.label} `}>
            Enter your password
          </label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="password!@%"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input}`}
          />
          {errors.password && touched.password && (
            <span className="text-red-500 pt-2 block">{errors.password}</span>
          )}
        </div>
        <div className="w-full mt-5">
          <input type="submit" value="Sign-up" className={`${styles.button}`} />
        </div>
        <br />
        <h5 className="text-center pt-0 font-Poppins text-sm text-black dark:text-white">
          Or join with
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle size={25} className="cursor-pointer mx-2" />
          <AiFillGithub
            size={25}
            className="cursor-pointer mx-2 dark:bg-white rounded-full"
          />
        </div>
        <h5 className="text-center pt-3 font-Poppins text-sm text-black dark:text-white">
          Not have any account?
          <span
            className="text-[#2190ff] ml-1 cursor-pointer"
            onClick={() => setRoute("Login")}
          >
            Login
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default SignUp;
