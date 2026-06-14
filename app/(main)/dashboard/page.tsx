import { getDashboardStats } from "@/app/lib/dashboard-service";
import { getPublicTemplates } from "@/app/lib/template-service";
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

// Shown when the public templates endpoint returns nothing (e.g. no templates
// published yet) so the carousel never renders empty.
const FALLBACK_TEMPLATES = [
  { id: "f1", title: "Luxury Wedding", image: "/images/template-1.png" },
  { id: "f2", title: "Minimal Floral", image: "/images/template-2.png" },
  { id: "f3", title: "Classic White", image: "/images/template-3.png" },
  { id: "f4", title: "Romantic Gold", image: "/images/template-4.png" },
  { id: "f5", title: "Rustic Bloom", image: "/images/template-5.png" },
  { id: "f6", title: "Elegant Rose", image: "/images/template-1.png" },
  { id: "f7", title: "Modern Mono", image: "/images/template-2.png" },
  { id: "f8", title: "Soft Botanical", image: "/images/template-3.png" },
];

export default async function DashboardPage() {
  const [stats, publicTemplates] = await Promise.all([
    getDashboardStats(),
    getPublicTemplates(),
  ]);

  const templates =
    publicTemplates.length > 0 ? publicTemplates : FALLBACK_TEMPLATES;

  return (
    <PageWrapper title="">
      <HeroSection />

      {/* STATS */}
      <section className="grid gap-4 md:grid-cols-3 mt-8">
        <StatsCard
          title="Total Undangan"
          value={String(stats.total)}
          icon={<List size={18} />}
        />

        <StatsCard
          title="Menunggu Aktivasi"
          value={String(stats.pending)}
          icon={<Archive size={18} />}
        />

        <StatsCard
          title="Undangan Aktif"
          value={String(stats.active)}
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
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
      >
        <CarouselContent className="-ml-4">
          {templates.map((template) => (
            <CarouselItem
              key={template.id}
              className="
                  pl-4
                  basis-[60%]
                  sm:basis-1/3
                  md:basis-1/4
                  lg:basis-1/5
                  xl:basis-1/6
                "
            >
              <Card2 alt={template.title} image={template.image} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* CONTROLS — overlaid on the card edges, vertically centered */}
        <CarouselPrevious className="left-2 size-9 border-none bg-white/85 text-[#2f2623] shadow-md backdrop-blur-sm hover:bg-white" />
        <CarouselNext className="right-2 size-9 border-none bg-white/85 text-[#2f2623] shadow-md backdrop-blur-sm hover:bg-white" />
      </Carousel>
    </PageWrapper>
  );
}
