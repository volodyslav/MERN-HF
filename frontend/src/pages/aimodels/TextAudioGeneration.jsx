import  { useState } from 'react';
import { axiosIstance } from '../../lib/axios';
import toast from 'react-hot-toast';
import { GiRollingEnergy } from "react-icons/gi";
import { BsSave } from "react-icons/bs";

function TextAudioGeneration() {
  const [input, setInput] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAudio = async () => {
    setAudioUrl(null)
    setLoading(true);
    try {
      const response = await axiosIstance.post("/models/text-audio-generation", { prompt: input },
        {responseType: 'blob'});
      const url = URL.createObjectURL(response.data);
      setAudioUrl(url);
    } catch (error) {
      toast.error(error.error);
    }finally{
        setLoading(false);
    }
  };

  const saveAudio = () => {
    if (!audioUrl) return;

    // Create an <a> element to trigger the download
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = 'generated-audio.wav'; // Default filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up
  };

  return (
    <div className=' flex flex-col mx-10 items-center mt-2'>
        <h1 className=' text-center text-4xl my-10'>Text to Audio Generation</h1>
        <div className='flex space-x-2 items-center w-full'>
            <input title='prompt' type="text" placeholder="Type here" value={input} onChange={(e) => setInput(e.target.value)} className="input h-16 text-xl input-bordered w-full" />
            <button disabled={loading} title='generate audio' onClick={fetchAudio} className='disabled:bg-gray-600 bg-blue-800 rounded-xl text-white p-4 '><GiRollingEnergy className='w-10 h-10'/></button>
        </div>
      {loading && !audioUrl && <span className="mt-10 loading loading-dots loading-lg"></span>}
      {audioUrl 
      && (
        <div className=' flex space-x-4 mt-10 items-center'>
          <audio controls>
            <source src={audioUrl} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
          <button title='save audio' onClick={saveAudio} disabled={!audioUrl} className=' disabled:bg-gray-600 bg-blue-800 rounded-xl text-white p-4 '><BsSave className='w-10 h-10'/></button>
        </div>
      )}
    </div>
  );
}

export default TextAudioGeneration;
