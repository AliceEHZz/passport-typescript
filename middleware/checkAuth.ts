
import { Request, Response } from 'express';
/*
FIX ME (types) 😭
*/
export const ensureAuthenticated = (req: Request, res: Response, next: any) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
}

/*
FIX ME (types) 😭
*/
export const forwardAuthenticated = (req: any, res: any, next: any) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/dashboard");
}