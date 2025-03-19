export default function AboutProject() {
  return (
    <section id="about-project" className="py-16 bg-gray-100">
      <div className="container px-6 mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-gray-900">About The Project</h2>
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <p className="text-lg text-gray-700 mb-6">
            <strong>Scalable E-Waste Management Model with AI-Driven Collection & Market Chain</strong>
          </p>

          <div className="text-left space-y-4">
            <p>
              <strong>Objective:</strong> Leverage AI-powered waste sorting and a sustainable market chain to promote 
              e-waste reduction, refurbishment, and recycling.
            </p>

            <div>
              <strong>Key Components:</strong>
              <ul className="list-disc ml-6 text-gray-600">
                <li>AI-based classification for efficient sorting.</li>
                <li>Refurbishment & resale of functional components.</li>
                <li>Micro-enterprises to drive local sustainability.</li>
                <li>Training programs for waste entrepreneurs.</li>
              </ul>
            </div>

            <p>
              <strong>Expected Impact:</strong> Reduce landfill waste, create jobs in e-waste management, and drive 
              revenue through refurbished electronics and recycled materials.
            </p>

            <p>
              <strong>Target Beneficiaries:</strong> Startups, recyclers, policymakers, and communities benefiting 
              from sustainable practices.
            </p>

            <p className="font-semibold text-gray-800">
              This project integrates deep learning with circular economy principles, fostering a cleaner and 
              more sustainable future.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
