import { ReactComponent as Dashboard } from "../../src/assets/Manage Credits.svg";
import { ReactComponent as Revenue } from "../../src/assets/Manage Question.svg";


import { ROUTES } from "../routes/routeConstants";

export const getItems = (userDetails) => [
  {
    key: "1",
    label: "Manage Questions",
    icon: <Dashboard />,
    route: ROUTES.DASHBOARD,
  },

  {
    key: "2",
    label: "Manage Credits",
    icon: <Revenue />,
    route: ROUTES.MANAGE_CREDITS,
  },
];
