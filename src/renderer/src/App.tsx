import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ImageToPdf from './components/ImageToPdf'
import PdfSplit from './components/PdfSplit'


function App(): JSX.Element {

  return (
    <>
<Router>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/image-to-pdf" element={<ImageToPdf />} />
    <Route path="/pdf-split" element={<PdfSplit />} />
  </Routes>
</Router>
    </>
  )
}

export default App
