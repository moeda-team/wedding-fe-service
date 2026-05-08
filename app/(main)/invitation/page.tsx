import GuestTab from "@/components/invitation/guest-tab";
import { columns } from "@/components/invitation/guest-table-column";
import InvitationTab from "@/components/invitation/invitation-tab";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Guests } from "@/types/guest-interface";
import { MailOpen, Users } from "lucide-react";

export default function InvitationListPage() {
  const User = "Komang & Kayla";
  const titleDesc = `Kelola Undangan Digital: ${User}`;
  const guests: Guests[] = [
    {
      id: "1",
      guestName: "User",
      guestType: "Reguler",
      guestPhoneNumber: "081241",
      guestInvitationLink: "https://example.com/invitation",
    },
    {
      id: "2",
      guestName: "User User",
      guestType: "Reguler",
      guestPhoneNumber: "081241",
      guestInvitationLink: "https://example.com/invitation",
    },
    {
      id: "3",
      guestName: "User User User",
      guestType: "Reguler",
      guestPhoneNumber: "081241",
      guestInvitationLink: "https://example.com/invitation",
    },
    {
      id: "4",
      guestName: "User UserUser User",
      guestType: "Reguler",
      guestPhoneNumber: "081241",
      guestInvitationLink: "https://example.com/invitation",
    },
    {
      id: "5",
      guestName: "User UserUserUserUserUser",
      guestType: "Reguler",
      guestPhoneNumber: "081241",
      guestInvitationLink: "https://example.com/invitation",
    },
    {
      id: "6",
      guestName: "User UserUserUserUserUser",
      guestType: "Reguler",
      guestPhoneNumber: "081241",
      guestInvitationLink: "https://example.com/invitation",
    },
    {
      id: "7",
      guestName: "User UserUserUserUserUser",
      guestType: "Reguler",
      guestPhoneNumber: "081241",
      guestInvitationLink: "https://example.com/invitation",
    },
  ];

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
            <TabsContent value="tamu">
              <GuestTab data={guests} columns={columns}></GuestTab>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </PageWrapper>
  );
}
