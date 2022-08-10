import { UserController } from "../controller/UserController";

export const UserRoutes = (prefix: string) => [
  {
    method: "get",
    route: `${prefix}`,
    controller: UserController,
    action: "all",
  },
  {
    method: "get",
    route: `${prefix}/:username`,
    controller: UserController,
    action: "one",
  },
  {
    method: "post",
    route: `${prefix}`,
    controller: UserController,
    action: "save",
  },
  {
    method: "put",
    route: `${prefix}`,
    controller: UserController,
    action: "updateScore",
  },
  {
    method: "delete",
    route: `${prefix}/:id`,
    controller: UserController,
    action: "remove",
  },
];
