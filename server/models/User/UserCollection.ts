"use strict";

/**
 * Module dependencies.
 */

import mongoose, { Error, Model } from "mongoose";
import { compareSync, hashSync } from "bcrypt";
import UserDocument from "./UserDocument";

const Schema = mongoose.Schema;
const oAuthTypes = ["github", "twitter", "google", "linkedin"];

/**
 * User Schema
 */

interface UserMethods {
  encryptPassword(password: string): string;
  skipValidation(): boolean;
  authenticate(password: string): boolean;
}

const UserSchema = new Schema<UserDocument, Model<UserDocument>, UserMethods>({
  name: { type: String, default: "" },
  email: { type: String, default: "" },
  username: { type: String, default: "" },
  provider: { type: String, default: "" },
  hashed_password: { type: String, default: "" },
  _password: { type: String, default: "" },
  authToken: { type: String, default: "" },
});

/**
 *
 * Methods
 */

UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} password
   * @return {Boolean}
   * @api public
   */

  authenticate: function (password: string) {
    return compareSync(password, this.hashed_password);
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */

  encryptPassword: function (password: string) {
    if (!password) return "";
    try {
      return hashSync(password, 10);
    } catch (err: unknown) {
      console.log(err);
      return "error encrypting password";
    }
  },

  /**
   * Validation is not required if using OAuth
   */

  skipValidation: function () {
    return Boolean(~oAuthTypes.indexOf(this.provider));
  },
};

/**
 * Statics
 */

UserSchema.statics = {
  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  load: function (options, cb) {
    options.select = options.select || "name username";
    return this.findOne(options.criteria)
      .select(options.select)
      .exec()
      .then((user: UserDocument | null) => cb(null, user));
  },
};
const validatePresenceOf: (password: string) => boolean = (value) =>
  Boolean(value && value.length);

/**
 * Virtuals
 */

UserSchema.virtual("password")
  .set(function (password: string) {
    this._password = password;
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

/**
 * Validations
 */

// the below 5 validations only apply if you are signing up traditionally

UserSchema.path("name").validate(function (name) {
  if (this.skipValidation()) return true;
  return name.length;
}, "Name cannot be blank");

UserSchema.path("email").validate(function (email) {
  if (this.skipValidation()) return true;
  return email.length;
}, "Email cannot be blank");

UserSchema.path("email").validate(function (email) {
  return new Promise((resolve) => {
    const User = mongoose.model("User");
    if (this.skipValidation()) return resolve(true);

    // Check only when it is a new user or when email field is modified
    if (this.isNew || this.isModified("email")) {
      User.find({ email })
        .exec()
        .then((users: UserDocument[]) => {
          resolve(!users.length);
        })
        .catch(() => resolve(false));
    } else resolve(true);
  });
}, "Email `{VALUE}` already exists");

UserSchema.path("username").validate(function (username) {
  if (this.skipValidation()) return true;
  return username.length;
}, "Username cannot be blank");

UserSchema.path("hashed_password").validate(function (hashed_password) {
  if (this.skipValidation()) return true;
  return hashed_password.length && this._password.length;
}, "Password cannot be blank");

/**
 * Pre-save hook
 */

UserSchema.pre("save", function (next) {
  if (!this.isNew) return next();

  if (!validatePresenceOf(this.password) && !this.skipValidation()) {
    next(new Error("Invalid password"));
  } else {
    next();
  }
});

mongoose.model("User", UserSchema);
