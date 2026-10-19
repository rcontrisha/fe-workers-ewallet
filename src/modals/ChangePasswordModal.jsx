import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { LuKeyRound } from "react-icons/lu";
import { changePassword } from "../redux/slice/userSlice";

const ChangePasswordModal = ({ isShowModal, setShowModal }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.securityLoading);
  const [eyeExistPass, setEyeExistPass] = useState(false);
  const [eyeNewPass, setEyeNewPass] = useState(false);
  const [eyeConfirmPass, setEyeNewConfirmPass] = useState(false);
  const [errNewPass, setErrNewPass] = useState("");
  const [errConfirmPass, setErrConfirmPass] = useState("");
  const [requestError, setRequestError] = useState("");
  const [errExistPass, setErrExistPass] = useState("");

  const minPassword = 8;
  const validateNewPassword = (value) => {
    if (!value) return "New password is required";
    if (value.length < minPassword)
      return `Password at least ${minPassword} characters`;
    return "";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const oldPassword = e.target.old_password.value;
    const newPassword = e.target.new_password.value;
    const confirmPassword = e.target.confirm_password.value;

    let hasError = false;

    setErrExistPass("");
    setErrNewPass("");
    setErrConfirmPass("");
    setRequestError("");

    if (!oldPassword) {
      setErrExistPass("Existing password is required");
      hasError = true;
    }

    const newPassError = validateNewPassword(newPassword);
    if (newPassError) {
      setErrNewPass(newPassError);
      hasError = true;
    }

    if (!confirmPassword) {
      setErrConfirmPass("Confirm password is required");
      hasError = true;
    } else if (newPassword && newPassword !== confirmPassword) {
      setErrConfirmPass("Password doesn't match");
      hasError = true;
    }

    if (hasError) return;

    try {
      await dispatch(changePassword({ oldPassword, newPassword })).unwrap();
      toast.success("Password berhasil diubah.");
      setShowModal(false);
    } catch (error) {
      setRequestError(error || "Gagal mengubah password.");
    }
  };
  if (!isShowModal) return null;
  return (
    <div
      onClick={() => setShowModal(false)}
      className="fixed inset-0 z-50 h-screen w-screen bg-black/50 flex justify-center items-center p-4"
    >
      <div
        className="w-[calc(100%-2rem)] max-w-md max-h-[90dvh] overflow-y-auto bg-white p-4 sm:p-6 rounded-xl shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <form action="" onSubmit={handleSubmit}>
          <h1 className="font-medium text-xl sm:text-2xl mb-5">
            Change Password
          </h1>
          <div className="my-3">
            <label className="font-medium" htmlFor="old_password">
              Existing Password
            </label>
            <div className="relative flex w-full mt-2">
              <LuKeyRound className="absolute top-1/2 -translate-y-1/2 left-2.5 text-gray-500" />
              <input
                className="border rounded-lg border-gray-500 w-full py-2 pl-10 pr-10 focus:outline-blue-500 outline-none"
                type={eyeExistPass ? "text" : "password"}
                name="old_password"
                id="old_password"
              />
              <div
                onClick={() => setEyeExistPass((prev) => !prev)}
                className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 cursor-pointer"
              >
                {eyeExistPass ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>
          </div>
          {errExistPass && (
            <p className="text-red-500 text-sm mt-1">{errExistPass}</p>
          )}
          <div className="my-3">
            <label className="font-medium" htmlFor="new_password">
              New Password
            </label>
            <div className="relative flex w-full mt-2">
              <LuKeyRound className="absolute top-1/2 -translate-y-1/2 left-2.5 text-gray-500" />
              <input
                className="border rounded-lg border-gray-500 w-full py-2 pl-10 pr-10 focus:outline-blue-500 outline-none"
                type={eyeNewPass ? "text" : "password"}
                name="new_password"
                id="new_password"
                onChange={(e) => {
                  if (errNewPass)
                    setErrNewPass(validateNewPassword(e.target.value));
                }}
              />
              <div
                onClick={() => setEyeNewPass((prev) => !prev)}
                className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 cursor-pointer"
              >
                {eyeNewPass ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>
            {errNewPass && (
              <p className="text-red-500 text-sm mt-1">{errNewPass}</p>
            )}
          </div>
          <div className="my-3">
            <label className="font-medium" htmlFor="confirm_password">
              Confirm Password
            </label>
            <div className="relative flex w-full mt-2">
              <LuKeyRound className="absolute top-1/2 -translate-y-1/2 left-2.5 text-gray-500" />
              <input
                className="border rounded-lg border-gray-500 w-full py-2 pl-10 pr-10 focus:outline-blue-500 outline-none"
                type={eyeConfirmPass ? "text" : "password"}
                name="confirm_password"
                id="confirm_password"
              />
              <div
                onClick={() => setEyeNewConfirmPass((prev) => !prev)}
                className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 cursor-pointer"
              >
                {eyeConfirmPass ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>
            {errConfirmPass && (
              <p className="text-red-500 text-sm mt-1">{errConfirmPass}</p>
            )}
            {requestError && (
              <p role="alert" className="text-red-500 text-sm mt-1">
                {requestError}
              </p>
            )}
          </div>
          <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
            <button
              onClick={() => setShowModal(false)}
              type="button"
              className="w-full rounded-md border border-brand-background px-4 py-3 text-brand-background cursor-pointer hover:bg-blue-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-brand-background px-4 py-3 text-white cursor-pointer hover:bg-slate-600 disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
