
import {
  CalendarDays,
  PlusCircle,
  Users,
  Heart,
} from "lucide-react"

const features = [
  {
    icon: CalendarDays,
    title: "Discover Meaningful Events",
    description:
      "Explore upcoming community-service and social development events happening around you.",
  },
  {
    icon: PlusCircle,
    title: "Create an Event",
    description:
      "Organize your own initiative and bring people together for a meaningful cause.",
  },
  {
    icon: Users,
    title: "Join & Connect",
    description:
      "Meet passionate volunteers and become part of a community working for positive change.",
  },
  {
    icon: Heart,
    title: "Make an Impact",
    description:
      "Every event you join is an opportunity to contribute and make a difference.",
  },
]

const Features = () => {
  return (
    <section className="bg-[#f8f6f4] py-20 dark:bg-background">
      <div className="mx-auto max-w-6xl px-4">

        {/* Section Heading */}
        <div className="reveal mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#bd2929]">
            What We Do
          </p>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground sm:text-4xl">
            Everything You Need to Make an Impact
          </h2>

          <p className="mt-4 text-gray-600 dark:text-muted-foreground">
            Discover opportunities, connect with people, and take meaningful
            action for your community.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <div
                key={feature.title}
                style={{ animationDelay: `${index * 80}ms` }}
                className="reveal group rounded-xl border border-transparent bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[#bd2929]/30 hover:shadow-lg hover:shadow-[#bd2929]/10 dark:border dark:border-border dark:bg-card dark:hover:border-[#bd2929]/40 dark:hover:shadow-[#bd2929]/5"
              >
                {/* Icon */}
                <div className="mb-5 flex size-12 items-center justify-center rounded-lg bg-[#bd2929]/10 text-[#bd2929] transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-[#bd2929] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#bd2929]/40">
                  <Icon className="size-6" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-card-foreground">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default Features
