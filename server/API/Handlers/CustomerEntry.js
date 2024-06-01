import CustomerEntry from "../Schema/customerEntry.js";

export const getAllCustomerEntry = async (req, res) => {
  try {
    const allCustomerEntry = await CustomerEntry.find({ cid: req.params.id });
    if (!allCustomerEntry) {
      return res.json({ message: "No Customer's Entry Found", status: "error" });
    }
    res.json({ data: allCustomerEntry, status: "success" });
  } catch (error) {
    res.json({ message: "Error" });
  }
};

export const getAllCustomerEntrys = async (req, res) => {
  try {
    const allCustomerEntry = await CustomerEntry.find({
    });
    if (!allCustomerEntry) {
      return res.json({ message: "No any Customer's Entry Found", status: "error" });
    }
    res.json({ data: allCustomerEntry, status: "success" });
  } catch (error) {
    res.json({ message: "Error" });
  }
}

// export const getOneCustomerEntry = async (req, res) => {
//   try {
//     const customerEntry = await CustomerEntry.findById(req.params.id);
//     if (!customerEntry) {
//       return res.json({ message: "No Customer Entry Found", status: "error" });
//     }
//     res.json({ data: customerEntry, status: "success" });
//   } catch (error) {
//     res.json({ message: "Error" });
//   }
// };

export const createCustomerEntry = async (req, res) => {
  try {
    const newCustomerEntry = await CustomerEntry.create({
      cid: req.body.cid,
      bottle_count: req.body.bottle_count,
      delivery_date: req.body.delivery_date,
      delivery_status: req.body.delivery_status,
    });

    res.json({ data: newCustomerEntry, status: "success" });
  } catch (error) {
    res.json({ error });
  }
};

export const updateCustomerEntry = async (req, res) => {
  const updatedCustomerEntry = await CustomerEntry.findByIdAndUpdate(
    req.params.id,
    {
      cid: req.body.cid,
      bottle_count: req.body.bottle_count,
      delivery_date: req.body.delivery_date,
      delivery_status: req.body.delivery_status,
    },
    { new: true }
  );

  res.json({ data: updatedCustomerEntry, status: "success" });
};

export const deleteCustomerEntry = async (req, res) => {
  try {
    const deletedCustomerEntry = await CustomerEntry.findByIdAndDelete(
      req.params.id
    );
    if (!deletedCustomerEntry) {
      return res.json({ message: "No Customer's Entry Found", status: "error" });
    }
    res.json({ data: deletedCustomerEntry, status: "success" });
  } catch (error) {
    res.json({ message: "Error" });
  }
};
