import ReactGA from "react-ga";

const trackingId = "UA-120851599-1";

export const initializeReactGA = () => {
  ReactGA.initialize(trackingId);
  ReactGA.event({
    category: "Button Press",
    action: "user pressed the first button"
  });
};
