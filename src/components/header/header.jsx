import { useRef, useEffect } from "react";
import "./header.css";


export const Header = ({ onSearch, searchQuery }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <header className=" bg-dark text-white p-3 d-flex justify-content-between">
      <div className="logo">
        <span role="img" >🎥</span>
        <h1>My Movies</h1>
      </div>
      <input
        ref={inputRef}
        value={searchQuery}
        type="text"
        className="form-control w-25"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </header>
     
    
    
  );
};