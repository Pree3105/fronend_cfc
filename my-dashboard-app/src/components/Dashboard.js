import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaPhone, FaUser,FaGlobe } from 'react-icons/fa';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';



const SemiCircleProgressBar = ({ percentage }) => {
  const radius = 80;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-40 h-20 overflow-hidden">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
      >
        <circle
          stroke="#4169E1"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
    </div>
  );
};

const Dashboard = () => {

    const skills = [
        { name: 'AWS', value: 30 },
        { name: 'Git', value: 25 },
        { name: 'Golang', value: 20 },
        { name: 'Solidity', value: 15 },
        { name: 'AAVE', value: 10 },
      ];
  const [progress, setProgress] = useState({ skills: 0, longestTenure: 0, shortestTenure: 0 });
  const [matchScore, setMatchScore] = useState(97); // Initial match score

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress({ skills: 90, longestTenure: 62, shortestTenure: 20 });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const COLORS = ['#1E90FF', '#4169E1', '#4682B4', '#5F9EA0', '#6495ED'];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Search Bar */}
      <div className="w-full bg-blue-950 p-1 rounded-md mb-8">
        <input 
          type="text" 
          placeholder="Search job title, location, skills..." 
          className="w-full p-3 bg-[#0a0a23] text-white rounded-md focus:outline-none font-thin" 
        />
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left sidebar */}
        <div className="col-span-3">
          <div className="bg-blue-700 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Top 15 (17)</h2>
            <ul className="space-y-2">
              {['John Davis', 'Richard Byrde', 'Mark Johnson', 'Michael Brown', 'Alice Smith', 'Mary Jane', 'Alice Jones', 'Steve Dylan', 'Maya Garcia', 'Sarah Jones', 'David Johnson', 'Olivia Sanchez', 'Taylor Montgomery', 'Mark Smith'].map((name, index) => (
                <li key={index} className="flex items-center space-x-4 cursor-pointer">
                  <div className="w-6 h-6 flex items-center justify-center bg-[#0a0a23] text-white rounded-full font-thin">
                    {index + 1}
                  </div>
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main content */}
<div className="col-span-6">
  {/* Match percentage with semicircular progress bar */}
  <div className="bg-blue-950 p-4 rounded-lg shadow-lg flex flex-col items-center justify-center mb-8 w-40 mx-auto">
    <div className="relative flex items-center justify-center">
      {/* Rotate only the semicircular progress bar */}
      <div className="rotate-180">
        <SemiCircleProgressBar percentage={matchScore} />
      </div>
      {/* Percentage stays upright */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-3xl font-bold">97%</div>
        <div className="text-sm">MATCH</div>
      </div>
    </div>
  </div>


          {/* Progress bars */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center">
              <span className="w-32">Skills Experience</span>
              <div className="flex-grow bg-blue-950 rounded-full h-4">
                <div
                  className="bg-blue-500 h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${progress.skills}%` }}
                ></div>
              </div>
              <span className="ml-2">5.6 YRS</span>
            </div>
            <div className="flex items-center">
              <span className="w-32">Longest Tenure</span>
              <div className="flex-grow bg-blue-950 rounded-full h-4">
                <div
                  className="bg-blue-500 h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${progress.longestTenure}%` }}
                ></div>
              </div>
              <span className="ml-2">3.1 YRS</span>
            </div>
            <div className="flex items-center">
              <span className="w-32">Shortest Tenure</span>
              <div className="flex-grow bg-blue-950 rounded-full h-4">
                <div
                  className="bg-blue-500 h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${progress.shortestTenure}%` }}
                ></div>
              </div>
              <span className="ml-2">1.0 YRS</span>
            </div>
          </div>

          {/* Charts container */}
<div className="flex justify-between gap-6 mb-8">
  {/* Skills Bubble Chart */}
  <div className="bg-blue-950 p-4 rounded-lg shadow-lg w-1/2">
    <h3 className="text-lg font-semibold mb-2 text-white">Skills Distribution</h3>
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={skills} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
          {skills.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  </div>

  {/* Job Title Chart */}
  <div className="bg-blue-950 p-4 rounded-lg shadow-lg w-1/2">
    <h3 className="text-lg font-semibold mb-2 text-white">Job Title Distribution</h3>
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={[{ name: 'Job Title', value: 100 }]} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80}>
          <Cell fill={COLORS[0]} />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  </div>

        </div>
            <p className="text-center">Other content (charts, etc.) goes here</p>
          </div>

        {/* Right sidebar */}
        <div className="col-span-3 space-y-6">
          {/* User Details */}
          <div className="bg-blue-700 p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold">John Davis</h2>
            <p className="mt-2"><FaEnvelope className="inline mr-2" /> john.davis.90@gmail.com</p>
            <p className="mt-2"><FaPhone className="inline mr-2" /> +1 201 376 8456</p>
            <p className="mt-2"><FaUser className="inline mr-2" /> john.davis.90</p>
          </div>

          {/* Recent Roles */}
          <div className="bg-blue-700 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">Recent Roles</h3>
            <ul className="space-y-2">
              <li>Senior Blockchain Engineer</li>
              <li>Blockchain Engineer</li>
              <li>Software Engineer</li>
            </ul>
          </div>

          {/* Qualifications */}
          <div className="bg-blue-700 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">Qualifications</h3>
            <ul className="space-y-2">
              <li>Certified AWS Cloud Architect</li>
              <li>Bachelor of Science in Computer Science</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;