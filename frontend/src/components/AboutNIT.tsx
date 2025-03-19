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
            National Institute of Technology Hamirpur (NIT Hamirpur) is a premier technical institution in India, established in 1986. It is one of the 31 NITs and is recognized as an Institute of National Importance. Located in the scenic hills of Himachal Pradesh, NIT Hamirpur offers undergraduate, postgraduate, and doctoral programs in engineering, architecture, and management. The institute is known for its strong academic curriculum, research contributions, and vibrant campus life. With state-of-the-art infrastructure and a focus on innovation, NIT Hamirpur continues to produce skilled professionals contributing to various industries worldwide.
            </p>
            
            
          </div>
        </div>
      </div>
    </section>
  )
}

