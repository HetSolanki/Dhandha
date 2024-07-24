import { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { cloudinaryHandler } from "@/Handlers/cloudinaryHandler";
import { useUser } from "@/Context/UserContext";
import { Document, Page } from "@react-pdf/renderer";
import { useState } from "react";

export const InvoiceX = () => {
  const targetRef = useRef();

  const [firstPartCustomers, setFirstPartCustomers] = useState([
    {
      _id: "1",
      delivery_date: "2022-03-01",
      bottle_count: 2,
    },
    {
      _id: "2",
      delivery_date: "2022-03-02",
      bottle_count: 3,
    },
    {
      _id: "3",
      delivery_date: "2022-03-03",
      bottle_count: 4,
    },
  ]);
  const [secondPartCustomers, setSecondPartCustomers] = useState([
    {
      _id: "4",
      delivery_date: "2022-03-04",
      bottle_count: 5,
    },
    {
      _id: "5",
      delivery_date: "2022-03-05",
      bottle_count: 6,
    },
    {
      _id: "6",
      delivery_date: "2022-03-06",
      bottle_count: 7,
    },
  ]);
  const [thirdPartCustomers, setThirdPartCustomers] = useState([
    {
      _id: "7",
      delivery_date: "2022-03-07",
      bottle_count: 8,
    },
    {
      _id: "8",
      delivery_date: "2022-03-08",
      bottle_count: 9,
    },
    {
      _id: "9",
      delivery_date: "2022-03-09",
      bottle_count: 10,
    },
  ]);

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
        <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10 ">
          {/* <!-- Invoice --> */}
          <div className="sm:w-11/12 lg:w-3/4 mx-auto">
            {/* <!-- Card --> */}
            <div className="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl dark:bg-neutral-800">
              {/* <!-- Grid --> */}
              <div className="flex justify-between">
                <div>
                  {/* Logo */}
                  Logo
                  <h1 className="mt-2 text-lg md:text-xl font-semibold text-blue-600 dark:text-white">
                    {/* {user.user.shop_name}
                     */}
                    shop Name
                  </h1>
                </div>
                {/* <!-- Col --> */}

                <div className="text-end">
                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-neutral-200">
                    Invoice #
                  </h2>
                  <span className="mt-1 block text-gray-500 dark:text-neutral-500"></span>
                  {/* {newInvoiceNumber} */}
                  invoice Number
                  <address className="mt-4 not-italic text-gray-800 dark:text-neutral-200">
                    {/* 45 Roker Terrace
            <br />
            Latheronwheel
            <br />
            KW5 8NW, London
            <br />
            United Kingdom <br /> */}
                    {/* {user.user.shop_address} */}
                    Shop Address
                  </address>
                </div>
                {/* <!-- Col --> */}
              </div>
              {/* <!-- End Grid --> */}

              {/* <!-- Grid --> */}
              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                    Bill to:
                  </h3>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                    {/* Customer Name */}
                    {/* {customers[0].cid.cname} */}
                    Customer Name
                  </h3>
                  <address className="mt-2 not-italic text-gray-500 dark:text-neutral-500">
                    {/* 280 Suzanne Throughway,
            <br />
            Breannabury, OR 45801,
            <br />
            United States
            <br /> */}
                    {/* {customers[0].cid.caddress} */}
                    customer address
                    <br />
                    {/* {customers[0].cid.cphone_number} */}
                    customer phone number
                  </address>
                </div>
                {/* <!-- Col --> */}

                <div className="sm:text-end space-y-2">
                  {/* <!-- Grid --> */}
                  <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                        Invoice date:
                      </dt>
                      <dd className="col-span-2 text-gray-500 dark:text-neutral-500">
                        {new Date(Date.now()).toISOString().split("T")[0]}
                      </dd>
                    </dl>
                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                        Due date:
                      </dt>
                      <dd className="col-span-2 text-gray-500 dark:text-neutral-500">
                        {/* {formattedDate} */}
                        due date
                      </dd>
                    </dl>
                  </div>
                  {/* <!-- End Grid --> */}
                </div>
                {/* <!-- Col --> */}
              </div>
              {/* <!-- End Grid --> */}

              {/* <!-- Table --> */}
              <div className="mt-6 sm:flex gap-10">
                <div className="border border-gray-200 p-4 rounded-lg space-y-1 h-full dark:border-neutral-700 sm:w-1/2">
                  <div className="hidden sm:grid sm:grid-cols-2 ">
                    <div className="text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                      Date
                    </div>
                    <div className="text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                      Qty
                    </div>
                  </div>

                  <div className=" sm:block border-b border-gray-200 dark:border-neutral-700"></div>

                  {firstPartCustomers.map((customer) => (
                    // if
                    <div
                      key={customer._id}
                      className="grid grid-cols-2 sm:grid-cols-2 gap-2"
                    >
                      <div>
                        <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                          Date
                        </h5>
                        <p className="font-medium text-gray-800 dark:text-neutral-200">
                          {customer.delivery_date}
                        </p>
                      </div>
                      <div>
                        <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                          Qty
                        </h5>
                        <p className="text-gray-800 dark:text-neutral-200">
                          {customer.bottle_count}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="sm:hidden border-b border-gray-200 dark:border-neutral-700"></div>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg space-y-1 h-full dark:border-neutral-700 sm:w-1/2">
                  <div className="hidden sm:grid sm:grid-cols-2 ">
                    <div className="text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                      Date
                    </div>
                    <div className="text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                      Qty
                    </div>
                  </div>

                  <div className=" sm:block border-b border-gray-200 dark:border-neutral-700"></div>

                  {secondPartCustomers.map((customer) => (
                    // if
                    <div
                      key={customer._id}
                      className="grid grid-cols-2 sm:grid-cols-2 gap-2"
                    >
                      <div>
                        <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                          Date
                        </h5>
                        <p className="font-medium text-gray-800 dark:text-neutral-200">
                          {customer.delivery_date}
                        </p>
                      </div>
                      <div>
                        <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                          Qty
                        </h5>
                        <p className="text-gray-800 dark:text-neutral-200">
                          {customer.bottle_count}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="sm:hidden border-b border-gray-200 dark:border-neutral-700"></div>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg space-y-1 h-full dark:border-neutral-700 sm:w-1/2">
                  <div className="hidden sm:grid sm:grid-cols-2 ">
                    <div className="text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                      Date
                    </div>
                    <div className="text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                      Qty
                    </div>
                  </div>

                  <div className=" sm:block border-b border-gray-200 dark:border-neutral-700"></div>

                  {thirdPartCustomers.map((customer) => (
                    // if
                    <div
                      key={customer._id}
                      className="grid grid-cols-2 sm:grid-cols-2 gap-2"
                    >
                      <div>
                        <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                          Date
                        </h5>
                        <p className="font-medium text-gray-800 dark:text-neutral-200">
                          {customer.delivery_date}
                        </p>
                      </div>
                      <div>
                        <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                          Qty
                        </h5>
                        <p className="text-gray-800 dark:text-neutral-200">
                          {customer.bottle_count}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="sm:hidden border-b border-gray-200 dark:border-neutral-700"></div>
                </div>
              </div>
              {/* <!-- End Table --> */}

              {/* <!-- Flex --> */}
              <div className="mt-8 flex sm:justify-end">
                <div className="w-full max-w-2xl sm:text-end space-y-2">
                  {/* <!-- Grid --> */}
                  <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                        Bottle Price :
                      </dt>
                      <dd className="col-span-2 text-gray-500 dark:text-neutral-500">
                        {/* {customers[0].cid.bottle_price} */}
                        10
                      </dd>
                    </dl>
                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                        Total Delivered Bottle :
                      </dt>
                      <dd className="col-span-2 text-gray-500 dark:text-neutral-500">
                        {/* {totalBottles} */}2
                      </dd>
                    </dl>
                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                        Subtotal:
                      </dt>
                      <dd className="col-span-2 text-gray-500 dark:text-neutral-500">
                        {/* {customers[0].cid.bottle_price * totalBottles} */}
                        20
                      </dd>
                    </dl>

                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                        Total:
                      </dt>
                      <dd className="col-span-2 text-gray-500 dark:text-neutral-500">
                        {/* {customers[0].cid.bottle_price * totalBottles} */}
                        20
                      </dd>
                    </dl>

                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                        Amount paid:
                      </dt>
                      <dd className="col-span-2 text-gray-500 dark:text-neutral-500">
                        {/* {customers[0].cid.bottle_price * totalBottles} */}
                        20
                      </dd>
                    </dl>

                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                        Due balance:
                      </dt>
                      <dd className="col-span-2 text-gray-500 dark:text-neutral-500">
                        ₹0.00
                      </dd>
                    </dl>
                  </div>
                  {/* <!-- End Grid --> */}
                </div>
              </div>
              {/* <!-- End Flex --> */}

              <div className="mt-8 sm:mt-12">
                {/* <h2>LINK :{
          invoicedata.shorturl
          }</h2> */}
                <a
                  // href={invoicedata.shorturl}
                  target="_blank"
                  className="text-blue-600 underline cursor-pointer"
                >
                  {" "}
                  Pay Now
                </a>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                  Thank you!
                </h4>
                <p className="text-gray-500 dark:text-neutral-500">
                  If you have any questions concerning this invoice, use the
                  following contact information:
                </p>
                <div className="mt-2">
                  <p className="block text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {/* {user.user.uid.phone_number} */}
                    shop phone number
                  </p>
                  <p className="block text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {/* {user.user.uid.email} */}
                    shop email
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm text-gray-500 dark:text-neutral-500">
                © 2022 Preline. [Shop Licence]
              </p>
            </div>
            {/* <!-- End Card --> */}

            {/* <!-- Buttons --> */}
            <div className="mt-6 flex justify-end gap-x-3">
              <button
                className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-neutral-800 dark:hover:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                onClick={() => {
                  alert("Fetch Data");
                }}
              >
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Fetch Data
              </button>

              <button
                // onClick={handleprint}
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 6 2 18 2 18 9" />
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <rect width="12" height="8" x="6" y="14" />
                </svg>
                Print
              </button>
            </div>
            {/* <!-- End Buttons --> */}
          </div>
          {/* <!-- End Invoice --> */}
        </div>
        {/* <div>
          <p>Another Content</p>
        </div> */}
      </div>
    </div>
  );
};

export default InvoiceX;
