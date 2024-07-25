import Shop from "../Schema/shop.js";

export const getShop = async (req, res) => {
  const shop = await Shop.findOne({ uid: req.params.id }).populate("uid");

  if (!shop) {
    return res.json({ data: "No Shop Found", status: "failed" });
  }

  res.json({ data: shop, status: "success" });
};

export const createShop = async (req, res) => {
  try {
    const newShop = await Shop.create({
      shop_name: req.body.shop_name,
      uid: req.user.id,
    });

    res.json({ data: newShop, status: "success" });
  } catch (error) {
    res.json({ error });
  }
};

export const updateShop = async (req, res) => {
  const updatedShop = await Shop.findOneAndUpdate(
    { uid: req.user.id },
    {
      shop_name: req.body.shop_name,
      shop_address: req.body.shop_address,
      publicid: req.body.publicid,
    },
    { new: true }
  );

  res.json({ data: updatedShop, status: "success" });
};

export const deleteShop = async (req, res) => {
  const deletedShop = await Shop.findByIdAndDelete(req.params.id);

  if (!deletedShop) {
    return res.json({ data: "No Shop Found", status: "failed" });
  }

  res.json({ data: deletedShop, status: "success" });
};

export const uploadQR = async (req, res) => {
  const deletedShop = await Shop.findByIdAndDelete(req.params.id);

  if (!deletedShop) {
    return res.json({ data: "No Shop Found", status: "failed" });
  }

  res.json({ data: deletedShop, status: "success" });
};
