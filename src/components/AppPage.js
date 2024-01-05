import { useLocation, Link, useParams, createSearchParams, useSearchParams } from "react-router-dom"
import { HashLoader } from "react-spinners"

import { useStore } from "../zustand.config"
import { AppPuzzle } from "./AppPuzzle"
import { AppFilter } from "./AppFilter"
import { AppData } from "./AppData"
import { AppNote } from "./AppNote"
import { AppNoteAdd } from "./AppNoteAdd"
import { Input } from "./Input"
import { Button } from "./Button"
import { Pagination } from "./Pagination"

export const AppPage = ({ render }) => {
    const store = useStore()
    const location = useLocation()
    const [param, setParam] = useSearchParams()
    const { id } = useParams()

    let text, url

    switch(render) {
        case "user": { text = "Użytkownicy", url = "uzytkownicy"; break }
        case "product": { text = "Produkty", url = "produkty"; break }
        case "order": { text = "Zamówienia", url = "zamowienia"; break }
        case "task": { text = "Zlecenia", url = "zlecenia"; break }
        case "work": { text = "Robocizna", url = "robocizna"; break }
        case "category": { text = "Kategorie", url = "kategorie"; break }
        case "article": { text = "Aktualności", url = "aktualnosci"; break }
        case "producer": { text = "Producenci", url = "producenci"; break }
        case "parameter": { text = "Parametry", url = "parametry"; break }
    }

    return ( 
        <>

            <div className="flex flex-col justify-between ml-[20.3rem] gap-[2rem] p-[2rem] w-[1000px] h-[300px] bg-[#00000040] shadow-[inset_0_0_5rem_0_#123456] border-[#000000] border-[.1rem] rounded-[2rem] backdrop-blur-[.3rem]">

                <div className="flex justify-between">

                    <p className="font-bold text-xl text-[#ffffff]">{text}</p>

                    <div className="flex items-center gap-[2rem]">

                        <Input render="search"/>
                        <Button render="reset"/>

                    </div>

                </div>

                <div className="flex text-center justify-center gap-[2rem]">

                    <AppPuzzle render={render}/>

                </div>

            </div>

            <div className="fixed top-0 bottom-0 flex flex-col ml-[20.3rem] mt-[20rem] gap-[2rem] p-[2rem] w-[1000px] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] border-[#000000] border-[.1rem] rounded-[2rem] backdrop-blur-[.3rem] overflow-auto">

                <div className="flex items-center gap-[2rem]">

                    <AppFilter render={render}/>
                    <Button render="descasc"/>
                    <Button render="download" rRender={render}/>
                    {(render === "user" || render === "order" || render === "task" || render === "work") && <Button render="fakeAdd"/>}
                    {(render === "product" || render === "article" || render === "category" || render === "parameter" || render === "producer") && <Link className="font-['Material_Icons'] cursor-pointer text-[#28c76f]" to={location.pathname !== `/${url}/dodaj` ? `/${url}/dodaj?${createSearchParams(param)}` : `/${url}?${createSearchParams(param)}`}>add</Link>}

                </div>

                <div className="flex h-full flex-col gap-[1rem]">

                    {!store.loadingMini && <AppData render={render}/>}
                    {store.loadingMini && <div className="flex w-full h-full justify-center items-center"><HashLoader color={"#ffffff"} size={163.3} speedMultiplier={1.0}/></div>}

                    <Pagination render={render}/>

                </div>

            </div>

            {location.pathname === `/${url}/dodaj` &&
                <AppNoteAdd render={render}/>
            }

            {location.pathname === `/${url}/edytuj/${id}` &&
                <AppNote render={render}/>
            }

        </>
    ) 
}