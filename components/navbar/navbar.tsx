import { getCategories } from "@/lib/get-categories"
import { NavbarClient } from "./navbar-client"
import { unstable_noStore } from "next/cache"

export async function Navbar() {

  unstable_noStore()
  const categories = await getCategories()

  return <NavbarClient categories={categories} />
}
