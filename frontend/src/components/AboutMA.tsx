import Image from "next/image";

export default function AboutMamta() {
  return (
    <section id="about-mamta" className="py-16 bg-white">
      <div className="container px-6 md:px-12 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          About Mamta Awasthi
        </h2>

        {/* Flex container for better alignment */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-8">
          {/* Left Side - Text */}
          <div className="md:w-1/2 text-center md:text-left space-y-4">
            <p className="text-lg text-gray-800">
            Dr. Mamta Awasthi – Associate Professor, Centre for Energy and Environmental Engineering, NIT Hamirpur
Dr. Mamta Awasthi is an Associate Professor at the Centre for Energy and Environmental Engineering (CEEE), National Institute of Technology (NIT) Hamirpur, with a distinguished academic and research career spanning over three decades. She specializes in biofuels, bioenergy, bioremediation, environmental microbiology, phycology, ecology, and water pollution studies, contributing significantly to sustainable environmental management and renewable energy research.

            </p>
            <p className="text-lg text-gray-800">
            Academic Qualifications
B.Sc. (Botany Hons) – Banaras Hindu University, 1988
M.Sc. (Botany, Algal Cytogenetics, Physiology & Biochemistry) – Banaras Hindu University, 1990
Ph.D. (Botany, Bioremediation & Heavy Metal Removal by Algal Cells) – Banaras Hindu University, 1995
Postdoctoral Research Fellow – CSIR (2002-2006)
Professional Experience
Associate Professor, NIT Hamirpur (CEEE) – Since 24th June 2009 (12+ years)
Lecturer, BIET, Lucknow – 2008-2009
Lecturer, IET, Lucknow – 2007-2008
Postdoctoral Fellow, CSIR (RGU, Itanagar) – 2002-2006
Senior Research Fellow (SRF), GATE, BHU, Varanasi – 1996-1997
Leadership Roles & Contributions
Head of Department (HOD), CES, NIT Hamirpur (2022-2024)
Convener, Zero Waste Management Committee, NIT Hamirpur (Since 2021)
Nodal Officer, Swachh Bharat Abhiyan, NIT Hamirpur (Since 2019)
Member, State Pollution Control Board, HP (2017-2019)

            </p>
            <p className="text-lg text-gray-800">
            Research Interests
Dr. Awasthi has an interdisciplinary research approach, focusing on biological solutions to environmental challenges. She emphasizes the need for bioengineering applications in environmental remediation and energy generation, particularly in areas like:

Biofuels & Bioenergy
Environmental Microbiology & Water Pollution Studies
Algal Biorefinery & Wastewater Treatment
Circular Economy & Sustainable Waste Management
Ongoing Research Projects as Principal Investigator (PI)
Scalable Small-Scale Business Model for E-Waste Management through 3Rs, Deep Learning Collection System & Market Chain

Funding Agency: Ministry of Education, Govt. of India
Duration: 07/11/2022 – 11/11/2025
Funding Amount: ₹41.04 Lakh
Status: Running
Advanced Microalgal Biorefinery Approach for Recycling Domestic Sewage Wastewater for a Cleaner & Greener Indian Himalayan Region (in collaboration with NIBE, Kapurthala)

            </p>
            <p className="text-lg text-gray-800">
              
Funding Agency: National Mission on Himalayan Studies, MOEF & CC, Govt. of India
Duration: 12/12/2022 – 12/12/2025
Funding Amount: ₹97 Lakhs
Status: Running
Impact & Vision
Dr. Mamta Awasthi’s work focuses on sustainable energy solutions, circular economy practices, and biotechnological interventions for environmental conservation. As a key researcher and educator at NIT Hamirpur, she actively engages in policy-making, research collaborations, and student mentorship to bridge the gap between academia and industry.
            </p>
          </div>

          {/* Right Side - Image */}
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/pics/ma.png"
              alt="Dr. Mamta Awasthi"
              width={300}
              height={400}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
