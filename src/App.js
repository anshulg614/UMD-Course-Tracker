import React, { useState, useEffect } from 'react';
import './App.css';
import GenEdPlanner from './GenEdPlanner.js';

function App() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      const perPage = 100;
      let pageNum = 1;
      let allCourses = [];

      while (true) {
        try {
          const response = await fetch(`https://api.umd.io/v1/courses?page=${pageNum}&per_page=${perPage}`);
          const data = await response.json();

          if (data.length === 0) {
            break; // no more results to fetch
          }

          allCourses = allCourses.concat(data);
          pageNum++;
        } catch (error) {
          console.error(error);
          break;
        }
      }

      setCourses(allCourses);
    }

    fetchCourses();
  }, []);

  return (
    <div className="App">
      <GenEdPlanner courses = {courses}/>
    </div>
  );
};

export default App;