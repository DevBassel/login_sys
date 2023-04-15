function singError(error) {
  let user = { email: "", password: "" };
  console.log(error.message, error.code);
  if (error.message.includes("user validation failed")) {
    Object.values(error.errors).forEach(({ properties }) => {
      user[properties.path] = properties.message;
    });
    console.log(user);
  }
if(error.code === 11000){
  user = {msg: "user is registered go to login"}
}
console.log(user)
  return user;
}

module.exports = singError;
