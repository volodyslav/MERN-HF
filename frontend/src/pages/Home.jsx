import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className=" grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 m-4 gap-4">
      <div className=" col-span-1 p-4 border rounded-lg flex justify-between ">
        <h1 className=" text-2xl">Text Generation</h1>
        <Link to={"/text-generation"} ><button className=" bg-blue-700 hover:bg-blue-900 text-white p-2 rounded-lg">Open</button></Link>
      </div>
      <div className=" col-span-1 p-4 border rounded-lg flex justify-between ">
        <h1 className=" text-2xl">Image Generation</h1>
        <Link to={"/image-generation"} ><button className=" bg-blue-700 hover:bg-blue-900 text-white p-2 rounded-lg">Open</button></Link>
      </div>
      <div className=" col-span-1 p-4 border rounded-lg flex justify-between ">
        <h1 className=" text-2xl">Audio Generation</h1>
        <Link to={"/audio-generation"} ><button className=" bg-blue-700 hover:bg-blue-900 text-white p-2 rounded-lg">Open</button></Link>
      </div>
      <div className=" col-span-1 p-4 border rounded-lg flex justify-between ">
        <h1 className=" text-2xl">Text to Audio Generation</h1>
        <Link to={"/text-audio-generation"} ><button className=" bg-blue-700 hover:bg-blue-900 text-white p-2 rounded-lg">Open</button></Link>
      </div>
    </div>
  )
}

export default Home