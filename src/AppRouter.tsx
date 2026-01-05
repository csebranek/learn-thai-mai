import React, { FunctionComponent, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './components/App'
import Settings from './components/Settings'
import Data from './data/phrases.json'

export const AppRouter: FunctionComponent = () => {
  const [category, setCategory] = useState(() => {
    return localStorage.getItem('thaicategory') || 'default';
  });
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('thaimode') || 'english-to-thai';
  });
  const [quizMode, setQuizMode] = useState(() => {
    return localStorage.getItem('thaiquizmode') || 'easy';
  });
  const [data] = useState(Data);
  const [subsetData, setSubsetData] = useState(Data);

  // Persist settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('thaicategory', category);
  }, [category]);

  useEffect(() => {
    localStorage.setItem('thaimode', mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('thaiquizmode', quizMode);
  }, [quizMode]);

  // Filter data when category changes
  useEffect(() => {
    if (category === 'default') {
      setSubsetData(data);
      return;
    }

    const subset = data.filter((item: any) => item.category === category);
    setSubsetData(subset);
  }, [category, data]);

  const handleCategoryChange = (selectedCategory: string) => {
    setCategory(selectedCategory);
  }

  const handleModeChange = (selectedMode: string) => {
    setMode(selectedMode);
  }

  const handleQuizModeChange = (selectedQuizMode: string) => {
    setQuizMode(selectedQuizMode);
  }

  return (
    <Router basename="/thai">
      <Routes>
        <Route 
          path="/" 
          element={
            <App 
              data={data}
              subsetData={subsetData}
              mode={mode}
              category={category}
              quizMode={quizMode}
            />
          } 
        />
        <Route 
          path="/options" 
          element={
            <Settings 
              category={category}
              mode={mode}
              quizMode={quizMode}
              onCategoryChange={handleCategoryChange}
              onModeChange={handleModeChange}
              onQuizModeChange={handleQuizModeChange}
            />
          } 
        />
      </Routes>
    </Router>
  );
}

export default AppRouter;
