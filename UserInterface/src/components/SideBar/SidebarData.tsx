import React from "react";
import * as FaIcons from "react-icons/fa";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <FaIcons.FaHome />,
    roles: [0, 1, 2, 3, 4],
  },
  {
    title: "Users",
    path: "/users",
    icon: <FaIcons.FaUser />,
    roles: [1],
  },
  {
    title: "Trips",
    path: "/trips",
    icon: <FaIcons.FaFlagCheckered />,
    roles: [1, 2, 4],
  },
  {
    title: "Paths",
    path: "/paths",
    icon: <FaIcons.FaRoute />,
    roles: [1, 2],
  },
  {
    title: "Trucks",
    path: "/trucks",
    icon: <FaIcons.FaTruck />,
    roles: [1, 2, 4],
  },
  {
    title: "Planning",
    path: "/planning",
    icon: <FaIcons.FaPaperPlane />,
    roles: [1, 2, 4],
  },
  {
    title: 'Model 3D',
    path: '/model3d',
    icon: <FaIcons.FaBox />,
    roles: [1, 2, 3, 4],
  },
  {
    title: "Warehouses",
    path: "/warehouses",
    icon: <FaIcons.FaWarehouse />,
    roles: [1, 3],
  },
  {
    title: "Deliveries",
    path: "/deliveries",
    icon: <FaIcons.FaDolly />,
    roles: [1, 3],
  },
  {
    title: "Delivery Packages",
    path: "/delivery_packages",
    icon: <FaIcons.FaBox />,
    roles: [1, 2],
  },
];
