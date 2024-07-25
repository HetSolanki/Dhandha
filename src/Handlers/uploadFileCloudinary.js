export const uploadFileCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "wnjb2gh7");
  formData.append("folder", "Dhandha-QR");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dikxaelvp/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  return res.json();
};
