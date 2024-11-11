import bcrypt from "bcrypt";
import { Document, model, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  lname: string;
  email: string;
  password: string;
  cPassword: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cPassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// export const HashPassword = async (password: string): Promise<string> => {
//   const salt = await bcrypt.genSalt();
//   const hash = await bcrypt.hash(password, salt);
//   return hash;
// };
// export const ComparePassword = async (
//   hash: string,
//   password: string
// ): Promise<boolean> => {
//   const isMatch = await bcrypt.compare(password, hash);
//   return isMatch;
// };
userSchema.pre<IUser>("save" as "save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

const User = model<IUser>("User", userSchema);
export default User;
