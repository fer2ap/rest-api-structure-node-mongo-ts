import { hashPassword, sameName, setLastUpdated } from '@models/users/users.methods';
import { findByName, findOneOrCreate } from '@models/users/users.statics';
import { Schema } from 'mongoose';

const UserSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, index: { unique: true }, lowercase: true },
	password: { type: String, required: true, select: false },
	passwordResetToken: { type: String, select: false },
	passwordResetTokenExpires: { type: Date, select: false },
	createdAt: { type: String, default: new Date() },
	lastUpdate: { type: String, default: new Date() }
});

UserSchema.methods.sameName = sameName;

UserSchema.statics.findOneOrCreate = findOneOrCreate;
UserSchema.statics.findByName = findByName;

UserSchema.pre('save', hashPassword);
UserSchema.pre('update', setLastUpdated);

export default UserSchema;
