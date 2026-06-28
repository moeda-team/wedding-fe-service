"use client";

import { useEffect, useState } from "react";
import type { ComponentProps } from "react";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { tempStorage } from "@/app/utils/tempStorage";

interface UploadPhotoCardProps {
  id: string;
  title?: string;
  titleAttribute?: string;
  preview?: string;
  inputProps?: ComponentProps<typeof Input>;
}

export default function UploadPhotoCard({
  id,
  title,
  titleAttribute,
  inputProps,
  preview,
}: UploadPhotoCardProps) {
  return (
    <Card className="rounded-2xl border-0 bg-[#f7f1ef] p-4 shadow-none">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <h2
            className={
              titleAttribute ?? "text-xl font-semibold text-font-black-primary"
            }
          >
            {title ?? "Upload Foto"}
          </h2>
        </div>

        <label
          htmlFor={id}
          className="group relative flex h-[140px] w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-[#ead9d5] transition hover:opacity-90"
        >
          <Input
            id={id}
            type="file"
            accept="image/*"
            className="hidden"
            {...inputProps}
          />
          {preview ? (
            <>
              <img
                key={id}
                src={preview}
                alt="Preview"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                <Plus className="h-8 w-8 text-white" />
              </div>
            </>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#7b5d57] text-[#7b5d57]">
              <Plus className="h-8 w-8" />
            </div>
          )}
        </label>
      </div>
    </Card>
  );
}
