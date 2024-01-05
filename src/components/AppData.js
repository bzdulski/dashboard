import { useNavigate, useLocation, useParams, createSearchParams, useSearchParams } from "react-router-dom"

import { useStore } from "../zustand.config"
import { useTimestamp } from "../hooks/useTimestamp"

export const AppData = ({ render }) => {
    const store = useStore()
    const location = useLocation()
    const navigate = useNavigate()
    const [param, setParam] = useSearchParams()
    const {id} = useParams()

    let array = store[render]
    let start = param.get("page") ? (parseFloat(param.get("page")) - 1) * 12 : 0
    let end = param.get("page") ? ((parseFloat(param.get("page")) - 1) * 12) + 12 : 10
    let path = location.pathname
    let paramStatus = param.get("status")
    let paramSearch = param.get("search")
    let paramSort = param.get("sort")

    let classContainer = `flex gap-[2rem]`
    let classData = `w-[7rem] truncate`
    let classData2 = `w-[7rem] text-[12px] truncate`
    let classDataFalse = `font-['Material_icons'] text-[#ed143d] cursor-pointer`
    let classDataTrue = `font-['Material_icons'] text-[#28c76f] cursor-pointer`
    let classDataPurple = `font-['Material_icons'] text-[#7367f0] cursor-pointer`
    let classDataYellow = `font-['Material_icons'] text-[#dcde43] cursor-pointer`
    let classDataTeal = `font-['Material_icons'] text-[#00cfe8] cursor-pointer`
    let classDataRed = `font-['Material_icons'] text-[#ea5455] cursor-pointer`
    let classDataOrange = `font-['Material_icons'] text-[#de8d43] cursor-pointer`
    let classDataWhite = `font-['Material_icons'] text-[#ffffff] cursor-pointer`
    let classDataPink = `font-['Material_icons'] text-[#FF69B4] cursor-pointer`

    let url

    switch(render) {
        case "user": { url = "/uzytkownicy"; break }
        case "product": { url = "/produkty"; break }
        case "order": { url = "/zamowienia"; break }
        case "task": { url = "/zlecenia"; break }
        case "work": { url = "/robocizna"; break }
        case "article": { url = "/aktualnosci"; break }
        case "parameter": { url = "/parametry"; break }
        case "producer": { url = "/producenci"; break }
        case "category": { url = "/kategorie"; break }
    }

    const CheckColor = (status) => {
        switch(status) {
            case "admin": return `flex gap-[2rem] text-[#7367f0]`;
            case "instalator": return `flex gap-[2rem] text-[#dcde43]`;
            case "klient": return `flex gap-[2rem] text-[#00cfe8]`;
            case "niedostępny": return `flex gap-[2rem] text-[#dcde43]`;
            case "wystawiony": return `flex gap-[2rem] text-[#00cfe8]`;
            case "nowe": return `flex gap-[2rem] text-[#ea5455]`;
            case "zakończone": return `flex gap-[2rem] text-[#28c76f]`;
            case "nieopłacone": return `flex gap-[2rem] text-[#de8d43]`;
            case "zapłacone": return `flex gap-[2rem] text-[#dcde43]`;
            case "podjęte": return `flex gap-[2rem] text-[#de8d43]`;
            case "wygasłe": return `flex gap-[2rem] text-[#ed143d]`;
            case "anulowane": return `flex gap-[2rem] text-[#ed143d]`;
            case "aktualne": return `flex gap-[2rem] text-[#00cfe8]`;
            case "przestarzałe": return `flex gap-[2rem] text-[#dcde43]`;
            case "realizowane": return `flex gap-[2rem] text-[#FF69B4]`;
            default: return `flex gap-[2rem] text-[#ffffff]`
        }
    }

    if(paramStatus) {
        array = array.filter(({status}) => (
            status.toLowerCase().includes(paramStatus)
        ))   
    }

    if(!paramSort) array = [].concat(array).sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)
    if(paramSort) array = [].concat(array).sort((a, b) => a.createdAt > b.createdAt ? 1 : -1)

    if(paramSearch) {
        switch(render) {
            case "user": { 
                array = array.filter(({id, email, telefon}) => (
                    id.toLowerCase().includes(paramSearch) ||
                    email.toLowerCase().includes(paramSearch) ||
                    telefon.toLowerCase().includes(paramSearch)
            )); break }
            case "product": {
                array = array.filter(({id, nazwa, kategoria1, kategoria2, kategoria3, kategoria4, producent}) => (
                    id.toLowerCase().includes(paramSearch) ||
                    nazwa.toLowerCase().includes(paramSearch) ||
                    kategoria1.toLowerCase().includes(paramSearch) ||
                    kategoria2.toLowerCase().includes(paramSearch) ||
                    kategoria3.toLowerCase().includes(paramSearch) ||
                    kategoria4.toLowerCase().includes(paramSearch) ||
                    producent.toLowerCase().includes(paramSearch)
            )); break }
            case "order": {
                array = array.filter(({id, iduser, WZ, FV}) => (
                    id.toLowerCase().includes(paramSearch) ||
                    iduser.toLowerCase().includes(paramSearch) ||
                    WZ.toLowerCase().includes(paramSearch) ||
                    FV.toLowerCase().includes(paramSearch)
            )); break }
            case "task": {
                array = array.filter(({id, nazwa, miejsce, wojewodztwo, NR}) => (
                    id.toLowerCase().includes(paramSearch) ||
                    nazwa.toLowerCase().includes(paramSearch) ||
                    miejsce.toLowerCase().includes(paramSearch) ||
                    wojewodztwo.toLowerCase().includes(paramSearch) ||
                    NR.toLowerCase().includes(paramSearch)
            )); break }
            case "work": {
                array = array.filter(({id}) => (
                    id.toLowerCase().includes(paramSearch)
            )); break }
            case "category": {
                array = array.filter(({id, nazwa, kategoria, kategoria1, kategoria2, kategoria3, kategoria4}) => (
                    id.toLowerCase().includes(paramSearch) ||
                    nazwa.toLowerCase().includes(paramSearch) ||
                    kategoria.toLowerCase().includes(paramSearch) ||
                    kategoria1?.toLowerCase().includes(paramSearch) ||
                    kategoria2?.toLowerCase().includes(paramSearch) ||
                    kategoria3?.toLowerCase().includes(paramSearch) ||
                    kategoria4?.toLowerCase().includes(paramSearch)
            )); break }
            case "producer": {
                array = array.filter(({id, nazwa}) => (
                    id.toLowerCase().includes(paramSearch) ||
                    nazwa.toLowerCase().includes(paramSearch)
            )); break }
            case "parameter": {
                array = array.filter(({id, nazwa}) => (
                    id.toLowerCase().includes(paramSearch) ||
                    nazwa.toLowerCase().includes(paramSearch)
            )); break }
            case "article": {
                array = array.filter(({id, nazwa, opis}) => (
                    id.toLowerCase().includes(paramSearch) ||
                    nazwa.toLowerCase().includes(paramSearch) ||
                    opis.toLowerCase().includes(paramSearch)
            )); break }
        }
    }

    return (
        <>

            {[].concat(array).slice(start, end).map(e => e.id === id && location.pathname === `${url}/edytuj/${id}` ?
                (
                    <div className={CheckColor(e.status)} key={e.id}>
                        <p className={classData}>{e[store.filter[render][0]]}</p>
                        <p className={classData}>{e[store.filter[render][1]]}</p>
                        <p className={classData}>{e[store.filter[render][2]]}</p>
                        <p className={classData}>{e[store.filter[render][3]]}</p>
                        <p className={classData}>{e[store.filter[render][4]]}</p>
                        <p className={classData2}>{useTimestamp(e[store.filter[render][5]])}</p>
                        {render === "product" && <span className=""></span>}
                        {render === "product" && <span className=""></span>}
                        {render === "product" && <span className=""></span>}
                        {render === "order" && <span className="w-[1.05rem]"></span>}
                        {render === "task" && <span className="w-[1.05rem]"></span>}
                        {render === "article" && <span className=""></span>}
                        {render === "article" && <span className=""></span>}
                        {render === "article" && <span className=""></span>}
                        {render === "producer" && <span className=""></span>}
                        {render === "producer" && <span className=""></span>}
                        {render === "producer" && <span className=""></span>}
                        {render === "parameter" && <span className=""></span>}
                        {render === "parameter" && <span className=""></span>}
                        {render === "parameter" && <span className=""></span>}
                        {render === "category" && <span className=""></span>}
                        {render === "category" && <span className=""></span>}
                        {render === "category" && <span className=""></span>}
                        {render === "work" && <span className=""></span>}
                        {render === "work" && <span className=""></span>}
                        {render === "work" && <span className=""></span>}
                        {e.isList === false && <span className={classDataFalse} onClick={() => path !== `/uzytkownicy/edytuj/${e.id}` ? navigate(`/uzytkownicy/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/uzytkownicy?${createSearchParams(param)}`)}>key</span>}
                        {e.isList === true && <span className={classDataTrue} onClick={() => path !== `/uzytkownicy/edytuj/${e.id}` ? navigate(`/uzytkownicy/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/uzytkownicy?${createSearchParams(param)}`)}>key</span>}
                        {e.isZweryfikowany === false && <span className={classDataFalse} onClick={() => path !== `/uzytkownicy/edytuj/${e.id}` ? navigate(`/uzytkownicy/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/uzytkownicy?${createSearchParams(param)}`)}>email</span>}
                        {e.isZweryfikowany === true && <span className={classDataTrue} onClick={() => path !== `/uzytkownicy/edytuj/${e.id}` ? navigate(`/uzytkownicy/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/uzytkownicy?${createSearchParams(param)}`)}>email</span>}
                        {e.faktura === false && <span className={classDataFalse} onClick={() => path !== `/zamowienia/edytuj/${e.id}` ? navigate(`/zamowienia/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/zamowienia?${createSearchParams(param)}`)}>description</span>}
                        {e.faktura === true && <span className={classDataTrue} onClick={() => path !== `/zamowienia/edytuj/${e.id}` ? navigate(`/zamowienia/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/zamowienia?${createSearchParams(param)}`)}>description</span>}
                        {e.isZlecenie === false && <span className={classDataFalse} onClick={() => path !== `/zlecenia/edytuj/${e.id}` ? navigate(`/zlecenia/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/zlecenia?${createSearchParams(param)}`)}>task</span>}
                        {e.isZlecenie === true && <span className={classDataTrue} onClick={() => path !== `/zlecenia/edytuj/${e.id}` ? navigate(`/zlecenia/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/zlecenia?${createSearchParams(param)}`)}>task</span>}
                        {e.status === "admin" && <span className={classDataPurple} onClick={() => path !== `/uzytkownicy/edytuj/${e.id}` ? navigate(`/uzytkownicy/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/uzytkownicy?${createSearchParams(param)}`)}>settings</span>}
                        {e.status === "instalator" && <span className={classDataYellow} onClick={() => path !== `/uzytkownicy/edytuj/${e.id}` ? navigate(`/uzytkownicy/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/uzytkownicy?${createSearchParams(param)}`)}>settings</span>}
                        {e.status === "klient" && <span className={classDataTeal} onClick={() => path !== `/uzytkownicy/edytuj/${e.id}` ? navigate(`/uzytkownicy/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/uzytkownicy?${createSearchParams(param)}`)}>settings</span>}
                        {e.status === "niedostępny" && <span className={classDataYellow} onClick={() => path !== `/produkty/edytuj/${e.id}` ? navigate(`/produkty/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/produkty?${createSearchParams(param)}`)}>settings</span>}
                        {e.status === "wystawiony" && <span className={classDataTeal} onClick={() => path !== `/produkty/edytuj/${e.id}` ? navigate(`/produkty/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/produkty?${createSearchParams(param)}`)}>settings</span>}
                        {render === "order" && e.status === "nowe" && <span className={classDataRed} onClick={() => path !== `/zamowienia/edytuj/${e.id}` ? navigate(`/zamowienia/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/zamowienia?${createSearchParams(param)}`)}>settings</span>}
                        {render === "order" && e.status === "zakończone" && <span className={classDataTrue} onClick={() => path !== `/zamowienia/edytuj/${e.id}` ? navigate(`/zamowienia/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/zamowienia?${createSearchParams(param)}`)}>settings</span>}
                        {render === "order" && e.status === "nieopłacone" && <span className={classDataOrange} onClick={() => path !== `/zamowienia/edytuj/${e.id}` ? navigate(`/zamowienia/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/zamowienia?${createSearchParams(param)}`)}>settings</span>}
                        {render === "order" && e.status === "zapłacone" && <span className={classDataYellow} onClick={() => path !== `/zamowienia/edytuj/${e.id}` ? navigate(`/zamowienia/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/zamowienia?${createSearchParams(param)}`)}>settings</span>}
                        {render === "order" && e.status === "wygasłe" && <span className={classDataFalse} onClick={() => path !== `/zamowienia/edytuj/${e.id}` ? navigate(`/zamowienia/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/zamowienia?${createSearchParams(param)}`)}>settings</span>}
                        {render === "task" && e.status === "nowe" && <span className={classDataRed} onClick={() => path !== `/zlecenia/edytuj/${e.id}` ? navigate(`/zlecenia/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/zlecenia?${createSearchParams(param)}`)}>settings</span>}
                        {render === "task" && e.status === "zakończone" && <span className={classDataTrue} onClick={() => path !== `/zlecenia/edytuj/${e.id}` ? navigate(`/zlecenia/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/zlecenia?${createSearchParams(param)}`)}>settings</span>}
                        {render === "task" && e.status === "podjęte" && <span className={classDataOrange} onClick={() => path !== `/zlecenia/edytuj/${e.id}` ? navigate(`/zlecenia/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/zlecenia?${createSearchParams(param)}`)}>settings</span>}
                        {render === "task" && e.status === "anulowane" && <span className={classDataFalse} onClick={() => path !== `/zlecenia/edytuj/${e.id}` ? navigate(`/zlecenia/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/zlecenia?${createSearchParams(param)}`)}>settings</span>}
                        {render === "task" && e.status === "realizowane" && <span className={classDataPink} onClick={() => path !== `/zlecenia/edytuj/${e.id}` ? navigate(`/zlecenia/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/zlecenia?${createSearchParams(param)}`)}>settings</span>}
                        {e.status === "aktualne" && <span className={classDataTeal} onClick={() => path !== `/aktualnosci/edytuj/${e.id}` ? navigate(`/aktualnosci/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/aktualnosci?${createSearchParams(param)}`)}>settings</span>}
                        {e.status === "przestarzałe" && <span className={classDataYellow} onClick={() => path !== `/aktualnosci/edytuj/${e.id}` ? navigate(`/aktualnosci/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/aktualnosci?${createSearchParams(param)}`)}>settings</span>}
                        {render === "parameter" && <span className={classDataWhite} onClick={() => path !== `/parametry/edytuj/${e.id}` ? navigate(`/parametry/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/parametry?${createSearchParams(param)}`)}>settings</span>}
                        {render === "producer" && <span className={classDataWhite} onClick={() => path !== `/producenci/edytuj/${e.id}` ? navigate(`/producenci/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/producenci?${createSearchParams(param)}`)}>settings</span>}
                        {render === "category" && <span className={classDataWhite} onClick={() => path !== `/kategorie/edytuj/${e.id}` ? navigate(`/kategorie/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/kategorie?${createSearchParams(param)}`)}>settings</span>}
                        {render === "work" && <span className={classDataWhite} onClick={() => path !== `/robocizna/edytuj/${e.id}` ? navigate(`/robocizna/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/robocizna?${createSearchParams(param)}`)}>settings</span>}
                    </div>
                ) : (
                    <div className={classContainer} key={e.id}>
                        <p className={classData}>{e[store.filter[render][0]]}</p>
                        <p className={classData}>{e[store.filter[render][1]]}</p>
                        <p className={classData}>{e[store.filter[render][2]]}</p>
                        <p className={classData}>{e[store.filter[render][3]]}</p>
                        <p className={classData}>{e[store.filter[render][4]]}</p>
                        <p className={classData2}>{useTimestamp(e[store.filter[render][5]])}</p>
                        {render === "product" && <span className=""></span>}
                        {render === "product" && <span className=""></span>}
                        {render === "product" && <span className=""></span>}
                        {render === "order" && <span className="w-[1.05rem]"></span>}
                        {render === "task" && <span className="w-[1.05rem]"></span>}
                        {render === "work" && <span className="w-[1.05rem]"></span>}
                        {render === "article" && <span className=""></span>}
                        {render === "article" && <span className=""></span>}
                        {render === "article" && <span className=""></span>}
                        {render === "producer" && <span className=""></span>}
                        {render === "producer" && <span className=""></span>}
                        {render === "producer" && <span className=""></span>}
                        {render === "parameter" && <span className=""></span>}
                        {render === "parameter" && <span className=""></span>}
                        {render === "parameter" && <span className=""></span>}
                        {render === "category" && <span className=""></span>}
                        {render === "category" && <span className=""></span>}
                        {render === "category" && <span className=""></span>}
                        {e.isList === false && <span className={classDataFalse} onClick={() => path !== `/uzytkownicy/edytuj/${e.id}` ? navigate(`/uzytkownicy/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/uzytkownicy?${createSearchParams(param)}`)}>key</span>}
                        {e.isList === true && <span className={classDataTrue} onClick={() => path !== `/uzytkownicy/edytuj/${e.id}` ? navigate(`/uzytkownicy/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/uzytkownicy?${createSearchParams(param)}`)}>key</span>}
                        {e.isZweryfikowany === false && <span className={classDataFalse} onClick={() => path !== `/uzytkownicy/edytuj/${e.id}` ? navigate(`/uzytkownicy/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/uzytkownicy?${createSearchParams(param)}`)}>email</span>}
                        {e.isZweryfikowany === true && <span className={classDataTrue} onClick={() => path !== `/uzytkownicy/edytuj/${e.id}` ? navigate(`/uzytkownicy/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/uzytkownicy?${createSearchParams(param)}`)}>email</span>}
                        {e.faktura === false && <span className={classDataFalse} onClick={() => path !== `/zamowienia/edytuj/${e.id}` ? navigate(`/zamowienia/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/zamowienia?${createSearchParams(param)}`)}>description</span>}
                        {e.faktura === true && <span className={classDataTrue} onClick={() => path !== `/zamowienia/edytuj/${e.id}` ? navigate(`/zamowienia/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/zamowienia?${createSearchParams(param)}`)}>description</span>}
                        {e.isZlecenie === false && <span className={classDataFalse} onClick={() => path !== `/zlecenia/edytuj/${e.id}` ? navigate(`/zlecenia/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/zlecenia?${createSearchParams(param)}`)}>task</span>}
                        {e.isZlecenie === true && <span className={classDataTrue} onClick={() => path !== `/zlecenia/edytuj/${e.id}` ? navigate(`/zlecenia/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/zlecenia?${createSearchParams(param)}`)}>task</span>}
                        {e.status === "admin" && <span className={classDataPurple} onClick={() => path !== `/uzytkownicy/edytuj/${e.id}` ? navigate(`/uzytkownicy/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/uzytkownicy?${createSearchParams(param)}`)}>settings</span>}
                        {e.status === "instalator" && <span className={classDataYellow} onClick={() => path !== `/uzytkownicy/edytuj/${e.id}` ? navigate(`/uzytkownicy/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/uzytkownicy?${createSearchParams(param)}`)}>settings</span>}
                        {e.status === "klient" && <span className={classDataTeal} onClick={() => path !== `/uzytkownicy/edytuj/${e.id}` ? navigate(`/uzytkownicy/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/uzytkownicy?${createSearchParams(param)}`)}>settings</span>}   
                        {e.status === "niedostępny" && <span className={classDataYellow} onClick={() => path !== `/produkty/edytuj/${e.id}` ? navigate(`/produkty/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/produkty?${createSearchParams(param)}`)}>settings</span>}
                        {e.status === "wystawiony" && <span className={classDataTeal} onClick={() => path !== `/produkty/edytuj/${e.id}` ? navigate(`/produkty/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/produkty?${createSearchParams(param)}`)}>settings</span>}
                        {render === "order" && e.status === "nowe" && <span className={classDataRed} onClick={() => path !== `/zamowienia/edytuj/${e.id}` ? navigate(`/zamowienia/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/zamowienia?${createSearchParams(param)}`)}>settings</span>}
                        {render === "order" && e.status === "zakończone" && <span className={classDataTrue} onClick={() => path !== `/zamowienia/edytuj/${e.id}` ? navigate(`/zamowienia/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/zamowienia?${createSearchParams(param)}`)}>settings</span>}
                        {render === "order" && e.status === "nieopłacone" && <span className={classDataOrange} onClick={() => path !== `/zamowienia/edytuj/${e.id}` ? navigate(`/zamowienia/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/zamowienia?${createSearchParams(param)}`)}>settings</span>}
                        {render === "order" && e.status === "zapłacone" && <span className={classDataYellow} onClick={() => path !== `/zamowienia/edytuj/${e.id}` ? navigate(`/zamowienia/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/zamowienia?${createSearchParams(param)}`)}>settings</span>}
                        {render === "order" && e.status === "wygasłe" && <span className={classDataFalse} onClick={() => path !== `/zamowienia/edytuj/${e.id}` ? navigate(`/zamowienia/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/zamowienia?${createSearchParams(param)}`)}>settings</span>}
                        {render === "task" && e.status === "nowe" && <span className={classDataRed} onClick={() => path !== `/zlecenia/edytuj/${e.id}` ? navigate(`/zlecenia/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/zlecenia?${createSearchParams(param)}`)}>settings</span>}
                        {render === "task" && e.status === "zakończone" && <span className={classDataTrue} onClick={() => path !== `/zlecenia/edytuj/${e.id}` ? navigate(`/zlecenia/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/zlecenia?${createSearchParams(param)}`)}>settings</span>}
                        {render === "task" && e.status === "podjęte" && <span className={classDataOrange} onClick={() => path !== `/zlecenia/edytuj/${e.id}` ? navigate(`/zlecenia/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/zlecenia?${createSearchParams(param)}`)}>settings</span>}
                        {render === "task" && e.status === "anulowane" && <span className={classDataFalse} onClick={() => path !== `/zlecenia/edytuj/${e.id}` ? navigate(`/zlecenia/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/zlecenia?${createSearchParams(param)}`)}>settings</span>}
                        {render === "task" && e.status === "realizowane" && <span className={classDataPink} onClick={() => path !== `/zlecenia/edytuj/${e.id}` ? navigate(`/zlecenia/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/zlecenia?${createSearchParams(param)}`)}>settings</span>}
                        {e.status === "aktualne" && <span className={classDataTeal} onClick={() => path !== `/aktualnosci/edytuj/${e.id}` ? navigate(`/aktualnosci/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/aktualnosci?${createSearchParams(param)}`)}>settings</span>}
                        {e.status === "przestarzałe" && <span className={classDataYellow} onClick={() => path !== `/aktualnosci/edytuj/${e.id}` ? navigate(`/aktualnosci/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/aktualnosci?${createSearchParams(param)}`)}>settings</span>}
                        {render === "parameter" && <span className={classDataWhite} onClick={() => path !== `/parametry/edytuj/${e.id}` ? navigate(`/parametry/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/parametry?${createSearchParams(param)}`)}>settings</span>}
                        {render === "producer" && <span className={classDataWhite} onClick={() => path !== `/producenci/edytuj/${e.id}` ? navigate(`/producenci/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/producenci?${createSearchParams(param)}`)}>settings</span>}
                        {render === "category" && <span className={classDataWhite} onClick={() => path !== `/kategorie/edytuj/${e.id}` ? navigate(`/kategorie/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/kategorie?${createSearchParams(param)}`)}>settings</span>}
                        {render === "work" && <span className={classDataWhite} onClick={() => path !== `/robocizna/edytuj/${e.id}` ? navigate(`/robocizna/edytuj/${e.id}?${createSearchParams(param)}`) : navigate(`/robocizna?${createSearchParams(param)}`)}>settings</span>}
                    </div>
                ))}

        </>
    )
}