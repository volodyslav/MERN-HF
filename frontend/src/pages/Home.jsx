import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className=" grid grid-cols-3 m-4">
      <div className=" col-span-1 p-4 border rounded-lg ">
        <Link to={"/text-generation"} className=" text-2xl">Text Generation</Link>
      </div>
    </div>
  )
}

export default Home