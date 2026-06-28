import React from "react";
import Image from "next/image";

export default function WeddingLandingPage() {
  return (
    <div className="bg-[#120707] text-[#eae6df] font-serif min-h-screen selection:bg-[#c5a880] selection:text-black">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#120707]/80 backdrop-blur-md border-b border-[#2a1212] px-6 py-4 flex justify-between items-center">
        <div className="tracking-[0.2em] text-xl font-bold text-[#c5a880]">
          AMORIA
        </div>
        <div className="hidden md:flex space-x-8 text-xs uppercase tracking-widest text-[#c5a880]/80">
          <a href="#home" className="hover:text-[#c5a880] transition">
            Home
          </a>
          <a href="#story" className="hover:text-[#c5a880] transition">
            Our Story
          </a>
          <a href="#details" className="hover:text-[#c5a880] transition">
            The Big Day
          </a>
          <a href="#rsvp" className="hover:text-[#c5a880] transition">
            RSVP
          </a>
        </div>
        <button className="bg-[#c5a880] text-[#120707] px-4 py-2 text-xs uppercase tracking-widest font-semibold hover:bg-[#b3956d] transition">
          Register
        </button>
      </nav>

      {/* HERO SECTION */}
      <header
        id="home"
        className="pt-32 pb-20 px-6 max-w-5xl mx-auto text-center flex flex-col items-center"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-[#c5a880] mb-4">
          — A LOVE STORY —
        </p>
        <h1 className="text-3xl md:text-5xl tracking-wide uppercase max-w-2xl mb-8 leading-tight">
          Oliva & Ethan's Wedding Celebration
        </h1>
        <div className="relative w-72 h-48 md:w-96 md:h-64 my-6 grayscale contrast-125 opacity-80">
          {/* Ganti src dengan gambar Anda sendiri */}
          <div className="w-full h-full bg-[#2a1212] rounded-sm flex items-center justify-center text-xs italic text-gray-500">
            [Main Cover Image]
          </div>
        </div>
        <div className="text-7xl md:text-[10rem] font-sans font-bold tracking-tighter opacity-10 text-[#2a1212] select-none mt-4">
          26.10.2026
        </div>
      </header>

      <hr className="border-[#2a1212] max-w-5xl mx-auto" />

      {/* MEET THE COUPLE */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-center text-xs uppercase tracking-[0.4em] text-[#c5a880] mb-16">
          Meet the Couple
        </h2>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Bride */}
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="flex-1 text-center md:text-right order-2 md:order-1">
              <h3 className="text-2xl text-[#c5a880] tracking-wide mb-3">
                OLIVIA
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed font-sans">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ducimus
                qui, natus architecto dolorum sit, assumenda facilis excepturi
                animi.
              </p>
            </div>
            <div className="w-48 h-64 bg-[#2a1212] shrink-0 order-1 md:order-2 relative">
              [Olivia Photo]
            </div>
          </div>

          {/* Groom */}
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="w-48 h-64 bg-[#2a1212] shrink-0 relative">
              [Ethan Photo]
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl text-[#c5a880] tracking-wide mb-3">
                ETHAN
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed font-sans">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ducimus
                qui, natus architecto dolorum sit, assumenda facilis excepturi
                animi.
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-[#2a1212] max-w-5xl mx-auto" />

      {/* THE STORY OF US */}
      <section id="story" className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-center text-xs uppercase tracking-[0.4em] text-[#c5a880] mb-16">
          The Story of Us
        </h2>

        <div className="space-y-20 relative before:absolute before:inset-0 before:left-1/2 before:-ml-px before:h-full before:w-0.5 before:bg-[#2a1212] before:hidden md:before:block">
          {/* Timeline Item 1 */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
            <div className="w-full md:w-[45%] text-center md:text-right">
              <h4 className="text-xl tracking-wide mb-2">
                LOVE WRITTEN IN TIME
              </h4>
              <p className="text-xs text-gray-500 font-sans mb-3">2018</p>
              <p className="text-sm text-gray-400 font-sans">
                Where our eyes first met. An instant connection that sparked
                everything.
              </p>
            </div>
            <div className="w-24 h-24 rounded-full bg-[#2a1212] border border-[#c5a880]/30 shrink-0 flex items-center justify-center text-xs">
              [Story 1]
            </div>
            <div className="w-full md:w-[45%] hidden md:block"></div>
          </div>

          {/* Timeline Item 2 */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
            <div className="w-full md:w-[45%] hidden md:block"></div>
            <div className="w-24 h-24 rounded-full bg-[#2a1212] border border-[#c5a880]/30 shrink-0 flex items-center justify-center text-xs">
              [Story 2]
            </div>
            <div className="w-full md:w-[45%] text-center md:text-left">
              <h4 className="text-xl tracking-wide mb-2">
                THE FIRST JOURNEY TOGETHER
              </h4>
              <p className="text-xs text-gray-500 font-sans mb-3">2021</p>
              <p className="text-sm text-gray-400 font-sans">
                Our adventures began. Exploring paths and creating unforgettable
                memories side by side.
              </p>
            </div>
          </div>

          {/* Timeline Item 3 */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
            <div className="w-full md:w-[45%] text-center md:text-right">
              <h4 className="text-xl tracking-wide mb-2">THE SWEETEST "YES"</h4>
              <p className="text-xs text-gray-500 font-sans mb-3">2025</p>
              <p className="text-sm text-gray-400 font-sans">
                What began as two paths crossing has now become one journey of
                love, forever bound.
              </p>
            </div>
            <div className="w-24 h-24 rounded-full bg-[#2a1212] border border-[#c5a880]/30 shrink-0 flex items-center justify-center text-xs">
              [Story 3]
            </div>
            <div className="w-full md:w-[45%] hidden md:block"></div>
          </div>
        </div>
      </section>

      <hr className="border-[#2a1212] max-w-5xl mx-auto" />

      {/* THE BIG DAY & COUNTDOWN */}
      <section
        id="details"
        className="py-20 px-6 max-w-5xl mx-auto text-center"
      >
        <h2 className="text-xs uppercase tracking-[0.4em] text-[#c5a880] mb-4">
          The Big Day
        </h2>
        <h3 className="text-3xl tracking-wide mb-12">
          WHERE LOVE MEETS FOREVER
        </h3>

        {/* Info Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto font-sans mb-20 text-sm border border-[#2a1212] p-8 bg-[#170a0a]">
          <div>
            <p className="text-[#c5a880] uppercase tracking-wider mb-1 text-xs">
              Date & Time
            </p>
            <p className="text-gray-300">Sunday, October 26, 2026</p>
            <p className="text-gray-500 text-xs">4:00 PM onwards</p>
          </div>
          <div className="border-y md:border-y-0 md:border-x border-[#2a1212] py-4 md:py-0">
            <p className="text-[#c5a880] uppercase tracking-wider mb-1 text-xs">
              Venue
            </p>
            <p className="text-gray-300">Amoria Grand Ballroom</p>
            <p className="text-gray-500 text-xs">123 Romance Ave, LA</p>
          </div>
          <div>
            <p className="text-[#c5a880] uppercase tracking-wider mb-1 text-xs">
              Dress Code
            </p>
            <p className="text-gray-300">Formal / Black Tie Elegant</p>
          </div>
        </div>

        {/* Countdown */}
        <p className="text-xs uppercase tracking-[0.3em] text-[#c5a880] mb-6">
          Counting the Days
        </p>
        <h4 className="text-xl tracking-wide mb-8">
          EVERY SECOND BRINGS US CLOSER
        </h4>

        <div className="flex justify-center space-x-4 md:space-x-8 max-w-xl mx-auto mb-10 font-sans">
          {[
            { value: "30", label: "DAYS" },
            { value: "05", label: "HOURS" },
            { value: "07", label: "MINUTES" },
            { value: "43", label: "SECONDS" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#170a0a] border border-[#2a1212] w-20 h-24 md:w-24 md:h-28 flex flex-col justify-center items-center rounded-sm"
            >
              <span className="text-2xl md:text-4xl font-light text-[#c5a880]">
                {item.value}
              </span>
              <span className="text-[10px] tracking-widest text-gray-500 mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>
        <p className="text-sm italic text-gray-400">
          "The wait will soon be over, and a new chapter will begin."
        </p>
      </section>

      <hr className="border-[#2a1212] max-w-5xl mx-auto" />

      {/* CEREMONY & RECEPTION */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-xs uppercase tracking-[0.4em] text-[#c5a880] mb-4">
          Ceremony & Reception
        </h2>
        <h3 className="text-2xl tracking-wide mb-12">
          CELEBRATE EACH MOMENT WITH US
        </h3>

        <div className="grid md:grid-cols-2 gap-12 text-sm font-sans max-w-2xl mx-auto">
          <div className="p-6 bg-[#170a0a] border border-[#2a1212]">
            <p className="text-[#c5a880] font-serif text-lg mb-2">
              4:00 PM – Wedding Ceremony
            </p>
            <p className="text-gray-400">
              A solemn exchange of vows surrounded by family and close friends.
            </p>
          </div>
          <div className="p-6 bg-[#170a0a] border border-[#2a1212]">
            <p className="text-[#c5a880] font-serif text-lg mb-2">
              7:00 PM – Dinner & Reception
            </p>
            <p className="text-gray-400">
              A festive night filled with delicious dinner, drinks, and dancing
              till midnight.
            </p>
          </div>
        </div>
      </section>

      {/* RSVP FORM */}
      <section
        id="rsvp"
        className="bg-[#170a0a] border-y border-[#2a1212] py-20 px-6"
      >
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-xs uppercase tracking-[0.4em] text-[#c5a880] mb-4">
            RSVP Now
          </h2>
          <h3 className="text-2xl tracking-wide mb-8">
            CONFIRM YOUR ATTENDANCE WITH US
          </h3>

          <form className="space-y-6 font-sans text-left">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full bg-[#120707] border border-[#2a1212] px-4 py-3 text-sm focus:outline-none focus:border-[#c5a880] text-gray-200"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full bg-[#120707] border border-[#2a1212] px-4 py-3 text-sm focus:outline-none focus:border-[#c5a880] text-gray-200"
                  placeholder="e.g. john@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                  Number of Guests
                </label>
                <select className="w-full bg-[#120707] border border-[#2a1212] px-4 py-3 text-sm focus:outline-none focus:border-[#c5a880] text-gray-400">
                  <option>1 Person</option>
                  <option>2 People</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                  Will You Attend?
                </label>
                <select className="w-full bg-[#120707] border border-[#2a1212] px-4 py-3 text-sm focus:outline-none focus:border-[#c5a880] text-gray-400">
                  <option>Yes, I will attend</option>
                  <option>Sorry, I cannot make it</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                Special Message / Dietary Note
              </label>
              <textarea
                rows={4}
                className="w-full bg-[#120707] border border-[#2a1212] px-4 py-3 text-sm focus:outline-none focus:border-[#c5a880] text-gray-200"
                placeholder="Any message for the couple..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#c5a880] text-[#120707] py-3 text-xs uppercase tracking-widest font-bold hover:bg-[#b3956d] transition"
            >
              Send Attendance
            </button>
          </form>
        </div>
      </section>

      {/* CAPTURED MOMENTS (GALLERY) */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-center text-xs uppercase tracking-[0.4em] text-[#c5a880] mb-12">
          Captured Moments
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-[#170a0a] h-48 md:h-64 flex items-center justify-center text-xs text-gray-600">
            [Photo 1]
          </div>
          <div className="bg-[#170a0a] h-48 md:h-64 flex items-center justify-center text-xs text-gray-600">
            [Photo 2]
          </div>
          <div className="bg-[#170a0a] h-48 md:h-64 row-span-2 flex items-center justify-center text-xs text-gray-600">
            [Photo 3 (Tall)]
          </div>
          <div className="bg-[#170a0a] h-48 md:h-64 flex items-center justify-center text-xs text-gray-600">
            [Photo 4]
          </div>
          <div className="bg-[#170a0a] h-48 md:h-64 flex items-center justify-center text-xs text-gray-600">
            [Photo 5]
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#2a1212] py-12 px-6 text-center text-sm font-sans text-gray-500">
        <div className="font-serif text-xl tracking-wider text-[#c5a880] mb-4">
          OLIVIA & ETHAN
        </div>
        <p className="text-xs mb-2">Thank you for being part of our journey.</p>
        <p className="text-[10px] uppercase tracking-widest text-gray-600 mt-6">
          &copy; 2026 AMORIA. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
