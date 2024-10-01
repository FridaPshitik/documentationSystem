import { getExternals, getRequires } from "./api";

export const classifications = {
  SODY: "סודי",
  SODY_BEYOTER: "סודי ביותר",
  BALMAS: 'בלמ"ס',
};

export const environments = {
  BLACK: "שחורה",
  RED: "אדומה",
};

export const statuses = {
  IN_CHARACTERIZING: "באפיון",
  IN_DEVELOPMENM: "בפיתוח",
  IN_PROGRESS: "בתהליך",
  DONE: "עלה לאויר",
};

export const factorableTypes = {
  INTERNAL: "פנימי",
  EXTERNAL: "חיצוני",
};

export const populations = {
  MUST: "חובה",
  KEVA: "קבע",
  MILUIM: "מילואים",
  AAZTIM: 'אע"צים',
  PATUR: "פטור",
};

//TODO
export let requires = getRequires();
requires = [...requires, "אחר"];

//TODO
export const externals = getExternals();

export const getStatusColor = (status) => {
  switch (status) {
    case statuses.IN_PROGRESS:
      return "Olive";

    case statuses.IN_DEVELOPMENM:
      return "MediumAquamarine";

    case statuses.IN_CHARACTERIZING:
      return "LightSeaGreen";

    case statuses.DONE:
      return "YellowGreen";

    default:
      return "";
  }
};

export const getFactorableTypeColor = (type) => {
  switch (type) {
    case factorableTypes.INTERNAL:
      return "Khaki";

    case factorableTypes.EXTERNAL:
      return "DarkKhaki";

    default:
      return "dark";
  }
};

export const getClassificationColor = (classification) => {
  switch (classification) {
    case classifications.BALMAS:
      return "MediumPurple";

    case classifications.SODY:
      return "SlateBlue";

    case classifications.SODY_BEYOTER:
      return "BlueViolet";

    default:
      return "";
  }
};

export const getEnvironmentColor = (environment) => {
  switch (environment) {
    case environments.RED:
      return "red";

    case environments.BLACK:
      return "black";
    default:
      return "";
  }
};

export const getPopulationColor = (population) => {
  switch (population) {
    case populations.AAZTIM:
      return "DeepSkyBlue";
    case populations.KEVA:
      return "CornflowerBlue";
    case populations.MILUIM:
      return "RoyalBlue";
    case populations.MUST:
      return "SkyBlue";
    case populations.PATUR:
      return "PowderBlue";
    default:
      return "";
  }
};
