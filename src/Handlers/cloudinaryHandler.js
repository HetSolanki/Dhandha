const DOMAIN_NAME = import.meta.env.VITE_API_BASE_URL;

export const cloudinaryHandler = async (public_id) => {
  const customer = await fetch(
    `${DOMAIN_NAME}/api/customers/uploadfile/${public_id}`
  );
  
  return customer.json();
};
  