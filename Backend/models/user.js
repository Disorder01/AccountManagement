class User {
  constructor({ id, firstName, lastName, password, accounts }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.accounts = accounts;
  }
}

module.exports = User;