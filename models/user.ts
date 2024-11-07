import { Schema, InferSchemaType, model, models, Model } from "mongoose";
import isEmail from 'validator/lib/isEmail';
import { ModelName } from "@/models";

// Note: Reference these docs for more information on using Mongoose schemas
// withTypeScript: https://mongoosejs.com/docs/typescript/schemas.html

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please add an username"],
    unique: [true, "A user with that username already exists"],
    maxLength: [20, "Username cannot be longer than 20 characters"],
    minLength: [1, "Username must be at least 1 character long"],
    validate: {
      validator: function (v: string) {
        return /^[a-zA-Z0-9_]+$/.test(v);
      },
      message: "Please enter a valid email",
    },
  },
  email: {
    type: String,
    required: [true, "Please add an email address"],
    unique: [true, "A user with that email address already exists"],
    maxLength: [320, "Email cannot be longer than 320 characters"],
    validate: {
      validator: function (v: string) {
        // return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        return isEmail(v);
      },
      message: "Please enter a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Password is a required value"],
    maxLength: [256, "Password cannot be longer than 256 characters"],
  },
  provider: {
    type: String,
    required: [true, "Please include the signup method (provider)"],
  },
  role: {
    type: String,
  },
  firstName: {
    type: String,
    maxLength: [50, "First Name cannot be longer than 50 characters"],
  },
  lastName: {
    type: String,
    maxLength: [50, "Last Name cannot be longer than 50 characters"],
  },
  location: {
    type: String,
    maxLength: [50, "Location cannot be longer than 50 characters"],
  },
  github: {
    type: String,
    maxLength: [39, "GitHub Username cannot be longer than 39 characters"],
  },
  twitter: {
    type: String,
    maxLength: [15, "Twitter Handle cannot be longer than 15 characters"],
  },
  linkedin: {
    type: String,
    maxLength: [2083, "LinkedIn URL cannot be longer than 2,083 characters"],
  },
  linkText: {
    type: String,
    maxLength: [2083, "Website URL cannot be longer than 2,083 characters"],
  },
  linkUrl: {
    type: String,
    maxLength: [2083, "Website URL cannot be longer than 2,083 characters"],
  },
  occupation: {
    type: String,
    maxLength: [80, "Website URL cannot be longer than 80 characters"],
  },
  organization: {
    type: String,
    maxLength: [80, "Website URL cannot be longer than 80 characters"],
  },
  stripeCustomerId: {
    type: String,
    unique: [true, "A user with that stripeCustomerId already exists"],
  },
  stripeSubscriptionStatus: {
    type: String,
  },
});

// export type User = InferSchemaType<typeof userSchema> & {
//   _id: string;
// };

export type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  provider: string;
  role: string;
  firstName: string;
  lastName: string;
  location: string;
  github: string;
  twitter: string;
  linkedin: string;
  linkText: string;
  linkUrl: string;
  occupation: string;
  organization: string;
  stripeCustomerId: string;
  stripeSubscriptionStatus: string;
};

const UserModel = (models.User as Model<User>) || model(ModelName.User, userSchema);

export default UserModel;