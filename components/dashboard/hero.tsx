import Image from "next/image";

const features = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-5 h-5"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Berlaku selamanya",
    desc: "Tanpa biaya tambahan",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-5 h-5"
      >
        <path d="M8 12h8M12 8l4 4-4 4" />
        <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0" />
      </svg>
    ),
    title: "Link tamu unlimited",
    desc: "Undang tanpa batas",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-5 h-5"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: "Tanpa watermark",
    desc: "Hasil undangan bersih",
  },
];

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden rounded-2xl bg-[#F9F3F2] border-border-sidebar border-2">
      <div
        style={{
          position: "absolute",
          width: "1297px",
          height: "911px",
          top: "-304px",
          left: "-209px",
          borderRadius: "50%",
          background: "#F9F3F2",
          filter: "blur(80px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div className="flex flex-col md:flex-row items-stretch min-h-[260px]">
        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-center px-8 py-10 md:py-12 md:pl-10 md:pr-6 z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 self-start mb-5 px-3 py-1.5 rounded-full border border-[#e8c9bf] bg-bg-pink backdrop-blur-sm">
            <Image
              src={"/icons/sparkles.png"}
              alt="sparkles"
              width={16}
              height={16}
            />
            <span className="text-xl text-pink-primary font-medium tracking-wide">
              Buat momen spesial jadi lebih berkesan
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-5xl leading-[1.15] font-light text-[#0A0A0A] mb-1 font-playfair">
            Buat Undangan Digital
          </h1>
          <h2 className="text-5xl md:text-5xl leading-[1.15] font-light text-pink-2 mb-4 font-playfair">
            dengan Mudah
          </h2>

          {/* Description */}
          <p className="text-sm text-[#6b6b6b] leading-relaxed max-w-sm mb-8">
            Pilih template favorit, isi detail acara, tambahkan tamu, dan
            bagikan undangan digital dalam hitungan menit
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {features.map((f) => (
              <div key={f.title} className="flex items-center gap-2.5">
                <span className="text-[#c47e6e]">{f.icon}</span>
                <div>
                  <p className="text-lg font-medium text-[#1a1a1a]">
                    {f.title}
                  </p>
                  <p className="text-lg text-[#737373]">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* RIGHT IMAGE */}
       <div className="relative w-full md:w-[50%] min-h-[200px] md:min-h-0 z-10">
          {/* IMAGE */}
          <img
            src="/images/hero-dashboard.png"
            alt="Wedding Couple"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* ELLIPSE EFFECT */}
          <div className="absolute left-[-100px] top-[-50px] h-[520px] w-[320px] -translate-y-1/2 rounded-full bg-[#f5efeb] blur-3xl" />

          {/* SOFT FADE */}
          <div className="absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-[#f5efeb] to-transparent" />
        </div>
      </div>
    </section>
  );
}
