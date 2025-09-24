import { ThemeProvider } from "@/components/theme-provider"
import { BrowserRouter as Router, Link } from "react-router-dom"
import { AppRoutes } from "./routes/routes"
import Navbar from "./components/navbar/Navbar"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
  
          <Navbar />
          <AppRoutes />
      </Router>
    </ThemeProvider>
  )
}

export default App
