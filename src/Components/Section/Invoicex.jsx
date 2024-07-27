/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { cloudinaryHandler } from "@/Handlers/cloudinaryHandler";
import { GetCustomerInvoice } from "@/Handlers/GetCustomerInvoice";
import { useUser } from "@/Context/UserContext";
import { Send } from "lucide-react";

export const InvoiceX = ({ cid }) => {
  const user = useUser();

  const [customerInvoice, setCustomerInvoice] = useState(null);

  const [firstPartCustomers, setFirstPartCustomers] = useState([]);
  const [secondPartCustomers, setSecondPartCustomers] = useState([]);
  const [thirdPartCustomers, setThirdPartCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomerData = async () => {
      const customerData = await GetCustomerInvoice(cid);
      if (customerData?.data) {
        setCustomerInvoice(customerData.data);
        const partitionSize = Math.ceil(
          customerData.data[0]?.customerEntry?.length / 3
        );
        console.log(partitionSize);
        setFirstPartCustomers(
          customerData.data[0]?.customerEntry?.slice(0, partitionSize)
        );
        setSecondPartCustomers(
          customerData.data[0]?.customerEntry?.slice(
            partitionSize,
            partitionSize * 2
          )
        );
        setThirdPartCustomers(
          customerData.data[0]?.customerEntry?.slice(partitionSize * 2)
        );
      }
    };
    fetchCustomerData();
  }, [cid]);

  const handleClick = async () => {
    console.log(customerInvoice);
    alert("Generating PDF...");
    const pdf = new jsPDF();

    // Shop details
    pdf.setFontSize(18);
    pdf.setFont("Helvetica-Bold", "bold");
    pdf.text(`${user?.user?.shop_name}`, 15, 20);
    pdf.setFontSize(18);
    pdf.setFont("Helvetica-Bold", "bold");
    pdf.text("Jalaram Vadapav", 145, 20);

    // Invoice details
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.text("Invoice #", 145, 35);
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.text("INV-20240616-0134", 145, 42);

    // Customer details
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.text("Bill to:", 15, 35);
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "normal");
    pdf.text(`${customerInvoice[0]?.customerDetails?.cname}`, 15, 42);
    pdf.text(`${customerInvoice[0]?.customerDetails?.caddress}`, 15, 49);
    pdf.text(`${customerInvoice[0]?.customerDetails?.cphone_number}`, 15, 56);

    // Invoice dates
    pdf.setFontSize(12);
    pdf.text("Invoice date: 2024-06-16", 145, 49);
    pdf.text("Due date: 2024-06-21", 145, 56);

    // Table headers
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text("DATE", 15, 80);
    pdf.text("QTY", 45, 80);
    pdf.text("DATE", 85, 80);
    pdf.text("QTY", 115, 80);
    pdf.text("DATE", 145, 80);
    pdf.text("QTY", 175, 80);

    // Table content
    pdf.setFont("helvetica", "normal");
    let yOffset = 90;
    const maxRows = Math.max(
      firstPartCustomers?.length,
      secondPartCustomers?.length,
      thirdPartCustomers?.length
    );

    for (let i = 0; i < maxRows; i++) {
      if (firstPartCustomers[i]) {
        pdf.text(firstPartCustomers[i]?.delivery_date, 15, yOffset);
        pdf.text(firstPartCustomers[i]?.bottle_count.toString(), 45, yOffset);
      }
      if (secondPartCustomers[i]) {
        pdf.text(secondPartCustomers[i]?.delivery_date, 85, yOffset);
        pdf.text(secondPartCustomers[i]?.bottle_count.toString(), 115, yOffset);
      }
      if (thirdPartCustomers[i]) {
        pdf.text(thirdPartCustomers[i]?.delivery_date, 145, yOffset);
        pdf.text(thirdPartCustomers[i]?.bottle_count.toString(), 175, yOffset);
      }
      yOffset += 7;
    }

    // Total section
    yOffset += 20;
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text("Bottle Price:", 15, yOffset);
    pdf.setFont("helvetica", "normal");
    pdf.text(
      `${customerInvoice[0]?.customerDetails?.bottle_price}`,
      95,
      yOffset
    );
    yOffset += 10;

    pdf.setFont("helvetica", "bold");
    pdf.text("Total Delivered Bottle:", 15, yOffset);
    pdf.setFont("helvetica", "normal");
    pdf.text(`${customerInvoice[0]?.totalBottle}`, 95, yOffset);
    yOffset += 10;

    const total_amount =
      customerInvoice[0]?.totalBottle *
      customerInvoice[0]?.customerDetails?.bottle_price;

    pdf.setFont("helvetica", "bold");
    pdf.text("Subtotal:", 15, yOffset);
    pdf.setFont("helvetica", "normal");
    pdf.text(`${total_amount}`, 95, yOffset);
    yOffset += 10;

    pdf.setFont("helvetica", "bold");
    pdf.text("Total:", 15, yOffset);
    pdf.setFont("helvetica", "normal");
    pdf.text(`${total_amount}`, 95, yOffset);
    yOffset += 10;

    pdf.setFont("helvetica", "bold");
    pdf.text("Amount paid:", 15, yOffset);
    pdf.setFont("helvetica", "normal");
    pdf.text(`${total_amount}`, 95, yOffset);
    yOffset += 10;

    pdf.setFont("helvetica", "bold");
    pdf.text("Due balance:", 15, yOffset);
    pdf.setFont("helvetica", "bold");
    pdf.text(`Rs. ${total_amount}`, 95, yOffset);

    // Footer
    yOffset += 20;
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text("Thank you!", 15, yOffset);
    yOffset += 7;

    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(0, 0, 0, 0.5);
    pdf.text(
      "If you have any questions concerning this invoice, use the following contact information:",
      15,
      yOffset
    );
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    yOffset += 10;
    pdf.text("9909066572", 15, yOffset);
    yOffset += 7;
    pdf.text("dhruvprajapati66572@gmail.com", 15, yOffset);
    yOffset += 15;

    pdf.setTextColor(0, 0, 0, 0.5);
    pdf.setFont("helvetica", "italic");
    pdf.text("© 2024 Dhandha pvt. ltd.", 15, yOffset);

    const pdfBlob = pdf.output("blob");
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64data = reader.result.split(",")[1];

      try {
        const formData = new FormData();
        formData.append("file", `data:application/pdf;base64,${base64data}`);
        formData.append("upload_preset", process.env.CLOUD_UPLOAD_PRESET);
        formData.append("folder", "Dhandha");

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`,
          { method: "POST", body: formData }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        console.log(
          `PDF uploaded! Download it from ${responseData.secure_url}`
        );

        const date = new Date();

        const total_amount =
          customerInvoice[0]?.totalBottle *
          customerInvoice[0]?.customerDetails?.bottle_price;

        const res = await fetch(
          `https://graph.facebook.com/${process.env.WHATSAPP_API_VERSION}/${process.env.WHASTAPP_PHONE_NUMBER_ID}/messages`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer EAAQs6aaQ9cABO76X0ZAxOG5ZBczyZAZChwH0LxcmvOKevXXbQcizygEHnpHZA8qtuzuWTSOarg8pPKrcYI2ZA6QEZBPUe2TSxg6liI7Uo7RQzRl6aJyrPrd9BPMOsdtyIK4W2YJevhWBkgZBpWCm5cQCEtchJlFqXdqetlHxFkwnwfWI6UE4sntWq9inrnuARXkHZBwZDZD`, // Use your access token
            },
            body: JSON.stringify({
              messaging_product: "whatsapp",
              recipient_type: "individual",
              to: `91${customerInvoice[0]?.customerDetails?.cphone_number}`,
              type: "template",
              // template: {
              //   name: "hello_world",
              //   language: {
              //     code: "en_US",
              //   },
              // },
              template: {
                name: "purchase_receipt_2",
                language: {
                  code: "en_US",
                },
                components: [
                  {
                    type: "header",
                    parameters: [
                      {
                        type: "document",
                        document: {
                          link: responseData.secure_url,
                          filename: `${date.getMonth()} - ${date.getFullYear()}`,
                        },
                      },
                    ],
                  },
                  {
                    type: "body",
                    parameters: [
                      { type: "text", text: total_amount },
                      {
                        type: "text",
                        text: customerInvoice[0]?.customerDetails?.caddress,
                      },
                      { type: "text", text: "Invoice" },
                    ],
                  },
                ],
              },
            }),
          }
        );

        const data = await res.json();
        if (!res.ok) {
          throw new Error(`Error: ${data.error.message}`);
        } else {
          console.log("Message sent successfully!", data);
          alert("Message sent successfully!");
        }

        // const resDelete = await cloudinaryHandler(responseData.public_id);
        // console.log(resDelete);
      } catch (error) {
        console.error("Failed to upload PDF:", error);
        alert("Failed to upload PDF.");
      }
    };

    reader.readAsDataURL(pdfBlob);
  };

  return (
    <div className="cursor-pointer items-center">
      <Send onClick={handleClick} size={24} color="black" />
    </div>
  );
};

export default InvoiceX;
