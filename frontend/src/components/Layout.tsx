import { FC, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useErrorMessage } from "../providers/globalState";
import Show from "./Show";

const Layout: FC = function () {
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useErrorMessage();

  return <div className="h-screen bg-gray-100 dark:bg-gray-800">
    <nav className="bg-gray-200 dark:bg-gray-900">
      <div className=" w-full md:block md:w-auto">
        <button
          onClick={() => setShow(!show)}
          type="button"
          className="block md:hidden inline-flex items-center m-4 w-10 h-10 text-gray-500"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <ul className={`${show ? "" : "hidden"} md:flex font-medium flex-col md:flex-row p-4`}>
          <li>
            <Link to="/" className="text-gray-900 dark:text-white p-4">
              Home
            </Link>
          </li>
          <li>
            <Link to="/todos" className="text-gray-900 dark:text-white p-4">
              Create Todo
            </Link>
          </li>
          <li>
            <Link to="/notes" className="text-gray-900 dark:text-white p-4">
              Notes
            </Link>
          </li>
        </ul>
      </div>
    </nav>


    <div className="container w-full mx-auto px-4 mt-4">

      <Show
        when={errorMessage !== ""}
      >
        <div className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <div className="ms-3 text-xl font-medium">
            Owh deyumn 😨: {errorMessage}
          </div>
          <button
            onClick={() => setErrorMessage("")}
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
          >
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          </button>
        </div>
      </Show>

      <Outlet />
    </div>
  </div>;
};
export default Layout;

