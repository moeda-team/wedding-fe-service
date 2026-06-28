// // components/PhotoUploader.tsx
// import { tempStorage } from "@/app/utils/tempStorage";
// import { useState, useEffect } from "react";

// export function PhotoUploader() {
//   const [preview, setPreview] = useState<string | null>(null);

//   // Load saat mount
//   useEffect(() => {
//   }, []);

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = () => {
//       const base64 = reader.result as string;
//     //   tempStorage.savePhoto(base64);
//       setPreview(base64);
//     };
//     reader.readAsDataURL(file);
//   };

//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={handleFileChange} />
//       {preview && <img src={preview} alt="preview" />}
//     </div>
//   );
// }
