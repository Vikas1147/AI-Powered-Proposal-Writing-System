import { useEffect, useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import SEOHead from "./components/SEOHead";
import Dashboard from "./pages/Dashboard";
import Proposals from "./pages/Proposals";
import Settings from "./pages/Settings";
import ProposalForm from "./components/ProposalForm";
import ProposalList from "./components/ProposalList";
import Card from "./components/ui/Card";
import Alert from "./components/ui/Alert";
import Skeleton from "./components/ui/Skeleton";

// Main app content separated for theme context usage
const AppContent = () => {
  const { themeClasses } = useTheme();

  // Application state
  const [proposals, setProposals] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });
  const [uiState, setUiState] = useState({
    loading: false,
    error: null,
    isSubmitting: false
  });

  // Memoized form handlers to prevent unnecessary re-renders
  const handleInputChange = useCallback((field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  }, []);

  // Simulated fetch proposals function
  const fetchProposals = useCallback(() => {
    setUiState(prev => ({ ...prev, loading: true, error: null }));

    // Simulated delay for loading
    setTimeout(() => {
      setProposals([
        { id: 1, title: "Proposal 1", description: "Description 1" },
        { id: 2, title: "Proposal 2", description: "Description 2" }
      ]);
      setUiState(prev => ({ ...prev, loading: false }));
    }, 1000);
  }, []);

  // Load proposals on component mount
  useEffect(() => {
    fetchProposals();
  }, [fetchProposals]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    setUiState(prev => ({ ...prev, isSubmitting: true, error: null }));

    // Simulated delay for submission
    setTimeout(() => {
      const newProposal = {
        id: proposals.length + 1,
        title: formData.title,
        description: formData.description
      };
      
      setProposals(prev => [newProposal, ...prev]);
      setFormData({ title: "", description: "" });
      setUiState(prev => ({ ...prev, isSubmitting: false }));

      console.log("Proposal created successfully!");
    }, 1000);
  };

  return (
    <div className={`min-h-screen ${themeClasses.background} ${themeClasses.text}`}>
      <Navbar />
      <Sidebar />

      {/* Main content area */}
      <main className="ml-64 pt-16 p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/proposals" element={<Proposals />} />
          <Route path="/settings" element={<Settings />} />
          <Route
            path="/manage-proposals"
            element={
              <div className="max-w-7xl mx-auto space-y-6">
                {/* Error display */}
                {uiState.error && (
                  <Alert type="error">
                    <p>{uiState.error}</p>
                    <button 
                      onClick={fetchProposals}
                      className="text-sm underline hover:no-underline ml-2"
                    >
                      Try again
                    </button>
                  </Alert>
                )}

                {/* Proposal management interface */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ProposalForm
                    onSubmit={handleSubmit}
                    title={formData.title}
                    setTitle={handleInputChange("title")}
                    description={formData.description}
                    setDescription={handleInputChange("description")}
                    error={uiState.error}
                    isSubmitting={uiState.isSubmitting}
                  />

                  {uiState.loading ? (
                    <Card className="p-6">
                      <Skeleton />
                    </Card>
                  ) : (
                    <ProposalList 
                      proposals={proposals}
                      onRefresh={fetchProposals}
                    />
                  )}
                </div>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <SEOHead />
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App;
