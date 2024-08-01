const DOMAIN_NAME = import.meta.env.VITE_DOMAIN_NAME;

export const cloudinaryHandler = async (public_id) => {
  const customer = await fetch(
    `${DOMAIN_NAME}/api/customers/uploadfile/${public_id}`
  );
  
  return customer.json();
};
  