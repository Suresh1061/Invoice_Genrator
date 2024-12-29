import { Request } from "express";

export interface TokenUser {
     _id: string;
     email: string;
     name: string;
}

export interface AuthenticatedRequest extends Request {
     user?: TokenUser;
}