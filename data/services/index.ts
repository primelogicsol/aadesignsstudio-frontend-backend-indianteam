// Import and re-export specific items to avoid circular dependencies
import { type ServiceCategory, serviceCategories } from "./categories"
import { type ServiceDetail, type TabContent, getServiceDetail } from "./details"
import { type ServiceOverview, servicesOverview } from "./overview"

// Export types
export type { ServiceCategory, ServiceDetail, TabContent, ServiceOverview }

// Export values
export { serviceCategories, getServiceDetail, servicesOverview }

