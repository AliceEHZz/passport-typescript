import { userModel } from "../models/userModel";

const getUserByEmailIdAndPassword = (email: string, password: string) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    } else {
      // has email but incorrect password
      throw new Error("Password is incorrect");
    }
  } else {
    // email not found
    throw new Error(`Couldn't find user with email: ${email}`);
  }
};

const getUserById = (id: number) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user: Express.User, password: string) {
  return (user as any).password === password;
}

export { getUserByEmailIdAndPassword, getUserById, isUserValid };
