import { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { cloudinaryHandler } from "@/Handlers/cloudinaryHandler";

export const InvoiceX = () => {
  const targetRef = useRef();

  const handleClick = async () => {
    alert("Generating PDF...");
    const canvas = await html2canvas(targetRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 0, 0);
    const pdfBlob = pdf.output("blob");

    console.log("pdfBlob", pdfBlob);
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64data = reader.result.split(",")[1]; // Get base64 string without the prefix
      console.log("base64data", base64data);
      try {
        const formData = new FormData();
        formData.append("file", `data:application/pdf;base64,${base64data}`);
        formData.append("upload_preset", "wnjb2gh7"); // Replace with your upload preset
        formData.append("folder", "Dhandha");
        // formData.append("api_key", "211774992852877"); // Replace with your Cloudinary API key
        // formData.append("timestamp", Math.floor(Date.now() / 1000));

        console.log("File", formData.get("file"));
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dikxaelvp/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();

        const res = await fetch(
          "https://graph.facebook.com/v19.0/366116843258872/messages",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer EAAMpyLmGYZCYBO9NeAe6svqf9QezPdCoFkGAM2TO0s50jimSZCk5XvNrTk60u7gB4edHEmdVZCIwL0ZBI2wE2zfuaE7vxcALEJH5HzUwslZCuXZAshQEUZAN93W69ivZA8dhy7cEfkx9zbXjzZCW18edqV8mfd8IszaTS4ZAfcRZCxssWQP7zOKTKwSIBZBR1AOy11kh3vh38bkR6lnh6ije47p8LhIq44pZCAlXLZBY4mPWVLFZCAZD",
            },
            body: JSON.stringify({
              messaging_product: "whatsapp",
              recipient_type: "individual",
              to: "918849698524",
              type: "document",
              document: {
                link: responseData.secure_url,
                caption: "Kem Palty, Mamlad-Dar 👋",
                filename: "Invoice",
              },
            }),
          }
        );

        console.log(res);
        console.log(
          `PDF uploaded! Download it from ${responseData.secure_url}`
        );

        console.log(responseData.public_id);

        const resDelete = await cloudinaryHandler(responseData.public_id);
        console.log(resDelete);
      } catch (error) {
        console.error("Failed to upload PDF:", error);
        alert("Failed to upload PDF.");
      }
    };

    reader.readAsDataURL(pdfBlob); // Read the PDF blob as a base64 string
  };

  return (
    <div>
      <button onClick={handleClick}>Send Invoice</button>
      <div
        ref={targetRef}
        className="p-4"
        style={{ position: "absolute", top: "-10000px", left: "-10000px" }}
      >
        <div>
          <p>Another Content</p>
        </div>
      </div>
    </div>
  );
};
