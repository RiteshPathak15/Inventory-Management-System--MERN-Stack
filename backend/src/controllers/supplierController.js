import Supplier from "../models/Supplier.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(400).json({ message: "Error fetching suppliers", error });
  }
};

export const addSupplier = [
  upload.single("image"),
  async (req, res) => {
    const {
      name,
      product,
      category,
      buyingPrice,
      contactNumber,
      takesReturns,
      email,
    } = req.body;
    const localFilePath = req.file.path;

    try {
      const result = await uploadOnCloudinary(localFilePath);
      const imageUrl = result?.url || "";

      const newSupplier = new Supplier({
        image: imageUrl,
        name,
        product,
        category,
        buyingPrice,
        contactNumber,
        takesReturns,
        email,
      });

      await newSupplier.save();
      res.status(201).json({ message: "Supplier added successfully", newSupplier });
    } catch (error) {
      res.status(400).json({ message: "Error adding supplier", error });
    }
  },
];
