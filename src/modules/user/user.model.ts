import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';


const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'name is required'],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'email is required'],
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);



userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUser>('User', userSchema);
