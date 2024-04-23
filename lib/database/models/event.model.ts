import { Schema, model, models } from "mongoose";

export interface IEvent extends Document {
  _id: string;
  title: string; // Required string
  description?: string; // Optional string
  location?: string;
  createdAt: Date; // Date with default to current timestamp
  imageUrl: string; // Required string (URL to the event image)
  startDateTime: Date; // Date with default to current timestamp
  endDateTime: Date; // Date with default to current timestamp
  price?: string; // Optional string
  isFree?: boolean; // Optional boolean
  url?: string; // Optional string (external link for more info)
  category: { _id: string; name: string }; // Reference to Category schema
  organizer: { _id: string; firstName: string; lastName: string }; // Reference to User schema
}

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },
  price: { type: String },
  isFree: { type: Boolean, required: false },
  url: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
});

const Event = models.Event || model("Event", EventSchema);

export default Event;
