import Shop from "../Schema/shop.js";

export const getShop = async (req, res) => {
  const shop = await Shop.findOne({ uid: req.params.id }).populate("uid");
  console.log("SHOP", shop);
  res.json({ data: shop, status: "success" });
};

export const createShop = async (req, res) => {
  console.log(req.user);
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
  const updatedShop = await Shop.findByIdAndUpdate(
    req.params.id,
    {
      shop_name: req.body.shop_name,
      shop_address: req.body.shop_address,
    },
    { new: true }
  );

  res.json({ data: updatedShop, status: "success" });
};

export const deleteShop = async (req, res) => {
  const deletedShop = await Shop.findByIdAndDelete(req.params.id);
  res.json({ data: deletedShop, status: "success" });
};
