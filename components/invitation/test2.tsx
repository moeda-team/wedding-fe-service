import { useCountdown } from "@/hooks/useCountdown";
import {
  Calendar,
  ChevronDown,
  Map,
  Minus,
  MoveDown,
  Shirt,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";

export default function TestPage() {
  return (
    <main className="bg-bg-brown text-white overflow-x-hidden ">
      <div className="px-4">
        <Hero />
        <Couple />
        <Story />
        <Event />
        <Details />
        <Countdown />
        <CeremonyReception />
        <RSVP />
        <Gallery />
      </div>
      <Footer />
      <p className="text-gray-500 mx-auto text-center p-2">
        Thank you for celebrating with us.
      </p>
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
    <section className="mt-10 mx-auto">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-8">
          <hr className="flex-1 border-purple-primary" />
          <h2 className="whitespace-nowrap font-serif text-2xl text-purple-primary uppercase">
            Captured Moments
          </h2>
          <hr className="flex-1 border-purple-primary" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-4 col-span-2">
            <img
              src="/images/captured-moment (1).png"
              className="w-full object-cover"
            />
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-4">
                <img
                  src="/images/captured-moment (6).png"
                  className="object-cover"
                />
                <img
                  src="/images/captured-moment (5).png"
                  className="object-cover"
                />
              </div>
              <img
                src="/images/captured-moment (4).png"
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col ">
            <img
              src="/images/captured-moment (3).png"
              className=" object-cove"
            />
            <img
              src="/images/captured-moment (2).png"
              className="mt-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section className="flex mt-8">
      <div className=" mx-auto px-8 ">
        <div>
          <div className="flex ">
            <hr className="w-10 border-purple-primary my-auto" />
            <h2 className="text-center font-serif text-purple-font text-xs uppercase">
              &nbsp;&nbsp;&nbsp;a love eternal
            </h2>
          </div>

          <div className="bg-[url(/images/hero-template-1.png)] bg-no-repeat  bg-center bg-size-[60%]">
            <h1 className="text-3xl lg:text-7xl mt-6 text-yellow-primary font-instrument tracking-wide">
              Nikki & Bear's Wedding Celebration
            </h1>

            <p className="text-purple-font mt-8 max-w-1/2  ms-auto text-right">
              Join Us As We Begin A Lifetime Together, Surrounded By Love,
              Beauty, And Cherished Memories.
              <br />
            </p>
            <div className="ms-auto underline font-instrument max-w-1/2 flex mt-2">
              <a
                href="#"
                className="flex items-end ms-auto text-end justify-items-end"
              >
                VIEW INVITATION <ChevronDown />
              </a>
            </div>

            <div className="mt-12 bg-linear-to-tr from-purple-primary to-dark-purple  bg-clip-text text-transparent font-bold  text-center font-instrument  w-full">
              <h1 className="text-[clamp(2rem,10cqw,6rem)]">26 • 12 • 2026</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Couple() {
  return (
    <section className="my-10">
      <div className=" mx-auto px-6 lg:px-20">
        <HeaderSection title="Meet The Couple" align="left" />
        <div className=" mt-10">
          <div className="grid lg:grid-cols-2 ">
            <div>
              <h3 className="text-6xl font-serif text-yellow-primary text-end mt-4">
                Nikki
              </h3>

              <p className="mt-6 text-purple-font  text-end text-xs">
                Gentle yet strong, Nikki has always embraced life with grace and
                compassion. With Ethan by her side, her story of love feels like
                a dream come true.
              </p>
            </div>

            <Image
              src="/images/nikki.png"
              alt=""
              width={450}
              height={600}
              className="ms-2"
            />
          </div>

          <div className="grid lg:grid-cols-2 mt-10">
            <Image
              src="/images/bear.png"
              alt=""
              width={450}
              height={600}
              className="me-2"
            />

            <div className="order-1 lg:order-2">
              <h3 className="text-6xl font-serif text-yellow-primary mt-4">
                Bear
              </h3>

              <p className="mt-6 text-purple-font text-xs">
                A man of heart and hope, Ethan cherishes the little moments of
                love. Meeting Oliva has given his life purpose, and now he’s
                ready to vow forever.
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
    <section className="my-10">
      <div className=" mx-auto px-4 ">
        <HeaderSection title="the story of us" align="right" />
        <p className="text-end text-purple-secondary font-instrument text-4xl uppercase tracking-[4px]"></p>
        <div className=" bg-[url(/images/story.png)] mt-4 lg:mt-12 bg-no-repeat bg-center bg-size-[70%]">
          <h1 className="text-3xl lg:text-6xl mt-6 pe-52 text-white font-instrument">
            Love Written <br />
            In Time
          </h1>
          <p className="text-purple-font text-xs mt-8 max-w-md ms-auto text-right ps-52 ">
            Every love has a beginning, and ours started with a serendipitous
            meeting. With each laugh, each tear, and each dream, our hearts grew
            closer, creating a bond stronger than time itself.
          </p>
        </div>
      </div>
    </section>
  );
}

function Event() {
  return (
    <section className="my-10 ">
      <div className="flex flex-col mx-auto font-instrument">
        <div className=" justify-items-center ms-auto w-[55%] flex flex-col">
          <p className="text-start">2018</p>
          <h2 className="font-instrument text-white text-3xl ms-10 pe-20 ">
            WHERE OUR FIRST EYES MET.
          </h2>
        </div>
        <div className=" justify-items-start mt-4 me-auto w-[55%] flex flex-col">
          <p className="text-start">2019</p>
          <h2 className="font-instrument text-white text-3xl ms-10">
            THE FIRST JOURNEY TOGETHER.
          </h2>
        </div>

        <div className=" justify-items-center mt-4 ms-auto w-full flex flex-col ">
          <p className="text-start mx-auto">2020</p>

          <div className="relative w-full overflow-hidden rounded-xl mt-8 ">
            <div className="flex">
              <img
                src="/images/captured-moment (6).png"
                alt="photo"
                className="w-1/2 h-auto object-cover py-6"
              />
              <h2 className="font-instrument text-white text-3xl ms-5 pe-16 ">
                THE SWEETEST "YES".
              </h2>
            </div>

            <div className="absolute bottom-0 left-1/3 right-0  px-4 pt-12 ">
              <p className="text-white text-2xl font-medium">
                WHAT BEGAN AS TWO PATHS CROSSING HAS NOW BECOME ONE JOURNEY OF
                LOVE, FOREVER BOUND
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function Details() {
  return (
    <section className="my-10">
      <div className="flex flex-col mx-auto">
        <HeaderSection title="the big day" align="left" />
        <div className="flex gap-10 mt-8 px-6">
          <div className="flex flex-col w-[65%] ">
            <h1 className="text-4xl font-instrument ">
              WHERE LOVE MEETS FOREVER
            </h1>
            <div className="relative w-full overflow-hidden rounded-xl ">
              <img
                src="/images/hero-template-1.png"
                alt="photo"
                className="w-full h-auto object-cover ps-20"
              />
              <div className="absolute top-5 left-0 right-0 bg-linear-to-t from-black/70 to-transparent px-4 py-3">
                <p className="text-purple-font text-sm font-medium w-[75%]">
                  Every moment has led us here, to the day where love takes
                  center stage. We would be honored to have you with us.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-14">
            <div className="flex ">
              <Calendar className="" />
              <div className="flex flex-col">
                <h1 className="pt-2 ms-4 text-lg font-instrument font-light">
                  DATE & TIME
                </h1>
                <h1 className="pt-2 ms-4 text-yellow-primary text-md">
                  Sunday, September 14, 2025 &#183; 5:30 PM
                </h1>
              </div>
            </div>
            <div className="flex  ">
              <Map className="" />
              <div className="flex flex-col">
                <h1 className="pt-2 ms-4 text-lg font-instrument font-light">
                  VENUE
                </h1>
                <h1 className="pt-2 ms-4 text-yellow-primary text-md">
                  Novotel Ballroom, Palembang
                </h1>
              </div>
            </div>
            <div className="flex  ">
              <Shirt className="" />
              <div className="flex flex-col">
                <h1 className="pt-2 ms-4 text-lg font-instrument font-light ">
                  DRESS CODE
                </h1>
                <h1 className="pt-2 ms-4 text-yellow-primary text-sm">
                  Black Carnaval
                </h1>
              </div>
            </div>
            <hr className="border-spacing-y-0.5 border-font-gray-primary " />
          </div>
        </div>
      </div>
    </section>
  );
}
function Countdown() {
  const targetDate = "2026-12-12";
  const countDays = useCountdown(targetDate);
  const days = countDays?.days ?? 0;
  const hours = countDays?.hours ?? 0;
  const minutes = countDays?.minutes ?? 0;
  const seconds = countDays?.seconds ?? 0;
  return (
    <section className="my-10 text-center mx-auto">
      <HeaderSection title="Counting The Days" align="center" />
      <h2 className="font-serif text-5xl mt-8">
        Every Second Brings Us Closer
      </h2>
      <div className="flex flex-col">
        <div className="relative w-full overflow-hidden ">
          <Image
            src="/images/count-image.png"
            alt=""
            width={1000}
            height={1000}
            className="object-cover p-6 rounded-lg mt-10"
          />
          <div className="absolute top-0 left-0 right-0  text-5xl font-bold px-20">
            <div className="grid grid-cols-4 gap-2">
              <Card
                size="sm"
                className="bg-brown-primary border border-brown-secondary text-white text-center font-instrument rounded-none"
              >
                <CardContent className="">
                  <h1 className="text-4xl mb-2 font-light">{days}</h1>
                  <hr className=" " />
                  <p className="text-md font-extralight mt-1">DAYS</p>
                </CardContent>
              </Card>
              <Card
                size="sm"
                className="bg-brown-primary border border-brown-secondary text-white text-center font-instrument rounded-none"
              >
                <CardContent className="">
                  <h1 className="text-4xl mb-2 font-light">{hours}</h1>
                  <hr className=" " />
                  <p className="text-md font-extralight mt-1">HOURS</p>
                </CardContent>
              </Card>
              <Card
                size="sm"
                className="bg-brown-primary border border-brown-secondary text-white text-center font-instrument rounded-none"
              >
                <CardContent className="">
                  <h1 className="text-4xl mb-2 font-light">{minutes}</h1>
                  <hr className=" " />
                  <p className="text-md font-extralight mt-1">MINUTES</p>
                </CardContent>
              </Card>
              <Card
                size="sm"
                className="bg-brown-primary border border-brown-secondary text-white text-center font-instrument rounded-none"
              >
                <CardContent className="">
                  <h1 className="text-4xl mb-2 font-light">{seconds}</h1>
                  <hr className=" " />
                  <p className="text-md font-extralight mt-1">SECONDS</p>
                </CardContent>
              </Card>
            </div>
          </div>
          <h1 className="text-2xl font-instrument px-20">
            THE WAIT WILL SOON BE OVER, AND A NEW CHAPTER WILL BEGIN.
          </h1>
        </div>
      </div>
    </section>
  );
}
function CeremonyReception() {
  return (
    <section className="my-10">
      <HeaderSection title="Ceremony & Reception" align="right" />

      <h1 className="uppercase text-3xl font-instrument mt-10">
        celebrate each moment with us
      </h1>
      <p className="py-4 w-[55%] text-purple-font">
        From the vows to the final dance, we invite you to share in every
        beautiful moment of our wedding day.
      </p>
      <div className="relative w-full overflow-hidden mt-8  ">
        <img
          src="/images/rundown.png"
          alt="photo"
          className="w-1/2 h-auto object-cover py-6"
        />
        <div className="grid grid-cols-2 gap-2 absolute top-0 left-40 right-0">
          <div className="flex flex-col">
            <div className="flex flex-row font-instrument text-md font-extralight tracking-widest">
              <h2>4:00 PM</h2>
              <h2 className="ps-3 uppercase  ">Wedding Ceremony</h2>
            </div>
            <div className="flex flex-col ">
              <p className="text-purple-font text-xs ">
                Exchange of vows under the evening sky
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row font-instrument text-md tracking-widest">
              <h2 className="">7:00 PM</h2>
              <h2 className="ps-3 uppercase">dinner & Reception</h2>
            </div>
            <div className="flex flex-col ">
              <p className="text-purple-font text-xs">
                A feast of joy, laughter, and memories.
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row font-instrument text-md tracking-widest">
              <h2>5:30 PM</h2>
              <h2 className="ps-3 uppercase">cocktail hour</h2>
            </div>
            <div className="flex flex-col ">
              <p className="text-purple-font text-xs">
                A toast to love with family and friends.
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row font-instrument text-md tracking-widest">
              <h2>9:00 PM</h2>
              <h2 className="ps-3 uppercase">dance & celebration</h2>
            </div>
            <div className="flex flex-col ">
              <p className="text-purple-font text-xs">
                Music, dance, and love to end the night.
              </p>
            </div>
          </div>
        </div>
        <h1 className="uppercase absolute top-1/2 left-1/3 text-3xl font-instrument pe-20">
          your presence makes each moment even more memorable.
        </h1>
      </div>
    </section>
  );
}
function RSVP() {
  return (
    <section className="my-10">
      <div className="max-w-3xl mx-auto px-6">
        <HeaderSection title="RSVP Now" align="center" />
        <form className="mt-8 space-y-6 bg-brown-primary p-8">
          <h1 className="uppercase text-center text-2xl font-instrument tracking-wider">
            confirm your attendance with us
          </h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="font-instrument text-md uppercase tracking-widest mb-2">
                Full Name
              </h2>
              <input
                placeholder="Enter Your Full Name"
                className="w-full bg-[#1A0A0F] border border-yellow-primary/20 p-4"
              />
            </div>
            <div>
              <h2 className="font-instrument text-md uppercase tracking-widest mb-2">
                Email Address
              </h2>
              <input
                placeholder="Enter Your Email Address"
                className="w-full bg-[#1A0A0F] border border-yellow-primary/20 p-4"
              />
            </div>
            <div>
              <h2 className="font-instrument text-md uppercase tracking-widest mb-2">
                Number Of Guests
              </h2>
              <input
                placeholder="select number of guests"
                className="w-full bg-[#1A0A0F] border border-yellow-primary/20 p-4"
              />
            </div>
            <div>
              <h2 className="font-instrument text-md uppercase tracking-widest mb-2">
                Will You Attend
              </h2>
              <input
                placeholder="Select an option"
                className="w-full bg-[#1A0A0F] border border-yellow-primary/20 p-4"
              />
            </div>
          </div>
          <h2 className="font-instrument text-md uppercase tracking-widest mb-2">
            message
          </h2>
          <textarea
            placeholder="Message"
            rows={5}
            className="w-full bg-[#1A0A0F] border border-yellow-primary/20 p-4"
          />
          <button className="w-full bg-yellow-primary text-brown-primary py-4 font-semibold font-instrument">
            Confirm Attendance
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-yellow-primary/20 py-10 text-center bg-brown-secondary px-6">
      <div className="flex flex-row">
        <div className="flex flex-col text-start gap-6">
          <h3 className="font-serif text-md text-white uppercase">
            The Wedding of
          </h3>
          <h3 className="font-serif text-4xl text-white uppercase">
            Olivia & Ethan
          </h3>
        </div>
        <div className="flex flex-col gap-4 ms-auto text-end">
          <h3 className="font-serif text-xs text-white uppercase">Home</h3>
          <h3 className="font-serif text-xs text-white uppercase">our story</h3>
          <h3 className="font-serif text-xs text-white uppercase">
            bridesmaid
          </h3>
          <h3 className="font-serif text-xs text-white uppercase">rsvp</h3>
        </div>
      </div>
    </footer>
  );
}

function HeaderSection({ title, align }: { title: string; align: string }) {
  return align == "center" ? (
    <div className="flex ">
      <hr className="flex-1 border-purple-primary my-auto" />
      <h2 className="text-start font-serif text-purple-font text-3xl uppercase">
        &nbsp; {title}&nbsp;
      </h2>
      <hr className="flex-1 border-purple-primary my-auto" />
    </div>
  ) : align == "right" ? (
    <div className="flex ">
      <hr className="flex-1 border-purple-primary my-auto" />
      <h2 className="text-start font-serif text-purple-font text-3xl uppercase">
        &nbsp; {title}&nbsp;
      </h2>
      <hr className="w-4 border-purple-primary my-auto" />
    </div>
  ) : (
    <div className="flex ">
      <hr className="w-4 border-purple-primary my-auto" />
      <h2 className="text-start font-serif text-purple-font text-3xl uppercase">
        &nbsp; {title}&nbsp;
      </h2>
      <hr className="flex-1 border-purple-primary my-auto" />
    </div>
  );
}
