"use client";

import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import * as React from "react";
function cn(...classes: Array<string | boolean | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
export default function UploadPhotoCard({
  title,
  titleAttribute,
}: {
  title?: string;
  titleAttribute?: string;
}) {
  return (
    <Card className="rounded-2xl  border-0 bg-[#f7f1ef] p-4 shadow-none">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <h2
            className={
              titleAttribute ?? "font-semibold text-font-black-primary text-xl"
            }
          >
            {title ?? "Upload Foto"}
          </h2>
          {/* 
          <p className="text-4xl font-semibold text-red-500">
            - Resolusi: xxxx x xxxx
          </p> */}
        </div>

        {/* Upload Area */}
        <label className="group relative flex h-[140px] w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-[#ead9d5] transition hover:opacity-90">
          <Input type="file" accept="image/*" className="hidden" />

          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#7b5d57] text-[#7b5d57]">
            <Plus className="h-8 w-8" />
          </div>
        </label>
      </div>
    </Card>
  );
}
