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
              Dr. Mamta Awasthi is a distinguished faculty member at NIT Hamirpur with extensive experience in her field of expertise.
            </p>
            <p className="text-lg text-gray-800">
              She has made significant contributions to academic research and has published numerous papers in reputed international 
              journals. Her work has been recognized both nationally and internationally.
            </p>
            <p className="text-lg text-gray-800">
              Dr. Awasthi is known for her dedication to teaching and mentoring students. She has guided many undergraduate and 
              postgraduate students in their research projects and dissertations.
            </p>
            <p className="text-lg text-gray-800">
              Beyond her academic achievements, Dr. Awasthi is actively involved in various institutional committees and initiatives 
              aimed at enhancing the quality of education and research at NIT Hamirpur.
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
