import InvitationTab from "@/components/invitation/invitation-tab";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import UploadPhotoCard from "@/components/ui/upload-photo-card";
import { MailOpen, Users } from "lucide-react";

export default function InvitationListPage() {
  const User = "Komang & Kayla";
  const titleDesc = `Kelola Undangan Digital: ${User}`;
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
    <PageWrapper title="">
      <div className="font-geist">
        <div className="flex w-full gap-4">
          <h1 className="text-2xl font-semibold text-font-black-primary">
            {titleDesc}
          </h1>
          <Button
            className="ms-auto bg-btn-warning w-44 h-12"
            size={"lg"}
            color="#d97706"
          >
            Belum Bayar
          </Button>
        </div>
        <h1 className="text-font-gray-primary text-xl">
          Atur desain, isi informasi, tambahkan tamu, dan siapkan undangan untuk
          dibagikan.
        </h1>
        <section>
          <Tabs defaultValue="undangan">
            <TabsList variant="line">
              <TabsTrigger value="undangan">
                <MailOpen></MailOpen> Undangan
              </TabsTrigger>
              <TabsTrigger value="tamu">
                <Users></Users> Tamu
              </TabsTrigger>
            </TabsList>
            <TabsContent value="undangan">
              <InvitationTab></InvitationTab>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </PageWrapper>
  );
}
