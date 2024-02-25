import "./App.css";
import { Navbar, FormPatient, HistorySubmit } from "./components";

function App() {
  return (
    <div className="relative min-h-screen">
      <main>
        <Navbar />
        <div className="flex items-start justify-start md:flex md:mt-10 w-full md:justify-between">
          <HistorySubmit />
          <FormPatient />
        </div>
      </main>
    </div>
  );
}

export default App;
