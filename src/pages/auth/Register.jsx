import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import {
  IoEyeOffOutline,
  IoEyeOutline,
  IoKeypad,
  IoMailOutline,
} from "react-icons/io5";
import walletIcon from "../../assets/wallet-icon.png";
import handWalletIcon from "../../assets/hand-icon-wallet.png";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetAuthState } from "../../redux/slice/authSlice";
import { toast } from "react-toastify";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(resetAuthState());
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  const onSubmit = async (data) => {
    const { email, password, confPass } = data;

    if (password !== confPass) {
      setError("confPass", {
        type: "manual",
        message: "Password not match",
      });
      return;
    }

    const action = await dispatch(registerUser({ email, password }));

    if (registerUser.fulfilled.match(action)) {
      toast.dismiss();
      toast.success(action.payload?.message || "Register Berhasil!", {
        position: "top-center",
        autoClose: 1000,
      });
      setTimeout(() => navigate("/auth"), 1500);
    } else if (registerUser.rejected.match(action)) {
      toast.dismiss();
      toast.error(
        action.payload || "Registrasi gagal, silakan periksa data Anda.",
        {
          position: "top-center",
          autoClose: 1000,
        },
      );
    }
  };

  return (
    <main className="w-full min-h-screen flex flex-col md:flex-row justify-center items-stretch bg-brand-secondary">
      <section className="w-full md:w-1/2 flex-1 flex flex-col justify-center gap-4 px-6 md:px-12 lg:px-16 py-8 overflow-y-auto md:rounded-tr-3xl md:rounded-br-3xl bg-brand-primary">
        <div className="grid gap-3">
          <div className="flex gap-2 items-center">
            <img src={walletIcon} alt="e-wallet icon workers" width={30} />
            <h1 className="text-blue-400 text-[20px] font-medium">E-Wallet</h1>
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-montserrat text-gray-300 leading-snug">
            Start Accessing Banking Needs With All Devices and All Platforms
            With 30.000+ Users
          </h2>
          <p className="text-gray-400 font-montserrat text-xs md:text-sm">
            Transfering money is eassier than ever, you can access Zwallet
            wherever you are. Desktop, laptop, mobile phone? we cover all of
            that for you!
          </p>
          <div className="w-full flex md:grid gap-3 mt-1">
            <div className="w-full h-12 flex-1 flex gap-3 items-center justify-center border rounded-full text-xl cursor-pointer bg-gray-50 hover:bg-gray-100">
              <FcGoogle />
              <span className="hidden md:flex font-montserrat text-sm font-medium">
                Google
              </span>
            </div>
            <div className="w-full h-12 flex-1 flex gap-3 items-center justify-center border rounded-full text-xl cursor-pointer bg-gray-50 hover:bg-gray-100">
              <FaFacebook className="text-blue-700" />
              <span className="hidden md:flex font-montserrat text-sm font-medium">
                Facebook
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 my-1">
            <hr className="w-full border-gray-200" />
            <span className="text-gray-400 font-montserrat text-xs">Or</span>
            <hr className="w-full border-gray-200" />
          </div>
        </div>

        {error && (
          <div className="p-3 text-xs text-red-300 bg-red-950/40 border border-red-500 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
          <div className="grid gap-1.5">
            <label
              htmlFor="email"
              className="font-medium font-montserrat text-sm text-gray-300"
            >
              Email
            </label>
            <div className="relative">
              <IoMailOutline className="absolute top-3.5 left-3 text-lg text-gray-700" />
              <input
                type="text"
                id="email"
                name="email"
                className="w-full h-11 border rounded-lg bg-gray-50 pl-10 pr-4 text-sm placeholder:text-sm placeholder:text-gray-400 focus:outline-blue-500 text-gray-800"
                placeholder="Enter Your Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Format email tidak valid",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-[11px]">{errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-1.5">
            <label
              htmlFor="password"
              className="font-medium font-montserrat text-sm text-gray-300"
            >
              Password
            </label>
            <div className="relative">
              <IoKeypad className="absolute top-3.5 left-3 text-lg text-gray-700" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full h-11 border rounded-lg bg-gray-50 pl-10 pr-10 text-sm placeholder:text-sm placeholder:text-gray-400 focus:outline-blue-500 text-gray-800"
                placeholder="Enter Your Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be a minimal 8 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-lg top-3.5 text-gray-500 hover:text-gray-700 cursor-pointer focus:outline-none"
              >
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-[11px]">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="grid gap-1.5">
            <label
              htmlFor="confPassword"
              className="font-medium font-montserrat text-sm text-gray-300"
            >
              Confirm Password
            </label>
            <div className="relative">
              <IoKeypad className="absolute top-3.5 left-3 text-lg text-gray-700" />
              <input
                type={showConfPassword ? "text" : "password"}
                id="confPassword"
                name="confPass"
                className="w-full h-11 border rounded-lg bg-gray-50 pl-10 pr-10 text-sm placeholder:text-sm placeholder:text-gray-400 focus:outline-blue-500 text-gray-800"
                placeholder="Enter Your Password Again"
                {...register("confPass", {
                  required: "Please confirm your password",
                  minLength: {
                    value: 8,
                    message: "Password must be a minimal 8 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfPassword(!showConfPassword)}
                className="absolute right-3.5 text-lg top-3.5 text-gray-500 hover:text-gray-700 cursor-pointer focus:outline-none"
              >
                {showConfPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </button>
            </div>
            {errors.confPass && (
              <p className="text-red-500 text-[11px]">
                {errors.confPass.message}
              </p>
            )}
          </div>
          <div className="grid text-center gap-2 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-md text-white bg-blue-600 hover:bg-blue-700 font-semibold cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sedang Mendaftar..." : "Register"}
            </button>
            <p className="text-gray-200 font-montserrat text-xs md:text-sm">
              Have an Account?{" "}
              <Link
                to="/auth"
                className="text-blue-400 cursor-pointer font-medium hover:text-blue-500"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </section>

      <section className="relative hidden md:flex md:w-1/2 bg-brand-secondary items-center justify-center p-8">
        <img
          src={handWalletIcon}
          alt="hand-wallet-icon"
          className="max-w-md w-full object-contain"
        />
        <div className="w-50 h-50 absolute top-30 right-0 rounded-full bg-white opacity-2"></div>
        <div className="w-80 h-80 absolute bottom-20 left-0 rounded-full bg-white opacity-2"></div>
      </section>
    </main>
  );
}

export default Register;
