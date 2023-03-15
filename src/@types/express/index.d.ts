declare namespace Express {
  export interface Request {
    user: {
      id: string;
      email: string;
    };
    activity: {
      id: string;
    };
    authInfo: {
      groups: string[];
      oid;
    };
  }
}
