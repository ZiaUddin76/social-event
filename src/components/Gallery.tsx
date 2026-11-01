import Image from "next/image"

const Gallery = () => {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-6xl px-4">

                {/* Section Heading */}
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#bd2929]">
                        Our Community
                    </p>

                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Moments That Create Change
                    </h2>

                    <p className="mt-4 text-gray-600">
                        Every helping hand, shared smile, and meaningful action
                        brings us one step closer to a stronger community.
                    </p>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                    {/* Large Image */}
                    <div className="relative h-[350px] overflow-hidden rounded-xl sm:row-span-2 sm:h-auto">
                        <Image
                            src="/images/g1.jpg"
                            alt="Community volunteers"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition duration-500 hover:scale-105"
                        />
                    </div>

                    {/* Image 2 */}
                    <div className="relative h-[250px] overflow-hidden rounded-xl">
                        <Image
                            src="/images/g2.jpg"
                            alt="Community service event"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition duration-500 hover:scale-105"
                        />
                    </div>

                    {/* Image 3 */}
                    <div className="relative h-[250px] overflow-hidden rounded-xl">
                        <Image
                            src="/images/g3.jpg"
                            alt="Volunteers helping others"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition duration-500 hover:scale-105"
                        />
                    </div>

                    {/* Image 4 */}
                    <div className="relative h-[250px] overflow-hidden rounded-xl">
                        <Image
                            src="/images/g4.jpg"
                            alt="Community activity"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition duration-500 hover:scale-105"
                        />
                    </div>

                    {/* Image 5 */}
                    <div className="relative h-[250px] overflow-hidden rounded-xl">
                        <Image
                            src="/images/g5.jpg"
                            alt="People working together"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition duration-500 hover:scale-105"
                        />
                    </div>

                    {/* Image 6 */}
                    <div className="relative h-[250px] overflow-hidden rounded-xl lg:col-span-2">
                        <Image
                            src="/images/g6.jpg"
                            alt="Community volunteers making a difference"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 66vw"
                            className="object-cover transition duration-500 hover:scale-105"
                        />
                    </div>

                </div>

            </div>
        </section>
    )
}

export default Gallery
