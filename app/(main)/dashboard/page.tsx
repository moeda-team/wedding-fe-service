import HeroSection from "@/components/dashboard/hero";
import { FeatureBadge } from "@/components/ui/feature-badge";
import { StatsCard } from "@/components/ui/stats-card";
import { TemplateCard } from "@/components/ui/template-card";
import {
  ChevronRight,
  CircleDollarSign,
  FileText,
  MessageSquare,
} from "lucide-react";

export default function DashboardPage() {
  const templates = [
    {
      id: 1,
      title: "Luxury Wedding",
      description: "Elegant wedding invitation",
      image: "/images/hero-dashboard.png",
    },
    {
      id: 2,
      title: "Minimal Floral",
      description: "Soft and modern floral style",
      image:
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Classic White",
      description: "Simple classy invitation",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Romantic Gold",
      description: "Luxury gold themed design",
      image:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <div className="space-y-6">
      {/* HERO SECTION */}
      <HeroSection />
      {/* STATS */}
      <section className="grid gap-5 md:grid-cols-3">
        <StatsCard
          title="Total Undangan"
          value="10"
          icon={<FileText size={18} />}
        />

        <StatsCard
          title="Undangan Menunggu Aktivasi"
          value="3"
          icon={<MessageSquare size={18} />}
        />

        <StatsCard
          title="Undangan Aktif"
          value="7"
          icon={<CircleDollarSign size={18} />}
        />
      </section>

      {/* TEMPLATE SECTION */}
      <section>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#2f2623]">
              Pilihan Template Undangan
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Temukan berbagai desain undangan yang siap digunakan untuk momen
              spesial Anda.
            </p>
          </div>

          <button className="flex items-center gap-1 text-sm font-medium text-[#b56c56]">
            Lihat Semua
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              title={template.title}
              description={template.description}
              image={template.image}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
