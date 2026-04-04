import Booking from "../../models/BookingModel.js";
import { errorHandler } from "../../utils/error.js";

export const vendorBookings = async (req, res, next) => {
  try {
    const vendorId = req.user;

    const bookings = await Booking.aggregate([
      {
        $lookup: {
          from: "vehicles",
          localField: "vehicleId",
          foreignField: "_id",
          as: "vehicleDetails",
        },
      },
      {
        $unwind: {
          path: "$vehicleDetails",
        },
      },
      {
        $match: {
          "vehicleDetails.addedBy": vendorId,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $addFields: {
          userDetails: { $arrayElemAt: ["$userDetails", 0] },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error in vendorBookings:", error.message);
    next(errorHandler(500, "Error retrieving vendor bookings"));
  }
};
