import { axiosIstance } from "../../lib/axios"
import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Link } from "react-router-dom"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient();

  const {mutate: loginMutation, isLoading } = useMutation({
    mutationFn: async (data) => await axiosIstance.post("/auth/login", data),
    onSuccess: () => {
      toast.success("Logged in successfully!");
      queryClient.invalidateQueries({queryKey: ["authUser"]});
    },
    onError: (error) => {
      toast.error(error.response.data.error || "Something went wrong");
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation({ username, password });
  }

  return (
    <div className=" min-h-screen flex justify-center items-center">
      <div className="border-2 rounded-lg p-2 sm:p-10 sm:mx-10 mx-4 w-full sm:w-1/2 flex flex-col justify-center gap-4">
        <h1 className=" text-3xl text-center my-6">Log in</h1>
        <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
          <input maxLength={50} type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="input input-bordered w-full " />
          <input maxLength={100} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input input-bordered w-full " />
          <button type="submit" disabled={isLoading} className=" bg-blue-800 p-2 text-xl hover:bg-blue-700 text-white rounded-lg ">{isLoading ? <span className="loading loading-spinner loading-lg"></span> : "Submit"}</button>
        </form>
        <Link to="/signup" className="text-center text-xl">{"Don't "}have an account ? <span className="text-blue-500 hover:text-blue-700">Sign up</span></Link>
      </div>
    </div>
  )
}

export default Login