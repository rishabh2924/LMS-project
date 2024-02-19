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
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
  password: Yup.string()
    .required("please enter your password")
    .min(6, "minimum 6 characters"),
});

const Login: React.FC<Props> = ({setRoute}) => {
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      console.log(email, password);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className="w-full ">
      <h1 className={`${styles.title}`}>Login with ECademy</h1>
      <form onSubmit={handleSubmit}>
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
        <div className="w-full mt-5 relative mb-1">
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
            <input type="submit" value="Login" className={`${styles.button}`} />
        </div>
        <br />
        <h5 className="text-center pt-0 font-Poppins text-sm text-black dark:text-white">
            Or join with
        </h5>
        <div className="flex items-center justify-center my-3">
            <FcGoogle size={25} className="cursor-pointer mx-2"/>
            <AiFillGithub  size={25} className="cursor-pointer mx-2 dark:bg-white rounded-full"/>
        </div>
        <h5 className="text-center pt-3 font-Poppins text-sm text-black dark:text-white">
            Not have any account?
            <span className="text-[#2190ff] ml-1 cursor-pointer" onClick={() => setRoute("sign-up")}>Sign-up</span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default Login;
