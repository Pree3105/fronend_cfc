import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaPhone, FaUser, FaUserTie ,FaCircle } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer , ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip } from 'recharts';

const SemiCircleProgressBar = ({ percentage }) => {
  const radius = 70;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-52 h-28 ">
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

function isEmployed(status) {
  // Return true if the person is employed, false otherwise
  return status === true;
}

const Dashboard = () => {
  const skills = [
    { name: 'AWS', value: 30 },
    { name: 'Git', value: 25 },
    { name: 'Golang', value: 20 },
    { name: 'Solidity', value: 15 },
    { name: 'AAVE', value: 10 },
    { name: 'Cloud', value: 100 },
    { name: 'Java', value: 10 },
    { name: 'C++', value: 90 },
  ];
  const [progress, setProgress] = useState({ skills: 0, longestTenure: 0, shortestTenure: 0 });
  const [matchScore, setMatchScore] = useState(77);
  const [interviewerNotes, setInterviewerNotes] = useState("John demonstrated excellent problem-solving skills and in-depth knowledge of blockchain technologies. He showed great enthusiasm for the role and aligned well with our company culture. Recommendation: Proceed to next round.");

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress({ skills: 90, longestTenure: 62, shortestTenure: 20 });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const COLORS = ['#1E90FF', '#4169E1', '#4682B4', '#5F9EA0', '#6495ED'];

  const BubbleChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={150}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <XAxis type="category" dataKey="x" name="skill" tick={false} axisLine={false} />
        <YAxis type="number" dataKey="y" tick={false} axisLine={false} />
        <ZAxis type="number" dataKey="z" range={[40, 100]} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter data={data} fill="#8884d8">
          {data.map((entry, index) => (
            <cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
};

  return (
    <div className="min-h-screen bg-black text-white p-4 text-sm flex">
      {/* Left sidebar */}
      <div className="w-1/6 bg-gradient-to-l from-blue-800 p-3 rounded-lg shadow-lg mr-4">
        <h2 className="text-lg font-bold mb-2">Top 15 (17)</h2>
        <ul className="space-y-4 text-m">
          {['John Davis', 'Richard Byrde', 'Mark Johnson', 'Michael Brown', 'Alice Smith', 'Mary Jane', 'Alice Jones', 'Steve Dylan', 'Maya Garcia', 'Sarah Jones', 'David Johnson', 'Olivia Sanchez', 'Taylor Montgomery', 'Mark Smith'].map((name, index) => (
            <li key={index} className="flex items-center space-x-2 cursor-pointer">
              <div className="w-4 h-4 flex items-center justify-center bg-[#0a0a23] text-white rounded-full font-bold text-xs">
                {index + 1}
              </div>
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-grow">
        {/* Search Bar */}
        <div className="w-full bg-blue-950 p-1 rounded-md mb-4">
          <input 
            type="text" 
            placeholder="Search job title, location, skills..." 
            className="w-full p-2 bg-[#0a0a23] text-white rounded-md focus:outline-none font-thin text-sm"
          />
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Main content */}
          <div className="col-span-10">
            <div className="grid grid-cols-2 gap-4 mb-9">
              {/* Match percentage with semicircular progress bar */}
              <div className="bg-gradient-to-b from-blue-800 p-3 rounded-lg shadow-lg flex flex-col items-center justify-center">
                <div className="relative flex items-center justify-center">
                  <div className="rotate-180">
                    <SemiCircleProgressBar percentage={matchScore} />
                  </div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="text-2xl font-bold">{matchScore}%</div>
                    <div className="text-xs">MATCH</div>
                  </div>
                </div>
              </div>

              {/* Skills Bubble Chart */}
              <div className="bg-gradient-to-b from-blue-800 to-black p-3 rounded-lg shadow-xl">
                <h3 className="text-sm font-semibold mb-1 flex justify-center">Skills Stack</h3>
                <div className="grid grid-cols-4 gap-4">
                  {skills.map((skill, index) => (
                  <div
                  key={index}
                  className="bg-blue-900 p-2 w-25 rounded-lg flex justify-center items-center text-center hover:bg-blue-800 transition duration-300 border border-black">
                    <h4 className="text-md font-semibold">{skill.name}</h4>
                  </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress bars */}
            <div className="space-y-2 mb-9">
              <div className="flex items-center">
                <span className="w-32 text-xs">Skills Experience</span>
                <div className="flex-grow bg-blue-950 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${progress.skills}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-xs">5.6 YRS</span>
              </div>
              <div className="flex items-center">
                <span className="w-32 text-xs">Longest Tenure</span>
                <div className="flex-grow bg-blue-950 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${progress.longestTenure}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-xs">3.1 YRS</span>
              </div>
              <div className="flex items-center">
                <span className="w-32 text-xs">Shortest Tenure</span>
                <div className="flex-grow bg-blue-950 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${progress.shortestTenure}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-xs">1.0 YRS</span>
              </div>
            </div>

            {/* Notable Projects, Quick Resume Insights, and Interviewer's Notes */}
            <div className="grid grid-cols-3 gap-4">
              {/* Notable Projects */}
              <div className="bg-blue-900 p-3 rounded-lg shadow-lg">
                <h3 className="text-sm font-semibold mb-3">Notable Projects</h3>
                <ul className="list-disc list-inside text-m space-y-2">
                  <li>Developed blockchain-based supply chain solution</li>
                  <li>Implemented smart contract for decentralized finance platform</li>
                  <li>Created AWS-based serverless architecture for scalable web application</li>
                  <li>lcdftvgybhunijmokjinhugyftcvygbuhnijmokkmjihu</li>
                </ul>
              </div>

              {/* Quick Resume Insights */}
              <div className="bg-blue-950 p-3 rounded-lg shadow-lg">
                <h3 className="text-sm font-semibold mb-3">Quick Resume Insights</h3>
                <ul className="list-disc list-inside text-m space-y-2">
                  <li>5+ years of experience in blockchain and cloud technologies</li>
                  <li>Strong background in Golang and Solidity</li>
                  <li>Certified AWS Cloud Architect</li>
                </ul>
              </div>

              {/* Interviewer's Notes */}
              <div className="bg-blue-900 p-3 rounded-lg shadow-lg">
                <h3 className="text-sm font-semibold mb-4">Interviewer's Notes</h3>
                <textarea
                  className="w-full h-24 bg-blue-950 text-white text-xs p-2 rounded-md resize-none"
                  value={interviewerNotes}
                  onChange={(e) => setInterviewerNotes(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Right sidebar */}
            {/* Employed Status Div */}
            <div className="col-span-2 space-y-4">
            <div className="flex items-center  mb-2">
            {/* Green bulb styled as a radio button */}
            <input
              type="radio"
              className={`h-3 w-3 ${isEmployed ? 'bg-green-500' : 'bg-transparent'} border-2 border-green-500 rounded-full `}
              checked={isEmployed}
              readOnly
              
            />
            <span className="ml-2 text-white text-xs">Employed</span>
            </div>
            {/* User Details */}
            <div className="bg-gradient-to-r from-blue-800 p-3 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold flex justify-center">Candidate Profile :- </h2>
              <h4 className="text-lg font-bold flex justify-center" >
                John Davis
                </h4>
                <div className="flex justify-center mt-2">
                  <FaUserTie size={84} />
            </div>

              <p className="mt-2 text-xs"><FaEnvelope className="inline mr-1" /> john.davis.90@gmail.com</p>
              <p className="mt-1 text-xs"><FaPhone className="inline mr-1" /> +1 201 376 8456</p>
              <p className="mt-1 text-xs"><FaUser className="inline mr-1" /> john.davis.90</p>
            </div>

            {/* Recent Roles */}
            <div className="bg-gradient-to-r from-blue-800 p-3 rounded-lg shadow-lg">
              <h3 className="text-m font-bold mb-2 flex justify-center">Recent Roles</h3>
              <ul className="space-y-1 text-`s">
                <li>Senior Blockchain Engineer</li>
                <li>Blockchain Engineer</li>
                <li>Software Engineer</li>
              </ul>
            </div>

            {/* Qualifications */}
            <div className="bg-gradient-to-r from-blue-800 p-3 rounded-lg shadow-lg">
              <h3 className="text-m font-bold mb-2 flex justify-center">Qualifications</h3>
              <ul className="space-y-1 text-s">
                <li>Certified AWS Cloud Architect</li>
                <li>Bachelor of Science in Computer Science</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;