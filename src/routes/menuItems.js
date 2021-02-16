import React from "react";
// import * as FaIcon from "react-icons/fa";
// import * as VscIcon from "react-icons/vsc";
// import * as BsIcon from "react-icons/bs";
import {
  CastForEducation,
  LocationOn,
  Work,
  EmojiObjects,
  LiveHelp,
  RoomService,
  Dashboard,
  FeaturedVideo,
  PermIdentity,
  FindInPage,
  AddBox,
  PostAdd,
  Category,
  Apartment,
  GroupWork,
} from "@material-ui/icons";
export const menuItems = [
  {
    name: "Dashboard",
    url: "/admin",
    icon: <Dashboard />,
    select: 1,
  },
  {
    name: "User",
    url: "/admin/user",
    icon: <PermIdentity />,
    select: 2,
  },
  {
    name: " Ads",
    icon: <FeaturedVideo />,
    children: [
      {
        name: "All Ads",
        url: "/admin/ads",
        select: 3,
        icon: <FindInPage />,
      },
      {
        name: "Add Ads",
        icon: <AddBox />,
        url: "/admin/ads/create",
        select: 4,
      },
      // {
      //   name: "Category Ads",
      //   url: "/child33",
      //   select: 5,
      // },
    ],
  },
  {
    name: " Education",
    icon: <CastForEducation />,
    children: [
      {
        name: "All Education",
        url: "/admin/education",
        icon: <FindInPage />,
        select: 5,
      },
      {
        name: "Add Education",
        url: "/admin/education/create",
        icon: <AddBox />,
        select: 6,
      },
    ],
  },
  {
    name: "  Location",
    icon: <LocationOn />,
    children: [
      {
        name: "All Locations",
        url: "/admin/location",
        icon: <FindInPage />,
        select: 7,
      },
      {
        name: "Add Location",
        url: "/admin/location/create",
        icon: <AddBox />,
        select: 8,
      },
    ],
  },
  {
    name: "  Job",
    icon: <Work />,
    children: [
      {
        name: "All Jobs",
        url: "/admin/job",
        icon: <FindInPage />,
        select: 9,
      },
      {
        name: "Add Job",
        url: "/admin/job/create",
        icon: <AddBox />,
        select: 10,
      },
    ],
  },
  {
    name: "  Tips",
    icon: <EmojiObjects />,
    children: [
      {
        name: "All Tips",
        url: "/admin/tip",
        icon: <FindInPage />,
        select: 11,
      },
      {
        name: "Add Tip",
        url: "/admin/tip/create",
        icon: <AddBox />,
        select: 12,
      },
    ],
  },
  {
    name: "  Faqs",
    icon: <LiveHelp />,
    children: [
      {
        name: "All Faqs",
        url: "/admin/faq",
        icon: <FindInPage />,
        select: 13,
      },
      {
        name: "Add Faq",
        url: "/admin/faq/create",
        icon: <AddBox />,
        select: 14,
      },
    ],
  },
  {
    name: " Services",
    icon: <RoomService />,
    children: [
      {
        name: "All Services",
        url: "/admin/service",
        icon: <FindInPage />,
        select: 15,
      },
      {
        name: "Add Service",
        url: "/admin/service/create",
        icon: <AddBox />,
        select: 16,
      },
    ],
  },
  {
    name: " Industry",
    icon: <Apartment />,
    children: [
      {
        name: "All Industry",
        url: "/admin/industry",
        icon: <FindInPage />,
        select: 17,
      },
      {
        name: "Add Industry",
        url: "/admin/industry/create",
        icon: <AddBox />,
        select: 18,
      },
    ],
  },
  {
    name: " Partners",
    icon: <GroupWork />,
    children: [
      {
        name: "All Partner",
        url: "/admin/partner",
        icon: <FindInPage />,
        select: 19,
      },
      {
        name: "Add Partner",
        url: "/admin/partner/create",
        icon: <AddBox />,
        select: 20,
      },
    ],
  },
  {
    name: "Categories",
    icon: <Category />,
    children: [
      {
        name: "All Categories",
        url: "/admin/category",
        icon: <FindInPage />,
        select: 21,
      },
      {
        name: "Add Categorie",
        url: "/admin/category/create",
        icon: <PostAdd />,
        select: 22,
      },
    ],
  },
  // {
  //   name: "Item4",
  //   children: [
  //     {
  //       name: "Child41",
  //       url: "/child41",
  //       select: 6,
  //     },
  //     {
  //       name: "Child42",
  //       url: "/child42",
  //       select: 7,
  //     },
  //     {
  //       name: "Child43",
  //       children: [
  //         {
  //           name: "Child431",
  //           url: "/child431",
  //           select: 8,
  //         },
  //         {
  //           name: "Child432",
  //           url: "/child432",
  //           select: 9,
  //         },
  //         {
  //           name: "Child433",
  //           url: "/child433",
  //           select: 10,
  //         },
  //       ],
  //     },
  //   ],
  // },
];
