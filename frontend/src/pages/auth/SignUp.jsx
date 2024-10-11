import { useState } from "react"
import { Link } from "react-router-dom"
import toast from "react-hot-toast";
import { axiosIstance } from "../../lib/axios";
import { useMutation } from "@tanstack/react-query";

const SignUp = () => {
  // Implement form submission logic to sign up the user.
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {mutate: signUpMutation, isLoading} = useMutation({
    mutationFn: async (data) => {
      const response = await axiosIstance.post("/auth/signup", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Account created successfully!");
    },
    onError: (error) => {
      toast.error(error.response.data.error || "Something went wrong");
    }
  })


  const handleSubmit = (event) => {
    event.preventDefault();

    // Implement form validation logic here.
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!username ||!email ||!password) {
      toast.error("All fields are required");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    if (username.length < 3) {
      toast.error("Username must be at least 3 characters long");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid email format");
      return;
    }
    signUpMutation({username, email, password})
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <div className=" min-h-screen flex justify-center items-center">
      <div className="border-2 rounded-lg p-2 sm:p-10 sm:mx-10 mx-4 w-full sm:w-1/2 flex flex-col justify-center gap-4">
        <h1 className=" text-3xl text-center my-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
          <input maxLength={50} type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="input input-bordered w-full " />
          <input maxLength={50} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input input-bordered w-full " />
          <input maxLength={100} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input input-bordered w-full " />
          <input maxLength={100} type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="input input-bordered w-full " />
          <button type="submit" disabled={isLoading} className=" bg-blue-800 p-2 text-xl hover:bg-blue-700 text-white rounded-lg ">{isLoading ? <span className="loading loading-spinner loading-lg"></span> : "Submit"}</button>
        </form>
        <Link to="/login" className="text-center text-xl">Already have an account? <span className="text-blue-500 hover:text-blue-700">Log in</span></Link>
      </div>
    </div>
  )
}

export default SignUp