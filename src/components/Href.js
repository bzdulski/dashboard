import { useStore } from "../zustand.config"
import { useLocation, Link, useParams } from "react-router-dom";

export const Href = ({ render }) => {
    const store = useStore()
    const location = useLocation()
    const { id } = useParams()
    let to, url, text, alt, src, icon, onClick, className, classActive, classHover, classIcon, classText

    if([`logo`].includes(render)) {
        classText = `text-2xl leading-none font-bold text-[#ffffff] text-center`
    }

    if([`start`, `uzytkownicy`, "produkty", "zamowienia", "zlecenia", `robocizna`, "kategorie", "producenci", `aktualnosci`, `parametry`, `logout`].includes(render)) {
        classActive = `flex gap-[2rem] text-[#ffffff]`
        classHover = `flex gap-[2rem] duration-[.5s] hover:text-[#ffffff]`
        classIcon = `font-['Material_Icons'] text-2xl leading-none`
        classText = ``
    }

    if([`konto`, `logi`].includes(render)) {
        classActive = `flex gap-[2rem] text-[#ea5455]`
        classHover = `flex gap-[2rem] duration-[.5s] hover:text-[#ea5455]`
        classIcon = `font-['Material_Icons'] text-2xl leading-none`
        classText = ``
    }

    switch(render) {
        case "logo": 
        { 
            url = [`/`],
            to = `/`,
            text = "Dashboard";
            break
        }
        case "start": 
        { 
            url = [`/`],
            to = `/`,
            text = "Start",
            icon = "dashboard";
            break
        }
        case "uzytkownicy": 
        { 
            url = [`/uzytkownicy`, `/uzytkownicy/edytuj/${id}`],
            to = `/uzytkownicy`,
            text = "Użytkownicy",
            icon = "person";
            break
        }
        case "produkty": 
        { 
            url = [`/produkty`, `/produkty/dodaj`, `/produkty/edytuj/${id}`],
            to = `/produkty`,
            text = "Produkty",
            icon = "sell";
            break
        }
        case "zamowienia": 
        { 
            url = [`/zamowienia`, `/zamowienia/edytuj/${id}`],
            to = `/zamowienia`,
            text = "Zamówienia",
            icon = "bookmark";
            break
        }
        case "zlecenia": 
        { 
            url = [`/zlecenia`, `/zlecenia/edytuj/${id}`],
            to = `/zlecenia`,
            text = "Zlecenia",
            icon = "task";
            break
        }
        case "robocizna": 
        { 
            url = [`/robocizna`, `/robocizna/edytuj/${id}`],
            to = `/robocizna`,
            text = "Robocizna",
            icon = "work";
            break
        }
        case "kategorie": 
        { 
            url = [`/kategorie`, `/kategorie/dodaj`, `/kategorie/edytuj/${id}`],
            to = `/kategorie`,
            text = "Kategorie",
            icon = "category";
            break
        }
        case "producenci": 
        { 
            url = [`/producenci`, `/producenci/dodaj`, `/producenci/edytuj/${id}`],
            to = `/producenci`,
            text = "Producenci",
            icon = "hotel_class";
            break
        }
        case "aktualnosci": 
        { 
            url = [`/aktualnosci`, `/aktualnosci/dodaj`, `/aktualnosci/edytuj/${id}`],
            to = `/aktualnosci`,
            text = "Aktualności",
            icon = "article";
            break
        }
        case "parametry": 
        { 
            url = [`/parametry`, `/parametry/dodaj`, `/parametry/edytuj/${id}`],
            to = `/parametry`,
            text = "Parametry",
            icon = "timeline";
            break
        }
        case "logi": 
        { 
            url = [``],
            to = `/`,
            text = "Powiadomienia",
            icon = "notifications";
            break
        }
        case "konto": 
        { 
            url = [``],
            to = `/`,
            text = store.auth.email,
            icon = "sports_esports";
            break
        }
        case "logout": 
        { 
            url = [``],
            to = `/`,
            text = "Wyloguj się",
            icon = "key",
            onClick = () => store.logout()
            break
        }
    }

    return (
        <>

            {[`logo`, `start`, `uzytkownicy`, "produkty", "zamowienia", `zlecenia`, `robocizna`, "kategorie", "producenci", `aktualnosci`, `parametry`, `konto`, `logout`, `logi`].includes(render) &&
                <Link className={url.includes(location.pathname) ? classActive : classHover}
                    to={to}
                    onClick={onClick}>
                    <span className={classIcon}>{icon}</span>
                    <p className={classText}>{text}</p>
                </Link>
            }

        </>
    )
}