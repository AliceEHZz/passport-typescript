const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "user",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "user",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user",
  },
  {
    id: 4,
    name: "Alice Alice",
    email: "alice@gmail.com",
    password: "alice123!",
    role: "admin",
  },
];

const userModel = {
  /* FIX ME (types) 😭 - 😊 fixed */
  findOne: (email: string) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  /* FIX ME (types) 😭 - 😊 fixed */
  findById: (id: number) => {
    console.log(`${id}`);

    // console.log(database);
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
};

const addUserFromGithub = (user: any) => {
  database.push(user);
  return user;
};

export { database, userModel, addUserFromGithub };
