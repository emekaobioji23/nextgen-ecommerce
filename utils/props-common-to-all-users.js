const { validate } = require("deep-email-validator");
const validator = require("validator");
const roles = require("./roles.js");


const PropsCommonToAllUsers = {
  username: {
    type: String,
    required: [true, "The username field is required"],
    maxLength: [20, "A username must not be more than 20 characters"],
    minLength: [3, "A username must be at least 3 characters"],
    trim: true,
    unique: [true, "A user with this email already exist"],
  },
  password: {
    type: String,
    required: [true, "A user must have an password"],
    select: false,
    minLength: [8, "Password must ba at least 8 characters"],
    validate: {
      validator: function (val) {
        /*return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])[A-Za-z\d]{8,}/.test(val);*/
        return /[A-Za-z\d^\w\d\s]{8,}/.test(val);
      },
      message:
        /*"Password must contain at least a number, a lowercase and an uppercase alphabeth",*/
        "Password must contain at least a number, a lowercase, an uppercase alphabeth, and a symbol",
    },
  },
  passwordConfirm: {
    type: String,
    required: [true, "A user must have an passwordConfirm"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Password and confirm password are different",
    },
    select: false,
  },
  passwordResetToken: String,
  passwordChangedAt: Date,
  passwordTokenExpires: Date,
  /* lastName: {
    type: String,
    required: [true, "The last-name field is required"],
    maxLength: [20, "A last-name must not be more than 20 characters"],
    minLength: [3, "A last-name must be at least 3 characters"],
    trim: true,
  }, */
  email: {
    type: String,
    required: [true, "Email field is required for all users"],
    validate: [validator.isEmail, "Please enter a valid email"],
    // validate: {
    //   validator: async function (val) {
    //     const response = await validate(val);
    //     return response.valid;
    //   },
    //   message: "Please enter a valid email",
    // },
    trim: true,
    lowerCase: true,
    unique: [true, "A user with this email already exist"],
  },
  phoneNumber: {
    type:String,
    validate: {
      validator: function (val) {
        return /^(\+?(\d{1,3}))?(\s|-)?(\d{3})(\s|-)?(\d{3})(\s|-)?(\d{4})$/.test(val);
      },
      message:
        "phone number format is as follows:\n+1234567890 (with country code and no spaces or hyphens)\n123-456-7890 (with hyphens)\n123456789012345 (longer number with no spaces or hyphens)\n0903 599 4559 (spaces between groups of digits)\n234 903 599 4559 (country code 234 with spaces)\n09035994559 (no spaces or special characters)",
    },
    
  },
  /* address: {
    type: String,
    required: [true, "Address is required for all users"],
  }, */
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  role: {
    type: String,
    enum: Object.values(roles),
    default: roles.buyer,
    required: true
  }
};

module.exports = PropsCommonToAllUsers;
