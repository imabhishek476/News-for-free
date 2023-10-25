import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import React, { useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


export default function App () {
  const pageSize = Number(process.env.REACT_APP_PAGE_SIZE);
  const apiKey = process.env.REACT_APP_WORLD_NEWS_API_KEY;

  const [progress, setProgress] = useState(0)
  const [articles, setArticles] = useState([]);
  const [name, setName] = useState(localStorage.getItem('search'));


    return (
      <>
      <div>
        <Router>
          <Navbar name={name} setName={setName} />
          <LoadingBar
            height={4}
            color='#f11946'
            progress={progress}
            // onLoaderFinished={() => this.setProgress(0)}
          />
          <Routes>
              <Route exact path="/" element={<News name={name} setName={setName} articles={articles} setArticles={setArticles} setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general"/>}></Route>
              <Route exact path="/business" element={<News name={name} setName={setName} articles={articles} setArticles={setArticles} setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business"/>}></Route>
              <Route exact path="/entertainment" element={<News name={name} setName={setName} articles={articles} setArticles={setArticles} setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment"/>}></Route>
              <Route exact path="/health" element={<News name={name} setName={setName} articles={articles} setArticles={setArticles} setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health"/>}></Route>
              <Route exact path="/science" element={<News name={name} setName={setName} articles={articles} setArticles={setArticles} setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science"/>}></Route>
              <Route exact path="/sports" element={<News name={name} setName={setName} articles={articles} setArticles={setArticles} setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports"/>}></Route>
              <Route exact path="/technology" element={<News name={name} setName={setName} articles={articles} setArticles={setArticles} setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology"/>}></Route>
              <Route exact path={"/search"} element={<News name={name} setName={setName} articles={articles} setArticles={setArticles} setProgress={setProgress} apiKey={apiKey} key={"search"} pageSize={pageSize}/>}></Route>        </Routes>
        </Router>
      </div>
      </>
    )
}