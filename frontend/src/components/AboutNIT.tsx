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
              National Institute of Technology Hamirpur is one of the thirty-one NITs of the country, which came into
              existence on August 7, 1986, as Regional Engineering College Hamirpur in the Shivalik ranges of Himalayas.
            </p>
            <p className="text-lg text-gray-800 mb-4">
              The institute was jointly established by the Government of India and the Government of Himachal Pradesh
              with the aim to provide high quality technical education in the northern region of India.
            </p>
            <p className="text-lg text-gray-800 mb-4">
              NIT Hamirpur has been ranked among the top technical institutes in India and is known for its excellent
              academic programs, research facilities, and campus infrastructure.
            </p>
            <p className="text-lg text-gray-800">
              The institute offers undergraduate, postgraduate, and doctoral programs in various disciplines of
              engineering, technology, architecture, humanities, and sciences.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

