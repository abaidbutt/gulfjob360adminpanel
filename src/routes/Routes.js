// import { useState } from "react";
// import Loadable from "react-loadable";
// import { Backdrop, CircularProgress } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";

// import AdsUpsert from "../components/Ads/AdsUpsert";
// import CategoryUpsert from "../components/Category/CategoryUpsert";
// import TipUpsert from "../components/Tip/TipUpsert";
// import EducationUpsert from "../components/Education/EducationUpsert";
// import IndustryUpsert from "../components/Industry/IndustryUpsert";
// import FaqUpsert from "../components/Faq/FaqUpsert";

// import LocationUpsert from "../components/Location/LocationUpsert";
// import JobUpsert from "../components/Job/JobUpsert";
// import ServiceUpsert from "../components/Service/ServiceUpsert";
// import PartnerUpsert from "../components/Partner/PartnerUpsert";

// const useStyles = makeStyles((theme) => ({
//   backdrop: {
//     zIndex: theme.zIndex.drawer + 1,
//     color: theme.palette.secondary.main,
//   },
// }));
// function Loading({ error }) {
//   const classes = useStyles();
//   const [open, setOpen] = useState(true);
//   const handleClose = () => {
//     setOpen(false);
//   };
//   return (
//     <>
//       {error ? (
//         <Error />
//       ) : (
//         <Backdrop
//           className={classes.backdrop}
//           open={open}
//           onClick={handleClose}
//         >
//           <CircularProgress color="inherit" />
//         </Backdrop>
//       )}
//     </>
//   );
// }

// const Chart = Loadable({
//   loader: () => import("../components/Chart"),
//   loading: Loading,
// });

// const Orders = Loadable({
//   loader: () => import("../components/Orders"),
//   loading: Loading,
// });
// const Dashboard = Loadable({
//   loader: () => import("../pages/dashboard"),
//   loading: Loading,
// });
// const Error = Loadable({
//   loader: () => import("../pages/404"),
//   loading: Loading,
// });
// const Ads = Loadable({
//   loader: () => import("../pages/Ads/Index"),
//   loading: Loading,
// });
// const Category = Loadable({
//   loader: () => import("../pages/Category/Index"),
//   loading: Loading,
// });
// const Tip = Loadable({
//   loader: () => import("../pages/Tip/Index"),
//   loading: Loading,
// });
// const Education = Loadable({
//   loader: () => import("../pages/Education/Index"),
//   loading: Loading,
// });
// const Location = Loadable({
//   loader: () => import("../pages/Location/Index"),
//   loading: Loading,
// });
// const Service = Loadable({
//   loader: () => import("../pages/Service/Index"),
//   loading: Loading,
// });
// const Job = Loadable({
//   loader: () => import("../pages/Job/Index"),
//   loading: Loading,
// });
// const Package = Loadable({
//   loader: () => import("../pages/Package/Index"),
//   loading: Loading,
// });
// const Faq = Loadable({
//   loader: () => import("../pages/Faq/Index"),
//   loading: Loading,
// });
// const Partner = Loadable({
//   loader: () => import("../pages/Partner/Index"),
//   loading: Loading,
// });
// const Industry = Loadable({
//   loader: () => import("../pages/Industry/Index"),
//   loading: Loading,
// });

// export {
//   Chart,
//   Orders,
//   Dashboard,
//   Error,
//   Ads,
//   Category,
//   Job,
//   Location,
//   Education,
//   Package,
//   Partner,
//   Industry,
//   Faq,
//   Service,
//   Tip,
// };
