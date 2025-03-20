import React from "react";

export default function AboutProject() {
  return (
    <section id="about-project" className="py-16 bg-gray-100">
      <div className="container px-6 mx-auto">
        {/* About The Project */}
        <h2 className="text-4xl font-bold mb-6 text-gray-900 text-left">About The Project</h2>
        <div className="w-full p-6">
          <p className="text-lg text-gray-700 mb-6">
            <strong>Scalable E-Waste Management Model with AI-Driven Collection & Market Chain</strong>
          </p>

          <div className="text-left space-y-4 ml-4">
            <p className="text-justify">
              <strong>Objective:</strong> Leverage AI-powered waste sorting and a sustainable market chain to promote 
              e-waste reduction, refurbishment, and recycling.
            </p>

            <div>
              <strong>Key Components:</strong>
              <ul className="list-disc ml-6 text-gray-600">
          <li className="text-justify">AI-based classification for efficient sorting.</li>
          <li className="text-justify">Refurbishment & resale of functional components.</li>
          <li className="text-justify">Micro-enterprises to drive local sustainability.</li>
          <li className="text-justify">Training programs for waste entrepreneurs.</li>
              </ul>
            </div>

            <p className="text-justify">
              <strong>Expected Impact:</strong> Reduce landfill waste, create jobs in e-waste management, and drive 
              revenue through refurbished electronics and recycled materials.
            </p>

            <p className="text-justify">
              <strong>Target Beneficiaries:</strong> Startups, recyclers, policymakers, and communities benefiting 
              from sustainable practices.
            </p>

            <p className="font-semibold text-gray-800 text-justify">
              This project integrates deep learning with circular economy principles, fostering a cleaner and 
              more sustainable future.
            </p>
          </div>
        </div>

        {/* Market Size & Growth */}
        <div className="w-full text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Market Size & Growth</h2>
          <p className="text-gray-600 text-lg text-justify">
            The <strong>global e-waste market</strong> was valued at approximately <strong>$72.5 billion in 2024</strong> and is projected to grow at a <strong>CAGR of 14.3%</strong> over the next decade.
          </p>
          <p className="text-gray-600 text-lg mt-4 text-justify">
            India alone generates over <strong>3.2 million metric tons</strong> of e-waste annually, ranking among the <strong>top five e-waste-producing countries</strong>. With increasing digitalization, shorter device lifecycles, and rising consumer electronics adoption, the e-waste industry presents massive opportunities for <strong>innovation and entrepreneurship</strong>.
          </p>
        </div>
      </div>
</section>

  );
}
