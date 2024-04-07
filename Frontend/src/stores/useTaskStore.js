// src/stores/useTaskStore.js
import { create } from "zustand";

const useTaskStore = create((set) => ({
  tasks: [],
  nextId: 1, // Initialize nextId to start from 1
  addTask: (task) => {
    set((state) => {
      // Log task details with the next available ID
      console.log(`Creating task: ${task.title}, ID: ${state.nextId}`);

      // Add the new task with the next available ID and increment the nextId for future tasks
      const newTask = { ...task, id: state.nextId };
      const updatedTasks = [...state.tasks, newTask];

      return {
        tasks: updatedTasks,
        nextId: state.nextId + 1, // Increment the nextId for the next task
      };
    });
  },
}));

export default useTaskStore;
