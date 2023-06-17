import { useEffect, useState } from "react";
import Routes from "./Routes/Index";
import { useDispatch } from "react-redux";
import { setAppInApp } from "./store/actions/appInApp";
import AOS from "aos";
import "aos/dist/aos.css";
import { XIcon } from "@heroicons/react/outline";
import { server } from "./helpers/apiCall";
import { setUser } from "./store/actions/userActions";

import imageCelebrations from "./assets/images/thousand_image.jpeg"

function App() {

  const searchParams = new URLSearchParams(document.location.search)

  const dispatch = useDispatch()

  useEffect(() => {
    window.addEventListener(
      "message",
      (event) => {
        if (event.data === "logout") {
          localStorage.clear()
        }
      },
      false
    );
  }, [])

  useEffect(() => {
    const appInApp = searchParams.get("app_in_app")
    const authToken = searchParams.get("auth_token")
    const userId = searchParams.get("user_id")
    if (appInApp) {
      dispatch(setAppInApp(appInApp))
    }
    if (authToken && window.location.pathname !== "/login-success") {
      localStorage.setItem("authToken", authToken);
      server.get(`/user/get/${userId}`)
        .then(res => { dispatch(setUser(res?.data?.data)) })
        .catch((err) => console.log(err))
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
      <Banner />
    </div>
  );
}

export default App;


const Development = () => {

  const [show, setShow] = useState(false)

  useEffect(() => {
    if (window.location.pathname === "/" || window.location.pathname === "/home") {
      setShow(true)
    }
    else {
      const showMessage = setTimeout(() => { setShow(false) }, 10000)

      return () => clearTimeout(showMessage)
    }
  }, [])

  if (!show) {
    return
  }

  return (
    <div className="bg-black bg-opacity-75 flex flex-1 fixed top-0 bottom-0 left-0 right-0" style={{ zIndex: 9999 }}>
      <div className="flex justify-between px-4 items-center fixed bottom-0 w-full text-left text-base md:text-xl bg-white shadow-2xl p-4 border-4 gap-4">
        <div >
          The App is Under Active Development. We are sorry if you face any bugs.
          Please report bugs at :
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


const Banner = () => {

  const [show, setShow] = useState(false)

  useEffect(() => {
    if (window.location.pathname === "/" || window.location.pathname === "/home") {
      setShow(true)
    }
    else {
      const showMessage = setTimeout(() => { setShow(false) }, 10000)

      return () => clearTimeout(showMessage)
    }
  }, [])

  if (!show) {
    return
  }

  return (
    <div className="flex flex-1 fixed top-0 min-h-screen" style={{ zIndex: 999999 }}>
      <div className="flex">
        <button onClick={() => setShow(false)} className="text-xs inline-flex items-center fixed top-5 right-5 text-white" style={{ zIndex: 999999 }}><XIcon className="w-5 h-5" /> Dismiss</button>
        <div className="bg-black bg-opacity-25  flex justify-center px-4 items-center fixed bottom-0 w-full text-left text-base md:text-xl shadow-2xl p-4 gap-4">
          <img src={imageCelebrations} className="w-10/12 lg:w-1/2" />
        </div>
      </div>
    </div>
  )
}