import mongoose from "mongoose";
import vehicle from "../../models/vehicleModel.js";
import { errorHandler } from "../../utils/error.js";
import { uploader } from "../../utils/cloudinaryConfig.js";
import { base64Converter } from "../../utils/multer.js";

const validateObjectId = (id, fieldName = "ID") => {
  if (!id || typeof id !== "string") {
    throw new Error(`Invalid ${fieldName}: must be a non-empty string`);
  }

  const trimmedId = id.trim();

  if (!mongoose.Types.ObjectId.isValid(trimmedId)) {
    throw new Error(`Invalid ${fieldName}: must be a valid MongoDB ObjectId`);
  }

  return trimmedId;
};

const validateRequiredString = (value, fieldName) => {
  if (!value || typeof value !== "string" || !value.trim()) {
    throw new Error(`${fieldName} is required and must be a non-empty string`);
  }
  return value.trim();
};

const sanitizeVehicleData = (data) => {
  const requiredFields = [
    "registeration_number",
    "company",
    "name",
    "model",
    "title",
    "base_package",
    "price",
    "year_made",
    "fuel_type",
    "description",
    "seat",
    "transmition_type",
    "car_type",
    "location",
    "district",
  ];

  const sanitized = {};

  for (const field of requiredFields) {
    if (data[field] !== undefined) {
      sanitized[field] =
        typeof data[field] === "string" ? data[field].trim() : data[field];
    }
  }

  return sanitized;
};

// vendor add vehicle
export const vendorAddVehicle = async (req, res, next) => {
  try {
    if (!req.body) {
      return next(errorHandler(500, "body cannot be empty"));
    }
    if (!req.files || req.files.length === 0) {
      return next(errorHandler(500, "image cannot be empty"));
    }

    const sanitizedData = sanitizeVehicleData(req.body);
    const {
      registeration_number,
      company,
      name,
      model,
      title,
      base_package,
      price,
      year_made,
      fuel_type,
      description,
      seat,
      transmition_type,
      registeration_end_date,
      insurance_end_date,
      polution_end_date,
      car_type,
      location,
      district,
    } = sanitizedData;

    let validatedAddedBy;
    try {
      validatedAddedBy = validateObjectId(req.user, "addedBy");
    } catch (error) {
      return next(errorHandler(400, error.message));
    }

    const uploadedImages = [];
    const encodedFiles = base64Converter(req);

    try {
      await Promise.all(
        encodedFiles.map(async (cur) => {
          const result = await uploader.upload(cur.data, {
            public_id: cur.filename,
          });
          uploadedImages.push(result.secure_url);
        })
      );
    } catch (error) {
      return next(
        errorHandler(500, `could not upload image to cloudinary: ${error.message}`)
      );
    }

    try {
      const addVehicle = new vehicle({
        registeration_number,
        company,
        name,
        image: uploadedImages,
        model,
        car_title: title,
        car_description: description,
        base_package,
        price,
        year_made,
        fuel_type,
        seats: seat,
        transmition: transmition_type,
        insurance_end: insurance_end_date,
        registeration_end: registeration_end_date,
        pollution_end: polution_end_date,
        car_type,
        created_at: Date.now(),
        location,
        district,
        isAdminAdded: false,
        addedBy: validatedAddedBy,
        vendorId: validatedAddedBy,
        isAdminApproved: false,
        isRejected: false,
        isDeleted: "false",
      });

      await addVehicle.save();

      res.status(200).json({
        message: "Vehicle submitted for admin approval successfully",
        data: addVehicle,
      });
    } catch (error) {
      if (error.code === 11000) {
        return next(errorHandler(409, "product already exists"));
      }
      next(errorHandler(500, "product not uploaded"));
    }
  } catch (error) {
    next(errorHandler(400, "vehicle failed to add"));
  }
};

//edit vendorVehicles
export const vendorEditVehicles = async (req, res, next) => {
  try {
    const vehicle_id = req.params.id;

    let validatedVehicleId;
    try {
      validatedVehicleId = validateObjectId(vehicle_id, "Vehicle ID");
    } catch (error) {
      return next(errorHandler(400, error.message));
    }

    if (!req.body?.formData) {
      return next(errorHandler(404, "Add data to edit first"));
    }

    const sanitizedFormData = sanitizeVehicleData(req.body.formData);
    const {
      registeration_number,
      company,
      name,
      model,
      title,
      base_package,
      price,
      year_made,
      description,
      Seats,
      transmitionType,
      Registeration_end_date,
      insurance_end_date,
      polution_end_date,
      carType,
      fuelType,
      vehicleLocation,
      vehicleDistrict,
    } = sanitizedFormData;

    try {
      const query = {
        _id: { $eq: new mongoose.Types.ObjectId(validatedVehicleId) },
      };

      const updateData = {
        registeration_number,
        company,
        name,
        model,
        car_title: title,
        car_description: description,
        base_package,
        price,
        year_made,
        fuel_type: fuelType,
        seats: Seats,
        transmition: transmitionType,
        insurance_end: insurance_end_date,
        registeration_end: Registeration_end_date,
        pollution_end: polution_end_date,
        car_type: carType,
        updated_at: Date.now(),
        location: vehicleLocation,
        district: vehicleDistrict,
        isAdminApproved: false,
        isRejected: false,
      };

      const edited = await vehicle.findOneAndUpdate(
        query,
        { $set: updateData },
        { new: true }
      );

      if (!edited) {
        return next(errorHandler(404, "data with this id not found"));
      }
      res.status(200).json(edited);
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyValue) {
        const duplicateField = Object.keys(error.keyPattern)[0];
        const duplicateValue = error.keyValue[duplicateField];
        return next(
          errorHandler(409, `${duplicateField} '${duplicateValue}' already exists`)
        );
      }
      next(errorHandler(500, `Error updating vehicle: ${error.message}`));
    }
  } catch (error) {
    next(errorHandler(500, "something went wrong"));
  }
};

//delete vendor Vehicle soft delete
export const vendorDeleteVehicles = async (req, res, next) => {
  try {
    const vehicle_id = req.params.id;

    let validatedVehicleId;
    try {
      validatedVehicleId = validateObjectId(vehicle_id, "Vehicle ID");
    } catch (error) {
      return next(errorHandler(400, error.message));
    }

    const query = {
      _id: { $eq: new mongoose.Types.ObjectId(validatedVehicleId) },
    };

    const updateData = {
      $set: { isDeleted: "true" },
    };

    const softDeleted = await vehicle.findOneAndUpdate(query, updateData, {
      new: true,
    });

    if (!softDeleted) {
      return next(errorHandler(400, "vehicle not found"));
    }

    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    next(errorHandler(500, "error while vendorDeleteVehicles"));
  }
};

//show vendor vehicles
export const showVendorVehicles = async (req, res, next) => {
  try {
    if (!req.body) {
      throw errorHandler(400, "User not found");
    }
    const { _id } = req.body;

    let validatedUserId;
    try {
      validatedUserId = validateObjectId(_id, "User ID");
    } catch (error) {
      return next(errorHandler(400, error.message));
    }

    const vendorsVehicles = await vehicle.aggregate([
      {
        $match: {
          addedBy: { $eq: validatedUserId },
          $and: [
            {
              $or: [{ isDeleted: { $eq: "false" } }, { isDeleted: { $eq: false } }],
            },
            {
              $or: [{ isAdminAdded: { $eq: false } }, { isAdminAdded: { $eq: "false" } }],
            },
          ],
        },
      },
    ]);

    if (!vendorsVehicles || vendorsVehicles.length === 0) {
      throw errorHandler(400, "No vehicles found");
    }

    res.status(200).json(vendorsVehicles);
  } catch (error) {
    console.error("Error in showVendorVehicles:", error);
    next(errorHandler(500, "Error in showVendorVehicles"));
  }
};
