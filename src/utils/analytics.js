// src/utils/analytics.js

import ReactGA from "react-ga4";

export const initGA = () => {
ReactGA.initialize("G-XXXXXXXXXX");
};

export const trackPageView = (path) => {
ReactGA.send({
hitType: "pageview",
page: path,
});
};
