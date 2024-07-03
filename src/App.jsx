import { useState, useCallback, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");
  const [btnTxt, setBtnTxt] = useState("Copy");

  // useRef hook
  const passwordRef = useRef(null);

  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllow) str += "0123456789";
    if (charAllow) str += "!@#$%&*()_";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numAllow, charAllow, setPassword]);

  // const btnClick = () => {
  //   setBtnTxt(btnTxt === "Copy" ? "Copied" : "Copy");
  // };

  //to copy the generated password to clipboard
  const copyPasswordToClipboard = useCallback(() => {
    // passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setBtnTxt("Copied");
    setTimeout(() => setBtnTxt("Copy"), 500);
  }, [password]);

  useEffect(() => {
    PasswordGenerator();
  }, [length, numAllow, charAllow, PasswordGenerator]);

  return (
    <>
      <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-2xl text-center text-white py-3">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            placeholder="Password"
            className="outline-none w-full py-1 px-3"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copyPasswordToClipboard}
          >
            {btnTxt}
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          {/* range */}
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={40}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>

          {/* Number checkBox */}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllow}
              id="numberInput"
              onChange={() => {
                setNumAllow((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>

          {/* char chechbox */}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllow}
              id="characterInput"
              onChange={() => {
                setCharAllow((prev) => !prev);
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
