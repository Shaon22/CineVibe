import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MyContext } from "../../authProvider/AuthProvider";
import type { UserCredential } from "firebase/auth";
import { Home } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface MyContextType {
  createUser: (email: string, password: string) => Promise<UserCredential>;
  updateUserProfile: (name: string, photo: string) => Promise<void>;
}

const Register: React.FC = () => {
  // use non-null assertion (!) because we know AuthProvider wraps the app
  const { createUser, updateUserProfile } = useContext(MyContext)! as MyContextType;
  const location = useLocation();
  const navigate = useNavigate();

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();
  const password = watch("password");

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const { name, email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    createUser(email, password)
      .then((result) => {
        // Pass empty string for photo if not available
        updateUserProfile(name, "")
          .then(() => {
            console.log(result.user);
            console.log("User profile updated successfully.");
            navigate(location?.state || "/");
          })
          .catch((profileUpdateError) => {
            console.error("Error updating user profile:", profileUpdateError);
            toast.error(
              "Registration successful, but failed to update profile. Please try logging in."
            );
          });
      })
      .catch((error) => {
        console.error("Registration Error:", error);
        let errorMessage = "An unknown error occurred during registration. Please try again.";

        if (error.code === "auth/email-already-in-use") {
          errorMessage =
            "This email is already registered. Please try logging in or use a different email.";
        } else if (error.code === "auth/weak-password") {
          errorMessage = "Password is too weak. Please choose a stronger password.";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "Invalid email address format.";
        } else if (error.message) {
          errorMessage = error.message;
        }
        toast.error(errorMessage);
      });
  };

  return (
    <div className="register h-screen bg-no-repeat bg-cover bg-center">
      <Link to={"/"}>
        <button className="p-5">
          <Home className="text-2xl text-white sm:text-4xl" />
        </button>
      </Link>
      <div className=" w-[40%] mx-auto bg-black/25 rounded text-white" >
        <div className="w-[80%] mx-auto p-10">
          <h1 className="text-lg sm:text-2xl mb-10 font-bold text-center text-white">
            Register Your Account
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto space-y-5">
            <input
              {...register("name", { required: true })}
              className="w-full p-2 font-semibold outline-none rounded border-2 border-gray-200 text-gray-200 pr-10"
              placeholder="Name"
              type="text"
            />
            {errors.name && <span className="text-red-500">Name is required</span>}

            <input
              {...register("email", { required: true })}
              className="w-full p-2 font-semibold outline-none rounded border-2 border-gray-200 text-gray-200 pr-10"
              placeholder="Email"
              type="email"
            />
            {errors.email && <span className="text-red-500">Email is required</span>}

            {/* Password Field */}
            <div className="relative">
              <input
                className="w-full p-2 font-semibold outline-none rounded border-2 border-gray-200 text-gray-200 pr-10"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value: /(?=.*[A-Z])/,
                    message: "Password must contain at least one uppercase letter.",
                  },
                })}
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}

            {/* Confirm Password Field */}
            <div className="relative">
              <input
                className="w-full p-2 font-semibold outline-none rounded border-2 border-gray-200 text-gray-200 pr-10"
                placeholder="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match.",
                })}
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-white"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.confirmPassword && (
              <span className="text-red-500">{errors.confirmPassword.message}</span>
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
                value="REGISTER"
              />
            </div>
          </form>
          <hr className="my-5" />
          <button className="px-6 py-3 
  bg-white/20 
  backdrop-blur-md 
  border border-white/30 
  shadow-lg 
  hover:bg-white/30 
  transitionpy-2 rounded w-full  border-none text-white font-bold  flex justify-center items-center gap-2">
            SIGN UP WITH <FcGoogle className="text-xl" />
          </button>
          <h1 className="text-white m-5 text-center">
            Already Have an account?{" "}
            <Link to={"/login"} className="text-blue-500 text-lg font-bold">
              Login
            </Link>
          </h1>
        </div>
      </div>
      <ToastContainer />
     
    </div>
  );
};

export default Register;
