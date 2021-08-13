import theme from "../../../utils/theme";

const homeStyle = {
  errorWrapper: {
    flexGrow: 1,
    display: "flex",
    width: "100%",
    height: `calc(100vh - ${64}px)`,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    textAlign: "center" as const,
  },
  error: {
    width: 360,
  },
  errorCode: {
    color: theme.palette.primary.main,
  },
  errorText: {
    color: "grey",
    paddingBottom: theme.spacing(2),
  },
  buttonText: {
    paddingRight: theme.spacing(1),
  },
};

export default homeStyle;
