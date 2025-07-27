import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MyContext } from "../../authProvider/AuthProvider";
import { Home } from "lucide-react";

interface LoginFormInputs {
  email: string;
  password: string;
}

interface AuthContextType {
  signIn: (email: string, password: string) => Promise<unknown>;
  googleLogin: () => Promise<unknown>;
}

const Login: React.FC = () => {
  const { signIn, googleLogin } = useContext(MyContext) as AuthContextType;

  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    const { email, password } = data;
    signIn(email, password)
      .then(() => {
        toast.success("Login Successful!");
        navigate((location.state as string) || "/");
      })
      .catch((error: any) => {
        console.error("Login Error:", error);
        let errorMessage = "An unknown error occurred. Please try again.";

        if (error.code === "auth/invalid-email") {
          errorMessage = "Invalid email address.";
        } else if (error.code === "auth/user-disabled") {
          errorMessage = "This account has been disabled.";
        } else if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password" ||
          error.code === "auth/invalid-credential"
        ) {
          errorMessage = "Invalid email or password.";
        } else if (error.message) {
          errorMessage = error.message;
        }

        toast.error(errorMessage);
      });
  };

  const handleGoogle = () => {
    googleLogin()
      .then(() => {
        toast.success("Google Login Successful!");
        navigate((location.state as string) || "/");
      })
      .catch((error: any) => {
        console.error("Google Login Error:", error);
        let errorMessage = "Google login failed. Please try again.";
        if (error.message) {
          errorMessage = error.message;
        }
        toast.error(errorMessage);
      });
  };

  return (
    <div className="login h-screen w-full">
      <Link to={"/"}>
        <button className="p-5">
          <Home className="text-2xl sm:text-4xl text-white" />
        </button>
      </Link>
      <div className="mt-24 w-[40%] mx-auto bg-black/25 rounded text-white ">
        <div className="w-[80%] mx-auto p-10">
          <h1 className="text-lg sm:text-2xl mb-10 font-bold text-center text-white">
            Login Now
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto space-y-5">
            <input
              {...register("email", { required: true })}
              className="w-full p-2 font-semibold outline-none rounded  border-2 border-gray-200 text-gray-200"
              placeholder="Email"
              type="email"
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}

            <div className="relative">
              <input
                className="w-full p-2 font-semibold outline-none rounded border-2 border-gray-200 text-gray-200 pr-10"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "field is required",
                  minLength: {
                    value: 6,
                    message: "Password must be 6 character",
                  },
                  pattern: {
                    value: /[A-Z]/,
                    message: "Please provide at least one uppercase character ",
                  },
                })}
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}

            <div className="text-center">
              <input
                className="bg-white/20 
  backdrop-blur-md 
  border border-white/30 
  shadow-lg 
  hover:bg-white/30 
  transitionpy-2 py-2 rounded w-full border-none text-white font-bold "
                type="submit"
                value="LOG IN"
              />
            </div>
          </form>
          <hr className="my-5" />
          <button
            onClick={handleGoogle}
            className=" px-6 py-3 
  bg-white/20 
  backdrop-blur-md 
  border border-white/30 
  shadow-lg 
  hover:bg-white/30 
  transitionpy-2 rounded w-full  border-none text-white font-bold  flex justify-center items-center gap-2"
          >
            SIGN IN WITH <FcGoogle className="text-xl" />
          </button>
          <h1 className="text-white m-5 text-center">
            Dont Have any account?{" "}
            <Link to={"/register"} className="text-blue-500 text-lg font-bold">
              Register
            </Link>
          </h1>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
