import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import React, { useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";



// export default  App() {
//   return (
//     <div>App</div>
//   )
// }


export default function App () {
  const pageSize = 8;
  const apiKey = process.env.REACT_APP_NEWS_API_KEY_TWO

  const [progress, setProgress] = useState(0)

  // let state={
  //   progress: 0,
  // }

  // setProgress(progress)
  // let setProgress =(progress)=>{
  //   this.setState({progress:progress})
  // }

  // render() {
    return (
      <>
      <div>
        <Router>
          <Navbar/>
          <LoadingBar
            height={4}
            color='#f11946'
            progress={progress}
            // onLoaderFinished={() => this.setProgress(0)}
          />
          {/* <News key="" pageSize={pageSize} country="in" category="sports"/> */}
          <Routes>
              <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general"/>}></Route>
              <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business"/>}></Route>
              <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment"/>}></Route>
              <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health"/>}></Route>
              <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science"/>}></Route>
              <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports"/>}></Route>
              <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology"/>}></Route>
        </Routes>
        </Router>
      </div>
      </>
    )
  // }
}