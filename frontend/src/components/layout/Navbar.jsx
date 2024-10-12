import { useQuery, useQueryClient, useMutation} from "@tanstack/react-query"
import { Link } from "react-router-dom";
import { axiosIstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { IoMdLogOut } from "react-icons/io";

const Navbar = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"]});
  const queryClient = useQueryClient();


  const {mutate: logout} = useMutation({
    mutationFn: () => axiosIstance.post("/auth/logout"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Logged out successfully!");
     
    } 
  })

  return (
    <div className=" bg-slate-600 text-white p-4 flex items-center justify-end">
      <h1 className="mx-auto text-3xl"><Link to={"/"}>Content Generator</Link></h1>
        <div className="flex space-x-4">
          {authUser && <p className="text-2xl ">{authUser.username}</p>}
          {authUser && <button  onClick={() => logout()}>
            <IoMdLogOut className="h-8 w-8"/>
          </button>}
        </div>
    </div>
  )
}

export default Navbar