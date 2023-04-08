import React from 'react';

function UmdCourses({ courses }) {
  if (courses.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>UMD General Education Courses</h1>
      <ul>
        {courses.map((course) => (
          (course.gen_ed.length > 0) &&
          <li key={course.course_id}>
            {course.course_id} - {course.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UmdCourses;
