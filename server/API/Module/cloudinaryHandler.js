import cloudinary from "cloudinary";
const { v2: cloudinaryV2 } = cloudinary;
import fetch from "node-fetch";
import fs from "fs";

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: "dikxaelvp",
  api_key: "211774992852877",
  api_secret: "8WJ28UnL0ostRH6HYWbpnLFSlF0",
});

// Path to the PDF file you want to upload
const pdfFilePath = "C:/Users/Win 10/Downloads/page.pdf";

export async function uploadPDF() {
  try {
    // Upload the PDF to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(pdfFilePath, {
      resource_type: "raw", // Use 'raw' for non-image files like PDFs
    });
    console.log(uploadResponse.secure_url);

    const res = await fetch(
      "https://graph.facebook.com/v19.0/366116843258872/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer EAAMpyLmGYZCYBO2wSD4Ehvj2dBW6gjgLVPZB3pM0p87wnat5nHFbVJdAFySjQERm97XqS6MKu69hctUdi0LSjApTOpP4UZCfBdZBT6h0yZBTeZCLYOvl8QbJdB10kjgnaYdSL9hmZAZCRJSFMkwC1ZCOPPbaNlL2Hfs2OZB1NCkv0smRJpaeZBdTTZBEfbBY4V2IuJXIt4kxaRB1J5Q4O0T4lnGF4pyZAFblInbzjutLWd2iAEtkZD",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: "918849698524",
          type: "document",
          document: {
            link: uploadResponse.secure_url,
            caption: "Kem Palty, Mamlad-Dar 👋",
            filename: "My-Salary",
          },
        }),
      }
    );

    console.log(res);
    console.log("Upload successful:", uploadResponse);
    return uploadResponse.public_id; // Return the public ID of the uploaded file
  } catch (error) {
    console.error("Error uploading PDF:", error);
    throw error;
  }
}

export async function deletePDF(publicId) {
  try {
    // Delete the PDF from Cloudinary

    const deleteResponse = await cloudinary.uploader.destroy(
      `Dhandha/${publicId}`,
      {
        resource_type: "raw",
      }
    );
    console.log("Delete successful:", deleteResponse);
  } catch (error) {
    console.error("Error deleting PDF:", error);
    throw error;
  }
}

export async function main(public_id) {
  try {
    await deletePDF(public_id);
    return { message: "File operations are done" };
  } catch (error) {
    console.error("Error in main function:", error);
  }
}
