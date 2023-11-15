import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageLayout from "./pages/PageLayout";
import PageSignin from "./pages/PageSignin";
import WidgetKelas from "./components/WidgetKelas";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<PageSignin />} />
            <Route path="/kelas" element={<WidgetKelas />} />
            {/* Customer */}
            {/* <Route index element={<MainPages />} />
            <Route path="/detail/:mobilId" element={<PageDetailCar />} /> */}
            {/* Admin */}
            {/* <Route path="/admin" element={<MainPagesAdmin />} />
            <Route path="/admin/login" element={<PagesLogin />} />
            <Route path="/admin/input" element={<PageInputCar />} />
            <Route path="/admin/edit/:mobilId" element={<PageEditCar />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
