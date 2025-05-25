import { DesignTrendsContainer } from "@/components/design-trends/design-trends-container"

export default function DesignTrendsExamplePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12 text-center">Design Trends Examples</h1>

      {/* Standard Grid Layout */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-6">Standard Grid Layout</h2>
        <DesignTrendsContainer
          title="Latest Design Trends"
          description="Explore the newest trends in design across various categories"
          maxItems={6}
        />
      </section>

      {/* Featured Layout */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-6">Featured Layout</h2>
        <DesignTrendsContainer
          title="Featured Design Trends"
          description="Highlighting our most popular design trends"
          layout="featured"
          maxItems={4}
          showFilters={false}
        />
      </section>

      {/* List Layout with Category Filter */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-6">List Layout with Category Filter</h2>
        <DesignTrendsContainer
          title="UI/UX Design Trends"
          description="Focused on user interface and experience design"
          layout="list"
          initialCategory="ui-ux"
          maxItems={3}
        />
      </section>
    </div>
  )
}
