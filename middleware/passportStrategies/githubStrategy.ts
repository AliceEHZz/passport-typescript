import { Strategy as GitHubStrategy } from "passport-github2";
import { PassportStrategy } from "../../interfaces/index";
import { Request } from "express";

// import process from "node:process";

const githubStrategy: GitHubStrategy = new GitHubStrategy(
  {
    clientID: "", // process.env.clientId => will have a env file that contains all the confidential info from clients: i.e. clientId:xxx, clientSecret:xxx. or you can change the clientId to whatever you want like alice. but by default this won't work because you need npm i doyevn to make it work. 
    // use process.env could prevent you from banning from github. If repo
    clientSecret: "",
    callbackURL: "http://localhost:3000/auth/github/callback",
    passReqToCallback: true,
  },

  /* FIX ME 😭 */
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
