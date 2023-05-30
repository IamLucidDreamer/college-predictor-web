import { useEffect, useState } from "react";
import Routes from "./Routes/Index";
import { useDispatch } from "react-redux";
import { setAppInApp } from "./store/actions/appInApp";
import AOS from "aos";
import "aos/dist/aos.css";
import { XIcon } from "@heroicons/react/outline";

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

  useEffect(() => {
    AOS.init({ duration: 1200, delay: 500 });
    AOS.refresh();
  }, []);

  return (
    <div style={{ backgroundColor: "rgb(247 248 249)" }}>
      <Routes />
      <Development />
    </div>
  );
}

export default App;


const Development = () => {

  const [show, setShow] = useState(true)

  useEffect(() => {
    const showMessage = setTimeout(() => { setShow(false) }, 10000)
    return () => clearTimeout(showMessage)
  }, [])

  if (!show) {
    return
  }

  return (
    <div className="bg-black bg-opacity-75 flex flex-1 fixed top-0 bottom-0 left-0 right-0" style={{ zIndex: 9999999 }}>
      <div className="flex justify-between px-4 items-center fixed bottom-0 w-full text-center text-base md:text-xl bg-white shadow-2xl p-4 border-4 gap-4">
        <div >
          The App is Under Active Development. We are sorry if you face any bugs.
          Please report bugs at
          <a
            className="hover:underline text-primary ml-2"
            href=""
          >
            info@careerkick.in
          </a>
        </div>
        <button onClick={() => setShow(false)} className="text-xs inline-flex items-center"><XIcon className="w-5 h-5" /> Dismiss</button>
      </div>
    </div>
  )
}