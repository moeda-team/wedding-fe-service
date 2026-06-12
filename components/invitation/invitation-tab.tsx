import { ChevronDown, RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";
import UploadPhotoCard from "../ui/upload-photo-card";
import { Switch } from "../ui/switch";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

export default function InvitationTab() {
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
    {
      id: 6,
      title: "Luxury Wedding",
      description: "Elegant wedding invitation",
      image: "/images/template-1.png",
    },
    {
      id: 7,
      title: "Minimal Floral",
      description: "Soft and modern floral style",
      image: "/images/template-2.png",
    },
    {
      id: 8,
      title: "Classic White",
      description: "Simple classy invitation",
      image: "/images/template-3.png",
    },
    {
      id: 9,
      title: "Romantic Gold",
      description: "Luxury gold themed design",
      image: "/images/template-4.png",
    },
    {
      id: 10,
      title: "Rustic Bloom",
      description: "Warm botanical aesthetics",
      image: "/images/template-5.png",
    },
  ];
  const musics = ["tst", "komang gahar"];
  return (
    <div className="flex">
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <div className="flex flex-col" id="template">
            <div className="bg-pink-primary2 rounded-2xl p-4 ">
              <Collapsible
                defaultOpen
                className="rounded-md data-[state=open]:bg-muted bg-pink-primary2"
              >
                <div className="flex items-center space-x-2 bg-pink-primary2">
                  <Switch id="template-switch"></Switch>
                  <Label className="font-semibold text-2xl text-font-black-primary">
                    Pengaturan Template
                  </Label>

                  <CollapsibleTrigger asChild className="bg-pink-primary2">
                    <Button
                      variant="ghost"
                      className="ms-auto h-14 w-14 bg-pink-primary2 border border-pink-primary2 "
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
                  <Input
                    alt="Search"
                    placeholder="Cari Template..."
                    className="mt-4 mb-2 bg-white rounded-md "
                  ></Input>
                  <div className="grid grid-cols-5 gap-2">
                    {templates.map((template) => (
                      <div key={template.id} className=" ">
                        <img
                          className="rounded-2xl"
                          height={120}
                          src={template.image}
                          alt={template.title}
                        ></img>
                      </div>
                    ))}
                  </div>
                  <h1 className="mt-4 font-semibold text-2xl text-font-black-primary">
                    Musik
                  </h1>
                  <Combobox items={musics}>
                    <ComboboxInput
                      placeholder="Pilih Musik"
                      className="mt-4 mb-2 bg-white rounded-md "
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
          <div className="flex flex-col mt-4" id="mempelai">
            <div className="bg-pink-primary2 rounded-2xl p-4 ">
              <Collapsible
                defaultOpen
                className="rounded-md data-[state=close]:bg-muted"
              >
                <div className="flex items-center space-x-2">
                  <Switch id="mempelai-switch"></Switch>
                  <Label className="font-semibold text-2xl text-font-black-primary">
                    Cover
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
                      <TabsTrigger value="wanita">Mempelai Wanita</TabsTrigger>
                    </TabsList>

                    <TabsContent value="pria">
                      <div className="flex flex-col">
                        <Form className="max-w-md mx-2">
                          <FormField>
                            <FormItem>
                              <FormLabel htmlFor="namaPanggilan">
                                Nama Panggilan
                              </FormLabel>
                              <FormControl>
                                <input
                                  id="namaPanggilan"
                                  type="text"
                                  placeholder="Nama Panggilan"
                                  className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 bg-white"
                                />
                              </FormControl>
                            </FormItem>
                          </FormField>
                          <FormField>
                            <FormItem>
                              <FormLabel htmlFor="namaPanggilan">
                                Nama Panggilan
                              </FormLabel>
                              <FormControl>
                                <input
                                  id="namaPanggilan"
                                  type="text"
                                  placeholder="Nama Panggilan"
                                  className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 bg-white"
                                />
                              </FormControl>
                            </FormItem>
                          </FormField>
                          <FormField>
                            <FormItem>
                              <FormLabel htmlFor="namaPanggilan">
                                Nama Panggilan
                              </FormLabel>
                              <FormControl>
                                <input
                                  id="namaPanggilan"
                                  type="text"
                                  placeholder="Nama Panggilan"
                                  className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 bg-white"
                                />
                              </FormControl>
                            </FormItem>
                          </FormField>
                          <FormField>
                            <FormItem>
                              <FormLabel htmlFor="namaPanggilan">
                                Nama Panggilan
                              </FormLabel>
                              <FormControl>
                                <input
                                  id="namaPanggilan"
                                  type="text"
                                  placeholder="Nama Panggilan"
                                  className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 bg-white"
                                />
                              </FormControl>
                            </FormItem>
                          </FormField>
                        </Form>
                      </div>
                    </TabsContent>

                    <TabsContent value="wanita">
                      <div className="flex flex-col">
                        <Form className="max-w-md mx-2">
                          <FormField>
                            <FormItem>
                              <FormLabel htmlFor="namaPanggilan">
                                Nama Panggilan
                              </FormLabel>
                              <FormControl>
                                <input
                                  id="namaPanggilan"
                                  type="text"
                                  placeholder="Nama Panggilan"
                                  className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 bg-white"
                                />
                              </FormControl>
                            </FormItem>
                          </FormField>
                          <FormField>
                            <FormItem>
                              <FormLabel htmlFor="namaPanggilan">
                                Nama Panggilan
                              </FormLabel>
                              <FormControl>
                                <input
                                  id="namaPanggilan"
                                  type="text"
                                  placeholder="Nama Panggilan"
                                  className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 bg-white"
                                />
                              </FormControl>
                            </FormItem>
                          </FormField>
                          <FormField>
                            <FormItem>
                              <FormLabel htmlFor="namaPanggilan">
                                Nama Panggilan
                              </FormLabel>
                              <FormControl>
                                <input
                                  id="namaPanggilan"
                                  type="text"
                                  placeholder="Nama Panggilan"
                                  className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 bg-white"
                                />
                              </FormControl>
                            </FormItem>
                          </FormField>
                          <FormField>
                            <FormItem>
                              <FormLabel htmlFor="namaPanggilan">
                                Nama Panggilan
                              </FormLabel>
                              <FormControl>
                                <input
                                  id="namaPanggilan"
                                  type="text"
                                  placeholder="Nama Panggilan"
                                  className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 bg-white"
                                />
                              </FormControl>
                            </FormItem>
                          </FormField>
                        </Form>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
          <div className="flex flex-col mt-4" id="cover">
            <div className="bg-pink-primary2 rounded-2xl p-4 ">
              <Collapsible
                defaultOpen
                className="rounded-md data-[state=close]:bg-muted"
              >
                <div className="flex items-center space-x-2">
                  <Switch id="coverswitch"></Switch>
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
                  ></UploadPhotoCard>
                  <br></br>
                  <UploadPhotoCard
                    title="Foto Mempelai Wanita"
                    titleAttribute="text-xl font-medium text-font-black-primary"
                  ></UploadPhotoCard>
                  <div className="mb-4">
                    <h1 className="text-xl text-font-black-primary font-semibold mb-4">
                      Posisi Foto Mempelai
                    </h1>
                    <RadioGroup className="">
                      <div className="flex  gap-3 ">
                        <RadioGroupItem
                          className="bg-white"
                          value="mempelai pria - mempelai wanita"
                          id="option-one"
                        />
                        <Label
                          htmlFor="option-one"
                          className="grid grid-rows-2"
                        >
                          <p>Mempelai Pria - Mempelai Wanita</p>
                          <p className="text-font-gray-primary">
                            Nama mempelai pria akan ditampilkan disebelah kiri,
                            dan mempelai wanita disebelah kanan
                          </p>
                        </Label>
                      </div>
                      <div className="flex gap-3">
                        <RadioGroupItem
                          className="bg-white"
                          value="Mempelai Wanita - Mempelai Pria"
                          id="option-two"
                        />
                        <Label
                          htmlFor="option-two"
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
                    <RadioGroup className="">
                      <div className="flex  gap-3 ">
                        <RadioGroupItem
                          className="bg-white"
                          value="mempelai pria - mempelai wanita"
                          id="option-one"
                        />
                        <Label
                          htmlFor="option-one"
                          className="grid grid-rows-2"
                        >
                          <p>Mempelai Pria - Mempelai Wanita</p>
                          <p className="text-font-gray-primary">
                            Nama mempelai pria akan ditampilkan disebelah kiri,
                            dan mempelai wanita disebelah kanan
                          </p>
                        </Label>
                      </div>
                      <div className="flex gap-3">
                        <RadioGroupItem
                          className="bg-white"
                          value="Mempelai Wanita - Mempelai Pria"
                          id="option-two"
                        />
                        <Label
                          htmlFor="option-two"
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
                    ></Textarea>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
          <div className="flex flex-col mt-4" id="our-story">
            <div className="bg-pink-primary2 rounded-2xl p-4 ">
              <div className="flex items-center space-x-2">
                <Switch id="our-story-switch"></Switch>
                <Label className="font-semibold text-2xl text-font-black-primary">
                  Cerita Kami
                </Label>
                <Button variant="ghost" className="ms-auto h-14 w-14">
                  <ChevronDown className="!h-10 !w-10 text-font-gray-primary" />
                </Button>
              </div>
              <p className="font-normal text-lg text-font-gray-primary">
                Bagikan cerita perjalanan hubungan Anda hingga hari spesial ini.
              </p>
              <UploadPhotoCard
                title="Background Section Cerita (Optional)"
                titleAttribute="text-lg text-font-black-primary font-semibold"
              ></UploadPhotoCard>
              <div className="mt-4">
                <h1 className="text-lg text-font-black-primary font-semibold">
                  Judul
                </h1>
                <Textarea
                  id="title-story-field"
                  placeholder="Ketik di sini..."
                  className="bg-white rounded-md mt-2 shadow-md border-2 border-gray-200"
                ></Textarea>
              </div>
              <div className="mt-4">
                <h1 className="text-lg text-font-black-primary font-semibold">
                  Isi Cerita
                </h1>
                <Textarea
                  id="story-field"
                  placeholder="Ketik di sini..."
                  className="bg-white rounded-md mt-2 shadow-md border-2 border-gray-200"
                ></Textarea>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-4" id="photo-gallery">
            <div className="bg-pink-primary2 rounded-2xl p-4 ">
              <div className="flex items-center space-x-2">
                <Switch id="photo-gallery-switch"></Switch>
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
                alt="Search"
                placeholder="Cari Template..."
                className="mt-4 mb-2 bg-white rounded-md "
              ></Input>
              <h1 className="font-medium text-lg text-font-black-primary mb-4">Tata Letak Galeri</h1>
              <div className="grid grid-cols-2 gap-2">
                {templates.map((template) => (
                  <div key={template.id} className="text-center">
                    <RadioGroup className=" text-center">
                      <div className="flex text-center">
                        <RadioGroupItem
                          className="bg-white text-center"
                          value="mempelai pria - mempelai wanita"
                          id="option-one"
                        />
                        Test
                      </div>
                    </RadioGroup>
                  </div>
                ))}
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <div className="flex flex-col">
            <div className="rounded-2xl p-4">
              <div className="flex">
                <h1 className="font-semibold text-2xl text-font-black-primary">
                  Pratinjau Undangan
                </h1>
                <Button className="ms-auto bg-white-10-opacity border">
                  <RefreshCcw className="text-font-black-primary"></RefreshCcw>{" "}
                  <h2 className="text-font-black-primary text-md">Refresh</h2>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
