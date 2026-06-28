import { UseFormReturn } from "react-hook-form";
import { InvitationFormValues, InvitationTemplate } from "@/types/invitation";

// ─── Helpers ───────────────────────────────────────────────────────────────

function formatDate(d: string | Date): string {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateShort(d: string | Date): string {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// ─── Templates ─────────────────────────────────────────────────────────────

export const TEMPLATES: InvitationTemplate[] = [
  {
    id: 4,
    name: "Eternal Dark",
    accent: "#C9A96E",
    bg: "#0f0d0b",
    bgCard: "#1a1714",
    bgSection: "#141210",
    fontColor: "#e8ddd0",
    textMuted: "#9a8d7e",
    fontTitle: "'Cormorant Garamond', 'Georgia', serif",
    style: "elegant",
  },
  {
    id: 5,
    name: "Rose Ivory",
    accent: "#b07c8a",
    bg: "#fdf8f4",
    bgCard: "#fff9f6",
    bgSection: "#f9f1ec",
    fontColor: "#3a2e2e",
    textMuted: "#9c8080",
    fontTitle: "'Cormorant Garamond', 'Georgia', serif",
    style: "rustic",
  },
  {
    id: 6,
    name: "Sage Modern",
    accent: "#6b8c6e",
    bg: "#f4f5f0",
    bgCard: "#ffffff",
    bgSection: "#eeefe9",
    fontColor: "#2c3028",
    textMuted: "#7a8275",
    fontTitle: "'Playfair Display', 'Georgia', serif",
    style: "modern",
  },
];

// ─── Extended template type ─────────────────────────────────────────────────

// ─── Sub-components ─────────────────────────────────────────────────────────

function SectionLabel({
  children,
  accent,
  textMuted,
}: {
  children: React.ReactNode;
  accent: string;
  textMuted: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 24,
      }}
    >
      <div
        style={{
          flex: 1,
          height: 0.5,
          background: accent,
          opacity: 0.35,
        }}
      />
      <span
        style={{
          fontSize: 10,
          letterSpacing: 4,
          color: textMuted,
          textTransform: "uppercase",
          fontFamily: "system-ui, sans-serif",
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </span>
      <div
        style={{
          flex: 1,
          height: 0.5,
          background: accent,
          opacity: 0.35,
        }}
      />
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function InvitationPreview2({
  form,
}: {
  form: UseFormReturn<InvitationFormValues>;
}) {
  const values = form.watch();

  const tpl =
    TEMPLATES.find((t) => t.id === values.pengaturantemplate?.templateId) ||
    TEMPLATES[0];

  const pria = values.mempelaiPria;
  const wanita = values.mempelaiWanita;
  const pengaturan = values.pengaturanUndangan;

  const isDark = tpl.style === "elegant";

  // ─── Milestones ────────────────────────────────────────────────────────
  const milestones = [
    {
      icon: "☕",
      label: "Pertama Bertemu",
      date: "12 Mei 2018",
      desc: "Bertemu di kafe kampus",
    },
    {
      icon: "💍",
      label: "Menjalin Hubungan",
      date: "25 Agustus 2019",
      desc: "Menjadi sepasang kekasih",
    },
    {
      icon: "💌",
      label: "Lamaran",
      date: "16 Desember 2023",
      desc: "Melamar dengan penuh cinta",
    },
    {
      icon: "💒",
      label: "Pernikahan",
      date: formatDateShort(pengaturan?.tanggalAcara?.toString() || ""),
      desc: "Hari bahagia kami",
    },
  ];

  // ─── Styles ────────────────────────────────────────────────────────────
  const styles = {
    root: {
      background: tpl.bg,
      color: tpl.fontColor,
      fontFamily: "system-ui, -apple-system, sans-serif",
      fontSize: 13,
      lineHeight: 1.6,
      overflowX: "hidden" as const,
    } as React.CSSProperties,

    divider: {
      width: "100%",
      height: 0.5,
      background: tpl.accent,
      opacity: 0.2,
      border: "none",
      margin: 0,
    } as React.CSSProperties,

    section: {
      padding: "36px 28px",
    } as React.CSSProperties,

    sectionAlt: {
      padding: "36px 28px",
      background: tpl.bgSection,
    } as React.CSSProperties,

    accentText: {
      color: tpl.accent,
    } as React.CSSProperties,

    card: {
      background: tpl.bgCard,
      border: `0.5px solid ${tpl.accent}33`,
      borderRadius: 8,
      padding: "16px 14px",
    } as React.CSSProperties,
  };

  return (
    <div className="bg-[#120707] text-[#eae6df] font-serif min-h-screen selection:bg-[#c5a880] selection:text-black">
      {/* ── Google Fonts ───────────────────────────────────────────────── */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap"
        rel="stylesheet"
      />

      {/* ══════════════════════════════════════════════════════════════════
          COVER
      ══════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          minHeight: 300,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 28px 36px",
          textAlign: "center",
          position: "relative",
          background: tpl.bg,
        }}
      >
        {/* Decorative corner ornaments */}
        {["topLeft", "topRight", "botLeft", "botRight"].map((pos) => (
          <span
            key={pos}
            style={{
              position: "absolute",
              ...(pos.includes("top") ? { top: 14 } : { bottom: 14 }),
              ...(pos.includes("Left") ? { left: 16 } : { right: 16 }),
              fontSize: 14,
              color: tpl.accent,
              opacity: 0.45,
              fontFamily: "serif",
              lineHeight: 1,
            }}
          >
            ✦
          </span>
        ))}

        {/* Eyebrow */}
        <div
          style={{
            fontSize: 9,
            letterSpacing: 5,
            color: tpl.accent,
            textTransform: "uppercase",
            marginBottom: 20,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          The Wedding Of
        </div>

        {/* Names */}
        <div
          style={{
            fontFamily: tpl.fontTitle,
            fontSize: 48,
            fontWeight: 400,
            lineHeight: 1.05,
            color: tpl.fontColor,
            letterSpacing: -0.5,
          }}
        >
          {wanita?.namaPanggilan || "Aulia"}
        </div>
        <div
          style={{
            fontFamily: tpl.fontTitle,
            fontSize: 24,
            fontStyle: "italic",
            color: tpl.accent,
            lineHeight: 1.6,
          }}
        >
          &amp;
        </div>
        <div
          style={{
            fontFamily: tpl.fontTitle,
            fontSize: 48,
            fontWeight: 400,
            lineHeight: 1.05,
            color: tpl.fontColor,
            letterSpacing: -0.5,
          }}
        >
          {pria?.namaPanggilan || "Reza"}
        </div>

        {/* Date badge */}
        <div
          style={{
            marginTop: 24,
            padding: "6px 16px",
            border: `0.5px solid ${tpl.accent}55`,
            borderRadius: 30,
            fontSize: 10,
            letterSpacing: 3,
            color: tpl.textMuted,
            textTransform: "uppercase",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {formatDateShort(pengaturan?.tanggalAcara?.toString() || "") ||
            "22 Juni 2026"}
        </div>

        {/* Big ghost date in background */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: tpl.fontTitle,
            fontSize: 80,
            fontWeight: 600,
            color: tpl.accent,
            opacity: 0.04,
            whiteSpace: "nowrap",
            userSelect: "none",
            pointerEvents: "none",
            lineHeight: 1,
          }}
        >
          {pengaturan?.tanggalAcara
            ? new Date(pengaturan.tanggalAcara).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            : "22.06.2026"}
        </div>
      </div>

      <hr style={styles.divider} />

      {/* ══════════════════════════════════════════════════════════════════
          MEMPELAI (Meet the Couple)
      ══════════════════════════════════════════════════════════════════ */}
      <div style={styles.sectionAlt}>
        <SectionLabel
          accent={tpl.accent}
          textMuted={tpl.textMuted ?? "#76717f"}
        >
          Meet the Couple
        </SectionLabel>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
          }}
        >
          {(
            [
              { label: "Mempelai Wanita", data: wanita },
              { label: "Mempelai Pria", data: pria },
            ] as const
          ).map(({ label, data }) => (
            <div key={label} style={styles.card}>
              {/* Photo placeholder */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "3/4",
                  background: `${tpl.accent}15`,
                  borderRadius: 6,
                  marginBottom: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                  color: `${tpl.accent}55`,
                  overflow: "hidden",
                }}
              >
                {/* Photo will go here */}
                {data.fotoUrl ? (
                  <img
                    src={data.fotoUrl}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={`${tpl.accent}55`}
                    strokeWidth="1"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                )}
              </div>

              {/* Name info */}
              <div
                style={{
                  fontSize: 9,
                  letterSpacing: 3,
                  color: tpl.accent,
                  textTransform: "uppercase",
                  marginBottom: 4,
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontFamily: tpl.fontTitle,
                  fontSize: 20,
                  color: tpl.fontColor,
                  marginBottom: 2,
                  lineHeight: 1.2,
                }}
              >
                {data?.namaPanggilan || "—"}
              </div>
              <div
                style={{ fontSize: 10, color: tpl.textMuted, marginBottom: 8 }}
              >
                {data?.namaLengkap || "—"}
              </div>

              <div
                style={{
                  borderTop: `0.5px solid ${tpl.accent}22`,
                  paddingTop: 8,
                  fontSize: 9,
                  color: tpl.textMuted,
                  lineHeight: 1.8,
                }}
              >
                Putra/i dari:
                <br />
                <span style={{ color: tpl.fontColor }}>
                  {data?.namaAyah || "—"} &amp; {data?.namaIbu || "—"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr style={styles.divider} />

      {/* ══════════════════════════════════════════════════════════════════
          CERITA KAMI (Story of Us)
      ══════════════════════════════════════════════════════════════════ */}
      <div style={styles.section}>
        <SectionLabel
          accent={tpl.accent}
          textMuted={tpl.textMuted ?? "#76717f"}
        >
          The Story of Us
        </SectionLabel>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
          }}
        >
          {milestones.map((m, i) => (
            <div
              key={m.label}
              style={{
                ...styles.card,
                display: "flex",
                flexDirection: "column",
                gap: 6,
                position: "relative",
                paddingLeft: 14,
                borderLeft: `2px solid ${tpl.accent}`,
                borderRadius: 0,
                background: "transparent",
              }}
            >
              <div style={{ fontSize: 16 }}>{m.icon}</div>
              <div
                style={{
                  fontSize: 9,
                  letterSpacing: 2,
                  color: tpl.accent,
                  textTransform: "uppercase",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                {m.label}
              </div>
              <div style={{ fontSize: 10, color: tpl.textMuted }}>{m.date}</div>
              <div style={{ fontSize: 10, color: tpl.textMuted }}>{m.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <hr style={styles.divider} />

      {/* ══════════════════════════════════════════════════════════════════
          WAKTU & LOKASI (The Big Day)
      ══════════════════════════════════════════════════════════════════ */}
      <div style={styles.sectionAlt}>
        <SectionLabel
          accent={tpl.accent}
          textMuted={tpl.textMuted ?? "#76717f"}
        >
          The Big Day
        </SectionLabel>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
        >
          {/* Akad */}
          <div style={styles.card}>
            <div
              style={{
                fontSize: 9,
                letterSpacing: 3,
                color: tpl.accent,
                textTransform: "uppercase",
                marginBottom: 10,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              🕌 Akad Nikah
            </div>
            <div
              style={{
                fontFamily: tpl.fontTitle,
                fontSize: 14,
                color: tpl.fontColor,
                marginBottom: 4,
              }}
            >
              {formatDate(pengaturan?.tanggalAcara?.toString() || "") ||
                "Sabtu, 22 Juni 2026"}
            </div>
            <div
              style={{ fontSize: 10, color: tpl.textMuted, marginBottom: 8 }}
            >
              08.00 – 10.00 WIB
            </div>
            <div
              style={{
                fontSize: 10,
                color: tpl.textMuted,
                borderTop: `0.5px solid ${tpl.accent}22`,
                paddingTop: 8,
              }}
            >
              Masjid Al-Ikhlas, Jl. Merdeka No. 1
            </div>
          </div>

          {/* Resepsi */}
          <div style={styles.card}>
            <div
              style={{
                fontSize: 9,
                letterSpacing: 3,
                color: tpl.accent,
                textTransform: "uppercase",
                marginBottom: 10,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              🎊 Resepsi
            </div>
            <div
              style={{
                fontFamily: tpl.fontTitle,
                fontSize: 14,
                color: tpl.fontColor,
                marginBottom: 4,
              }}
            >
              {formatDate(pengaturan?.tanggalAcara?.toString() || "") ||
                "Sabtu, 22 Juni 2026"}
            </div>
            <div
              style={{ fontSize: 10, color: tpl.textMuted, marginBottom: 8 }}
            >
              11.00 – 14.00 WIB
            </div>
            <div
              style={{
                fontSize: 10,
                color: tpl.textMuted,
                borderTop: `0.5px solid ${tpl.accent}22`,
                paddingTop: 8,
              }}
            >
              Gedung Serbaguna, Jl. Sudirman No. 10
            </div>
          </div>
        </div>

        {/* Google Maps placeholder */}
        <div
          style={{
            marginTop: 14,
            borderRadius: 8,
            border: `0.5px solid ${tpl.accent}33`,
            height: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            background: `${tpl.accent}08`,
            cursor: "pointer",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={tpl.accent}
            strokeWidth="1.5"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span style={{ fontSize: 10, color: tpl.accent }}>
            Lihat di Google Maps →
          </span>
        </div>
      </div>

      <hr style={styles.divider} />

      {/* ══════════════════════════════════════════════════════════════════
          COUNTDOWN
      ══════════════════════════════════════════════════════════════════ */}
      <div style={styles.section}>
        <SectionLabel
          accent={tpl.accent}
          textMuted={tpl.textMuted ?? "#76717f"}
        >
          Counting the Days
        </SectionLabel>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 8,
            textAlign: "center",
          }}
        >
          {[
            { n: "30", label: "Hari" },
            { n: "05", label: "Jam" },
            { n: "07", label: "Menit" },
            { n: "43", label: "Detik" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: tpl.bgCard,
                border: `0.5px solid ${tpl.accent}33`,
                borderRadius: 8,
                padding: "12px 8px",
              }}
            >
              <div
                style={{
                  fontFamily: tpl.fontTitle,
                  fontSize: 32,
                  color: tpl.accent,
                  lineHeight: 1,
                  fontWeight: 400,
                }}
              >
                {item.n}
              </div>
              <div
                style={{
                  fontSize: 9,
                  letterSpacing: 2,
                  color: tpl.textMuted,
                  textTransform: "uppercase",
                  marginTop: 6,
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr style={styles.divider} />

      {/* ══════════════════════════════════════════════════════════════════
          RSVP
      ══════════════════════════════════════════════════════════════════ */}
      <div style={styles.sectionAlt}>
        <SectionLabel
          accent={tpl.accent}
          textMuted={tpl.textMuted ?? "#76717f"}
        >
          RSVP Now
        </SectionLabel>

        <p
          style={{
            textAlign: "center",
            fontSize: 11,
            color: tpl.textMuted,
            marginBottom: 20,
            marginTop: -8,
          }}
        >
          Konfirmasi kehadiran sebelum{" "}
          {formatDateShort(pengaturan?.tanggalAcara?.toString() || "")}
        </p>

        {/* RSVP form fields (preview only, readonly) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <input
            readOnly
            placeholder="Nama lengkap Anda"
            style={{
              width: "100%",
              padding: "9px 12px",
              borderRadius: 6,
              border: `0.5px solid ${tpl.accent}44`,
              fontSize: 11,
              background: tpl.bgCard,
              color: tpl.fontColor,
              boxSizing: "border-box",
              outline: "none",
            }}
          />
          <input
            readOnly
            placeholder="Jumlah tamu"
            style={{
              width: "100%",
              padding: "9px 12px",
              borderRadius: 6,
              border: `0.5px solid ${tpl.accent}44`,
              fontSize: 11,
              background: tpl.bgCard,
              color: tpl.fontColor,
              boxSizing: "border-box",
              outline: "none",
            }}
          />
          <select
            style={{
              width: "100%",
              padding: "9px 12px",
              borderRadius: 6,
              border: `0.5px solid ${tpl.accent}44`,
              fontSize: 11,
              background: tpl.bgCard,
              color: tpl.textMuted,
              boxSizing: "border-box",
              outline: "none",
            }}
          >
            <option>Akan Hadir</option>
            <option>Tidak Hadir</option>
          </select>
          <button
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: 6,
              border: "none",
              background: tpl.accent,
              color: isDark ? "#0f0d0b" : "#fff",
              fontSize: 11,
              letterSpacing: 2,
              fontFamily: "system-ui, sans-serif",
              textTransform: "uppercase",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Kirim Konfirmasi
          </button>
        </div>
      </div>

      <hr style={styles.divider} />

      {/* ══════════════════════════════════════════════════════════════════
          UCAPAN & DOA
      ══════════════════════════════════════════════════════════════════ */}
      <div style={styles.section}>
        <SectionLabel
          accent={tpl.accent}
          textMuted={tpl.textMuted ?? "#76717f"}
        >
          Ucapan &amp; Doa
        </SectionLabel>

        {/* Sample wishes */}
        {[
          {
            initial: "A",
            name: "Andi Pratama",
            date: "11 Mei 2024",
            msg: "Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, wa rahmah.",
          },
          {
            initial: "S",
            name: "Siti Rahayu",
            date: "12 Mei 2024",
            msg: "Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fi khairin. Aamiin.",
          },
        ].map((w) => (
          <div key={w.name} style={{ ...styles.card, marginBottom: 10 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: `${tpl.accent}22`,
                  border: `0.5px solid ${tpl.accent}55`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  color: tpl.accent,
                  fontWeight: 500,
                  flexShrink: 0,
                }}
              >
                {w.initial}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: 11,
                      color: tpl.fontColor,
                    }}
                  >
                    {w.name}
                  </span>
                  <span style={{ fontSize: 9, color: tpl.textMuted }}>
                    {w.date}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: tpl.textMuted,
                    lineHeight: 1.6,
                  }}
                >
                  {w.msg}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Leave a wish textarea */}
        <textarea
          readOnly
          placeholder="Tulis ucapan & doa terbaik Anda..."
          rows={3}
          style={{
            width: "100%",
            padding: "9px 12px",
            borderRadius: 6,
            border: `0.5px solid ${tpl.accent}44`,
            fontSize: 11,
            background: tpl.bgCard,
            color: tpl.fontColor,
            resize: "none",
            boxSizing: "border-box",
            outline: "none",
            marginTop: 4,
          }}
        />
        <div
          style={{
            textAlign: "center",
            marginTop: 10,
            fontSize: 10,
            color: tpl.accent,
            cursor: "pointer",
          }}
        >
          Lihat Semua Ucapan →
        </div>
      </div>

      <hr style={styles.divider} />

      {/* ══════════════════════════════════════════════════════════════════
          GALERI (Captured Moments)
      ══════════════════════════════════════════════════════════════════ */}
      <div style={styles.sectionAlt}>
        <SectionLabel
          accent={tpl.accent}
          textMuted={tpl.textMuted ?? "#76717f"}
        >
          Captured Moments
        </SectionLabel>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 6,
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                aspectRatio: i === 0 || i === 3 ? "3/4" : "1/1",
                gridRow: i === 0 || i === 3 ? "span 2" : "span 1",
                background: `${tpl.accent}${10 + i * 4}`,
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `0.5px solid ${tpl.accent}22`,
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke={`${tpl.accent}44`}
                strokeWidth="1"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          background: tpl.accent,
          color: isDark ? "#0f0d0b" : "#fff",
          textAlign: "center",
          padding: "24px 20px",
        }}
      >
        <div
          style={{
            fontFamily: tpl.fontTitle,
            fontSize: 22,
            fontWeight: 400,
            marginBottom: 6,
            letterSpacing: -0.5,
          }}
        >
          {wanita?.namaPanggilan || "Aulia"} &amp;{" "}
          {pria?.namaPanggilan || "Reza"}
        </div>
        <div
          style={{
            fontSize: 9,
            letterSpacing: 4,
            opacity: 0.7,
            textTransform: "uppercase",
            fontFamily: "system-ui, sans-serif",
            marginBottom: 14,
          }}
        >
          {pengaturan?.namaUndangan || "Wedding Invitation"}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            fontSize: 9,
            opacity: 0.6,
            letterSpacing: 2,
            textTransform: "uppercase",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {pria?.usernameInstagram && <span>@{pria.usernameInstagram}</span>}
          {wanita?.usernameInstagram && (
            <span>@{wanita.usernameInstagram}</span>
          )}
        </div>
      </div>
    </div>
  );
}
