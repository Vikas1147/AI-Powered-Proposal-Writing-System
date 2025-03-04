import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, RefreshCw, Clock } from "lucide-react";
import Card from "./ui/Card";
import Alert from "./ui/Alert";

// Proposal list item component for better organization
const ProposalItem = ({ proposal, onView }) => {
  // Format the date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="py-4 first:pt-0 last:pb-0"
    >
      <div className="flex items-start justify-between group">
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-semibold text-gray-900 truncate pr-4">
            {proposal.title}
          </h4>
          <p className="mt-1 text-gray-600 line-clamp-2">
            {proposal.description}
          </p>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>{formatDate(proposal.createdAt)}</span>
          </div>
        </div>
        <button
          onClick={() => onView(proposal)}
          className="flex items-center text-blue-600 hover:text-blue-800 
                   font-medium transition-colors duration-200
                   opacity-0 group-hover:opacity-100 focus:opacity-100"
        >
          View Details
          <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.li>
  );
};

ProposalItem.propTypes = {
  proposal: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
  }).isRequired,
  onView: PropTypes.func.isRequired
};

const ProposalList = ({ proposals, onRefresh }) => {
  const handleViewProposal = (proposal) => {
    // Simulate viewing a proposal
    console.log('Viewing proposal:', proposal);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Recent Proposals</h3>
        {proposals.length > 0 && (
          <button
            onClick={onRefresh}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full
                     hover:bg-gray-100 transition-colors duration-200"
            aria-label="Refresh proposals"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        )}
      </div>

      <AnimatePresence mode="popLayout">
        {proposals.length > 0 ? (
          <motion.ul
            layout
            className="divide-y divide-gray-200"
          >
            {proposals.map((proposal) => (
              <ProposalItem
                key={proposal._id}
                proposal={proposal}
                onView={handleViewProposal}
              />
            ))}
          </motion.ul>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Alert type="info">
              <p className="text-center">
                No proposals found. Create your first proposal to get started.
              </p>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

ProposalList.propTypes = {
  proposals: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired
    })
  ).isRequired,
  onRefresh: PropTypes.func.isRequired
};

export default ProposalList;
