import  { useState } from 'react';
import { axiosIstance } from '../../lib/axios';
import toast from 'react-hot-toast';
import { GiRollingEnergy } from "react-icons/gi";
import { BsSave } from "react-icons/bs";

function ImageGeneration() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchImage = async () => {
    setImageUrl(null)
    setLoading(true);
    try {
      const response = await axiosIstance.post("/models/image-generation", { prompt: input },
        {responseType: 'blob'});
      const url = URL.createObjectURL(response.data);
      setImageUrl(url);
    } catch (error) {
      toast.error(error.error);
    }finally{
        setLoading(false);
    }
  };

  const saveImage = () => {
    if (!imageUrl) return;

    // Create an <a> element to trigger the download
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'generated-image.png'; // Default filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up
  };

  return (
    <div className=' flex flex-col mx-10 items-center mt-2'>
      <h1 className=' text-center text-4xl my-10'>Image Generation</h1>
        <div className='flex space-x-2 items-center w-full'>
            <input type="text" placeholder="Type here" value={input} onChange={(e) => setInput(e.target.value)} className="input h-16 text-xl input-bordered w-full" />
            <button disabled={loading} title='generate image' onClick={fetchImage} className='disabled:bg-gray-600 bg-blue-800 rounded-xl text-white p-4 '><GiRollingEnergy className='w-10 h-10'/></button>
            <button title='save image' onClick={saveImage} disabled={!imageUrl} className=' disabled:bg-gray-600 bg-blue-800 rounded-xl text-white p-4 '><BsSave className='w-10 h-10'/></button>
        </div>
      {loading && !imageUrl && <span className="mt-10 loading loading-dots loading-lg"></span>}
      {imageUrl && 
      <img src={imageUrl} className='my-10 max-w-full max-h-screen' alt="Generated image"  />}
    </div>
  );
}

export default ImageGeneration;
