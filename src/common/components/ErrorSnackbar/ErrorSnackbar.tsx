// @flow
import * as React from "react";
import { useSelector } from "react-redux";
import { AppRootState } from "../../../app/store";
type Props = {};
export const ErrorSnackbar = (props: Props) => {
 
    const error = useSelector<AppRootState, string | null>(
    (state) => state.app.error
  );

  const [open, setOpen] = React.useState(true);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      {error && open && (
        <div className="errorSnackbar">
          <p>{error}</p>
          <button className="errorButton" onClick={handleClose}>
            {" "}
            x{" "}
          </button>
        </div>
      )}
    </>
  );
};
