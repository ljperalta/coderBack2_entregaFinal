const bcrypt = require('bcrypt');

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const comparePassword = (user, password) => bcrypt.compareSync(password, user.password);
//export const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;