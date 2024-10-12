import { axiosIstance } from "../../lib/axios";
import { useMutation} from "@tanstack/react-query"
import { useState } from "react"
import toast from "react-hot-toast";
import { CiSearch } from "react-icons/ci";

const TextGeneration = () => {
    const [text, setText] = useState("");
    const [generatedText, setGeneratedText] = useState("");

    const {mutate: generateTextMutation, isLoading} = useMutation({
        mutationFn: async (data) => {
            const response = await axiosIstance.post("/models/text-generation", data);
            return response.data;
        },
        onSuccess: (data) => {
            setGeneratedText(data.message);
            setText("");
        },
        onError: (error) => {
            toast.error(error.response.data.error || "Something went wrong");
        }
    });

    const handleGenerateText = (e) => {
        e.preventDefault();
        generateTextMutation({text});
    }

  return (
    <div className=" min-h-screen flex justify-center items-center flex-col">
        <div className=" my-4 border-4 border-slate-800 rounded-xl bg-gray-600 w-full sm:w-1/2 m-10 p-4">
            <div className="chat chat-start">
                <div className="chat-bubble">{text}</div>
            </div>
            <div className="chat chat-end">
                <div className="chat-bubble">{generatedText}</div>
            </div>
        </div>
        
        <form onSubmit={handleGenerateText} className=" w-full sm:w-1/2 mx-auto flex space-x-4 items-center">
            <input maxLength={200} type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter some text..." className="input input-bordered w-full min-h-14" />
            <button type="submit" disabled={isLoading} className="bg-blue-800 p-2 text-xl hover:bg-blue-700 text-white rounded-lg ">{isLoading ? <span className="loading loading-spinner loading-lg"></span> : <CiSearch className=" w-10 h-10"/>}</button>
            
        </form>
    </div>
  )
}

export default TextGeneration