import { Schema, InferSchemaType, model, models, Model } from "mongoose";
import { ModelName } from "@/models";

// Note: Reference these docs for more information on using Mongoose schemas
// withTypeScript: https://mongoosejs.com/docs/typescript/schemas.html

const chunkerSchema = new Schema({
  osrs_username: {
    type: String,
    maxLength: [12, "OSRS Username cannot be longer than 12 characters"],
    minLength: [1, "OSRS Username must be longer than 0 characters"],
  },
  ruleset: {
    type: String,
    maxLength: [50, "ruleset cannot be longer than 50 characters"],
  },
  starting_chunk: {
    type: String,
    maxLength: [50, "Starting Chunk cannot be longer than 50 characters"],
  },
  yt_channel_link: {
    type: String,
    maxLength: [200, "YouTube Channel Link cannot be longer than 200 characters"],
  },
  yt_channel_name: {
    type: String,
    maxLength: [50, "YouTube Channel Name cannot be longer than 50 characters"],
  },
  yt_videos: {
    type: Array,
  },
});

export type Chunker = {
  _id: string;
  osrs_username: string;
  ruleset: string;
  starting_chunk: string;
  yt_channel_link: string;
  yt_channel_name: string;
  yt_videos: object[];
};

const ChunkerModel = (models.Chunker as Model<Chunker>) || model(ModelName.Chunker, chunkerSchema);

export default ChunkerModel;