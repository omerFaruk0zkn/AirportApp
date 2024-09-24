import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MyFlights from "./pages/MyFlights";
import ReservationInfo from "./pages/ReservationInfo";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reservation-info/:flightId" element={<ReservationInfo />} />
          <Route path="/myflights" element={<MyFlights />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
