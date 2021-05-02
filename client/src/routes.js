import Admin from "./pages/Admin";
import Basket from "./pages/Basket";
import Shop from "./pages/Shop";
import DevicePage from "./pages/DevicePage";
import Auth from "./pages/Auth";
import {ADMIN_ROUT, BASKET_ROUT, DEVICE_ROUT, LOGIN_ROUT, REGISTRATION_ROUT, SHOP_ROUT} from "./utils/consts";


export const authRoutes = [
  {
    path: ADMIN_ROUT,
    Component: Admin
  },
  {
    path: BASKET_ROUT,
    Component: Basket
  },
]

export const publicRoutes = [
  {
    path: SHOP_ROUT,
    Component: Shop
  },
  {
    path: LOGIN_ROUT,
    Component: Auth
  },
  {
    path: REGISTRATION_ROUT,
    Component: Auth
  },
  {
    path: DEVICE_ROUT + '/:id',
    Component: DevicePage
  },
]


