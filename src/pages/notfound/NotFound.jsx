import { Link } from "react-router";
import { LuArrowLeft, LuCompass } from "react-icons/lu";
import iconWallet from "../../assets/wallet-icon.png";

function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full items-center overflow-hidden bg-slate-50/50 px-5 py-12 md:px-10 lg:px-20">
      {/* <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-indigo-100/50 blur-3xl" /> */}

      <section className="relative mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2 lg:gap-20">
        <div className="order-2 flex flex-col items-start md:order-1">
          <div className="inline-flex gap-2 rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
            <LuCompass size={15} />
            <span className="font-montserrat tracking-wide">
              PAGE NOT FOUND
            </span>
          </div>

          <h1 className="mt-5 font-jakarta text-7xl font-extrabold tracking-tight text-brand-primary sm:text-8xl">
            404
          </h1>
          <h2 className="mt-3 font-jakarta text-2xl font-bold text-brand-secondary sm:text-3xl">
            Halaman ini tidak ditemukan
          </h2>
          <p className="mt-3 max-w-md font-montserrat text-sm leading-relaxed text-brand-charcoal sm:text-base">
            Alamat yang Anda buka mungkin salah, sudah kedaluwarsa, atau halaman
            telah dipindahkan. Periksa kembali URL Anda.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              to="/"
              className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-brand-primary px-6 font-montserrat text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-secondary hover:shadow-xl hover:shadow-blue-500/30 active:translate-y-0"
            >
              <LuArrowLeft
                size={18}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              Kembali ke Beranda
            </Link>
          </div>
        </div>

        <div className="order-1 hidden md:flex items-center justify-center md:order-2">
          <div className="relative flex aspect-square w-full max-w-md items-center justify-center rounded-3xl border border-slate-100 bg-white/80 p-8 shadow-xl shadow-slate-200/50 backdrop-blur-xl transition-transform duration-500 hover:scale-[1.02]">
            <div className="absolute left-8 top-8 h-2.5 w-20 rounded-full bg-linear-to-r from-blue-600 to-indigo-500" />

            <div className="flex h-44 w-44 items-center justify-center rounded-3xl bg-linear-to-br from-brand-primary to-blue-700 text-white shadow-inner sm:h-52 sm:w-52">
              <img
                src={iconWallet}
                alt="Worker Wallet Icon"
                className="h-40 w-40 object-contain drop-shadow-md sm:h-28 sm:w-28"
              />
            </div>

            <div className="absolute bottom-8 right-8 flex items-center gap-2 rounded-2xl bg-blue-50/90 px-4 py-2.5 font-jakarta text-xs font-bold text-blue-900 shadow-md ring-1 ring-blue-900/5 backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-600" />
              Worker Wallet
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NotFound;
