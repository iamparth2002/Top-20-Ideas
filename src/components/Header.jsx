import {  useNavigate } from "react-router-dom";


const Header = () => {
  const navigate = useNavigate();
  function handleClick(){
    console.log('hi')
    navigate('/create')
  }
  return (
    <div className="flex gap-10 items-center justify-between border shadow-lg py-3 px-4 rounded-xl lg:w-[1000px] mx-2 md:m-0">
      <button className="btn btn-accent text-lg" onClick={handleClick}>+ Add Idea</button>
      <div>
        <h1 className="hidden md:block text-lg lg:text-4xl font-semibold cursor-pointer"  onClick={()=>{navigate('/')}}>Top 20 Ideas</h1>
      </div>
      <img src="./top-2.png" alt="" className="h-20 w-20 rounded-full p-2" />
    </div>
  );
};

export default Header;
