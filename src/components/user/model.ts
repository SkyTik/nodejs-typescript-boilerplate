import { Document, Model, model, Schema } from "mongoose";

export interface User extends Document {
  email: string;
  username: string;
  password: string;
  refreshToken: string;
}

const userSchema = new Schema<User>(
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    refreshToken: { type: String }
  },
  { timestamps: true, collection: "users" }
);

const userModel: Model<User & Document> = model("user", userSchema);

export default userModel;
