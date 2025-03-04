import Image from "next/image"

export default function HeroSection() {
  return (
    <section id="hero" className="relative w-full h-[70vh]">
      <Image
        src="/pics/nit.png"
        alt="NIT Hamirpur Campus"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">E-Waste Classifying Machine Learning Model</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">National Institute of Technology, Hamirpur</p>
        </div>
      </div>
    </section>
  )
}

