import { BadgeCheck, Infinity } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: <BadgeCheck size={26}></BadgeCheck>,
    title: "Berlaku selamanya",
    desc: "Tanpa biaya tambahan",
  },
  {
    icon: <Infinity size={26}></Infinity>,
    title: "Link tamu unlimited",
    desc: "Undang tanpa batas",
  },
  {
    icon: <Infinity size={26}></Infinity>,
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
                <span className="text-pink-primary rounded-full bg-bg-pink p-4">{f.icon}</span>
                <div>
                  <p className="text-md font-medium text-[#1a1a1a]">
                    {f.title}
                  </p>
                  <p className="text-md text-[#737373]">{f.desc}</p>
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
          <div className="absolute left-[-100px] top-[-50px] bottom-[-80px] h-[520px] w-[320px] -translate-y-1/2 rounded-full bg-[#F9F3F2] blur-3xl" />

          {/* SOFT FADE */}
          <div className="absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-[#f5efeb] to-transparent" />
        </div>
      </div>
    </section>
  );
}
