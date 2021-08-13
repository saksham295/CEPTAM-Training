import theme from "../../../utils/theme";

const styles = {
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center" as const,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: "3, 0, 2",
  },
  errorMessage: {
    marginTop: theme.spacing(2),
  },
  background: {
    background: '#fff797'
  },
};

export default styles;
