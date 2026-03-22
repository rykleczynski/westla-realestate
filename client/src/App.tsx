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
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LosAngelesInvestors from "./pages/investors/LosAngelesInvestors";
import OffMarketDealsLosAngeles from "./pages/investors/OffMarketDealsLosAngeles";
import Exchange1031LosAngeles from "./pages/investors/Exchange1031LosAngeles";
import MultifamilyLosAngeles from "./pages/investors/MultifamilyLosAngeles";
import SantaMonicaInvestors from "./pages/investors/SantaMonicaInvestors";
import VeniceInvestors from "./pages/investors/VeniceInvestors";
import CulverCityInvestors from "./pages/investors/CulverCityInvestors";
import BeverlyHillsInvestors from "./pages/investors/BeverlyHillsInvestors";
import DtlaInvestors from "./pages/investors/DtlaInvestors";
import UscAreaInvestors from "./pages/investors/UscAreaInvestors";
import SouthBayInvestors from "./pages/investors/SouthBayInvestors";
import LongBeachInvestors from "./pages/investors/LongBeachInvestors";
import WestwoodInvestors from "./pages/investors/WestwoodInvestors";
import GardenaInvestors from "./pages/investors/GardenaInvestors";
import InglewoodInvestors from "./pages/investors/InglewoodInvestors";
import InvestorAgentCoverage from "./pages/investors/InvestorAgentCoverage";
import RentalListingAgentLosAngeles from "./pages/investors/RentalListingAgentLosAngeles";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/neighborhoods" component={Neighborhoods} />
      <Route path="/neighborhoods/:slug" component={NeighborhoodDetail} />
      <Route path="/investors" component={Investors} />
      <Route path="/buyers" component={Buyers} />
      <Route path="/sellers" component={Sellers} />
      <Route path="/blog" component={Blog} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/investors/los-angeles" component={LosAngelesInvestors} />
      <Route path="/investors/off-market-deals-los-angeles" component={OffMarketDealsLosAngeles} />
      <Route path="/investors/1031-exchange-los-angeles" component={Exchange1031LosAngeles} />
      <Route path="/investors/multifamily-investment-los-angeles" component={MultifamilyLosAngeles} />
      <Route path="/investors/santa-monica" component={SantaMonicaInvestors} />
      <Route path="/investors/venice" component={VeniceInvestors} />
      <Route path="/investors/culver-city" component={CulverCityInvestors} />
      <Route path="/investors/beverly-hills" component={BeverlyHillsInvestors} />
      <Route path="/investors/dtla" component={DtlaInvestors} />
      <Route path="/investors/usc-area" component={UscAreaInvestors} />
      <Route path="/investors/south-bay" component={SouthBayInvestors} />
      <Route path="/investors/long-beach" component={LongBeachInvestors} />
      <Route path="/investors/westwood" component={WestwoodInvestors} />
      <Route path="/investors/gardena" component={GardenaInvestors} />
      <Route path="/investors/inglewood" component={InglewoodInvestors} />
      <Route path="/investors/west-la-investor-agent-coverage" component={InvestorAgentCoverage} />
      <Route
        path="/investors/rental-listing-agent-los-angeles"
        component={RentalListingAgentLosAngeles}
      />
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
