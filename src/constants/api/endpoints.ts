const prefix =
  "https://iodywaajmaitrcxx3atz2l6zxu0grmwy.lambda-url.us-west-1.on.aws";

const ENDPOINTS = Object.freeze({
  getProducts: `${prefix}/products`,
  signUp: `${prefix}/auth/signUp`,
  verifyEmail: `${prefix}/auth/verifyEmail`,
});

export default ENDPOINTS;
