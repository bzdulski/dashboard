import { useStore } from "../zustand.config"
import { useSearchParams } from "react-router-dom";

import { useAddParam } from "../hooks/useAddParam"
import { useDeleteParam } from "../hooks/useDeleteParam";

export const Length = ({ render }) => {
    const store = useStore()
    const [param, setParam] = useSearchParams()
    let icon, text, length, onClick, className, classContainer, classText, classColor

    classContainer = ``
    classText = ``

    switch(render) {
        case "użytkownik": 
        {
            classColor = `#ffffff` 
            icon = `star`,
            text = `Wszyscy`,
            length = store.user.length,
            onClick = () => useDeleteParam(param, setParam, "status");
            break
        }
        case "admin": 
        { 
            classColor = `#7367f0`
            icon = `local_police`,
            text = `Admin`,
            length = store.user.filter(e => e.status === "admin").length,
            onClick = () => useAddParam(param, setParam, "status", "admin");
            break
        }
        case "instalator": 
        { 
            classColor = `#dcde43`
            icon = `handyman`,
            text = `Instalator`,
            length = store.user.filter(e => e.status === "instalator").length,
            onClick = () => useAddParam(param, setParam, "status", "instalator");
            break
        }
        case "klient": 
        { 
            classColor = `#00cfe8`
            icon = `people`,
            text = `Klient`,
            length = store.user.filter(e => e.status === "klient").length,
            onClick = () => useAddParam(param, setParam, "status", "klient");
            break
        }
        case "isListTrue": 
        { 
            classColor = `#28c76f`
            icon = `key`,
            length = store.user.filter(e => e.isList === true).length;
            break
        }
        case "isListFalse": 
        { 
            classColor = `#ed143d`
            icon = `key`,
            length = store.user.filter(e => e.isList === false).length;
            break
        }
        case "isZweryfikowanyTrue": 
        { 
            classColor = `#28c76f`
            icon = `email`,
            length = store.user.filter(e => e.isZweryfikowany === true).length
            break
        }
        case "isZweryfikowanyFalse": 
        { 
            classColor = `#ed143d`
            icon = `email`,
            length = store.user.filter(e => e.isZweryfikowany === false).length
            break
        }
        case "produkt": 
        { 
            classColor = `#ffffff`
            icon = `star`,
            text = `Wszyscy`,
            length = store.product.length,
            onClick = onClick = () => useDeleteParam(param, setParam, "status");
            break
        }
        case "wystawiony": 
        { 
            classColor = `#00cfe8`
            icon = `sell`,
            text = `Wystawiony`,
            length = store.product.filter(e => e.status === "wystawiony").length,
            onClick = onClick = () => useAddParam(param, setParam, "status", "wystawiony");
            break
        }
        case "niedostępny": 
        { 
            classColor = `#dcde43`
            icon = `sell`,
            text = `Niedostępny`,
            length = store.product.filter(e => e.status === "niedostępny").length,
            onClick = onClick = () => useAddParam(param, setParam, "status", "niedostępny");
            break
        }
        case "zamówienie": 
        { 
            classColor = `#ffffff`
            icon = `star`,
            text = `Wszyscy`,
            length = store.order.length,
            onClick = onClick = () => useDeleteParam(param, setParam, "status");
            break
        }
        case "nowe": 
        { 
            classColor = `#ea5455`
            icon = `notifications`,
            text = `Nowe`,
            length = store.order.filter(e => e.status === "nowe").length,
            onClick = onClick = () => useAddParam(param, setParam, "status", "nowe");
            break
        }
        case "zakończone": 
        { 
            classColor = `#28c76f`
            icon = `check_circle`,
            text = `Zakończone`,
            length = store.order.filter(e => e.status === "zakończone").length,
            onClick = onClick = () => useAddParam(param, setParam, "status", "zakończone");
            break
        }
        case "zapłacone": 
        { 
            classColor = `#dcde43`
            icon = `pending`,
            text = `Zapłacone`,
            length = store.order.filter(e => e.status === "zapłacone").length,
            onClick = onClick = () => useAddParam(param, setParam, "status", "zapłacone");
            break
        }
        case "nieopłacone": 
        { 
            classColor = `#de8d43`
            icon = `pending`,
            text = `Nieopłacone`,
            length = store.order.filter(e => e.status === "nieopłacone").length,
            onClick = onClick = () => useAddParam(param, setParam, "status", "nieopłacone");
            break
        }
        case "wygasłe": 
        { 
            classColor = `#ed143d`
            icon = `cancel`,
            text = `Wygasłe`,
            length = store.order.filter(e => e.status === "wygasłe").length,
            onClick = onClick = () => useAddParam(param, setParam, "status", "wygasłe");
            break
        }
        case "fakturaTrue": 
        { 
            classColor = `#28c76f`
            icon = `description`,
            length = store.order.filter(e => e.faktura === true).length;
            break
        }
        case "fakturaFalse": 
        { 
            classColor = `#ed143d`
            icon = `description`,
            length = store.order.filter(e => e.faktura === false).length;
            break
        }
        case "robocizna": 
        { 
            classColor = `#ffffff`
            icon = `star`,
            text = `Wszyscy`,
            length = store.work.length,
            onClick = onClick = () => useDeleteParam(param, setParam, "status");
            break
        }
        case "zlecenie": 
        { 
            classColor = `#ffffff`
            icon = `star`,
            text = `Wszyscy`,
            length = store.task.length,
            onClick = onClick = () => useDeleteParam(param, setParam, "status");
            break
        }
        case "noweZ": 
        { 
            classColor = `#ea5455`
            icon = `notifications`,
            text = `Nowe`,
            length = store.task.filter(e => e.status === "nowe").length,
            onClick = onClick = () => useAddParam(param, setParam, "status", "nowe");
            break
        }
        case "zakończoneZ": 
        { 
            classColor = `#28c76f`
            icon = `check_circle`,
            text = `Zakończone`,
            length = store.task.filter(e => e.status === "zakończone").length,
            onClick = onClick = () => useAddParam(param, setParam, "status", "zakończone");
            break
        }
        case "realizowaneZ": 
        { 
            classColor = `#FF69B4`
            icon = `pending`,
            text = `Realizowane`,
            length = store.task.filter(e => e.status === "realizowane").length,
            onClick = onClick = () => useAddParam(param, setParam, "status", "realizowane");
            break
        }
        case "podjęteZ": 
        { 
            classColor = `#de8d43`
            icon = `pending`,
            text = `Podjęte`,
            length = store.task.filter(e => e.status === "podjęte").length,
            onClick = onClick = () => useAddParam(param, setParam, "status", "podjęte");
            break
        }
        case "anulowaneZ": 
        { 
            classColor = `#ed143d`
            icon = `cancel`,
            text = `Anulowane`,
            length = store.task.filter(e => e.status === "anulowane").length,
            onClick = onClick = () => useAddParam(param, setParam, "status", "anulowane");
            break
        }
        case "zlecenieTrue": 
        { 
            classColor = `#28c76f`
            icon = `task`,
            length = store.task.filter(e => e.isZlecenie === true).length;
            break
        }
        case "zlecenieFalse": 
        { 
            classColor = `#ed143d`
            icon = `task`,
            length = store.task.filter(e => e.isZlecenie === false).length;
            break
        }
        case "kategoria": 
        { 
            classColor = `#ffffff`
            icon = `star`,
            text = `Wszyscy`,
            length = store.category.length,
            onClick = onClick = () => useDeleteParam(param, setParam, "status");
            break
        }
        case "producent": 
        { 
            classColor = `#ffffff`
            icon = `star`,
            text = `Wszyscy`,
            length = store.producer.length,
            onClick = onClick = () => useDeleteParam(param, setParam, "status");
            break
        }
        case "aktualnosci": 
        { 
            classColor = `#ffffff`
            icon = `star`,
            text = `Wszyscy`,
            length = store.article.length,
            onClick = onClick = () => useDeleteParam(param, setParam, "status");
            break
        }
        case "aktualne": 
        { 
            classColor = `#00cfe8`
            icon = `article`,
            text = `Aktualne`,
            length = store.article.filter(e => e.status === "aktualne").length,
            onClick = onClick = () => useAddParam(param, setParam, "status", "aktualne");
            break
        }
        case "przestarzałe": 
        { 
            classColor = `#dcde43`
            icon = `article`,
            text = `Przestarzałe`,
            length = store.article.filter(e => e.status === "przestarzałe").length,
            onClick = onClick = () => useAddParam(param, setParam, "status", "przestarzałe");
            break
        }
        case "parametry": 
        { 
            classColor = `#ffffff`
            icon = `star`,
            text = `Wszyscy`,
            length = store.parameter.length,
            onClick = onClick = () => useDeleteParam(param, setParam, "status");
            break
        }
    }

    className = `font-['Material_Icons'] leading-none text-xl text-[${classColor}] cursor-pointer`

    return (
        <div className={classContainer}>
            <span className={className} 
                onClick={onClick}>
                {icon}
            </span>
            <p className={classText}>{text}</p>
            <p className={classText}>{length}</p>
        </div> 
    )
}