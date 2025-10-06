import { apiRebu } from "@/service/api.service";
import { unstable_cache } from "next/cache";

// usamos unestable_cache para tener un manejo más controlado de la cache para las peticiones al total de las páginas
// para que exista una mejor experiencia de usuario
export const getCachedPersonalTotal = unstable_cache(
  async (searchTerm?: string,country?:string[],sector?:string[]) => {
    return apiRebu.getTotalEmployees(searchTerm,sector,country);
  },
  [],
  {
    tags: ["personalTotal"],
  }
);
