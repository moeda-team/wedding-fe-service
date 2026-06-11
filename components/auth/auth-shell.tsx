import { MailOpen } from "lucide-react";

function AuthHero() {
  return (
    <div className="relative hidden lg:block lg:w-1/2">
      <img
        src="/images/login-hero.png"
        alt="Undangan digital elegan"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/40" />

      <div className="relative flex h-full flex-col justify-between p-10 text-white">
        <div className="max-w-md">
          <h3 className="font-geist text-3xl font-semibold leading-snug">
            Buat undangan digital dengan mudah &amp; praktis
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-white/80">
            Bagikan momen spesial Anda kepada keluarga, sahabat, dan orang
            terkasih dalam tampilan yang elegan.
          </p>
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
          <div className="flex items-start gap-3">
            <span className="rounded-xl bg-white/20 p-2">
              <MailOpen size={20} />
            </span>
            <div>
              <p className="font-geist font-semibold">
                Mulai Ceritakan Momen Spesial Anda
              </p>
              <p className="mt-1 text-sm leading-relaxed text-white/75">
                Kelola undangan, tamu, RSVP, dan bagikan link dalam satu
                platform yang mudah digunakan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f4f2] p-4 sm:p-6 lg:p-8">
      {/* Centered card — keeps the form and image joined at any screen size/zoom */}
      <div className="flex w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-sm min-h-[600px] lg:h-[85vh] lg:max-h-[820px]">
        {/* LEFT — FORM. Scrolls internally and stays centered without
            clipping when the content is taller than the card (e.g. register). */}
        <div className="w-full overflow-y-auto lg:w-1/2">
          <div className="flex min-h-full items-center justify-center px-6 py-10 sm:px-12 lg:px-16">
            <div className="w-full max-w-md">
              {/* Brand */}
              <div className="mb-10">
                <h1 className="font-serif text-3xl italic text-[#2f2623]">
                  Invitee
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Build Your Digital Invitation
                </p>
              </div>

              <h2 className="font-geist text-2xl font-semibold text-[#2f2623]">
                {title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>

              {children}
            </div>
          </div>
        </div>

        {/* RIGHT — MARKETING */}
        <AuthHero />
      </div>
    </div>
  );
}
