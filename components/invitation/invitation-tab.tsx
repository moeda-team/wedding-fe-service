"use client";
import { Check, ChevronDown, Clock, RefreshCcw } from "lucide-react";
import { useForm, Controller, FieldPath } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";
import { Form, FormControl, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";
import UploadPhotoCard from "../ui/upload-photo-card";
import { z } from "zod";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { DatePicker } from "../ui/date-picker";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { InvitationPreview } from "./invitation-preview";
import { InvitationFormValues, invitationSchema } from "@/types/invitation";

const defaultValues: InvitationFormValues = {
  pengaturanUndangan: {
    namaUndangan: "",
    tanggalAcara: new Date(),
    waktuMulai: "",
    waktuSelesai: "",
  },
  pengaturantemplate: {
    templateId: 1,
  },
  mempelaiPria: {
    namaAyah: "",
    namaIbu: "",
    namaPanggilan: "",
    namaLengkap: "",
    usernameInstagram: "",
  },
  mempelaiWanita: {
    namaAyah: "",
    namaIbu: "",
    namaPanggilan: "",
    namaLengkap: "",
    usernameInstagram: "",
  },
};

export default function InvitationTab() {
  const [previewKey, setPreviewKey] = useState(1);

  const templates = [
    {
      id: 1,
      title: "Minimal Floral",
      description: "Soft and modern floral style",
      image: "/images/template-2.png",
    },
    {
      id: 2,
      title: "Luxury Wedding",
      description: "Elegant wedding invitation",
      image: "/images/template-1.png",
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

  const musics = ["tst", "komang gahar"];

  const form = useForm<InvitationFormValues>({
    resolver: zodResolver(invitationSchema),
    defaultValues,
  });

  function onSubmit(values: InvitationFormValues) {
    console.log(values);
  }
  const mempelaiPriaFormLabel: FieldPath<InvitationFormValues>[] = [
    "mempelaiPria.namaPanggilan",
    "mempelaiPria.namaLengkap",
    "mempelaiPria.namaAyah",
    "mempelaiPria.namaIbu",
    "mempelaiPria.usernameInstagram",
  ];
  const mempelaiWanitaFormLabel: FieldPath<InvitationFormValues>[] = [
    "mempelaiWanita.namaPanggilan",
    "mempelaiWanita.namaLengkap",
    "mempelaiWanita.namaAyah",
    "mempelaiWanita.namaIbu",
    "mempelaiWanita.usernameInstagram",
  ];
  return (
    <div className="flex">
      <div className="grid grid-cols-2 gap-2">
        {/* Left column — form */}
        <div className="bg-white p-4 rounded-2xl shadow-sm" id="form-template">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Pengaturan Undangan */}
            <div className="flex flex-col" id="template">
              <div className="bg-pink-primary2 rounded-2xl p-4 mb-4">
                <Collapsible
                  defaultOpen
                  className="rounded-md bg-pink-primary2"
                >
                  <div className="flex items-center space-x-2 bg-pink-primary2">
                    <Label className="font-semibold text-2xl text-font-black-primary">
                      Pengaturan Undangan
                    </Label>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="ms-auto h-14 w-14 bg-pink-primary2 border border-pink-primary2"
                      >
                        <ChevronDown className="!h-10 !w-10 text-font-gray-primary" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="bg-pink-primary2 space-y-4">
                    <p className="font-normal text-lg text-font-gray-primary">
                      Atur nama undangan, waktu acara.
                    </p>
                    <Controller
                      control={form.control}
                      name="pengaturanUndangan.namaUndangan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama Undangan</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nama Undangan"
                              className="bg-white"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Controller
                      control={form.control}
                      name="pengaturanUndangan.tanggalAcara"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tanggal Acara</FormLabel>
                          <FormControl>
                            <DatePicker
                              label="Tanggal Acara"
                              className="w-full rounded-lg"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Controller
                        control={form.control}
                        name="pengaturanUndangan.waktuMulai"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Waktu Mulai</FormLabel>
                            <FormControl>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-full rounded-lg justify-between text-left font-normal text-muted-foreground"
                                  >
                                    Pilih Waktu Mulai
                                    <Clock />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent align="start">
                                  <PopoverHeader>
                                    <PopoverTitle>Waktu Mulai</PopoverTitle>
                                    <PopoverDescription>
                                      Pilih waktu mulai acara.
                                    </PopoverDescription>
                                  </PopoverHeader>
                                </PopoverContent>
                              </Popover>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <Controller
                        control={form.control}
                        name="pengaturanUndangan.waktuSelesai"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Waktu Selesai</FormLabel>
                            <FormControl>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-full rounded-lg justify-between text-left font-normal text-muted-foreground"
                                  >
                                    Pilih Waktu Selesai
                                    <Clock />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent align="start">
                                  <PopoverHeader>
                                    <PopoverTitle>Waktu Selesai</PopoverTitle>
                                    <PopoverDescription>
                                      Pilih waktu selesai acara.
                                    </PopoverDescription>
                                  </PopoverHeader>
                                </PopoverContent>
                              </Popover>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>

              {/* Pengaturan Template */}
              <div className="bg-pink-primary2 rounded-2xl p-4">
                <Collapsible
                  defaultOpen
                  className="rounded-md bg-pink-primary2"
                >
                  <div className="flex items-center space-x-2 bg-pink-primary2">
                    <Label className="font-semibold text-2xl text-font-black-primary">
                      Pengaturan Template
                    </Label>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="ms-auto h-14 w-14 bg-pink-primary2 border border-pink-primary2"
                      >
                        <ChevronDown className="!h-10 !w-10 text-font-gray-primary" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="bg-pink-primary2">
                    <p className="font-normal text-lg text-font-gray-primary">
                      Pilih desain undangan yang sesuai momen spesial anda.
                    </p>
                    <p className="font-medium text-lg text-font-black-primary">
                      Pilih template
                    </p>
                    <Controller
                      control={form.control}
                      name="pengaturantemplate.templateId"
                      render={({ field }) => (
                        <>
                          {/* <Input
                            placeholder="Cari Template..."
                            className="mt-4 mb-2 bg-white rounded-md"
                            {...field}
                          /> */}
                          <div className="grid grid-cols-3 gap-3 ">
                            {templates.map((template) => {
                              const isSelected = previewKey === template.id;

                              return (
                                <div
                                  key={template.id}
                                  onClick={() => {
                                    field.onChange(template.id);

                                    // Only keep this if previewKey is numeric
                                    setPreviewKey(template.id);
                                  }}
                                  className={cn(
                                    "relative cursor-pointer overflow-hidden  transition-all duration-200  p-2",
                                  )}
                                >
                                  {/* Check Icon */}
                                  {isSelected && (
                                    <div className="absolute left-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-white shadow-md">
                                      <Check className="h-4 w-4" />
                                    </div>
                                  )}
                                  <div
                                    className={cn(
                                      isSelected
                                        ? "border-4 border-info  ring-blue-100 rounded-lg mb-2 "
                                        : "",
                                    )}
                                  >
                                    <img
                                      className="w-full aspect-[9/16] object-cover rounded-lg "
                                      src={template.image}
                                      alt={template.title}
                                    />
                                  </div>

                                  {/* <div className="bg-white px-2 py-2 text-center text-sm font-medium">
                                    {template.title}
                                  </div> */}

                                  {isSelected ? (
                                    <Button
                                      onClick={form.handleSubmit(onSubmit)}
                                      className="rounded-lg w-full text-black bg-white border border-font-gray-primary hover:text-white"
                                    >
                                      Pratinjau
                                    </Button>
                                  ) : (
                                    <div className="grid grid-cols-2 text-center">
                                      <Button
                                        className="rounded-lg "
                                        onClick={() => {
                                          setPreviewKey(template.id);
                                        }}
                                      >
                                        Pilih
                                      </Button>
                                      <Button
                                        className="rounded-lg text-black bg-white border border-font-gray-primary hover:text-white"
                                        onClick={form.handleSubmit(onSubmit)}
                                      >
                                        Pratinjau
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </>
                      )}
                    />

                    <h1 className="mt-4 font-semibold text-2xl text-font-black-primary">
                      Musik
                    </h1>
                    <Combobox items={musics}>
                      <ComboboxInput
                        placeholder="Pilih Musik"
                        className="mt-4 mb-2 bg-white rounded-md"
                      >
                        <ComboboxContent>
                          <ComboboxEmpty>No Musics Found.</ComboboxEmpty>
                          <ComboboxList>
                            {musics.map((music) => (
                              <ComboboxItem key={music} value={music}>
                                {music}
                              </ComboboxItem>
                            ))}
                          </ComboboxList>
                        </ComboboxContent>
                      </ComboboxInput>
                    </Combobox>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>

            {/* Mempelai */}
            <div className="flex flex-col mt-4" id="mempelai">
              <div className="bg-pink-primary2 rounded-2xl p-4">
                <Collapsible defaultOpen className="rounded-md">
                  <div className="flex items-center space-x-2">
                    <Label className="font-semibold text-2xl text-font-black-primary">
                      Mempelai
                    </Label>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="ms-auto h-14 w-14 bg-pink-primary2"
                      >
                        <ChevronDown className="!h-10 !w-10 text-font-gray-primary" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="bg-pink-primary2">
                    <p className="font-normal text-lg text-font-gray-primary">
                      Isi data untuk mempelai pria dan mempelai wanita.
                    </p>
                    <Tabs defaultValue="pria" className="w-full">
                      <TabsList variant="line">
                        <TabsTrigger value="pria">Mempelai Pria</TabsTrigger>
                        <TabsTrigger value="wanita">
                          Mempelai Wanita
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="pria">
                        <div className="flex flex-col gap-4 mt-2">
                          {[
                            "Nama Panggilan",
                            "Nama Lengkap",
                            "Nama Ayah",
                            "Nama Ibu",
                            "Username Instagram",
                          ].map((label, index) => (
                            <Controller
                              key={index}
                              control={form.control}
                              name={mempelaiPriaFormLabel[index]}
                              render={({ field }) => (
                                <FormItem>
                                  <div key={label}>
                                    <FormLabel className="text-sm font-medium">
                                      {label}
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder={label}
                                        type="string"
                                        className="mt-1 bg-white"
                                        onChange={(e) => {
                                          field.onChange(e.target.value);
                                        }}
                                      />
                                    </FormControl>
                                  </div>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="wanita">
                        <div className="flex flex-col gap-4 mt-2">
                          {[
                            "Nama Panggilan",
                            "Nama Lengkap",
                            "Nama Ayah",
                            "Nama Ibu",
                          ].map((label) => (
                            <div key={label}>
                              <Label className="text-sm font-medium">
                                {label}
                              </Label>
                              <Input
                                placeholder={label}
                                className="mt-1 bg-white"
                              />
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>

            {/* Cover */}
            <div className="flex flex-col mt-4" id="cover">
              <div className="bg-pink-primary2 rounded-2xl p-4">
                <Collapsible defaultOpen className="rounded-md">
                  <div className="flex items-center space-x-2">
                    <Label className="font-semibold text-2xl text-font-black-primary">
                      Cover
                    </Label>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="ms-auto h-14 w-14 bg-white"
                      >
                        <ChevronDown className="!h-10 !w-10 text-font-gray-primary" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent>
                    <p className="font-normal text-lg text-font-gray-primary">
                      Atur tampilan cover undangan anda
                    </p>
                    <UploadPhotoCard
                      title="Foto Mempelai Pria"
                      titleAttribute="text-xl font-medium text-font-black-primary"
                    />
                    <br />
                    <UploadPhotoCard
                      title="Foto Mempelai Wanita"
                      titleAttribute="text-xl font-medium text-font-black-primary"
                    />
                    <div className="mb-4">
                      <h1 className="text-xl text-font-black-primary font-semibold mb-4">
                        Posisi Foto Mempelai
                      </h1>
                      <RadioGroup>
                        <div className="flex gap-3">
                          <RadioGroupItem
                            className="bg-white"
                            value="pria-wanita"
                            id="foto-pria-wanita"
                          />
                          <Label
                            htmlFor="foto-pria-wanita"
                            className="grid grid-rows-2"
                          >
                            <p>Mempelai Pria - Mempelai Wanita</p>
                            <p className="text-font-gray-primary">
                              Nama mempelai pria akan ditampilkan disebelah
                              kiri, dan mempelai wanita disebelah kanan
                            </p>
                          </Label>
                        </div>
                        <div className="flex gap-3">
                          <RadioGroupItem
                            className="bg-white"
                            value="wanita-pria"
                            id="foto-wanita-pria"
                          />
                          <Label
                            htmlFor="foto-wanita-pria"
                            className="grid grid-rows-2"
                          >
                            <p>Mempelai Wanita - Mempelai Pria</p>
                            <p className="text-font-gray-primary">
                              Nama mempelai wanita akan ditampilkan disebelah
                              kiri, dan mempelai pria disebelah kanan
                            </p>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="mb-4">
                      <h1 className="text-xl text-font-black-primary font-semibold mb-4">
                        Posisi Nama Mempelai
                      </h1>
                      <RadioGroup>
                        <div className="flex gap-3">
                          <RadioGroupItem
                            className="bg-white"
                            value="pria-wanita"
                            id="nama-pria-wanita"
                          />
                          <Label
                            htmlFor="nama-pria-wanita"
                            className="grid grid-rows-2"
                          >
                            <p>Mempelai Pria - Mempelai Wanita</p>
                            <p className="text-font-gray-primary">
                              Nama mempelai pria akan ditampilkan disebelah
                              kiri, dan mempelai wanita disebelah kanan
                            </p>
                          </Label>
                        </div>
                        <div className="flex gap-3">
                          <RadioGroupItem
                            className="bg-white"
                            value="wanita-pria"
                            id="nama-wanita-pria"
                          />
                          <Label
                            htmlFor="nama-wanita-pria"
                            className="grid grid-rows-2"
                          >
                            <p>Mempelai Wanita - Mempelai Pria</p>
                            <p className="text-font-gray-primary">
                              Nama mempelai wanita akan ditampilkan disebelah
                              kiri, dan mempelai pria disebelah kanan
                            </p>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="mb-4">
                      <h1 className="text-lg text-font-black-primary font-semibold">
                        Deskripsi Section Cover
                      </h1>
                      <Textarea
                        placeholder="Ketik di sini..."
                        className="bg-white rounded-md mt-2 shadow-md border-2 border-gray-200"
                      />
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>

            {/* Cerita Kami */}
            <div className="flex flex-col mt-4" id="our-story">
              <div className="bg-pink-primary2 rounded-2xl p-4">
                <div className="flex items-center space-x-2">
                  <Label className="font-semibold text-2xl text-font-black-primary">
                    Cerita Kami
                  </Label>
                  <Button variant="ghost" className="ms-auto h-14 w-14">
                    <ChevronDown className="!h-10 !w-10 text-font-gray-primary" />
                  </Button>
                </div>
                <p className="font-normal text-lg text-font-gray-primary">
                  Bagikan cerita perjalanan hubungan Anda hingga hari spesial
                  ini.
                </p>
                <UploadPhotoCard
                  title="Background Section Cerita (Optional)"
                  titleAttribute="text-lg text-font-black-primary font-semibold"
                />
                <div className="mt-4">
                  <h1 className="text-lg text-font-black-primary font-semibold">
                    Judul
                  </h1>
                  <Textarea
                    id="title-story-field"
                    placeholder="Ketik di sini..."
                    className="bg-white rounded-md mt-2 shadow-md border-2 border-gray-200"
                  />
                </div>
                <div className="mt-4">
                  <h1 className="text-lg text-font-black-primary font-semibold">
                    Isi Cerita
                  </h1>
                  <Textarea
                    id="story-field"
                    placeholder="Ketik di sini..."
                    className="bg-white rounded-md mt-2 shadow-md border-2 border-gray-200"
                  />
                </div>
              </div>
            </div>

            {/* Galeri Foto */}
            <div className="flex flex-col mt-4" id="photo-gallery">
              <div className="bg-pink-primary2 rounded-2xl p-4">
                <div className="flex items-center space-x-2">
                  <Label className="font-semibold text-2xl text-font-black-primary">
                    Galeri Foto
                  </Label>
                  <Button variant="ghost" className="ms-auto h-14 w-14">
                    <ChevronDown className="!h-10 !w-10 text-font-gray-primary" />
                  </Button>
                </div>
                <p className="font-normal text-lg text-font-gray-primary">
                  Unggah foto
                </p>
                <Input
                  placeholder="Cari Template..."
                  className="mt-4 mb-2 bg-white rounded-md"
                />
                <h1 className="font-medium text-lg text-font-black-primary mb-4">
                  Tata Letak Galeri
                </h1>
                <div className="grid grid-cols-2 gap-2">
                  {templates.map((template) => (
                    <div key={template.id} className="text-center">
                      <RadioGroup>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            className="bg-white"
                            value={`layout-${template.id}`}
                            id={`layout-${template.id}`}
                          />
                          <Label htmlFor={`layout-${template.id}`}>
                            {template.title}
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button type="submit">Simpan</Button>
            </div>
          </form>
        </div>

        {/* Right column — preview */}
        <div className="bg-white p-4 rounded-2xl shadow-sm" id="preview">
          <div className="flex flex-col">
            <div className="rounded-2xl p-4">
              <div className="flex">
                <h1 className="font-semibold text-2xl text-font-black-primary">
                  Pratinjau Undangan
                </h1>
                <Button
                  type="button"
                  className="ms-auto bg-white-10-opacity border"
                  onClick={form.handleSubmit(onSubmit)}
                >
                  <RefreshCcw className="text-font-black-primary" />
                  <h2 className="text-font-black-primary text-md">
                    {form.getValues("pengaturanUndangan").namaUndangan ??
                      "Refresh"}
                  </h2>
                </Button>
              </div>
            </div>
          </div>
          <InvitationPreview form={form} />
        </div>
      </div>
    </div>
  );
}
