// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageLayout from "./pages/PageLayout";
import PageSignin from "./pages/PageSignin";
import PageKelas from "./pages/PageKelas";
import PagePeserta from "./pages/PagePeserta";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<PageSignin />} />
            <Route path="/kelas" element={<PageKelas />} />
            <Route path="/peserta" element={<PagePeserta />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
