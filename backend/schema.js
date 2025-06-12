import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import isEmail from "validator/lib/isEmail.js";

dotenv.config();

const SALT_WORK_FACTOR = parseInt(process.env.SALT_WORK_FACTOR || "10");
const EMAIL_HASH_SECRET = process.env.EMAIL_HASH_SECRET || "default";

// Helper to hash emails with HMAC SHA256
function hashEmail(email) {
	return crypto
		.createHmac("sha256", EMAIL_HASH_SECRET)
		.update(email)
		.digest("hex");
}

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true, // ensures hashed email is unique
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
	},
});

// Pre-save hook for password + email hashing
userSchema.pre("save", async function (next) {
	try {
		// Hash email only if it's new or modified
		if (this.isModified("email") && isEmail(this.email)) {
			const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
			this.password = await bcrypt.hash(this.password, salt);
			this.email = hashEmail(this.email);
		}
		next();
	} catch (err) {
		next(err);
	}
});

// Instance method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
	return bcrypt.compare(candidatePassword, this.password);
};

// Static method to find by plain email (hashed internally)
userSchema.statics.findByEmail = async function (plainEmail) {
	const hashedEmail = hashEmail(plainEmail);
	return this.findOne({ email: hashedEmail });
};

userSchema.statics.findByUserId = async function (userId) {
	return this.findOne({ _id: userId });
};

const historiesSchema = new mongoose.Schema({
	foreign_id: {
		type: String,
		required: true,
		unique: true,
	},
	history: {
		type: [
			{
				role: { type: String, required: true },
				parts: [
					{
						text: { type: String, required: true },
					},
				],
			},
		],
		required: false,
	},
});

historiesSchema.statics.findByUserId = async function (userId) {
	return this.findOne({ foreign_id: userId });
};

historiesSchema.methods.updateHistory = async function (history) {
	this.history = history;
	return this.save();
};

historiesSchema.methods.getHistory = async function () {
	return this.history;
};

const User = mongoose.model("User", userSchema);
const Histories = mongoose.model("Histories", historiesSchema);
export { User, Histories };
