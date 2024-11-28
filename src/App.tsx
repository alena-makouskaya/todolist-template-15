import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Main } from "./app/Main";
import { LinearProgress } from "./common/components/LinearProgress/LinearProgress";
import { useSelector } from "react-redux";
import { AppRootState } from "./app/store";
import { RequestStatus } from "./app/app-reducer";
import { ErrorSnackbar } from "./common/components/ErrorSnackbar/ErrorSnackbar";

function App() {
  const status = useSelector<AppRootState, RequestStatus>(
    (state) => state.app.status
  );

  return (
    <div className="App">
      {status === "loading" && <LinearProgress />}
      <ErrorSnackbar />
      <Main />
    </div>
  );
}

export default App;
