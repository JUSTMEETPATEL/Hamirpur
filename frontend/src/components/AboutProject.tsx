// import Link from "next/link"
export default function AboutProject() {
  return (
    <section id="about-project" className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">About The Project</h2>
        <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-800 mb-8">
            This project aims to showcase the various aspects of NIT Hamirpur and highlight the contributions of faculty
            members like Mamta Awasthi. Through this platform, we provide information about the institute&apos;s history,
            achievements, and ongoing initiatives.
            </p>
          <p className="text-lg text-gray-800 mb-8">
            Our goal is to create a comprehensive resource that serves as a reference for current students, prospective
            applicants, alumni, and anyone interested in learning more about NIT Hamirpur.
          </p>
          {/* <div className="text-center">
            <Link
              href="/components/chat"
              className="inline-block px-8 py-3 bg-black text-white font-medium rounded hover:bg-gray-800 transition-colors"
            >
              View Project 
            </Link>
          </div> */}
        </div>
      </div>
    </section>
  )
}

