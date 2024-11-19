import { Routes, Route } from "react-router-dom";

function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route index element={<div className="App">Page under construction</div>} />
        <Route path="*" element={<div>Route not found</div>} />
      </Routes>
    </div>
  )
}

export default AppRoutes;