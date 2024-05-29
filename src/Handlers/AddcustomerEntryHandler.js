export const addcustomerEntry = async (data) => {
    const customerentry = await fetch("http://localhost:3001/api/customerentry/addcustomerentry", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cid: data.cid,
            bottle_count: data.no_of_bottles,
            delivery_date: Date.now(),
            delivery_status: data.delivery_status,
        }),
    });

    return customerentry.json();
}
