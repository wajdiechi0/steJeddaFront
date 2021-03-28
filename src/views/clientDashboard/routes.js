import {Orders,dashboardHome,Templates,Cart} from './Pages'
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
    name: "Orders",
    icon: Nurses,
    component: Orders,
    layout: "/orders"
  },
  {
    path: "",
    name: "My Templates",
    icon: Appointment,
    component: Templates,
    layout: "/templates"
  },
  {
    path: "",
    name: "Cart",
    icon: Appointment,
    component: Cart,
    layout: "/cart"
  }
];

export default dashboardRoutes;
