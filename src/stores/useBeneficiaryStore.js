import { create } from "zustand";

let idCounter = 0; // Simple counter to act as a unique ID generator

const useBeneficiaryStore = create((set) => ({
  beneficiaries: [],
  addBeneficiary: (beneficiary) =>
    set((state) => ({
      beneficiaries: [
        ...state.beneficiaries,
        { ...beneficiary, id: ++idCounter },
      ],
    })),
}));

export default useBeneficiaryStore;
