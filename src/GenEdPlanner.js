import React, { useState } from "react";
import "./GenEdPlanner.css";
import Footer from "./Footer";

function GenEdPlanner({ courses }) {
  // Create an object to store courses based on their gen eds
  const coursesByGenEd = {};
  courses.forEach((course) => {
    course.gen_ed.forEach((genEd) => {
      if (coursesByGenEd[genEd]) {
        coursesByGenEd[genEd].push(course);
      } else {
        coursesByGenEd[genEd] = [course];
      }
    });
  });

  // Define state variable for expanded gen ed boxes
  const [expandedGenEds, setExpandedGenEds] = useState({});

  // Define state variable for selected courses
  const [selectedCourses, setSelectedCourses] = useState([]);

  // Sort gen eds alphabetically and create a button for each course
  const genEdButtons = Object.keys(coursesByGenEd)
    .sort()
    .map((genEd) => {
      const courses = coursesByGenEd[genEd];
      const courseButtons = courses.map((course) => (
        <button
          key={course.course_id}
          className="course-button"
          onClick={() => {
            scrollToTop();
            if (
              !selectedCourses.some((c) => c.course_id === course.course_id)
            ) {
              setSelectedCourses([...selectedCourses, course]);
            }
          }}
        >
          {course.course_id} - {course.name}
        </button>
      ));

      // Define function to toggle expanded state of gen ed box
      const toggleExpanded = () => {
        setExpandedGenEds((prev) => ({ ...prev, [genEd]: !prev[genEd] }));
      };

      return (
        <div className="gen-ed-box" key={genEd}>
          <h4>
            <button onClick={toggleExpanded} className="rahulsanape">
              {genEd} - {courses.length} courses available{" "}
              {expandedGenEds[genEd] ? "-" : "+"}
            </button>
          </h4>
          {expandedGenEds[genEd] && (
            <div className="course-box">{courseButtons}</div>
          )}
        </div>
      );
    });

  // Define function to remove a selected course
  const removeSelectedCourse = (course) => {
    setSelectedCourses(
      selectedCourses.filter((c) => c.course_id !== course.course_id)
    );
  };

  function scrollToTop() {
    window.scrollTo({ top: 300, behavior: "smooth" });
  }

  function calculateTotalCredits(selectedCourses) {
    let uniqueCourses = [];
    let totalCredits = 0;
    for (let i = 0; i < selectedCourses.length; i++) {
      let course = selectedCourses[i];
      if (!uniqueCourses.includes(course)) {
        uniqueCourses.push(course);
        totalCredits += parseInt(course.credits);
      }
    }
    return totalCredits;
  }

  function FundamentalCredits(selectedCourses) {
    let fundamentalcreds = 0;

    for (let i = 0; i < selectedCourses.length; i++) {
      let course = selectedCourses[i];

      if (
        course.gen_ed.toString().includes("FSAW") ||
        course.gen_ed.toString().includes("FSPA") ||
        course.gen_ed.toString().includes("FSOC") ||
        course.gen_ed.toString().includes("FSMA") ||
        course.gen_ed.toString().includes("FSAR")
      ) {
        fundamentalcreds += parseInt(course.credits);
      }
    }
    return fundamentalcreds;
  }

  function DistributiveCredits(selectedCourses) {
    let distributivecreds = 0;

    for (let i = 0; i < selectedCourses.length; i++) {
      let course = selectedCourses[i];

      if (
        course.gen_ed.toString().includes("DSNL") ||
        course.gen_ed.toString().includes("DSNS") ||
        course.gen_ed.toString().includes("DSHS") ||
        course.gen_ed.toString().includes("DSHU") ||
        course.gen_ed.toString().includes("DSSP")
      ) {
        distributivecreds += parseInt(course.credits);
      }
    }

    return distributivecreds;
  }

  function SeriesCredits(selectedCourses) {
    let seriescreds = 0;

    for (let i = 0; i < selectedCourses.length; i++) {
      let course = selectedCourses[i];

      if (course.gen_ed.toString().includes(["SCIS"])) {
        seriescreds += parseInt(course.credits);
      }
    }

    return seriescreds;
  }

  function DiversityCredits(selectedCourses) {
    let diversitycreds = 0;

    for (let i = 0; i < selectedCourses.length; i++) {
      let course = selectedCourses[i];

      if (
        course.gen_ed.toString().includes("DVCC") ||
        course.gen_ed.toString().includes("DVUP") ||
        course.gen_ed.toString().includes("DVCC/DVUP") ||
        course.gen_ed.toString().includes("DVUP/DVCC")
      ) {
        diversitycreds += parseInt(course.credits);
      }
    }

    return diversitycreds;
  }

  return (
    <div id="main">
      <div id="section-1">
        {" "}
        {/* <h1>UMD Gen Ed Planner</h1>{" "} */}
        <div className="page-header">
          <img
            className="background-image"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Mckeldin_Mall.jpg/1200px-Mckeldin_Mall.jpg"
            alt="Background Cover"
          />
          <h1 className="title">UMD Gen-Ed Tracker</h1>
        </div>
      </div>
      <div id="section-2">
        <div classname="bottomsection">
          <div className="left">
            <h2>My Courses</h2>
            <ul>
              {selectedCourses.map((course) => (
                <div key={course.course_id} className="mycourse-button">
                  <p><b>{course.name}</b></p>
                  {course.course_id} - {course.gen_ed.join(' ')} -{" "}
                  {course.credits} credits
                  <div>
                    <button
                      className="remove-button"
                      onClick={() => removeSelectedCourse(course)}
                    >
                      Remove Course
                    </button>
                  </div>
                </div>
              ))}
            </ul>
          </div>
          <div class="right">
            <h2>Credit Requirements</h2>
            <div class="grid-container">
              <div class="box blue">
                <h4>Fundamental Studies</h4>
                <div class="credits">
                  {" "}
                  {FundamentalCredits(selectedCourses)}/15 Credits
                </div>
                <div class="completed"></div>
                <div class="completed">
                  <b>Courses:</b>
                </div>
                <div class="completed">FSAW: 3 credits</div>
                <div class="completed">FSPW: 3 credits</div>
                <div class="completed">FSOC: 3 credits</div>
                <div class="completed">FSMA: 3 credits</div>
                <div class="completed">FSAR: 3 credits</div>
              </div>
              <div class="box yellow">
                <h4>Distributive Studies</h4>
                <div class="credits">
                  {DistributiveCredits(selectedCourses)}/25 Credits
                </div>
                <div class="completed">
                  <b>Courses:</b>{" "}
                </div>
                <div class="completed">DSNL/DSNS: 7 credits</div>
                <div class="completed">DSHS: 6 credits</div>
                <div class="completed">DSHU: 6 credits</div>
                <div class="completed">DSSP: 6 credits</div>
              </div>
              <div class="box purple">
                <h4>I-Series</h4>
                <div class="credits">
                  {SeriesCredits(selectedCourses)}/6 Credits
                </div>
                <div class="completed"></div>
                <div class="completed">
                  <b>Courses:</b>{" "}
                </div>
                <div class="completed">SCIS: 6 credits </div>
              </div>
              <div class="box green">
                <h4>Diversity</h4>
                <div class="credits">
                  {DiversityCredits(selectedCourses)}/6 Credits
                </div>
                <div class="completed"></div>
                <div class="completed">
                  <b>Courses:</b>{" "}
                </div>
                <div class="completed">DVUP/DVCC: 6 credits </div>
              </div>
            </div>
            <div class = "box white">
              <h3> Total Credits: {calculateTotalCredits(selectedCourses)}</h3>
            </div>
          </div>
        </div>
        <hr></hr>
        <h1>
          {" "}
          <b>Available General Education Courses</b>
        </h1>
        <div>{genEdButtons}</div>
      </div>
      <Footer />
    </div>
  );
}

export default GenEdPlanner;