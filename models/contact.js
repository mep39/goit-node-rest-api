import { Schema, model } from "mongoose";
import { mongooseError } from "../helpers/mongooseError.js";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timeseries: true }
);

contactSchema.post("save", mongooseError);

export const Contact = model("contact", contactSchema);
