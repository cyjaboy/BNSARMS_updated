import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard/dashboard";
import Activities from "./scenes/activities/activities";
import SubmitReports from "./scenes/reports/submitReports";
import Tasks from "./scenes/Tasks/tasks";
import NewTaskForm from "./scenes/Tasks/newTaskForm";
import NewActivityForm from "./scenes/activities/newActivityForm"; // Make sure the path is correct
// Make sure the path is correct
import ViewSubmission from "./scenes/Tasks/viewSubmission";
import ViewActivity from "./scenes/activities/viewActivity";

import Beneficiaries from "./scenes/beneficiaries/beneficiaries";
import Calendar from "./scenes/calendar/calendar";
// import Archives from "./scenes/archives";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/activities/new" element={<NewActivityForm />} />
              <Route
                path="/activities/view/:activityId"
                element={<ViewActivity />}
              />
              <Route path="/beneficiaries" element={<Beneficiaries />} />
              <Route path="/submitReports" element={<SubmitReports />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/tasks/new" element={<NewTaskForm />} />{" "}
              <Route path="/tasks/view/:taskId" element={<ViewSubmission />} />
              {/* New Route for adding a task */}
              <Route path="/calendar" element={<Calendar />} />
              {/* <Route path="/archives" element={<Archives />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
