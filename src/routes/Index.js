import React from "react";
import { Route, Redirect } from "react-router-dom";
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

const Index = (props) => {
  return (
    <>
      <Dashboard {...props}>
        <AnimatedSwitch
          atEnter={bounceTransition.atEnter}
          atLeave={bounceTransition.atLeave}
          atActive={bounceTransition.atActive}
          mapStyles={mapStyles}
        >
          <Route exact path="/admin" component={Chart} />
          <Route exact path="/admin/user" component={Orders} />
          <Route exact path="/admin/ads" component={Ads} />
          <Route exact path="/admin/ads/create" component={AdsUpsert} />
          <Route exact path="/admin/ads/edit/:editId" component={AdsUpsert} />
          <Route exact path="/admin/category" component={Category} />
          <Route
            exact
            path="/admin/category/create"
            component={CategoryUpsert}
          />
          <Route
            exact
            path="/admin/category/edit/:editId"
            component={CategoryUpsert}
          />
          <Route exact path="/admin/tip" component={Tip} />
          <Route exact path="/admin/tip/create" component={TipUpsert} />
          <Route exact path="/admin/tip/edit/:editId" component={TipUpsert} />
          <Route exact path="/admin/education" component={Education} />
          <Route
            exact
            path="/admin/education/create"
            component={EducationUpsert}
          />
          <Route
            exact
            path="/admin/education/edit/:editId"
            component={EducationUpsert}
          />
          <Route exact path="/admin/industry" component={Industry} />
          <Route
            exact
            path="/admin/industry/create"
            component={IndustryUpsert}
          />
          <Route
            exact
            path="/admin/industry/edit/:editId"
            component={IndustryUpsert}
          />
          <Route exact path="/admin/faq" component={Faq} />
          <Route exact path="/admin/faq/create" component={FaqUpsert} />
          <Route exact path="/admin/faq/edit/:editId" component={FaqUpsert} />
          <Route exact path="/admin/location" component={Location} />
          <Route
            exact
            path="/admin/location/create"
            component={LocationUpsert}
          />
          <Route
            exact
            path="/admin/location/edit/:editId"
            component={LocationUpsert}
          />
          <Route exact path="/admin/job" component={Job} />
          <Route exact path="/admin/job/create" component={JobUpsert} />
          <Route exact path="/admin/job/edit/:editId" component={JobUpsert} />
          <Route exact path="/admin/service" component={Service} />
          <Route exact path="/admin/service/create" component={ServiceUpsert} />
          <Route
            exact
            path="/admin/service/edit/:editId"
            component={ServiceUpsert}
          />
          <Route exact path="/admin/partner" component={Partner} />
          <Route exact path="/admin/partner/create" component={PartnerUpsert} />
          <Route
            exact
            path="/admin/partner/edit/:editId"
            component={PartnerUpsert}
          />
          <Route path="*" component={PageError} />
        </AnimatedSwitch>{" "}
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
