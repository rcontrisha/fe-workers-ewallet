import { Link} from "react-router";
import { FiCheckCircle, FiRepeat, FiHome } from "react-icons/fi";
import { BsWindowPlus } from "react-icons/bs";

function TopUpSummary({
  amount,
  paymentMethod,
  currentDate,
  transactionId,
  status,
}) {

  const formattedAmount = `Rp ${Number(amount).toLocaleString("id-ID")}`;

  return (
    <div className="mx-auto flex min-h-screen w-full flex-col bg-white">
      <header className="bg-brand-primary p-4 text-white h-14 flex items-center shrink-0 lg:hidden font-medium">
        Top Up Summary
      </header>

      <main className="flex-1 bg-white p-4 sm:p-6 lg:px-10 lg:py-7">
        <div className="mb-6 hidden lg:block">
          <div className="flex items-center gap-3">
            <BsWindowPlus size={20} className="text-blue-600" />
            <h2 className="text-lg font-bold font-montserrat text-brand-secondary">
              Top Up Account
            </h2>
          </div>
        </div>
        <div className="w-full rounded-xl border border-gray-200 bg-white p-4 lg:p-8 shadow-sm">
          <div className="flex flex-col items-center text-center border-b border-gray-200 pb-6">
            <FiCheckCircle size={52} className="text-emerald-500" />
            <h3 className="mt-3 text-xl font-bold text-brand-secondary">
              Top Up Success
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Your top up transaction has been completed successfully
            </p>
            <p className="mt-6 text-xs font-medium text-gray-400">Total Top Up</p>
            <p className="mt-1 max-w-full wrap-break-word text-center text-2xl font-extrabold text-brand-secondary sm:text-3xl">
              {formattedAmount}
            </p>
          </div>
          <div className="mx-auto mt-6 grid w-full max-w-150 gap-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3.5">
              <span className="text-xs sm:text-sm text-gray-500">Source / Payment</span>
              <div className="text-right">
                <p className="text-xs sm:text-sm font-semibold text-brand-secondary">
                  {paymentMethod}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-3.5">
              <span className="text-xs sm:text-sm text-gray-500">Destination</span>
              <div className="text-right">
                <p className="text-xs sm:text-sm font-semibold text-brand-secondary">
                  E-Wallet Balance
                </p>
                <p className="text-[11px] text-gray-400">0812-3456-7890</p>
              </div>
            </div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-3.5">
              <span className="text-xs sm:text-sm text-gray-500">Date & Time</span>
              <p className="text-xs sm:text-sm font-semibold text-brand-secondary">
                {currentDate}
              </p>
            </div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-3.5">
              <span className="text-xs sm:text-sm text-gray-500">Transaction ID</span>
              <p className="text-xs sm:text-sm font-semibold text-brand-secondary font-mono">
                {transactionId}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-gray-500">Status</span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                {status}
              </span>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:justify-center">
            <button
              type="button"
              className="flex h-11 w-full lg:w-1/2 items-center justify-center gap-4 rounded-lg bg-brand-primary text-sm font-medium text-white hover:opacity-90 transition-opacity"
            >
              <FiRepeat size={16} />
              <Link to="/top-up" className="">
                Top Up Again
              </Link>
            </button>
            <button
              type="button"
              className="flex h-11 w-full lg:w-1/2 items-center justify-center gap-4 rounded-lg border border-brand-primary bg-white text-sm font-medium text-brand-primary hover:bg-brand-primary/5 transition-colors"
            >
              <FiHome size={16} />
              <Link to="/dashboard" >
                Back To Dashboard
              </Link>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TopUpSummary;