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

//Hash Password //
userSchema.pre<IUser>("save" as "save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (err) {
    if (err instanceof Error) return next(err);
  }
});

/*******************      compare password ******************* */

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const User = model<IUser>("User", userSchema);
export default User;
