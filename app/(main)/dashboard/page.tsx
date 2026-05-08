import HeroSection from "@/components/dashboard/hero";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Card2 } from "@/components/ui/card-2";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { StatsCard } from "@/components/ui/stats-card";
import { Archive, CheckCircle, ChevronRight, List } from "lucide-react";

export default function DashboardPage() {
  const templates = [
    {
      id: 1,
      title: "Luxury Wedding",
      description: "Elegant wedding invitation",
      image: "/images/template-1.png",
    },
    {
      id: 2,
      title: "Minimal Floral",
      description: "Soft and modern floral style",
      image: "/images/template-2.png",
    },
    {
      id: 3,
      title: "Classic White",
      description: "Simple classy invitation",
      image: "/images/template-3.png",
    },
    {
      id: 4,
      title: "Romantic Gold",
      description: "Luxury gold themed design",
      image: "/images/template-4.png",
    },
    {
      id: 5,
      title: "Rustic Bloom",
      description: "Warm botanical aesthetics",
      image: "/images/template-5.png",
    },
  ];

  return (
    <PageWrapper title="">
      <HeroSection />

      {/* STATS */}
      <section className="grid gap-4 md:grid-cols-3 mt-8">
        <StatsCard
          title="Total Undangan"
          value="10"
          icon={<List size={18} />}
        />

        <StatsCard
          title="Menunggu Aktivasi"
          value="3"
          icon={<Archive size={18} />}
        />

        <StatsCard
          title="Undangan Aktif"
          value="7"
          icon={<CheckCircle size={18} />}
        />
      </section>

      <section className="rounded-3xl mt-8" id="template">
        <div className="mb-6 items-end justify-between gap-4 grid grid-cols-2">
          <div>
            <h2 className="font-geist text-2xl font-semibold text-[#2f2623]">
              Pilihan Template Undangan
            </h2>

            <p className="mt-1 text-base text-muted-foreground">
              Temukan berbagai desain undangan yang siap digunakan untuk momen
              spesial Anda.
            </p>
          </div>

          <button
            className="
              ml-auto
              flex
              shrink-0
              items-center
              gap-1
              text-sm
              font-medium
              text-[#b56c56]
              transition-opacity
              hover:opacity-75
            "
          >
            Lihat Semua
            <ChevronRight size={16} />
          </button>
        </div>
      </section>
      <div className="flex-1 ">
        <Carousel
          opts={{
            align: "start",
            dragFree: true,
          }}
          className=""
        >
          <CarouselContent className="-ml-4">
            {templates.map((template) => (
              <CarouselItem
                key={template.id}
                className="
                    pl-4
                    basis-[85%]
                    sm:basis-[50%]
                    lg:basis-[33.333%]
                    xl:basis-[25%]
                    shrink-0
                  "
              >
                <div className="space-y-4">
                  <Card2 alt={template.title} image={template.image} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* CONTROLS */}
          <div className=" mt-6 gap-2 mx-10 ">
            <CarouselPrevious  className=" w-12 min-h-0 "/>

            <CarouselNext  className="w-12 min-h-0 "/>
          </div>
        </Carousel>
      </div>
    </PageWrapper>
  );
}
