export const internalImage = "inside.png";

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

export const getStatusColor = (status) => {
  switch (status) {
    case statuses.IN_PROGRESS:
      return "#1e88e5";

    case statuses.IN_DEVELOPMENM:
      return "#42a5f5";

    case statuses.IN_CHARACTERIZING:
      return "#90caf9";

    case statuses.DONE:
      return "#1565c0";

    default:
      return "";
  }
};

export const getFactorableTypeColor = (type) => {
  switch (type) {
    case factorableTypes.INTERNAL:
      return "#673ab7";

    case factorableTypes.EXTERNAL:
      return "#9575cd";

    default:
      return "";
  }
};

export const getClassificationColor = (classification) => {
  switch (classification) {
    case classifications.BALMAS:
      return "#388e3c";

    case classifications.SODY:
      return "#43a047";

    case classifications.SODY_BEYOTER:
      return "#66bb6a";

    default:
      return "";
  }
};

export const getEnvironmentColor = (environment) => {
  switch (environment) {
    case environments.RED:
      return "#ef5350";

    case environments.BLACK:
      return "#424242";

    default:
      return "";
  }
};

export const getPopulationColor = (population) => {
  switch (population) {
    case populations.AAZTIM:
      return "#00695c";

    case populations.KEVA:
      return "#00897b";

    case populations.MILUIM:
      return "#26a69a";

    case populations.MUST:
      return "#4db6ac";

    case populations.PATUR:
      return "#80cbc4";

    default:
      return "";
  }
};
