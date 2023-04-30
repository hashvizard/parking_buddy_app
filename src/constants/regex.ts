export default {
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/,
  passwordValidation: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
  nameValidation: /^[A-Za-z\s]*$/,
  onlyNumbers: /^[0-9]*$/,
};
