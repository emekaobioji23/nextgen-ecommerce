const addressSchema = require("../utils/address-schema-addon")

const PropsSpecificToSomeUsers = {
  address: {
    type: addressSchema,
    required: true,
  }
};

module.exports = PropsSpecificToSomeUsers;
