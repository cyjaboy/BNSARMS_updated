// useActivityStore.js
import { create } from "zustand";

const useActivityStore = create((set) => ({
  activities: [],
  nextId: 1,
  addActivity: (activity, beneficiaryIds) =>
    set((state) => ({
      activities: [
        ...state.activities,
        { ...activity, id: state.nextId, beneficiaries: beneficiaryIds },
      ],
      nextId: state.nextId + 1,
    })),
}));

export default useActivityStore;
