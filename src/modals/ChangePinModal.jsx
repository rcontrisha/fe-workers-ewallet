import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { changePin, setPin } from "../redux/slice/userSlice";

function ChangePinModal({ isShowModal, setIsShowModal, mode = "change" }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.securityLoading);
  const [pin, setPinDigits] = useState(new Array(6).fill(""));
  const [errPin, setErrPin] = useState("");
  const [requestError, setRequestError] = useState("");

  const handleChange = (e, idx) => {
    if (isNaN(e.target.value)) return false;
    setErrPin("");
    setPinDigits((prev) =>
      prev.map((data, id) => (id === idx ? e.target.value : data)),
    );
    if (e.target.value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };
  const handleErase = (e, idx) => {
    if (e.key === "Backspace" && !pin[idx] && idx > 0) {
      e.target.previousSibling.focus();
    }
  };

  const handleSubmitPin = async (e) => {
    e.preventDefault();
    if (pin.some((val) => val === "")) {
      setErrPin("PIN must have 6 digits");
      return;
    }
    const pinValue = pin.join("");

    setRequestError("");
    try {
      await dispatch(
        mode === "set" ? setPin(pinValue) : changePin(pinValue),
      ).unwrap();
      toast.success(
        mode === "set" ? "PIN berhasil dibuat." : "PIN berhasil diubah.",
      );
      setPinDigits(new Array(6).fill(""));
      setIsShowModal(false);
    } catch (error) {
      setRequestError(error || "Gagal menyimpan PIN.");
    }
  };

  const handleCloseModal = () => {
    setErrPin("");
    setRequestError("");
    setPinDigits(new Array(6).fill(""));
    setIsShowModal(false);
  };

  if (!isShowModal) return null;
  return (
    <div
      onClick={handleCloseModal}
      className="w-screen h-screen fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm
    rounded-2xl bg-white p-5
    sm:max-w-md sm:p-6
    lg:max-w-3xl lg:p-8
  "
      >
        <h1 className="text-2xl font-semibold text-center">
          {mode === "set" ? "Set PIN" : "Change PIN"}
        </h1>
        <p className="mt-2 text-sm text-gray-500 text-center">
          Please save your pin because this so important.
        </p>

        <form
          onSubmit={handleSubmitPin}
          className="mt-8 flex w-full flex-col gap-5 sm:mt-10"
        >
          <div className="mx-auto flex w-full max-w-xs justify-between gap-2 sm:gap-3">
            {pin.map((data, idx) => (
              <input
                key={idx}
                className="
          h-10 min-w-0 flex-1
          border-b-2 border-gray-300
          text-center text-2xl font-medium
          outline-none focus:border-brand-background
        "
                type="text"
                inputMode="numeric"
                value={data}
                maxLength={1}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleErase(e, idx)}
              />
            ))}
          </div>

          <p className="min-h-5 text-center text-sm text-red-500">{errPin}</p>
          {requestError && (
            <p role="alert" className="text-center text-sm text-red-500">
              {requestError}
            </p>
          )}

          <div className="flex gap-3 sm:gap-2">
            <button
              onClick={handleCloseModal}
              type="button"
              className="w-full rounded-md border border-brand-background px-4 py-3 text-brand-background sm:flex-1 cursor-pointer hover:bg-blue-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-brand-background px-4 py-3 text-white sm:flex-1 cursor-pointer hover:bg-slate-600 disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePinModal;
