import "./App.css";
import MainSectionWrapper from "./components/mainSectionWrapper";
import { StyledGlobalWrapper } from "./styles/globalStyles";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <StyledGlobalWrapper>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          style={{
            zIndex: 20000,
          }}
          hideProgressBar={false}
          newestOnTop={false}
          rtl={false}
        />

        <MainSectionWrapper />
      </StyledGlobalWrapper>
    </div>
  );
}

export default App;
