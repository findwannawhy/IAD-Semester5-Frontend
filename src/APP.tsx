import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./Routes";
import { HomePage } from "./pages/HomePage";
import SamplesPage from "./pages/SamplesPage";
import SamplePage from './pages/SamplePage';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if ((window as any).__TAURI__) {
      console.log('Tauri is available');
    } else {
      console.log('Running in browser mode');
    }
  }, []);
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.SAMPLES} element={<SamplesPage />} />
        <Route path={ROUTES.SAMPLE} element={<SamplePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;