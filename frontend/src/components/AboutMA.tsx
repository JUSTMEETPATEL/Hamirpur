import Image from "next/image";

export default function AboutMamta() {
  return (
    <section id="about-mamta" className="py-16 bg-white">
      <div className="container px-6 md:px-12 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          About Project Instructor
        </h2>

        {/* Flex container for better alignment */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-8">
          {/* Left Side - Text */}
          <div className="text-gray-800 space-y-6 text-lg leading-relaxed">

  <p>
    <strong>Dr. Mamta Awasthi</strong> is an esteemed academic and researcher specializing in 
    <strong> environmental biotechnology</strong> and <strong>sustainable waste management</strong>. 
    She holds a <strong>Ph.D. in Botany</strong> from <strong>Banaras Hindu University (BHU)</strong>, 
    focusing on <em>bioremediation and heavy metal removal using algal cells</em>. 
    With over <strong>12 years of experience</strong> as an <strong>Associate Professor</strong> at 
    <strong> NIT Hamirpur (CEEE)</strong>, she has also served as a lecturer at <strong>BIET</strong> and 
    <strong>IET Lucknow</strong>.
  </p>

  <div className="border-l-4 border-blue-500 pl-4">
    <p className="font-semibold">Leadership & Contributions:</p>
    <p>• Head of the Department (CES), NIT Hamirpur (2022-2024)</p>
    <p>• Convener, Zero Waste Management Committee (Since 2021)</p>
    <p>• Nodal Officer, Swachh Bharat Abhiyan (Since 2019)</p>
    <p>• Member, State Pollution Control Board, HP (2017-2019)</p>
  </div>

  <div className="border-l-4 border-green-500 pl-4">
    <p className="font-semibold">Research Interests:</p>
    <p>• Biofuels & Bioenergy</p>
    <p>• Environmental Microbiology & Water Pollution Studies</p>
    <p>• Algal Biorefinery & Wastewater Treatment</p>
    <p>• Circular Economy & Sustainable Waste Management</p>
  </div>

  <div className="border-l-4 border-purple-500 pl-4">
    <p className="font-semibold">Ongoing Research Projects:</p>
    <p>
      <strong>E-Waste Management through 3Rs & Deep Learning Collection System</strong>  
      <br /><span className="text-gray-600">Funding: ₹41.04 Lakh | Ministry of Education, Govt. of India</span>
    </p>
    <p>
      <strong>Advanced Microalgal Biorefinery for Domestic Sewage Wastewater Recycling</strong>  
      <br /><span className="text-gray-600">Funding: ₹97 Lakh | National Mission on Himalayan Studies, MOEF & CC, Govt. of India</span>
    </p>
  </div>

  <p>
    Driven by a vision for <strong>sustainable energy solutions</strong> and <strong>biotechnological advancements</strong>, 
    Dr. Awasthi actively engages in <strong>policy-making, research collaborations, and student mentorship</strong>, 
    bridging the gap between academia and industry.
  </p>

</div>


          {/* Right Side - Image */}
          <div className="md:w-2/3 lg:w-3/4 flex justify-center">
  <Image
    src="/pics/ma.png"
    alt="Dr. Mamta Awasthi"
    width={1200} 
    height={600} 
    className="rounded-lg shadow-lg object-cover w-full h-auto"
  />
</div>

        </div>
      </div>
    </section>
  );
}
