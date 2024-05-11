import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Team from "./pages/Team/Team";
import Contacts from "./pages/Contacts/Contacts";
import Invoices from "./pages/Invoices/Invoices";
import Form from "./pages/Form/Form";
import Calender from "./pages/Calender/Calender";
import Faq from "./pages/Faq/Faq";
import BarChart from "./pages/BarChart/BarChart";
import PieChart from "./pages/PieChart/PieChart";
import LineChart from "./pages/LineChart/LineChart";
import Geography from "./pages/Geography/Geography";
import NotFound from "./pages/NotFound/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Dashboard />} />
      <Route path="team" element={<Team />} />
      <Route path="contacts" element={<Contacts />} />
      <Route path="invoices" element={<Invoices />} />
      <Route path="form" element={<Form />} />
      <Route path="calendar" element={<Calender />} />
      <Route path="faq" element={<Faq />} />
      <Route path="bar" element={<BarChart />} />
      <Route path="pie" element={<PieChart />} />
      <Route path="line" element={<LineChart />} />
      <Route path="geography" element={<Geography />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
