import { SelectInput, useField } from "payload/components/forms";
import { ChangeEvent, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function UploadImages() {

  const [pic, setPic] = useState<FileList | null>(null);
  function handlePhoto(e: ChangeEvent<HTMLInputElement>) {
    setPic(e.target.files);
  }
  console.log(pic)
//   const storeImage = async (image) => {
//     return new Promise((resolve, rejected) => {
//       const fileName = `${auth.currentUser?.uid}-${image.name}-${Math.floor(
//         Math.random() * 10000000
//       )}`;
//       const storageRef = ref(storage, fileName);
//       const uploadTask = uploadBytesResumable(storageRef, image);
//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log("Upload is " + progress + "% done");
//         },
//         (error) => {
//           console.log("error");
//           rejected(error);
//         },
//         () => {
//           // Upload completed successfully, now we can get the download URL
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             resolve(downloadURL);
//           });
//         }
//       );
//     });
//   };
  return (
    <div>
      <h1 className="font-bold">upload image</h1>
      <label
        htmlFor="formFile"
        className="flex items-center gap-2 cursor-pointer"
      >
        <AiOutlineCloudUpload className="text-[40px] text-blue-gray-600" />
        <input
          className=" mt-1 mr-2 cursor-pointer outline-none w-full file:hidden rounded-sm "
          type="file"
          id="formFile"
          onChange={(e) => handlePhoto(e)}
          multiple
          accept=".jpg,.png,.jpeg,.webp"
          required
        />
      </label>
    </div>
  );
}
