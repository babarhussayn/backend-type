import Contact from "../models/contact";
import { Request, Response } from "express";
const contact = {
  send: async (req: Request, res: Response) => {
    try {
      const { name, message, email } = req.body;
      const userMessage = await Contact.create(req.body);
      if (!name || !message || !email) {
        res.status(404).json({ status: false, message: "fill field" });
      }
      res.status(200).json({
        status: true,
        message: "message send successfully",
        data: userMessage,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ status: false, message: error.message });
      }
    }
  },

  getall: async (req: Request, res: Response) => {
    try {
      const allMessage = await Contact.find();
      if (!allMessage) {
        res.status(404).json({ status: false, message: "" });
      }
      res
        .status(200)
        .json({ status: true, message: "all messages", data: allMessage });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ status: 500, message: error.message });
      }
    }
  },
  deleteOne: async (req: Request, res: Response) => {
    try {
      const message = await Contact.findByIdAndDelete(req.body);
      if (!message) {
        res.status(404).json({ status: false, message: "message not found" });
      }
      res
        .status(200)
        .json({ status: true, message: "delete message successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ status: 500, message: error.message });
      }
    }
  },
};
export default contact;
