module.exports = [
  {
    label: "About me",
    trigger: "about",
    url: "/about/",
  },
  {
    label: "Accompagnement",
    trigger: "Accompagnement",
    url: "/Accompagnement/",
  },
  {
    label: "Ateliers",
    trigger: "ateliers",
    // TODO : change url to the extern one
    url: "https://www.example.com",
    isExternal: true,
    isSecondary: true,
  },
  {
    label: "Bootcamps",
    // TODO : change url to the extern one
    url: "https://www.example.com",
    isExternal: true,
    isPrimary: true,
  }
];
