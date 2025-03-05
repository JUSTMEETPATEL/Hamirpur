import Image from "next/image"

export default function AboutNITH() {
  return (
    <section id="about-nith" className="py-16 bg-gray-100">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">About NIT Hamirpur</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Image
              src="/pics/nit2.png"
              alt="NIT Hamirpur Campus"
              width={800}
              height={600}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <p className="text-lg text-gray-800 mb-4">
            National Institute of Technology (NIT) Hamirpur
The National Institute of Technology Hamirpur (NIT Hamirpur) is a premier technical institute in Himachal Pradesh, established in 1986 as a Regional Engineering College (REC) and later elevated to an Institute of National Importance in 2002. Known for its scenic campus, state-of-the-art infrastructure, and academic excellence, NIT Hamirpur is committed to fostering innovation, research, and technical expertise.

The institute offers undergraduate, postgraduate, and doctoral programs in diverse fields, including Engineering, Architecture, Sciences, and Management. With well-equipped laboratories, a modern library, research centers, and student innovation hubs, it provides a dynamic learning environment. The Innovation & Incubation Center supports entrepreneurship and technological advancements, promoting industry-academia collaboration.

NIT Hamirpur emphasizes research-driven education, particularly in sustainable technologies, AI, and energy-efficient solutions. Students actively engage in technical festivals (NIMBUS), cultural events, and startup initiatives, fostering an ecosystem of holistic learning and leadership development.

The institute has a strong placement record, with top recruiters from technology, consulting, and core engineering sectors offering lucrative career opportunities. Through its focus on industry partnerships, research excellence, and student-driven initiatives, NIT Hamirpur continues to be a center of excellence in technical education, shaping future leaders and innovators.
            </p>
            
            
          </div>
        </div>
      </div>
    </section>
  )
}

