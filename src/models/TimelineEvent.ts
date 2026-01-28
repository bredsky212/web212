import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITimelineEvent extends Document {
    year: string;
    era: string;
    title: string;
    description: string;
    icon?: string;
    imageUrl?: string;
    order: number;
}

const TimelineEventSchema = new Schema<ITimelineEvent>(
    {
        year: { type: String, required: true },
        era: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String },
        imageUrl: { type: String },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export const TimelineEvent: Model<ITimelineEvent> =
    mongoose.models.TimelineEvent ||
    mongoose.model<ITimelineEvent>("TimelineEvent", TimelineEventSchema);
