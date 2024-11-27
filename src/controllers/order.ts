import { Request, Response } from "express";
import Order from "../models/order";
import { resolve } from "path";

interface orderItems {
  quantity: number;
  price: number;
}
interface customer {
  email: string;
  phone: string;
  name: string;
  address: string;
}
interface shippingAddress {
  address: string;
  country: string;
  state: string;
  city: string;
}

interface orderSet {
  item: orderItems[];
  customer: customer;
  address: shippingAddress;
  amount: number;
}

const order = {
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      const orderData: orderSet = req.body;
      const newOrder = await Order.create(orderData);

      res.status(200).json({
        status: true,
        data: newOrder,
        message: "Order created successfully",
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ status: true, message: error.message });
      }
    }
  },

  allOrders: async (req: Request, res: Response): Promise<void> => {
    try {
      const orders = await Order.find({})
        .populate("orderItems.productId")
        .populate("customer");
      if (!orders) {
        res.status(404).json({ status: false, message: "orders not found" });
      }
      res.status(200).json({ status: true, data: orders });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ status: false, message: error.message });
      }
    }
  },
  orderById: async (req: Request, res: Response): Promise<void> => {
    try {
      const orderId: string = req.body;
      const order = await Order.findById(orderId).populate(
        "orderItems.productId"
      );
      res.status(200).json({ status: true, data: order });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ status: false, message: error.message });
      }
    }
  },
  deleteOrder: async (req: Request, res: Response): Promise<void> => {
    try {
      const order = await Order.findByIdAndDelete(req.body);
      if (!order) {
        res.status(404).json({ status: false, message: "order id not found" });
      }
      res
        .status(200)
        .json({ status: true, message: "order delete sucessfully" });
    } catch (error) {
      if (error instanceof Error)
        res.status(500).json({ status: false, message: error.message });
    }
  },
  updateOrder: async (req: Request, res: Response): Promise<void> => {
    try {
      const { status, id } = req.body;
      const order = await Order.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
      if (!order) {
        res.status(404).json({ status: false, message: "id not found" });
      }
      res.status(200).json({
        status: true,
        message: "order update sucessfully",
        data: order,
      });
    } catch (error) {
      if (error instanceof Error)
        res.status(500).json({ status: false, message: error.message });
    }
  },
};

export default order;
