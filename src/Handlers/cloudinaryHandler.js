export const cloudinaryHandler = async (public_id) => {
  const customer = await fetch(
    `http://localhost:3001/api/customers/uploadfile/${public_id}`
  );

  return customer.json();
};
  