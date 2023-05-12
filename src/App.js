import { useEffect } from "react";
import Routes from "./Routes/Index";
import { useDispatch } from "react-redux";
import { setAppInApp } from "./store/actions/appInApp";

function App() {

  const searchParams = new URLSearchParams(document.location.search)

  const dispatch = useDispatch()

  useEffect(() => {
    const appInApp = searchParams.get("app_in_app")
    if (appInApp) {
      dispatch(setAppInApp(appInApp))
    }
  }
    , [])

  return (
    <div style={{ backgroundColor: "rgb(247 248 249)" }}>
      <Routes />
    </div>
  );
}

export default App;
