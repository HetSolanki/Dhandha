export const addcustomer = async (data) => {
    const customer = await fetch("http://localhost:3001/api/customers/customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cname: data.cname,
        cphone_number: data.cphone_number,
        caddress: data.caddress,
        bottle_price: data.bottle_price,
        delivery_sequence_number: data.delivery_sequence_number,
      }),
    });
  
    return customer.json();
  };
  