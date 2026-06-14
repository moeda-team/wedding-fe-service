import z from "zod";

export interface InvitationFormData {
  namaUndangan: string;
  tanggalAcara: string;
  waktuMulai: string;
  waktuSelesai: string;
  templateId: number;
  musik: string;
  mempelaiPria: {
    namaPanggilan: string;
    namaLengkap: string;
    namaAyah: string;
    namaIbu: string;
    fotoUrl: string;
  };
  mempelaiWanita: {
    namaPanggilan: string;
    namaLengkap: string;
    namaAyah: string;
    namaIbu: string;
    fotoUrl: string;
  };
  lokasiAkad: string;
  lokasiResepsi: string;
}

export interface InvitationTemplate {
  id: number;
  name: string;
  accent: string;
  bg: string;
  fontTitle: string;
  style: "elegant" | "modern" | "rustic";
}

export const invitationSchema = z.object({
  pengaturanUndangan: z.object({
    namaUndangan: z.string(),
    tanggalAcara: z.date(),
    waktuMulai: z.string(),
    waktuSelesai: z.string(),
  }),
  pengaturantemplate: z.object({
    templateId: z.number(),
  }),
  mempelaiPria: z.object({
    namaPanggilan: z.string(),
    namaLengkap: z.string(),
    namaAyah: z.string(),
    namaIbu: z.string(),
    usernameInstagram: z.string().optional(),
  }),
  mempelaiWanita: z.object({
    namaPanggilan: z.string(),
    namaLengkap: z.string(),
    namaAyah: z.string(),
    namaIbu: z.string(),
    usernameInstagram: z.string().optional(),
  }),
});

export type InvitationFormValues = z.infer<typeof invitationSchema>;
