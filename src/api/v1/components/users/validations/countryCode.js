import postalCodes from 'postal-codes-js';

export const countryNameRegex = /[A-Za-z]/g;
export const countryCodeRegex = /[a-zA-Z]{2,}/g;
export const isValidCountryCode = (countryCode, schema) => {
  return schema.test({
    test: (postalCode) => {
      let validation = true;
      if (typeof countryCode === 'string' && countryCode.length > 0) {
        validation = postalCodes.validate(countryCode, postalCode);
      }

      return validation;
    },
    message:
      'Your zip postal code does not match with the country code that you provided.',
  });
};
