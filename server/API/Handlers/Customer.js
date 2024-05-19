import Customer from "../Schema/customer.js";

export const getAllCustomer = async (req, res) => {
  try {
    const allCustomers = await Customer.find({});
    res.json({ data: allCustomers, status: "success" });
  } catch (error) {
    res.json({ message: "Error" });
  }
};

export const getOneCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.json({ data: customer, status: "success" });
  } catch (error) {
    res.json({ message: "Error" });
  }
};

export const createCustomer = async (req, res) => {
  try {
    const newCustomer = await Customer.create({
      cname: req.body.cname,
      cphone_number: req.body.cphone_number,
      caddress: req.body.caddress,
      bottle_price: req.body.bottle_price,
      delivery_sequence_number: req.body.delivery_sequence_number,
    });

    res.json({ data: newCustomer, status: "success" });
  } catch (error) {
    res.json({ error });
  }
};

export const updateCustomer = async (req, res) => {
  const updatedCustomer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      cname: req.body.cname,
      cphone_number: req.body.cphone_number,
      caddress: req.body.caddress,
      bottle_price: req.body.bottle_price,
      delivery_sequence_number: req.body.delivery_sequence_number,
    },
    { new: true }
  );

  res.json({ data: updatedCustomer, status: "success" });
};

export const deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        res.json({ data: deletedCustomer, status: "success" });
    }
    catch (error) {
        res.json({ message: "Error" });
    }
}
