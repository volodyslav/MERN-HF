
import toast from 'react-hot-toast';
import { axiosIstance } from '../../lib/axios';
import { useEmailContext } from '../../context/EmailContext';

const EmailPage = () => {
   const {email, setEmailSent, setEmail} = useEmailContext();
    // Email page getter
  const sendEmail = async () => {
    try{
      const response = await axiosIstance.post("/auth/send-email", {email: email});
      toast.success(response.data.message);
      setEmailSent(true);
    } catch (error) {
      toast.error(error.error || "Email does not exist or not a valid email")
      setEmailSent(false);
    }
  }
  const handleSendEmail = () => {
    // Implement sending email logic here.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid email format");
      return;
    }
    sendEmail();
     
  }
  return (
    <div className=" flex space-x-4 mt-10 w-1/2 mx-auto justify-center ">
      <input maxLength={50}  value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input input-bordered w-full " />
      <button className="bg-blue-700 hover:bg-blue-800 text-white rounded-2xl p-2" onClick={handleSendEmail}>Submit</button>
    </div>
  )
}

export default EmailPage