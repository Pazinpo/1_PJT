// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
// src/App.js
import React from "react";
import "./App.css";
import DetailsPage from "./component/page/DetailsPage"; 
// ↑ 경로 주의: src 기준이므로 ./component/page/DetailsPage 가 맞습니다.

function App() {
  return (
    <div className="App">
      <DetailsPage />
    </div>
  );
}

export default App;

