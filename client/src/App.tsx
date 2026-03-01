import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Neighborhoods from "./pages/Neighborhoods";
import NeighborhoodDetail from "./pages/NeighborhoodDetail";
import Investors from "./pages/Investors";
import Buyers from "./pages/Buyers";
import Sellers from "./pages/Sellers";
import Properties from "./pages/Properties";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/neighborhoods" component={Neighborhoods} />
      <Route path="/neighborhoods/:slug" component={NeighborhoodDetail} />
      <Route path="/investors" component={Investors} />
      <Route path="/buyers" component={Buyers} />
      <Route path="/sellers" component={Sellers} />
      <Route path="/properties" component={Properties} />
      <Route path="/blog" component={Blog} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
