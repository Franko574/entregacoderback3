import { Schema, model } from "mongoose";

const petSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: String, required: true },
    owner: { type: String, required: true },
    race: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const petModel = model("pet", petSchema);
