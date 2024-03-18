import Router from "./utils/Router/Router";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="container mx-auto no-scrollbar">
      <Navbar />
      <Router />
    </div>
  );
}
