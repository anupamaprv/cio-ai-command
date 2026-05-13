import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CommandCenter from "./pages/CommandCenter";
import SpendIntelligence from "./pages/SpendIntelligence";
import ProductivityIntelligence from "./pages/ProductivityIntelligence";
import InitiativePipeline from "./pages/InitiativePipeline";
import Governance from "./pages/Governance";
import AdoptionGraph from "./pages/AdoptionGraph";
import PeerLearning from "./pages/PeerLearning";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CommandCenter />} />
          <Route path="/spend" element={<SpendIntelligence />} />
          <Route path="/productivity" element={<ProductivityIntelligence />} />
          <Route path="/pipeline" element={<InitiativePipeline />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/adoption" element={<AdoptionGraph />} />
          <Route path="/learning" element={<PeerLearning />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
