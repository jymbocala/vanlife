import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.scss";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Vans, { loader as vansLoader } from "./pages/Vans/Vans";
import VanDetail, { loader as vanDetailLoader } from "./pages/Vans/VanDetail";
import HostLayout from "./components/HostLayout";
import Dashboard from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";
import HostVans, {
  loader as hostVansLoader,
} from "./pages/Host/HostVans/HostVans";
import HostVanDetail, {
  loader as hostVanDetailLoader,
} from "./pages/Host/HostVans/HostVanDetail";
import Details from "./pages/Host/HostVans/Host Vans Details/Details";
import Pricing from "./pages/Host/HostVans/Host Vans Details/Pricing";
import Photos from "./pages/Host/HostVans/Host Vans Details/Photos";
import Error from "./components/Error";
// import AuthRequired from "./components/AuthRequired";
import { requireAuth } from "./utils";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<Login />} />
      <Route
        path="vans"
        element={<Vans />}
        loader={vansLoader}
        errorElement={<Error />}
      />
      <Route path="vans/:id" element={<VanDetail />} loader={vanDetailLoader} />

      <Route path="host" element={<HostLayout />}>
        <Route
          index
          element={<Dashboard />}
          loader={async () => {
            // error occurs when adding await before requireAuth(), otherwise the error is logged in the console
            requireAuth();
            return null
          }}
        />
        <Route
          path="income"
          element={<Income />}
          loader={async () => {
            return null;
          }}
        />
        <Route
          path="reviews"
          element={<Reviews />}
          loader={async () => {
            return null;
          }}
        />
        <Route path="vans" element={<HostVans />} loader={hostVansLoader} />
        <Route
          path="vans/:id"
          element={<HostVanDetail />}
          loader={hostVanDetailLoader}
        >
          <Route
            index
            element={<Details />}
            loader={async () => {
              return null;
            }}
          />
          <Route
            path="pricing"
            element={<Pricing />}
            loader={async () => {
              return null;
            }}
          />
          <Route
            path="photos"
            element={<Photos />}
            loader={async () => {
              return null;
            }}
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
