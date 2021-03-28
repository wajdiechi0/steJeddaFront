
import Customers from "./Pages/Customers";
import Orders from "./Pages/Orders";
import dashboardHome from "./Pages/dashboardHome";
import Templates from "./Pages/Templates";

import Person from "@material-ui/icons/Person";
import Nurses from "@material-ui/icons/LocalHospital";
import Appointment from "@material-ui/icons/EventNote";

const dashboardRoutes = [
  {
    path: "",
    name: "Dashboard",
    icon: Person,
    component: dashboardHome,
    layout: "/dashboard"
  },
  {
    path: "",
    name: "Customers",
    icon: Nurses,
    component: Customers,
    layout: "/customers"
  },
  {
    path: "",
    name: "Orders",
    icon: Nurses,
    component: Orders,
    layout: "/orders"
  },
  {
    path: "",
    name: "Templates",
    icon: Appointment,
    component: Templates,
    layout: "/templates"
  }
];

export default dashboardRoutes;
