import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import walletIcon from "../../assets/wallet-icon.png";
import { IoMailOutline, IoLockClosedOutline } from "react-icons/io5";
import { sendResetLink, resetPassword } from "../../redux/slice/authSlice";

function ForgotPass() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const { loading } = useSelector((state) => state.auth);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handler Kirim Link Reset (Tahap 1)
  const handleSendLink = (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    dispatch(sendResetLink({ email }))
      .unwrap()
      .then((res) => {
        toast.success(res?.message || "Link reset password berhasil dikirim ke email!");
      })
      .catch((err) => {
        toast.error(err || "Gagal mengirim link reset password");
      });
  };

  // Handler Submit Password Baru (Tahap 2)
  const handleResetPassword = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password dan konfirmasi password tidak cocok!");
      return;
    }

    dispatch(resetPassword({ token, password }))
      .unwrap()
      .then((res) => {
        toast.success(res?.message || "Password berhasil diperbarui! Silakan login.");
        navigate("/auth");
      })
      .catch((err) => {
        toast.error(err || "Gagal memperbarui password");
      });
  };

  return (
    <main className="w-full min-h-screen flex justify-center items-center bg-brand-primary">
      <section className="w-full md:w-120 h-full px-4">
        <form
          className="w-full min-h-100 rounded-3xl flex flex-col justify-between bg-gray-200 px-5 py-10"
          onSubmit={token ? handleResetPassword : handleSendLink}
        >
          {/* Header */}
          <div className="flex gap-2 items-center">
            <img src={walletIcon} alt="e-wallet icon workers" width={30} />
            <h1 className="text-blue-600 text-[20px] md:text-base font-medium">
              E-Wallet
            </h1>
          </div>

          <h2 className="text-[18px] md:text-2xl font-medium mt-4">
            {token ? "Reset Your Password 🔐" : "Fill Out Form Correctly 👋"}
          </h2>

          <p className="text-brand-charcoal font-montserrat text-xs md:text-sm my-2">
            {token
              ? "Please enter your new password below."
              : "We will send new password link to your email."}
          </p>

          <div className="grid gap-3 my-4">
            {!token ? (
              // TAHAP 1: FORM EMAIL
              <div>
                <label htmlFor="email" className="font-medium text-sm">
                  Email
                </label>
                <div className="relative mt-1">
                  <IoMailOutline className="absolute top-4 left-3 text-md text-gray-700" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full h-12 border rounded-md border-gray-300 pl-10 pr-4 placeholder:text-sm focus:outline-blue-500 bg-white"
                    placeholder="Enter Your Email"
                  />
                </div>
              </div>
            ) : (
              // TAHAP 2: FORM NEW PASSWORD
              <>
                <div>
                  <label htmlFor="password" className="font-medium text-sm">
                    New Password
                  </label>
                  <div className="relative mt-1">
                    <IoLockClosedOutline className="absolute top-4 left-3 text-md text-gray-700" />
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-12 border rounded-md border-gray-300 pl-10 pr-4 placeholder:text-sm focus:outline-blue-500 bg-white"
                      placeholder="Enter New Password"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="font-medium text-sm">
                    Confirm Password
                  </label>
                  <div className="relative mt-1">
                    <IoLockClosedOutline className="absolute top-4 left-3 text-md text-gray-700" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full h-12 border rounded-md border-gray-300 pl-10 pr-4 placeholder:text-sm focus:outline-blue-500 bg-white"
                      placeholder="Confirm New Password"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-md text-white bg-blue-600 hover:bg-blue-700 font-semibold cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading
              ? "Processing..."
              : token
              ? "Update Password"
              : "Submit"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default ForgotPass;