import Supplier from "../models/Supplier.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";

const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (error) {
    console.error("Error fetching suppliers:", error); // Log the error for debugging
    res.status(500).json({ message: "Server error", error });
  }
};

const createSupplier = async (req, res) => {
  try {
    const {
      name,
      category,
      contactNumber,
      email,
      takesReturns,
    } = req.body;
    const localFilePath = req.file?.path;

    let imageUrl = "";
    if (localFilePath) {
      const result = await uploadOnCloudinary(localFilePath);
      imageUrl = result?.url || "";
    }

    const newSupplier = new Supplier({
      image: imageUrl,
      name,
      category,
      contactNumber,
      email,
      takesReturns,
    });

    const savedSupplier = await newSupplier.save();
    res
      .status(201)
      .json({
        message: "Supplier created successfully",
        newSupplier: savedSupplier,
      });
  } catch (error) {
    console.error("Error creating supplier:", error); // Log the error for debugging
    res.status(500).json({ message: "Server error", error });
  }
};

const updateSupplier = async (req, res) => {
  try {
    const supplierId = req.params.id;
    const {
      name,
      category,
      contactNumber,
      email,
      takesReturns,
    } = req.body;
    const localFilePath = req.file?.path;

    let imageUrl = "";
    if (localFilePath) {
      const result = await uploadOnCloudinary(localFilePath);
      imageUrl = result?.url || "";
    }

    const updatedSupplier = await Supplier.findByIdAndUpdate(
      supplierId,
      {
        image: imageUrl || req.body.image,
        name,
        category,
        contactNumber,
        email,
        takesReturns,
      },
      { new: true }
    );

    if (!updatedSupplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json(updatedSupplier);
  } catch (error) {
    console.error("Error updating supplier:", error); // Log the error for debugging
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteSupplier = async (req, res) => {
  try {
    const supplierId = req.params.id;
    await Supplier.findByIdAndDelete(supplierId);
    res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    console.error("Error deleting supplier:", error); // Log the error for debugging
    res.status(500).json({ message: "Server error", error });
  }
};

export { getAllSuppliers, createSupplier, updateSupplier, deleteSupplier };
