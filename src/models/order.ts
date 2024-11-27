import mongoose, { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    customer: {
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
      address: {
        type: String,
      },
      name: {
        type: String,
      },
    },
    orderItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
      },
    ],
    shippingAddress: {
      address: String,
      country: String,
      state: String,
      city: String,
    },
    ammount: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["UnPaid", "Pending", "Confirmed", "Dispatched", "Rejected"],
      default: "UnPaid",
    },
  },
  {
    timestamps: true,
  }
);
const Order = model("Order", orderSchema);
export default Order;
