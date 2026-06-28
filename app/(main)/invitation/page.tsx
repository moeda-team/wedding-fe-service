"use client";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  CheckCircle,
  CheckCircle2,
  CheckLineIcon,
  Link,
  MailOpen,
  Paintbrush,
  Pencil,
  PlusCircle,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function InvitationListPage() {
  const router = useRouter();
  const User = "Komang & Kayla";
  const titleDesc = ` Langkah-Langkah Buat Undangan Digital`;
  const listUndangan = [
    {
      id: 1,
      pria: "Komang",
      wanita: "Kayla",
      createdAt: "2023-06-14T10:00:00.000Z",
      updatedAt: "2023-06-14T10:00:00.000Z",
      totalGuest: 20,
      totalLinke: 18,
    },
    {
      id: 2,
      pria: "Komang",
      wanita: "Kayla",
      createdAt: "2023-06-14T10:00:00.000Z",
      updatedAt: "2023-06-14T10:00:00.000Z",
      totalGuest: 20,
      totalLinke: 18,
    },
    {
      id: 3,
      pria: "Komang",
      wanita: "Kayla",
      createdAt: "2023-06-14T10:00:00.000Z",
      updatedAt: "2023-06-14T10:00:00.000Z",
      totalGuest: 20,
      totalLinke: 18,
    },
  ];
  return (
    <PageWrapper title="">
      <div className="font-geist">
        <div className="flex w-full gap-4">
          <h1 className="text-2xl font-semibold text-font-black-primary">
            {titleDesc}
          </h1>
        </div>

        <p className="text-font-gray-primary">
          Ikuti 3 langkah mudah untuk mmebuat undangan digital
        </p>
        <section id="step-card">
          <div className="grid grid-cols-3 gap-2">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
                <CardAction>Card Action</CardAction>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>{" "}
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
                <CardAction>Card Action</CardAction>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>{" "}
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
                <CardAction>Card Action</CardAction>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          </div>
          <br></br>
          <div className="flex w-full ">
            <div className="rounded-lg bg-white flex flex-row p-4  w-full">
              <div className="flex-col my-auto ">
                <h1>Rp. 89000 / undangan</h1>
                <p>Sekali bayar untuk 1 proyek undangan</p>
              </div>
              <hr className="h-14 border-r-2 mx-4" />
              <div className="flex my-auto p-2 mx-2 bg-pink-primary2 rounded-xl">
                <CheckCircle2 />
                <p>Berlaku Selamanya</p>
              </div>
              <div className="flex my-auto p-2 mx-2 bg-pink-primary2 rounded-xl">
                <Pencil />
                <p>Bebas ubah data</p>
              </div>{" "}
              <div className="flex my-auto p-2 mx-2 bg-pink-primary2 rounded-xl">
                <Link />
                <p>Link tamu unlimited</p>
              </div>{" "}
              <div className="flex my-auto p-2 mx-2 bg-pink-primary2 rounded-xl">
                <Paintbrush />
                <p>Tanpa Watermark</p>
              </div>
              <div className="flex ms-auto my-auto">
                <Button className="bg-pink-primary text-white">
                  <PlusCircle /> Buat Undangan Baru
                </Button>
              </div>
            </div>
          </div>
          <h1>Undangan Saya</h1>
          <p>Kelola semua undangan anda</p>
          {listUndangan.map((item) => (
            <div className="flex w-full my-2 ">
              <Card>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                  <CardAction>Card Action</CardAction>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => router.push(`/invitation/${item.id}`)}
                    className="bg-black text-white "
                  >
                    <Pencil /> Kelola Undangan
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </section>
      </div>
    </PageWrapper>
  );
}
