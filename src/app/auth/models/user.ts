export interface IUser {
  user: User;
  refreshToken:string;
  accessList: AccessList[];
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string
    verified: boolean;
}

interface AccessList {
    contextId: number;
    contextName: string;
    contextLocale: string;
    contextTimeZone: string;
    contextActive: boolean;
    masterContext: boolean;
    userActive: boolean;
    accessToken: string;
    roleName: string;
    permissions: string[];
}
