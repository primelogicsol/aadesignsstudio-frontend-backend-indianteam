import { getCategories } from "@/lib/get-categories"
import { NavbarClient } from "./navbar-client"

export async function Navbar() {
  const categories = await getCategories()

  return <NavbarClient categories={categories} />
}
