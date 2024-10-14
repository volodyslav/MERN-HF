import { axiosIstance } from "../../lib/axios";
import { useState, useEffect } from "react"
import toast from "react-hot-toast";
import { CiSearch } from "react-icons/ci";


const TextGeneration = () => {
    const [text, setText] = useState("");
    const [generatedText, setGeneratedText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        if (!generatedText) return; 
        let index = 0;
        const intervalId = setInterval(() => {
          setDisplayedText((prev) => prev + generatedText[index]);
          index++;
          if (index === generatedText.length - 1) clearInterval(intervalId);
        }, 10);
    
        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [generatedText]);

    const generateTextMutation = async() => {
        setIsLoading(true);
        try {
            const response = await axiosIstance.post("/models/text-generation", {text});
            console.log(response)
            setGeneratedText(response.data.message);
        } catch (error) {
            toast.error(error.error || "Something went wrong");
        }finally{
            setIsLoading(false);
        }
    } 
      
    // Implement form validation logic here.
    const handleGenerateText = (e) => {
        e.preventDefault();
        setGeneratedText("");
        setDisplayedText("");
        // Implement form validation logic here.
        generateTextMutation();
    }

  return (
    <div className="  sm:mx-20 mx-2 o flex justify-center items-center flex-col my-2 sm:p-10">
        <h1 className=' text-center text-4xl my-2'>Text Generation</h1>
        <div className=" h-[500px] overflow-auto my-10 border-4 border-slate-800 rounded-xl bg-gray-600 w-full  p-6">
            <div className="chat chat-start">
                {generatedText && <div className="chat-bubble text-xl">{displayedText}</div>}
            </div>
            <div className="chat chat-end">
                {text && <div className="chat-bubble text-xl">{text}</div>}
            </div>
        </div>
        
        <form onSubmit={handleGenerateText} className=" w-full  mx-auto flex space-x-4 items-center">
            <input maxLength={200} type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter some text..." className="input input-bordered w-full min-h-14" />
            <button type="submit" disabled={isLoading} className="bg-blue-800 p-2 text-xl hover:bg-blue-700 text-white rounded-lg ">{isLoading ? <span className="loading loading-spinner loading-lg"></span> : <CiSearch className=" w-10 h-10"/>}</button>
            
        </form>
    </div>
  )
}

export default TextGeneration