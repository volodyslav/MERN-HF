import Layout from "./components/layout/Layout"
import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/auth/Login"
import SignUp from "./pages/auth/SignUp"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import {Toaster} from "react-hot-toast"
import { useQuery } from "@tanstack/react-query";
import { axiosIstance } from "./lib/axios"
import toast from "react-hot-toast"
import TextGeneration from "./pages/aimodels/TextGeneration"
import ImageGeneration from "./pages/aimodels/ImageGeneration"
import { useEmailContext } from "./context/EmailContext"
import EmailPage from "./pages/auth/EmailPage"
import AudioGeneration from "./pages/aimodels/AudioGeneration"
import TextAudioGeneration from "./pages/aimodels/TextAudioGeneration"

const App = () => {
  const {emailSent} = useEmailContext()
  console.log(emailSent)
  
  const {data: authUser, isLoading} = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const response = await axiosIstance.get("/auth/")
        return response.data
      } catch (error) {
        if (error.response && error.response.status == 401) {
					return null;
				}
        toast.error(error.response.data.error)
        return null;
      }
    },
  })

  if (isLoading) return null;
  
  return (
    <Layout>
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to={"/login"}/>} />
        <Route path="/signup" element={!authUser && emailSent ? <SignUp /> : <Navigate to={"/"}/> } />
        <Route path="/send-email" element={!authUser && !emailSent ? <EmailPage /> : <Navigate to={"/signup"}/> } />
        <Route path="/login" element={!authUser && !emailSent? <Login /> : <Navigate to={"/"}/>} />
        <Route path="/text-generation" element={authUser ? <TextGeneration/> : <Navigate to={"/login"}/>}></Route>
        <Route path="/image-generation" element={authUser ? <ImageGeneration/> : <Navigate to={"/login"}/>}></Route>
        <Route path="/audio-generation" element={authUser ? <AudioGeneration/> : <Navigate to={"/login"}/>}></Route>
        <Route path="/text-audio-generation" element={authUser ? <TextAudioGeneration/> : <Navigate to={"/login"}/>}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Layout>
  )
}

export default App
