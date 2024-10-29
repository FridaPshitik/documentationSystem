import { Button } from "primereact/button";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  buttons: {
    direction: "ltr",
    marginTop: "10px",
    "& button": {
      margin: "2px",
    },
  },
});

export const CheckMultipleName = ({ setVisible, setProject }) => {
  const css = useStyles();

  return (
    <>
      <p className="m-0">
        כבר קיים פרויקט בשם זה.
        <br></br>
        האם אתה בטוח שברצונך להמשיך?
      </p>
      <div className={css.buttons}>
        <Button label="כן" onClick={() => setVisible(false)}></Button>
        <Button
          label="לא"
          severity="secondary"
          onClick={() => {
            setVisible(false);
            setProject((prevProject) => ({
              ...prevProject,
              name: "",
            }));
          }}
        ></Button>
      </div>
    </>
  );
};
