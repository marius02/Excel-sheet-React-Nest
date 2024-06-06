import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css'
import UploadPage from "./pages/upload/UploadPage";
import ExcelViewerPage from "./pages/excel-viewer/ExcelViewerPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<UploadPage />} />
          <Route path='/excelViewer/:fileName' element={<ExcelViewerPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
