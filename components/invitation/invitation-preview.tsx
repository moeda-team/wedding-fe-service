import {
  InvitationFormData,
  InvitationFormValues,
  InvitationTemplate,
} from "@/types/invitation";
import { UseFormReturn } from "react-hook-form";
const TEMPLATES: InvitationTemplate[] = [
  {
    id: 1,
    name: "Pratinjau",
    accent: "#c8937a",
    bg: "#fdf8f5",
    fontTitle: "Georgia, serif",
    style: "elegant",
  },
  {
    id: 2,
    name: "Modern",
    accent: "#2d6a4f",
    bg: "#f0f7f4",
    fontTitle: "'Arial', sans-serif",
    style: "modern",
  },
  {
    id: 3,
    name: "Golden",
    accent: "#b8860b",
    bg: "#fffdf0",
    fontTitle: "Georgia, serif",
    style: "elegant",
  },
  {
    id: 4,
    name: "Rustic",
    accent: "#6b4226",
    bg: "#faf4ee",
    fontTitle: "Georgia, serif",
    style: "rustic",
  },
  {
    id: 5,
    name: "Minimalist",
    accent: "#555",
    bg: "#fafafa",
    fontTitle: "'Helvetica', sans-serif",
    style: "modern",
  },
  {
    id: 6,
    name: "Blossom",
    accent: "#d4547a",
    bg: "#fff5f8",
    fontTitle: "Georgia, serif",
    style: "elegant",
  },
];
function formatDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateShort(iso: string) {
  if (!iso) return "-- . -- . ----";
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yy = d.getFullYear();
  return `${dd} . ${mm} . ${yy}`;
}

export function InvitationPreview({
  form,
}: {
  form: UseFormReturn<InvitationFormValues>;
}) {
  const values = form.watch();
  const tpl =
    TEMPLATES.find((t) => t.id === values.pengaturantemplate.templateId) ||
    TEMPLATES[0];
  const [pria, wanita] = [values.mempelaiPria, values.mempelaiWanita];
  const pengaturanUndangan = values.pengaturanUndangan;
  const s = {
    wrap: {
      background: tpl.bg,
      fontFamily: "'Georgia', serif",
      color: "#333",
      fontSize: 13,
    } as React.CSSProperties,
    accent: { color: tpl.accent } as React.CSSProperties,
    accentBg: { background: tpl.accent } as React.CSSProperties,
    sectionTitle: {
      fontFamily: tpl.fontTitle,
      color: tpl.accent,
      fontSize: 20,
      textAlign: "center" as const,
      marginBottom: 8,
    },
    divider: {
      borderColor: tpl.accent + "44",
      margin: "16px 0",
    } as React.CSSProperties,
  };

  return (
    <div style={s.wrap}>
      {/* Cover */}
      <div
        style={{
          minHeight: 240,
          background: `linear-gradient(160deg, ${tpl.accent}22 0%, ${tpl.bg} 100%)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 24px 24px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: 3,
            color: tpl.accent,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          The Wedding Of
        </div>
        <div
          style={{
            fontFamily: tpl.fontTitle,
            fontSize: 42,
            lineHeight: 1.1,
            color: "#2a2a2a",
          }}
        >
          {wanita.namaPanggilan || "Aulia"}
        </div>
        <div
          style={{
            ...s.accent,
            fontSize: 32,
            fontStyle: "italic",
            lineHeight: 1.4,
          }}
        >
          &amp;
        </div>
        <div
          style={{
            fontFamily: tpl.fontTitle,
            fontSize: 42,
            lineHeight: 1.1,
            color: "#2a2a2a",
          }}
        >
          {pria.namaPanggilan || "Reza"}
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 13,
            letterSpacing: 4,
            color: "#888",
          }}
        >
          {formatDateShort(pengaturanUndangan.tanggalAcara.toString())}
        </div>
        {/* decorative rings */}
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            fontSize: 18,
            opacity: 0.25,
            ...s.accent,
          }}
        >
          ✦
        </div>
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            fontSize: 18,
            opacity: 0.25,
            ...s.accent,
          }}
        >
          ✦
        </div>
      </div>

      <hr style={s.divider} />

      {/* Cerita Kami */}
      <div style={{ padding: "12px 20px" }}>
        <div style={s.sectionTitle}>Cerita Kami</div>
        <p
          style={{
            textAlign: "center",
            color: "#666",
            fontSize: 11,
            marginBottom: 16,
          }}
        >
          Awal mula kami hingga hari ini
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 8,
            textAlign: "center",
          }}
        >
          {[
            {
              icon: "☕",
              label: "Pertama Bertemu",
              date: "12 Mei 2018",
              desc: "Kami bertemu di sebuah kafe kampus",
            },
            {
              icon: "💍",
              label: "Menjalin Hubungan",
              date: "25 Agustus 2019",
              desc: "Hari dimana kami bertentuan dan menjadi pasangan",
            },
            {
              icon: "💌",
              label: "Lamaran",
              date: "16 Desember 2023",
              desc: "Karena kami ingin dengan cinta dan kebaikan",
            },
            {
              icon: "💒",
              label: "Pernikahan",
              date:
                formatDate(pengaturanUndangan.tanggalAcara.toString()) ||
                "22 Juni 2024",
              desc: "Hari bahagia kami yang ingin kami bagikan",
            },
          ].map((item) => (
            <div key={item.label}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{item.icon}</div>
              <div style={{ ...s.accent, fontWeight: "bold", fontSize: 10 }}>
                {item.label}
              </div>
              <div style={{ fontSize: 9, color: "#888", marginTop: 2 }}>
                {item.date}
              </div>
              <div style={{ fontSize: 9, color: "#aaa", marginTop: 2 }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr style={s.divider} />

      {/* Mempelai */}
      <div style={{ padding: "12px 20px" }}>
        <div style={s.sectionTitle}>Mempelai</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            textAlign: "center",
          }}
        >
          {[
            { label: "Mempelai Pria", data: pria },
            { label: "Mempelai Wanita", data: wanita },
          ].map(({ label, data }) => (
            <div
              key={label}
              style={{
                background: tpl.accent + "11",
                borderRadius: 8,
                padding: "12px 8px",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: tpl.accent + "33",
                  margin: "0 auto 8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                }}
              >
                {/* {data.fotoUrl ? (
                  <img
                    src={data.fotoUrl}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  "👤"
                )} */}
              </div>
              <div style={{ ...s.accent, fontWeight: "bold", fontSize: 11 }}>
                {label}
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontFamily: tpl.fontTitle,
                  marginTop: 4,
                }}
              >
                {data.namaPanggilan || "—"}
              </div>
              <div style={{ fontSize: 10, color: "#555", marginTop: 2 }}>
                {data.namaLengkap || "—"}
              </div>
              <div style={{ fontSize: 9, color: "#888", marginTop: 4 }}>
                Putra/i dari
                <br />
                {data.namaAyah || "—"} &amp; {data.namaIbu || "—"}
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr style={s.divider} />

      {/* Waktu & Lokasi */}
      <div style={{ padding: "12px 20px" }}>
        <div style={s.sectionTitle}>Waktu &amp; Lokasi</div>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
        >
          {/* {[
            // { icon: "🕌", title: "Akad Nikah", loc: form.lokasiAkad },
            { icon: "🎊", title: "Resepsi", loc: form.lokasiResepsi },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                textAlign: "center",
                padding: "8px",
                border: `1px solid ${tpl.accent}33`,
                borderRadius: 8,
              }}
            >
              <div style={{ fontSize: 20 }}>{item.icon}</div>
              <div
                style={{
                  ...s.accent,
                  fontWeight: "bold",
                  fontSize: 11,
                  marginTop: 4,
                }}
              >
                {item.title}
              </div>
              <div style={{ fontSize: 11, color: "#333", marginTop: 4 }}>
                {formatDate(form.tanggalAcara)}
              </div>
              <div style={{ fontSize: 10, color: "#666", marginTop: 2 }}>
                {form.waktuMulai} – {form.waktuSelesai} WIB
              </div>
              <div style={{ fontSize: 9, color: "#888", marginTop: 6 }}>
                {item.loc}
              </div>
            </div>
          ))} */}
        </div>
      </div>

      <hr style={s.divider} />

      {/* RSVP */}
      <div style={{ padding: "12px 20px" }}>
        <div style={s.sectionTitle}>Konfirmasi Kehadiran</div>
        <p
          style={{
            textAlign: "center",
            color: "#666",
            fontSize: 11,
            marginBottom: 12,
          }}
        >
          Mohon konfirmasi kehadiran Anda sebelum{" "}
          {formatDate(pengaturanUndangan.tanggalAcara.toString())}
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <input
            readOnly
            placeholder="Nama lengkap"
            style={{
              flex: 1,
              minWidth: 100,
              padding: "6px 10px",
              borderRadius: 6,
              border: `1px solid ${tpl.accent}55`,
              fontSize: 11,
              background: "#fff",
            }}
          />
          <select
            style={{
              padding: "6px 8px",
              borderRadius: 6,
              border: `1px solid ${tpl.accent}55`,
              fontSize: 11,
            }}
          >
            <option>Akan Hadir</option>
            <option>Tidak Hadir</option>
          </select>
          <button
            style={{
              ...s.accentBg,
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "6px 14px",
              fontSize: 11,
              cursor: "pointer",
            }}
          >
            Kirim Konfirmasi
          </button>
        </div>
      </div>

      <hr style={s.divider} />

      {/* Ucapan & Doa */}
      <div style={{ padding: "12px 20px 24px" }}>
        <div style={s.sectionTitle}>Ucapan &amp; Doa</div>
        <p
          style={{
            textAlign: "center",
            color: "#666",
            fontSize: 11,
            marginBottom: 12,
          }}
        >
          Berikan ucapan dan doa terbaik untuk kami
        </p>
        <div
          style={{
            background: tpl.accent + "0d",
            borderRadius: 8,
            padding: 12,
            marginBottom: 8,
          }}
        >
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                ...s.accentBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 13,
                flexShrink: 0,
              }}
            >
              A
            </div>
            <div>
              <div style={{ fontWeight: "bold", fontSize: 11 }}>
                Andi Pratama
              </div>
              <div style={{ fontSize: 9, color: "#999" }}>11 Mei 2024</div>
              <div style={{ fontSize: 11, color: "#555", marginTop: 4 }}>
                Selamat menempuh hidup baru! Semoga menjadi keluarga yang
                sakinah, mawaddah, wa rahmah.
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            ...s.accent,
            fontSize: 11,
            marginTop: 8,
          }}
        >
          Lihat Semua Ucapan →
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          ...s.accentBg,
          color: "#fff",
          textAlign: "center",
          padding: "14px",
          fontSize: 11,
        }}
      >
        <div style={{ fontFamily: tpl.fontTitle, fontSize: 16 }}>
          {wanita.namaPanggilan || "Aulia"} &amp; {pria.namaPanggilan || "Reza"}
        </div>
        <div style={{ marginTop: 4, opacity: 0.8 }}>
          {pengaturanUndangan.namaUndangan}
        </div>
      </div>
    </div>
  );
}
