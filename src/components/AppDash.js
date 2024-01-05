import { AppPuzzle } from "./AppPuzzle"

export const AppDash = ({ render }) => {
    let text

    switch(render) {
        case "user": { text = "Użytkownicy"; break }
        case "product": { text = "Produkty"; break }
        case "order": { text = "Zamówienia"; break }
        case "task": { text = "Zlecenia"; break }
        case "work": { text = "Robocizna"; break }
        case "article": { text = "Aktualności"; break }
        case "category": { text = "Kategorie"; break }
        case "producer": { text = "Producenci"; break }
        case "parameter": { text = "Parametry"; break }
    }

    return ( 
        <div className="flex flex-col p-[2rem] w-[1000px] bg-[#00000040] shadow-[inset_0_0_5rem_0_#123456] border-[#000000] border-[.1rem] rounded-[2rem] backdrop-blur-[.3rem]">

            <p className="font-bold text-xl text-[#ffffff]">{text}</p>

            <div className="flex text-center justify-center gap-[2rem]">

                <AppPuzzle render={render}/>

            </div>

        </div>
    )
}