import { UserRoutes } from "./UserRouter";

export const Routes = (prefix: string) => [...UserRoutes(`${prefix}/users`)];
