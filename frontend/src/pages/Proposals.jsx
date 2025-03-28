import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaRobot, FaPaperPlane, FaPlusCircle, FaImage } from "react-icons/fa";
import ProposalForm from "../components/ProposalForm";
import ProposalList from "../components/ProposalList";
import Alert from "../components/ui/Alert";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const mockProposals = [
  {
    id: "1",
    title: "Mock Proposal 1",
    description: "This is a sample description for proposal 1.",
    createdAt: "2025-03-25T10:00:00.000Z", 
  },
  {
    id: "2",
    title: "Mock Proposal 2",
    description: "This is another sample description for proposal 2.",
    createdAt: "2025-03-25T15:30:00.000Z", 
  },
];

const Proposals = () => {
  const [proposals, setProposals] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProposals(mockProposals);
      setLoading(false);
      setError(false);
    }, 500);
  }, []);

  const handleGenerateAIProposal = () => {
    setAiLoading(true);
    setTimeout(() => {
      const aiGeneratedProposal = {
        title: "AI-Powered Business Proposal",
        description: "This proposal is generated using AI techniques.",
        image: "https://via.placeholder.com/150",
      };
      setTitle(aiGeneratedProposal.title);
      setDescription(aiGeneratedProposal.description);
      setImage(aiGeneratedProposal.image);
      setAiLoading(false);
    }, 1000);
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {error && (
          <Alert type="error">
            <p>{error}</p>
          </Alert>
        )}

        <motion.div
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-lg shadow-lg flex justify-between items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="text-2xl font-semibold">🚀 Manage Your Proposals</h2>
            <p className="text-sm text-gray-200">Create, review, and track your proposals efficiently.</p>
          </div>
          <Button
            onClick={handleGenerateAIProposal}
            disabled={aiLoading}
            className="bg-black text-white hover:bg-gray-900 flex items-center gap-2 shadow-lg transition-all"
          >
            <FaRobot />
            {aiLoading ? "Generating AI Proposal..." : "Generate with AI"}
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            className="p-6 bg-white shadow-md rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaPlusCircle className="text-blue-500" /> Create New Proposal
            </h3>
            <ProposalForm
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
            />
            <Button
              onClick={() => alert("Proposal submitted!")}
              className="mt-4 w-full flex items-center justify-center gap-2"
            >
              <FaPaperPlane />
              Submit Proposal
            </Button>
            {image && (
              <div className="mt-4 flex flex-col items-center">
                <FaImage className="text-gray-500 text-2xl" />
                <img src={image} alt="AI Generated Proposal" className="mt-2 rounded-lg shadow-lg" />
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            {loading ? (
              <Card className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </Card>
            ) : (
              <ProposalList proposals={proposals} />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Proposals;
