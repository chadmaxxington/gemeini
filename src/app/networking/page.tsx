"use client";
import { useEffect, useState } from 'react';

interface Incubator {
  name: string;
  link: string;
  image: string;
}

interface Scheme {
  name: string;
  link: string;
  image: string;
}

export default function IncubatorsAndSchemes() {
  const [incubators, setIncubators] = useState<Incubator[]>([]);
  const [schemes, setSchemes] = useState<Scheme[]>([]);

  useEffect(() => {
    setIncubators([
      { name: "T-Hub Hyderabad", link: "https://www.t-hub.co/", image: "/thub.jpg" },
      { name: "IIT Madras Incubation Cell", link: "https://ic.iitm.ac.in/", image: "/iitm.jpg" },
      { name: "CIIE IIM Ahmedabad", link: "https://ciie.co/", image: "/ciie.jpg" },
      { name: "NASSCOM 10,000 Startups", link: "https://10000startups.nasscom.in/", image: "/nasscom.jpg" },
      { name: "Startup Village Kochi", link: "https://www.startupvillage.in/", image: "/village.jpg" }
    ]);

    setSchemes([
      { name: "Startup India Seed Fund Scheme", link: "https://seedfund.startupindia.gov.in/", image: "/seedfund.jpg" },
      { name: "Pradhan Mantri Mudra Yojana", link: "https://www.mudra.org.in/", image: "/mudra.jpg" },
      { name: "Credit Guarantee Scheme for Startups", link: "https://ncgtc.in/", image: "/cgss.jpg" },
      { name: "Stand-Up India", link: "https://www.standupmitra.in/", image: "/standup.jpg" },
      { name: "Atal Innovation Mission", link: "https://aim.gov.in/", image: "/aim.jpg" }
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-black mb-6">Incubators and Startup Schemes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[{ title: 'Top 5 Incubators', items: incubators }, { title: 'Top 5 Startup Schemes', items: schemes }].map((section, idx) => (
          <div key={idx} className="p-4 border rounded-xl bg-white shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">{section.title}</h2>
            <ul className="space-y-4">
              {section.items.map((item, index) => (
                <li key={index} className="flex items-center space-x-4 bg-gray-50 border rounded-lg p-3">
                  {/* <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" /> */}
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium hover:underline">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
