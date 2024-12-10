import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { WalletProviderContext } from "./context/walletConnectContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WalletProviderContext>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WalletProviderContext>
  </StrictMode>
);
