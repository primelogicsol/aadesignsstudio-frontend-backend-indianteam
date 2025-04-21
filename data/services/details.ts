export interface TabContent {
  materials: {
    title: string
    image: string
    content: string
  }
  design: {
    title: string
    image: string
    content: string
  }
  care: {
    title: string
    image: string
    content: string
  }
  support: {
    title: string
    hasForm: boolean
  }
}

export interface ServiceDetail {
  title: string
  description: string
  content: string
  planningWork: {
    title: string
    description: string
    features: string[]
  }
  additionalInfo: string
  additionalFeatures: string[]
  tabContent: TabContent
}

export const getServiceDetail = (slug: string): ServiceDetail => {
  // In a real application, this would fetch data from an API or database
  // based on the slug. For now, we'll return the same data for any slug.
  return {
    title: "General Contracting",
    description: "Professional contracting services for residential and commercial projects",
    content: `Labore et dolore magna aliqua. Ut enim ad minim veniam, quis nexercitatiullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolreprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint.

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.`,
    planningWork: {
      title: "Planning Work",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat",
      features: [
        "Ut enim ad minim veniam",
        "voluptate velit esse cillum dolore eu",
        "Kuis nostrud exercitation ullamco",
      ],
    },
    additionalInfo: `Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit quia consequuntur magni dolores eos qui ratione volsnesciunt.Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, sed quia non numquam eius modi tempora incidunt ut labore et dolore`,
    additionalFeatures: [
      "Nostrud exercitation ullamco laboris consequat.reprehenderit in voluptate",
      "velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat",
    ],
    tabContent: {
      materials: {
        title: "Quality Materials",
        image: "/placeholder.svg?height=300&width=400",
        content: `Consequuntur magni dolores eos qui ratione volsnesciunt.Neq quisquam est, qui dolorem ipsum quia dolor sit amet,Nemo enim ipsvoluptatequia voluptas sit.

aliquam quaerat voluptatem. consequuntur magni dolores eos qui ratione volsnesciunt.Neque porro quisquam est, qui quia dolor sit`,
      },
      design: {
        title: "Interior Design",
        image: "/placeholder.svg?height=300&width=400",
        content: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.

There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.`,
      },
      care: {
        title: "Personal Care",
        image: "/placeholder.svg?height=300&width=400",
        content: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from.`,
      },
      support: {
        title: "Super Support",
        hasForm: true,
      },
    },
  }
}

