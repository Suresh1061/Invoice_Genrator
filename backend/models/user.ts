import { model, Schema } from "mongoose";

type UserType = {
     name: string;
     email: string;
     password: string;
}

const userSchema = new Schema<UserType>({
     name: {
          type: String,
          require: true
     },
     email: {
          type: String,
          require: true,
          unique: true,
          match: [/.+\@.+\..+/, 'Please use a valid email address'],
     },
     password: {
          type: String,
          require: true
     }
}, { timestamps: true })

const User = model<UserType>("User", userSchema)
export default User;