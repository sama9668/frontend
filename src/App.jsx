import { useRef, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Nav from "./components/Nav.jsx";

const App = () => {
  const [education, setEducation] = useState([]);
  const [work, setWork] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [showMoreBio, setShowMoreBio] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const homeRef = useRef(null);
  const educationRef = useRef(null);
  const workRef = useRef(null);
  const portfolioRef = useRef(null);

  const getData = async () => {
    try {
      const [educationResponse, workResponse, portfolioResponse] = await Promise.all([
        fetch("api/education/"),
        fetch("api/work/"),
        fetch("api/portfolio/")
      ]);
      
      const [educationData, workData, portfolioData] = await Promise.all([
        educationResponse.json(),
        workResponse.json(),
        portfolioResponse.json()
      ]);
      
      setEducation(educationData);
      setWork(workData);
      setPortfolio(portfolioData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="scroll-smooth">
      <Nav
        homeRef={homeRef}
        educationRef={educationRef}
        workRef={workRef}
        portfolioRef={portfolioRef}
      />
      
      {/* Home Section */}
      <section className="md:h-screen pt-10 snap-start" ref={homeRef}>
        <div className="md:w-2/4 w-10/12 mx-auto mt-10 mb-3 animate-fade-in">
          <h1 className="text-5xl mb-3 font-bold bg-gradient-to-r from-cyan-600 to-blue-800 bg-clip-text text-transparent">
            Safir JM
          </h1>
          <p className="text-2xl text-cyan-900 ml-2 font-medium">
            Full Stack Developer
          </p>
        </div>
        
        <div className="flex md:flex-row flex-col justify-between items-center md:w-2/4 m-auto p-10 border rounded-lg px-3 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/90 backdrop-blur-sm">
          <img
            alt="profile"
            className="rounded-full w-64 h-64 mx-2 object-cover border-4 border-cyan-100 hover:border-cyan-300 transition-all duration-500 hover:scale-105"
            src="./src/img/prof_pic_dec_24.jpg"
          />
          <div className="mt-6 md:mt-0 md:ml-6">
            <h5 className="text-2xl text-cyan-900 border-b-2 border-slate-300 pb-2 font-semibold">
              Biography
            </h5>
            <p className="mt-4 text-gray-700 leading-relaxed">
              I hold a Master's degree in Computer and System Sciences from
              Stockholm University, where I worked on impactful projects in data
              mining, machine learning, IoT and edge computing, cybersecurity,
              and Python programming for data analytics.
              {showMoreBio && (
                <span className="animate-fade-in">
                  These experiences gave me a solid grounding in both the theoretical and practical sides
                  of modern tech. I'm passionate about full-stack engineering and love building
                  end-to-end solutions that combine data, design, and functionality.
                </span>
              )}
            </p>
            <button
              onClick={() => setShowMoreBio(!showMoreBio)}
              className="mt-3 text-cyan-600 hover:text-cyan-800 font-medium transition-colors flex items-center"
            >
              {showMoreBio ? (
                <>
                  Show Less <ChevronUpIcon className="ml-1 h-4 w-4" />
                </>
              ) : (
                <>
                  Read More <ChevronDownIcon className="ml-1 h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="md:h-screen pt-10 snap-start" ref={educationRef}>
        <div className="mb-5 mx-5 animate-slide-up">
          <h1 className="text-5xl mb-3 font-bold bg-gradient-to-r from-cyan-600 to-blue-800 bg-clip-text text-transparent">
            My Education
          </h1>
          <p className="text-lg text-cyan-900 ml-2 font-medium">Master's Degree</p>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mx-5">
          {education.map((e) => (
            <div 
              key={e.id} 
              className="border rounded-lg px-4 py-3 shadow-md hover:shadow-lg transition-all duration-300 bg-white hover:-translate-y-1"
            >
              <h3 className="text-lg font-semibold text-slate-800 pb-2 border-b border-slate-200">
                {e.degree} @ {e.institution}
              </h3>
              <h5 className="text-gray-600 mt-2 text-sm">
                {new Date(e.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - {e.end_date ? new Date(e.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : "Present"}
              </h5>
              <p className="mt-3 text-gray-700 whitespace-pre-line">{e.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Work Experience Section */}
      <section className="md:h-screen pt-10 snap-start" ref={workRef}>
        <div className="mb-5 mx-5 animate-slide-up">
          <h1 className="text-5xl mb-3 font-bold bg-gradient-to-r from-cyan-600 to-blue-800 bg-clip-text text-transparent">
            My Work Experience
          </h1>
          <p className="text-lg text-cyan-900 ml-2 font-medium">Full Stack Developer</p>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mx-5">
          {work.map((w) => (
            <div 
              key={w.id} 
              className="border rounded-lg px-4 py-3 shadow-md hover:shadow-lg transition-all duration-300 bg-white hover:scale-[1.02] group"
            >
              <h3 className="text-lg font-semibold text-slate-800 group-hover:text-cyan-700 transition-colors">
                {w.job_title}
              </h3>
              <h4 className="text-gray-600 font-medium">{w.company}</h4>
              <h5 className="text-gray-500 text-sm mt-1">
                {new Date(w.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - {w.end_date ? new Date(w.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : "Present"}
              </h5>
              <div className="mt-3 space-y-2">
                {w.description.split("\n").map((line, i) => (
                  <p key={i} className="flex items-start text-gray-700">
                    <span className="mr-2 text-cyan-500">•</span>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="md:h-screen pt-10 pb-20 snap-start" ref={portfolioRef}>
        <div className="mb-5 mx-5 animate-slide-up">
          <h1 className="text-5xl mb-3 font-bold bg-gradient-to-r from-cyan-600 to-blue-800 bg-clip-text text-transparent">
            My Portfolio
          </h1>
          <p className="text-lg text-cyan-900 ml-2 font-medium">
            Most recent projects with GitHub links
          </p>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6 mx-5">
          {portfolio.map((p) => (
            <div 
              key={p.id} 
              className="border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white hover:-translate-y-2"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={p.image || ""}
                  alt={p.title || "Project image"}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    e.target.src = "/fallback-image.jpg";
                    e.target.alt = "Image failed to load";
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  {p.title}
                </h3>
                <p className="text-gray-700 mb-4 line-clamp-3">{p.description}</p>
                <a 
                  href={p.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-1 py-1 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors duration-300"
                >
                  View Project
                  <ExternalLinkIcon className="ml-2 h-2 w-2" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// Icons (you can import from your preferred icon library)
const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clipRule="evenodd" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
  </svg>
);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);