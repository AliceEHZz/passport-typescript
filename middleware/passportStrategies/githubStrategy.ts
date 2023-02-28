import { Strategy as GitHubStrategy } from "passport-github2";
import { PassportStrategy } from "../../interfaces/index";
import { Request } from "express";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
// import process from "node:process";

// process.env.clientId => will have a env file that contains all the confidential info from clients: i.e. clientId:xxx, clientSecret:xxx. or you can change the clientId to whatever you want like alice. but by default this won't work because you need npm i doyevn to make it work.
    // use process.env could prevent you from banning from github. 

const githubStrategy: GitHubStrategy = new GitHubStrategy(
  {
    clientID: process.env.clientId || "",
    clientSecret: process.env.clientSecret || "",
    callbackURL: "http://localhost:8000/auth/github/callback",
    passReqToCallback: true,
  },

  /* FIX ME 😭 - fixed 😊 */
  async (
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err?: Error | null, profile?: any) => void
  ) => {
    console.log(profile);
  }
);

const passportGitHubStrategy: PassportStrategy = {
  name: "github",
  strategy: githubStrategy,
};

export default passportGitHubStrategy;
