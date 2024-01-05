import { useSearchParams } from "react-router-dom"
import { useStore } from "../zustand.config"

export const Pagination = ({ render }) => {
    const store = useStore()
    const [param, setParam] = useSearchParams()

    const pagesCount = Math.ceil(store[render].length / 12)
   
    if (pagesCount === 1) return null
    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1)

    const handleRouterPageParam = (page) => {
      param.set("page", page)
      setParam(param)
  }
   
    return (

    <div className="flex mt-auto items-end justify-center gap-[1rem]">

      {pages.map((page) => (

        <a key={page} className={page === parseFloat(param.get(`page`)) ? "text-[#ffffff] hover:text-[#ffffff] duration-[.5s] font-bold cursor-pointer" : "hover:text-[#ffffff] duration-[.5s] font-bold cursor-pointer"} onClick={() => handleRouterPageParam(page)}>
          {page}
        </a>

      ))}

    </div>
  )
}