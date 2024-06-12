import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const Invoice = () => {
  const [customers, setCustomers] = useState([
    {
      _id: "",
      cid: {
        _id: "",
        cname: "",
        caddress: "",
        cphone_number: "",
        bottle_price: 0,
      },
      bottle_count: 30,
      delivery_date: "2024-06-30",
      delivery_status: "Present",
    },
  ]);

  // const {
  //   cid,
  //   bottle_count,
  //   delivery_date,
  //   delivery_status,
  // } = customers[0];

  const token = localStorage.getItem("token");
  const getData = async (date) => {
    const customers = await fetch(
      `http://localhost:3001/api/customerentry/getallcustomerentry/665623917f6c573a26bec389`,
      {
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    const res = await customers.json();
    if (res.status === "success") {
      //get all current month data function
      setCustomers(res.data);
    } else {
      console.log(res);
    }
  };

  const getdeliverydateData = (date) => {
    getData(format(date, "yyyy-MM-dd"));
  };

  const componentRef = useRef();

  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const prefix = "INV";
  const sequenceNumber = 134;
  const newInvoiceNumber = `${prefix}-${year}${month}${day}-${String(
    sequenceNumber
  ).padStart(4, "0")}`;

  // Function to get the dates in the current month
  const getDatesInMonth = (month, year) => {

      const date = new Date(customers[0].delivery_date);
      const dates = [];
      while (date.getMonth() === month && date.getFullYear() === year) {
        dates.push(new Date(date).toISOString().split("T")[0]);
        date.setDate(date.getDate());
      }
      return dates;
  
  };

  const currentDate = new Date();
  const datesInMonth = getDatesInMonth(
    currentDate.getMonth(),
    currentDate.getFullYear()
  );

  console.log(datesInMonth);
  // Split the numbers into three parts
  const thirdIndex = Math.ceil(datesInMonth.length / 3);
  const firstPart = datesInMonth.slice(0, thirdIndex);
  const secondPart = datesInMonth.slice(thirdIndex, thirdIndex * 2);
  const thirdPart = datesInMonth.slice(thirdIndex * 2);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const selectedCustomers = customers.filter((customer) => {
    const deliveryDate = new Date(customer.delivery_date);
    console.log(deliveryDate.getMonth());
    console.log(currentMonth);
    return (
      deliveryDate.getMonth() === currentMonth &&
      deliveryDate.getFullYear() === currentYear
    );
  });

  const handleprint = useReactToPrint({
    content: () => componentRef.current,
  });
  
  return (
    <>
      <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10 ">
        {/* <!-- Invoice --> */}
        <div className="sm:w-11/12 lg:w-3/4 mx-auto">
          {/* <!-- Card --> */}
          <div
            className="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl dark:bg-neutral-800"
            ref={componentRef}
          >
            {/* <!-- Grid --> */}
            <div className="flex justify-between">
              <div>
                {/* <svg
                  className="size-10"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 26V13C1 6.37258 6.37258 1 13 1C19.6274 1 25 6.37258 25 13C25 19.6274 19.6274 25 13 25H12"
                    className="stroke-blue-600 dark:stroke-white"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M5 26V13.16C5 8.65336 8.58172 5 13 5C17.4183 5 21 8.65336 21 13.16C21 17.6666 17.4183 21.32 13 21.32H12"
                    className="stroke-blue-600 dark:stroke-white"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="13"
                    cy="13.0214"
                    r="5"
                    fill="currentColor"
                    className="fill-blue-600 dark:fill-white"
                  />
                </svg> */}
                LOGO
                <h1 className="mt-2 text-lg md:text-xl font-semibold text-blue-600 dark:text-white">
                  Shop Name
                </h1>
              </div>
              {/* <!-- Col --> */}

              <div className="text-end">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-neutral-200">
                  Invoice #
                </h2>
                <span className="mt-1 block text-gray-500 dark:text-neutral-500"></span>
                {newInvoiceNumber}
                <address className="mt-4 not-italic text-gray-800 dark:text-neutral-200">
                  {/* 45 Roker Terrace
                  <br />
                  Latheronwheel
                  <br />
                  KW5 8NW, London
                  <br />
                  United Kingdom <br /> */}
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
                  {customers[0].cid.cname}
                </h3>
                <address className="mt-2 not-italic text-gray-500 dark:text-neutral-500">
                  {/* 280 Suzanne Throughway,
                  <br />
                  Breannabury, OR 45801,
                  <br />
                  United States
                  <br /> */}
                  {customers[0].cid.caddress}
                  <br />
                  {customers[0].cid.cphone_number}
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
                      03/10/2018
                    </dd>
                  </dl>
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                      Due date:
                    </dt>
                    <dd className="col-span-2 text-gray-500 dark:text-neutral-500">
                      03/11/2018
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

                {firstPart.map((customer) => (
                  // if
                  <div
                    // key={customer._id}
                    className="grid grid-cols-2 sm:grid-cols-2 gap-2"
                  >
                    <div>
                      <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                        Date
                      </h5>
                      <p className="font-medium text-gray-800 dark:text-neutral-200">
                        {/* {customer.delivery_date} */}
                      </p>
                    </div>
                    <div>
                      <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                        Qty
                      </h5>
                      <p className="text-gray-800 dark:text-neutral-200">
                        {/* {console.log(selectedCustomers)}
                        {customer.bottle_count} */}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="sm:hidden border-b border-gray-200 dark:border-neutral-700"></div>
              </div>

              {/* <div className="border border-gray-200 p-4 rounded-lg space-y-1 h-full dark:border-neutral-700 sm:w-1/2">
                <div className="hidden sm:grid sm:grid-cols-2 ">
                  <div className="text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    Date
                  </div>
                  <div className="text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    Qty
                  </div>
                </div>

                <div className="hidden sm:block border-b border-gray-200 dark:border-neutral-700"></div>

                {secondPart.map((number) => (
                  <div
                    key={number}
                    className="grid grid-cols-2 sm:grid-cols-2 gap-2"
                  >
                    <div>
                      <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                        Date
                      </h5>
                      <p className="font-medium text-gray-800 dark:text-neutral-200">
                        {number}
                      </p>
                    </div>
                    <div>
                      <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                        Qty
                      </h5>
                      <p className="text-gray-800 dark:text-neutral-200">1</p>
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

                <div className="hidden sm:block border-b border-gray-200 dark:border-neutral-700"></div>

                {thirdPart.map((number) => (
                  <div
                    key={number}
                    className="grid grid-cols-2 sm:grid-cols-2 gap-2"
                  >
                    <div>
                      <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                        Date
                      </h5>
                      <p className="font-medium text-gray-800 dark:text-neutral-200">
                        {number}
                      </p>
                    </div>
                    <div>
                      <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                        Qty
                      </h5>
                      <p className="text-gray-800 dark:text-neutral-200">1</p>
                    </div>
                  </div>
                ))}

                <div className="sm:hidden border-b border-gray-200 dark:border-neutral-700"></div>
              </div> */}
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
                      {customers[0].cid.bottle_price}
                    </dd>
                  </dl>
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                      Total Delivered Bottle :
                    </dt>
                    <dd className="col-span-2 text-gray-500 dark:text-neutral-500">
                      {/* {bottle_count} */}
                    </dd>
                  </dl>
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                      Subtotal:
                    </dt>
                    <dd className="col-span-2 text-gray-500 dark:text-neutral-500">
                      {/* {cid.bottle_price * bottle_count} */}
                    </dd>
                  </dl>

                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                      Total:
                    </dt>
                    <dd className="col-span-2 text-gray-500 dark:text-neutral-500">
                      {/* {cid.bottle_price * bottle_count} */}
                    </dd>
                  </dl>

                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                      Amount paid:
                    </dt>
                    <dd className="col-span-2 text-gray-500 dark:text-neutral-500">
                      {/* {cid.bottle_price * bottle_count} */}
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
              <h4 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                Thank you!
              </h4>
              <p className="text-gray-500 dark:text-neutral-500">
                If you have any questions concerning this invoice, use the
                following contact information:
              </p>
              <div className="mt-2">
                <p className="block text-sm font-medium text-gray-800 dark:text-neutral-200">
                  Shop Email
                </p>
                <p className="block text-sm font-medium text-gray-800 dark:text-neutral-200">
                  Shop Phone Number
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
                getdeliverydateData("2024-06-10");
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
                stroke-linejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              Fetch Data
            </button>
            <button
              className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-neutral-800 dark:hover:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
              onClick={() => {
                alert("Download");
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
                stroke-linejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              Invoice PDF
            </button>
            <button
              onClick={handleprint}
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
                stroke-linejoin="round"
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
    </>
  );
};

export default Invoice;
