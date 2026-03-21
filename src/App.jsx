import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

// Pages
import Home from "@/pages/Home";
import VillasList from "@/pages/VillasList";
import VillaPage from "@/pages/VillaPage";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";
import LoginPage from "@/pages/LoginPage";
import Dashboard from "@/pages/Dashboard";
import PrivateRoute from "@/utils/PrivateRoute";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/villas" component={VillasList} />
      <Route path="/villa/:id" component={VillaPage} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/login" component={LoginPage} />
      <Route path="/dashboard">
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      </Route>
      


      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();

  
  const hideLayout =
    location.startsWith("/login") ||
    location.startsWith("/dashboard") || 
    location.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen font-sans text-foreground bg-background">
      {!hideLayout && <Header />}

      <main className="flex-grow">
        <Router />
      </main>

      {!hideLayout && <Footer />}
      {!hideLayout && <WhatsAppButton />}
      <Toaster />
    </div>
  );
}

export default App;
