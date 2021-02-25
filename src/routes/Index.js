import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { spring, AnimatedSwitch } from "react-router-transition";
import Chart from "../components/Chart";

import Orders from "../components/Orders";

import Dashboard from "../pages/dashboard";
import PageError from "../pages/404";
import Ads from "../pages/Ads/Index";
import Category from "../pages/Category/Index";
import Tip from "../pages/Tip/Index";
import Education from "../pages/Education/Index";
import Industry from "../pages/Industry/Index";
import Faq from "../pages/Faq/Index";
import Location from "../pages/Location/Index";
import Job from "../pages/Job/Index";
import Service from "../pages/Service/Index";
import Partner from "../pages/Partner/Index";

import "moment-timezone";
import AdsUpsert from "../components/Ads/AdsUpsert";
import CategoryUpsert from "../components/Category/CategoryUpsert";
import TipUpsert from "../components/Tip/TipUpsert";
import EducationUpsert from "../components/Education/EducationUpsert";
import IndustryUpsert from "../components/Industry/IndustryUpsert";
import FaqUpsert from "../components/Faq/FaqUpsert";

import LocationUpsert from "../components/Location/LocationUpsert";
import JobUpsert from "../components/Job/JobUpsert";
import ServiceUpsert from "../components/Service/ServiceUpsert";
import PartnerUpsert from "../components/Partner/PartnerUpsert";
import JobView from "../components/Job/JobView";
const Index = (props) => {
  const { path } = useRouteMatch();

  return (
    <>
      <Dashboard {...props}>
        <>
          <Route exact path={`${path}`} component={Chart} />
          <Route exact path={`${path}/user`} component={Orders} />
          <Route exact path={`${path}/ads`} component={Ads} />
          <Route exact path={`${path}/ads/create`} component={AdsUpsert} />
          <Route
            exact
            path={`${path}/ads/edit/:editId`}
            component={AdsUpsert}
          />
          <Route exact path={`${path}/category`} component={Category} />
          <Route
            exact
            path={`${path}/category/create`}
            component={CategoryUpsert}
          />
          <Route
            exact
            path={`${path}/category/edit/:editId`}
            component={CategoryUpsert}
          />
          <Route exact path={`${path}/tip`} component={Tip} />
          <Route exact path={`${path}/tip/create`} component={TipUpsert} />
          <Route
            exact
            path={`${path}/tip/edit/:editId`}
            component={TipUpsert}
          />
          <Route exact path={`${path}/education`} component={Education} />
          <Route
            exact
            path={`${path}/education/create`}
            component={EducationUpsert}
          />
          <Route
            exact
            path={`${path}/education/edit/:editId`}
            component={EducationUpsert}
          />
          <Route exact path={`${path}/industry`} component={Industry} />
          <Route
            exact
            path={`${path}/industry/create`}
            component={IndustryUpsert}
          />
          <Route
            exact
            path={`${path}/industry/edit/:editId`}
            component={IndustryUpsert}
          />
          <Route exact path={`${path}/faq`} component={Faq} />
          <Route exact path={`${path}/faq/create`} component={FaqUpsert} />
          <Route
            exact
            path={`${path}/faq/edit/:editId`}
            component={FaqUpsert}
          />
          <Route exact path={`${path}/location`} component={Location} />
          <Route
            exact
            path={`${path}/location/create`}
            component={LocationUpsert}
          />
          <Route
            exact
            path={`${path}/location/edit/:editId`}
            component={LocationUpsert}
          />
          <Route exact path={`${path}/job`} component={Job} />
          <Route exact path={`${path}/job/create`} component={JobUpsert} />
          <Route
            exact
            path={`${path}/job/edit/:editId`}
            component={JobUpsert}
          />
          <Route exact path={`${path}/job/view/:viewId`} component={JobView} />
          <Route exact path={`${path}/service`} component={Service} />
          <Route
            exact
            path={`${path}/service/create`}
            component={ServiceUpsert}
          />
          <Route
            exact
            path={`${path}/service/edit/:editId`}
            component={ServiceUpsert}
          />
          <Route exact path={`${path}/partner`} component={Partner} />
          <Route
            exact
            path={`${path}/partner/create`}
            component={PartnerUpsert}
          />
          <Route
            exact
            path={`${path}/partner/edit/:editId`}
            component={PartnerUpsert}
          />
        </>
      </Dashboard>
    </>
  );
};
function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
}

function bounce(val) {
  return spring(val, {
    stiffness: 330,
    damping: 22,
  });
}

const bounceTransition = {
  atEnter: {
    opacity: 0,
    scale: 1.2,
  },

  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8),
  },

  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
  },
};

export default Index;
