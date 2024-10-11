import Layout from "./components/layout/Layout"
import { Routes, Route } from "react-router-dom"
import Login from "./pages/auth/Login"
import SignUp from "./pages/auth/SignUp"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import {Toaster} from "react-hot-toast"

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Layout>
  )
}

export default App
