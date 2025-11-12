import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./Routes";
import { HomePage } from "./pages/HomePage";
import SamplesPage from "./pages/SamplesPage";
import SamplePage from './pages/SamplePage';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <BrowserRouter  basename="/IAD-Semester5-UI"> {/* имя репозитория */}
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.SAMPLES} element={<SamplesPage />} />
        <Route path={ROUTES.SAMPLE} element={<SamplePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;