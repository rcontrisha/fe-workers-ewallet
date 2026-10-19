import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";

const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const payloadPart = token.split(".")[1];
    if (!payloadPart) return true;

    const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    const paddedBase64 = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const binaryPayload = atob(paddedBase64);
    const payloadBytes = Uint8Array.from(binaryPayload, (character) =>
      character.charCodeAt(0),
    );
    const payload = JSON.parse(new TextDecoder().decode(payloadBytes));
    ``;
    return !Number.isFinite(payload.exp) || payload.exp <= Date.now() / 1000;
  } catch {
    return true;
  }
};

function PrivateRoute({ children }) {
  const token = useSelector((state) => state.auth.token);
  const tokenExpired = isTokenExpired(token);

  useEffect(() => {
    if (token && tokenExpired) {
      toast.error("Sesi Anda telah berakhir. Silakan login kembali.", {
        position: "top-right",
        autoClose: 3000,
        toastId: "session-expired",
      });
    }
  }, [token, tokenExpired]);

  if (!token || tokenExpired) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;
