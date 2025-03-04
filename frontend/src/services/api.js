const mockProposals = [
  {
    _id: "1",
    title: "Sample Proposal 1",
    description: "This is a sample proposal description.",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    title: "Sample Proposal 2",
    description: "Another sample proposal for testing purposes.",
    createdAt: new Date().toISOString(),
  },
];

export const proposalService = {
  getAllProposals: async () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(mockProposals), 500);
    }),

  getProposal: async (id) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const proposal = mockProposals.find((p) => p._id === id);
        proposal ? resolve(proposal) : reject(new Error("Proposal not found"));
      }, 500);
    }),

  createProposal: async (proposalData) =>
    new Promise((resolve) => {
      setTimeout(() => {
        const newProposal = {
          _id: (mockProposals.length + 1).toString(),
          ...proposalData,
          createdAt: new Date().toISOString(),
        };
        mockProposals.push(newProposal);
        resolve(newProposal);
      }, 500);
    }),

  updateProposal: async (id, proposalData) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockProposals.findIndex((p) => p._id === id);
        if (index !== -1) {
          mockProposals[index] = { ...mockProposals[index], ...proposalData };
          resolve(mockProposals[index]);
        } else reject(new Error("Proposal not found"));
      }, 500);
    }),

  deleteProposal: async (id) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockProposals.findIndex((p) => p._id === id);
        if (index !== -1) {
          mockProposals.splice(index, 1);
          resolve({ message: "Proposal deleted" });
        } else reject(new Error("Proposal not found"));
      }, 500);
    }),
};
