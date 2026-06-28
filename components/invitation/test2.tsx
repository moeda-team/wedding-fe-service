import Image from "next/image";
import { useEffect, useState } from "react";

export default function TestPage() {
  return (
    <main className="bg-[#14070B] text-white overflow-x-hidden">
      <Hero />
      <Couple />
      <Story />
      <Event />
      <Countdown />
      <RSVP />
      <Gallery />
      <Footer />
    </main>
  );
}

const images = [
  "/images/template-1.png",
  "/images/template-2.png",
  "/images/template-3.png",
  "/images/template-4.png",
  "/images/template-5.png",
  "/images/template-6.png",
];

function Gallery() {
  return (
    <section className="py-32">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-center text-[#C8A062] text-5xl font-serif mb-16">
          Captured Moments
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {images.map((img) => (
            <Image
              key={img}
              src={img}
              alt=""
              width={500}
              height={500}
              className="aspect-square object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section className="min-h-screen flex items-center">
      <div className="container mx-auto px-6 lg:px-20 grid lg:grid-cols-2 gap-10">
        <div>
          <span className="text-[#C8A062] uppercase tracking-[4px]">
            Wedding Invitation
          </span>

          <h1 className="font-serif text-5xl lg:text-7xl mt-6 text-[#C8A062]">
            Olivia & Ethan's
            <br />
            Wedding Celebration
          </h1>

          <p className="text-gray-400 mt-8 max-w-md">
            Join us as we celebrate love, commitment, and the beginning of a
            beautiful journey.
          </p>

          <div className="mt-12 text-8xl text-white/10 font-bold">
            26 • 12 • 2026
          </div>
        </div>

        <div className="relative">
          <Image
            src="/hero.jpg"
            alt=""
            width={700}
            height={900}
            className="rounded-md object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function Couple() {
  return (
    <section className="py-32">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-center text-[#C8A062] text-5xl font-serif mb-20">
          Meet The Couple
        </h2>

        <div className="space-y-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-6xl font-serif text-[#C8A062]">Olivia</h3>

              <p className="mt-6 text-gray-400 leading-8">
                A dreamer, creator, and believer in timeless love stories.
              </p>
            </div>

            <Image
              src="/bride.jpg"
              alt=""
              width={450}
              height={600}
              className="mx-auto"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Image
              src="/groom.jpg"
              alt=""
              width={450}
              height={600}
              className="mx-auto order-2 lg:order-1"
            />

            <div className="order-1 lg:order-2">
              <h3 className="text-6xl font-serif text-[#C8A062]">Ethan</h3>

              <p className="mt-6 text-gray-400 leading-8">
                A passionate soul whose kindness lights every room.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="py-32">
      <div className="container mx-auto px-6 lg:px-20">
        <p className="text-center text-[#C8A062] uppercase tracking-[4px]">
          The Story of Us
        </p>

        <div className="grid lg:grid-cols-2 gap-16 mt-16 items-center">
          <Image src="/story.jpg" alt="" width={700} height={450} />

          <div>
            <h2 className="font-serif text-5xl text-white">
              Love Written In Time
            </h2>

            <div className="space-y-8 mt-10">
              <div>
                <h3 className="text-[#C8A062]">Where Our Eyes First Met</h3>
                <p className="text-gray-400 mt-2">
                  Every great story begins with a glance.
                </p>
              </div>

              <div>
                <h3 className="text-[#C8A062]">The Sweetest "Yes"</h3>
                <p className="text-gray-400 mt-2">A promise for forever.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Event() {
  return (
    <section className="py-32">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="font-serif text-[#C8A062] text-5xl mb-16">
          Where Love Meets Forever
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="border border-[#C8A062]/30 p-8">
            <h3 className="text-[#C8A062] text-2xl">Ceremony</h3>

            <p className="mt-6 text-gray-400">Saturday, December 26, 2026</p>

            <p className="mt-2 text-gray-400">St. Patrick Cathedral</p>
          </div>

          <div className="border border-[#C8A062]/30 p-8">
            <h3 className="text-[#C8A062] text-2xl">Reception</h3>

            <p className="mt-6 text-gray-400">Grand Ballroom</p>

            <p className="mt-2 text-gray-400">18:00 WIB</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Countdown() {
  const target = new Date("2026-12-26");

  const [days, setDays] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = target.getTime() - Date.now();
      setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 text-center">
      <p className="uppercase tracking-[4px] text-[#C8A062]">
        Counting The Days
      </p>

      <h2 className="font-serif text-5xl mt-8">
        Every Second Brings Us Closer
      </h2>

      <div className="mt-16 text-8xl font-bold text-[#C8A062]">{days}</div>
    </section>
  );
}

function RSVP() {
  return (
    <section className="py-32">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-center font-serif text-[#C8A062] text-5xl">
          RSVP Now
        </h2>

        <form className="mt-16 space-y-6">
          <input
            placeholder="Full Name"
            className="w-full bg-[#1A0A0F] border border-[#C8A062]/20 p-4"
          />

          <input
            placeholder="Email"
            className="w-full bg-[#1A0A0F] border border-[#C8A062]/20 p-4"
          />

          <textarea
            placeholder="Message"
            rows={5}
            className="w-full bg-[#1A0A0F] border border-[#C8A062]/20 p-4"
          />

          <button className="w-full bg-[#C8A062] text-black py-4 font-semibold">
            Confirm Attendance
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#C8A062]/20 py-10 text-center">
      <h3 className="font-serif text-4xl text-[#C8A062]">Olivia & Ethan</h3>

      <p className="text-gray-500 mt-4">Thank you for celebrating with us.</p>
    </footer>
  );
}
