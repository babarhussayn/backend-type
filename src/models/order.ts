import mongoose, { Mongoose, Schema, Model, model } from "mongoose";

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
        },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          min: 1,
        },
        price: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Order = model("Order", orderSchema);
export default Order;
