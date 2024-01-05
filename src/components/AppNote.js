import { useStore } from "../zustand.config"
import { useForm } from "react-hook-form"
import { useEffect, useState, useRef } from "react"
import { Link, useParams, useNavigate, createSearchParams, useSearchParams } from "react-router-dom"
import { Input } from "./Input"
import { Href } from "./Href"
import { Select } from "./Select"
import { useTimestamp } from "../hooks/useTimestamp"
import { PrintOF } from "./PrintOF"
import { PrintOFR } from "./PrintOFR"
import { PrintFV } from "./PrintFV"
import { useReactToPrint } from "react-to-print"

export const AppNote = ({ render }) => {
    const store = useStore()
    const { id } = useParams()
    const [discountName, setDiscountName] = useState("")
    const [discountPrice, setDiscountPrice] = useState("")
    const [sameId, setSameId] = useState("")
    const [sameIdP, setSameIdP] = useState("")
    const [paramValue, setParamValue] = useState("")
    const [param, setParam] = useSearchParams()
    const [zdjecieFile, setZdjecieFile] = useState("")
    const navigate = useNavigate()
    const { register, handleSubmit, getValues, setValue, watch, reset, formState: { errors } } = useForm()

    const refFV = useRef(null)
    const refOF = useRef(null)
    const refOFR = useRef(null)

    const handlePrintFV = useReactToPrint({
        content: () => refFV.current,
      });
    
      const handlePrintOF = useReactToPrint({
        content: () => refOF.current,
      });

      const handlePrintOFR = useReactToPrint({
        content: () => refOFR.current,
      });
    
      const moveImageToFirst = (index) => {
        console.log(index)
        const image = getValues(`zdjecie.[${index}]`)
        const updatedImages = [image, ...getValues(`zdjecie`).filter((_, i) => i !== index)];
        // setValue("zdjecie", updatedImages);
        reset({...getValues(), zdjecie: updatedImages})
      };

      const [list, setList] = useState([])
      useEffect(() => {
        // let list = []
        let arr = store.order.filter(k => k.idtask === id)
        let prod = arr.map(x => x.produkty)
        prod.forEach(element => { 
            while(element.length > 0) {
                list.push(element.pop())
            }
        })
    }, [])

    let type, text, url, ev, del

    switch(render) {
        case "user": { type = "user", text = "Użytkownik", url = "/uzytkownicy", ev = handleSubmit(event => store.update({doc: "user", data: event, id: id})), del = handleSubmit(() => {store.delete({doc: "user", id: id}); navigate(`/`+"uzytkownicy")}); break }
        case "product": { type = "product", text = "Produkt", url = "/produkty", ev = handleSubmit(event => store.update({doc: "product", data: event, id: id, file: zdjecieFile})), del = handleSubmit(() => {store.delete({doc: "product", id: id}); navigate(`/`+"produkty")}); break }
        case "order": { type = "order", text = "Zamówienie", url = "/zamowienia", ev = handleSubmit(event => store.update({doc: "order", data: event, id: id, email: store.user?.find(x => x.id === event.iduser)?.email})), del = handleSubmit(() => {store.delete({doc: "order", id: id}); navigate(`/`+"zamowienia")}); break }
        case "task": { type = "task", text = "Zlecenia", url = "/zlecenia", ev = handleSubmit(event => store.update({doc: "task", data: event, id: id, email: store.user?.find(x => x.id === event.iduser)?.email})), del = handleSubmit(() => {store.delete({doc: "task", id: id}); navigate(`/`+"zlecenia")}); break }
        case "work": { type = "work", text = "Robocizna", url = "/robocizna", ev = handleSubmit(event => navigate(`/`+"zlecenia")); break }
        case "category": { type = "category", text = "Kategoria",  url = "/kategorie", ev = handleSubmit(event => store.update({doc: "category", data: event, id: id})), del = handleSubmit(() => {store.delete({doc: "category", id: id}); navigate(`/`+"kategorie")}); break }
        case "producer": { type = "producer", text = "Producent", url = "/producenci", ev = handleSubmit(event => store.update({doc: "producer", data: event, id: id})), del = handleSubmit(() => {store.delete({doc: "producer", id: id}); navigate(`/`+"producenci")}); break }
        case "article": { type = "article", text = "Aktualność", url = "/aktualnosci", ev = handleSubmit(event => store.update({doc: "article", data: event, id: id})), del = handleSubmit(() => {store.delete({doc: "article", id: id}); navigate(`/`+"aktualnosci")}); break }
        case "parameter": { type = "parameter", text = "Parametry", url = "/parametry", ev = handleSubmit(event => store.update({doc: "parameter", data: event, id: id})), del = handleSubmit(() => {store.delete({doc: "parameter", id: id}); navigate(`/`+"parametry")}); break }
    }

    useEffect(() => {
        if(id && store[type].find(e => e.id === id)) { reset(store[type].find(e => e.id === id))}
        else { reset() }
        // [ERROR] DZIWNIE RESETUJE GDY JUZ NIE MA ID PARAMU
    },
    // eslint-disable-next-line
    [id])

    let color
    switch(getValues("status")) {
        case "admin": { color = `text-[#7367f0]`; break }
        case "instalator": { color = `text-[#dcde43]`; break }
        case "klient": { color = `text-[#00cfe8]`; break }
        case "wystawiony": { color = `text-[#00cfe8]`; break }
        case "niedostępny": { color = `text-[#dcde43]`; break }
        case "nowe": { color = `text-[#ea5455]`; break }
        case "zakończone": { color = `text-[#28c76f]`; break }
        case "nieopłacone": { color = `text-[#de8d43]`; break }
        case "podjęte": { color = `text-[#de8d43]`; break }
        case "wygasłe": { color = `text-[#ed143d]`; break }
        case "anulowane": { color = `text-[#ed143d]`; break }
        case "aktualne": { color = `text-[#00cfe8]`; break }
        case "przestarzałe": { color = `text-[#dcde43]`; break }
        case "realizowane": { color = `text-[#FF69B4]`; break }
    }

    return (
<>
                    <form className="fixed overflow-auto right-0 top-0 bottom-[320px] flex flex-col gap-[2rem] p-[2rem] w-[595px] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] border-[#000000] border-[.1rem] rounded-[2rem] backdrop-blur-[.3rem]"
                        id="formEdit" onSubmit={ev} noValidate>

                        <p className="font-bold text-xl text-[#ffffff] text-center">{text}</p>

                        {type === "user" && 
                            <>
                                <div className="flex flex-col">
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Id</p>
                                        <p className="">{getValues("id")}</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Email</p>
                                        <p className="">{getValues("email")}</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Status</p>
                                        <p className={color}>{getValues("status")}</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Weryfikacja (email)</p>
                                        <p className={getValues("isZweryfikowany") ? `font-['Material_icons'] text-[#28c76f]` : `font-['Material_icons'] text-[#ed143d]`}>email</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Weryfikacja (list)</p>
                                        <p className={getValues("isList") ? `font-['Material_icons'] text-[#28c76f]` : `font-['Material_icons'] text-[#ed143d]`}>key</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Weryfikacja (klucz)</p>
                                        <p className="">{getValues("isKey")}</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Dodano</p>
                                        <p className="">{getValues("createdAt") ? useTimestamp(getValues("createdAt")) : " | "}</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Edytowano</p>
                                        <p className="">{getValues("editedAt") ? useTimestamp(getValues("editedAt")) : " | "}</p>
                                    </div>
                                </div>

                                <p className="font-bold text-xl text-[#ffffff] text-center">Dane</p>

                                <div className="flex flex-col">

                                    <Select render="statusUser" register={register} errors={errors} value={getValues("status")}/>   
                                    <Input render="telefon" register={register} errors={errors} value={getValues("telefon")}/>
                                    <Input render="nazwa" register={register} errors={errors} value={getValues("nazwa")}/> 
                                    <Input render="nip" register={register} errors={errors} value={getValues("nip")}/> 
                                    <Input render="imie" register={register} errors={errors} value={getValues("imie")}/> 
                                    <Input render="nazwisko" register={register} errors={errors} value={getValues("nazwisko")}/> 
                                    <Input render="ulicainumer" register={register} errors={errors} value={getValues("ulicainumer")}/> 
                                    <Input render="miejscowosc" register={register} errors={errors} value={getValues("miejscowosc")}/> 
                                    <Input render="kodpocztowy" register={register} errors={errors} value={getValues("kodpocztowy")}/>   

                                </div>

                                <p className="font-bold text-xl text-[#ffffff] text-center">Koszyk</p>

                                <div className="flex flex-col">

                                    <Input render="koszyk" register={register} errors={errors} value={getValues("koszyk.nazwa")}/> 

                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Wartość netto</p>
                                        <p>{store[type].find(e => e.id === id).koszyk.produkty.reduce((total, item) => total+(item.cenanetto * item.ilosc), 0).toFixed(2)} zł</p>
                                    </div>

                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Wartość brutto</p>
                                        <p className="">{store[type].find(e => e.id === id).koszyk.produkty.reduce((total, item) => total+(item.cenabrutto * item.ilosc), 0).toFixed(2)} zł</p>
                                    </div>

                                    <div className="flex flex-col gap-[2rem]">
                                        <p className="font-bold">Produkty</p>
                                        {store[type].find(e => e.id === id).koszyk.produkty.map((e, i) =>
                                        (
                                            <div className="flex flex-col" key={e.id}>
                                                <div className="flex gap-[1rem] cursor-pointer" onClick={() => navigate(`/produkty/edytuj/${e.id}`)}>
                                                    <p className="font-bold">#{i+1}</p>
                                                    {e.status === "wystawiony" && <p className="font-['Material_icons'] text-[#00cfe8]">settings</p>}
                                                    {e.status === "niedostępny" && <p className="font-['Material_icons'] text-[#dcde43]">settings</p>}
                                                    {e.status === "wystawiony" && <p className="text-[#00cfe8]">{e.status}</p>}
                                                    {e.status === "niedostępny" && <p className="text-[#dcde43]">{e.status}</p>}
                                                </div>
                                                <img width="100px" height="100px" src={e.zdjecie}/>
                                                <div className="flex gap-[1rem]">
                                                    <p className="font-bold">Nazwa</p>
                                                    <p className="">{e.nazwa}</p>
                                                </div>
                                                <div className="flex gap-[1rem]">
                                                    <p className="font-bold">Ilość</p>
                                                    <p className="">{e.ilosc}</p>
                                                </div>
                                                <div className="flex gap-[1rem]">
                                                    <p className="font-bold">Rabat</p>
                                                    <p className="">{e.rabat ? `${e.rabat} %` : `-`}</p>
                                                </div>
                                                <div className="flex gap-[1rem]">
                                                    <p className="font-bold">Cena netto</p>
                                                    <p className="">{e.cenanetto} zł | {e.cenanetto*e.ilosc} zł</p>
                                                </div>
                                                <div className="flex gap-[1rem]">
                                                    <p className="font-bold">Cena brutto</p>
                                                    <p className="">{e.cenabrutto} zł | {e.cenabrutto*e.ilosc} zł</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>

                                <p className="font-bold text-xl text-[#ffffff] text-center">Rabaty</p>

                                <div className="flex flex-col">

                                    <div className="flex gap-[1rem]">

                                        <span className="cursor-pointer text-[#28c76f] text-xl font-['Material_icons']" onClick={() => {(discountName && discountPrice) ? setValue("rabaty", [...getValues("rabaty"), {producer: discountName, percent: discountPrice}]) : ""; setSameId(""); navigate(`/uzytkownicy/edytuj/${id}`); setDiscountName(""); setDiscountPrice("")}}>add</span> 

                                        <select className="w-full font-bold whitespace-nowrap bg-transparent outline-none cursor-pointer appearance-none"
                                            value={discountName}
                                            onChange={event => setDiscountName(event.target.value)}>
                                                <option disabled value="">Producent</option>
                                                {
                                                    store.producer.map(e =>
                                                    (
                                                        <option key={e.id} value={e.nazwa}>{e.nazwa}</option>
                                                    ))
                                                }
                                        </select>

                                        <input className="w-full bg-transparent outline-none text-center"
                                            type="number" 
                                            value={discountPrice}
                                            placeholder="%"
                                            onChange={event => setDiscountPrice(event.target.value)}/>

                                    </div>
                                    
                                    {getValues("rabaty")?.map(x =>
                                    (
                                        <div className="flex gap-[1rem]" key={x.producer}>
                                            <span className="cursor-pointer text-[#ed143d] text-xl font-['Material_icons']" onClick={() => {setValue("rabaty", [...getValues("rabaty").filter(l => l.producer !== x.producer)]); navigate(`/uzytkownicy/edytuj/${id}`)}}>delete</span> 
                                            <p className="font-bold">{x.producer}</p>
                                            <p className="">{x.percent} %</p>
                                        </div>
                                    ))}

                                </div>

                                <p className="font-bold text-xl text-[#ffffff] text-center">Zamówienia</p>

                                <div className="flex flex-col gap-[2rem]">
                                    {store.order?.filter(o => o.iduser === id)?.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)?.map((e, i) =>
                                    (
                                        <div className="flex flex-col" key={e.id}>
                                            <div className="flex gap-[1rem] cursor-pointer" onClick={() => navigate(`/zamowienia/edytuj/${e.id}`)}>
                                                <p className="font-bold">#{i+1}</p>
                                                {e.status === "nowe" && <p className="font-['Material_icons'] text-[#ea5455]">settings</p>}
                                                {e.status === "zakończone" && <p className="font-['Material_icons'] text-[#28c76f]">settings</p>}
                                                {e.status === "nieopłacone" && <p className="font-['Material_icons'] text-[#de8d43]">settings</p>}
                                                {e.status === "wygasłe" && <p className="font-['Material_icons'] text-[#ed143d]">settings</p>}
                                                {e.status === "nowe" && <p className="text-[#ea5455]">{e.status}</p>}
                                                {e.status === "zakończone" && <p className="text-[#28c76f]">{e.status}</p>}
                                                {e.status === "nieopłacone" && <p className="text-[#de8d43]">{e.status}</p>}
                                                {e.status === "wygasłe" && <p className="text-[#ed143d]">{e.status}</p>}
                                            </div>
                                            <div className="flex gap-[1rem]">
                                                <p className="font-bold">WZ</p>
                                                <p className="">{e.WZ}</p>
                                            </div>
                                            {e.FV && <div className="flex gap-[1rem]">
                                                <p className="font-bold">FV</p>
                                                <p className="">{e.FV}</p>
                                            </div>}
                                            <div className="flex gap-[1rem]">
                                                <p className="font-bold">Wartość netto</p>
                                                <p className="">{e.produkty?.reduce((total, item) => item.rabat ? total+((100-item.rabat)*(item.cenanetto*item.ilosc)/100) : total+(item.cenanetto * item.ilosc), 0).toFixed(2)} zł</p>
                                            </div>
                                            <div className="flex gap-[1rem]">
                                                <p className="font-bold">Wartość brutto</p>
                                                <p className="">{e.produkty?.reduce((total, item) => item.rabat ? total+((100-item.rabat)*(item.cenabrutto*item.ilosc)/100) : total+(item.cenabrutto * item.ilosc), 0).toFixed(2)} zł</p>
                                            </div>
                                            <div className="flex gap-[1rem]">
                                                <p className="font-bold">Data dodania</p>
                                                <p className="">{e.createdAt ? useTimestamp(e.createdAt) : " | "}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                             </>
                        }
























                        {type === "product" && 
                            <>
                                <div className="flex flex-col">
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Id</p>
                                        <p className="">{getValues("id")}</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Status</p>
                                        <p className={color}>{getValues("status")}</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Dodano</p>
                                        <p className="">{getValues("createdAt") ? useTimestamp(getValues("createdAt")) : " | "}</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Edytowano</p>
                                        <p className="">{getValues("editedAt") ? useTimestamp(getValues("editedAt")) : " | "}</p>
                                    </div>
                                </div>

                                <p className="font-bold text-xl text-[#ffffff] text-center">Zdjęcia</p>

                                <div className="flex flex-col gap-[1rem]">

                                    <div className="flex gap-[1rem]">
                                    <label className="cursor-pointer text-[#28c76f] font-['Material_icons']" htmlFor="zdjecia">add</label>
                                    <input className="hidden" id="zdjecia" type="file" {...register("zdjecie")} multiple="multiple" onChange={event => {setZdjecieFile([event.target.files[0], event.target.files[1], event.target.files[2], event.target.files[3], event.target.files[4]]); setValue("zdjecie", [event.target.files[0] ? URL.createObjectURL(event.target.files[0]) : "", event.target.files[1] ? URL.createObjectURL(event.target.files[1]) : "", event.target.files[2] ? URL.createObjectURL(event.target.files[2]) : "", event.target.files[3] ? URL.createObjectURL(event.target.files[3]) : "", event.target.files[4] ? URL.createObjectURL(event.target.files[4]) : ""])}}/>
                                    <p className="font-bold">Zdjęcia</p>
                                    </div>

                                    <div className="flex flex-wrap justify-center gap-[1rem]">
                                        {getValues("zdjecie")?.map((image, index) => (
                                            <div key={index} className="flex flex-col gap-[.5rem]">
                                            <img className="max-w-[100%] max-h-[100%] w-[90px] h-[90px] object-contain" src={getValues(`zdjecie.[${index}]`)} />
                                            <button
                                                type="button"
                                                className="font-['Material_Icons'] leading-none cursor-pointer text-xl text-[#28c76f]"
                                                onClick={() => moveImageToFirst(index)}
                                            >
                                                repeat
                                            </button>
                                            </div>
                                        ))}

                                    </div>

                                </div>

                                <p className="font-bold text-xl text-[#ffffff] text-center">Dane</p>

                                <div className="flex flex-col">
 
                                    <Select render="statusProduct" register={register} errors={errors} value={getValues("status")}/>   
                                    <Input render="productNazwa" register={register} errors={errors} value={getValues("nazwa")}/>
                                    <Select render="productKategoria1" register={register} errors={errors} value={getValues("kategoria1")}/>  
                                    {watch("kategoria1") && <Select render="productKategoria2" register={register} errors={errors} value={getValues("kategoria2")} kat1={getValues("kategoria1")}/>}
                                    {watch("kategoria2") && <Select render="productKategoria3" register={register} errors={errors} value={getValues("kategoria3")} kat1={getValues("kategoria1")} kat2={getValues("kategoria2")}/>}
                                    {watch("kategoria3") && <Select render="productKategoria4" register={register} errors={errors} value={getValues("kategoria4")} kat1={getValues("kategoria1")} kat2={getValues("kategoria2")} kat3={getValues("kategoria3")}/>}
                                    <Select render="productProducent" register={register} errors={errors} value={getValues("producent")}/>
                                    <Input render="productSeria" register={register} errors={errors} value={getValues("seria")}/>
                                    <Input render="productIndex" register={register} errors={errors} value={getValues("index")}/>
                                    <Input render="productDostawca" register={register} errors={errors} value={getValues("dostawca")}/>
                                    <Input render="productNetto" register={register} errors={errors} value={getValues("cenanetto")} setValue={setValue} getValues={getValues}/>
                                    <Input render="productBrutto" register={register} errors={errors} value={getValues("cenabrutto")} setValue={setValue} getValues={getValues}/>
                                    <Input render="productStan" register={register} errors={errors} value={getValues("magazynstan")}/>
                                    <Input render="productAdres" register={register} errors={errors} value={getValues("magazynadres")}/>
                                    <Select render="productMiara" register={register} errors={errors} value={getValues("miara")}/>
                                    <Input render="productDokumentacja" register={register} errors={errors} value={getValues("dokumentacja")}/>
                                    
                                    <div className="flex gap-[1rem]">
                                        <span className={getValues("opis") ? `font-['Material_icons'] text-[#28c76f]` : `font-['Material_icons'] text-[#ed143d]`}>edit</span>
                                        <label className="font-bold whitespace-nowrap">Opis</label>
                                    </div>
                                    <textarea className="h-[20rem] bg-transparent outline-none resize-none" {...register("opis", {/*pattern: ", required: true*/})}/>
 
                                </div>

                                <p className="font-bold text-xl text-[#ffffff] text-center">Parametry</p>

                                <div className="flex flex-col">

                                    <div className="flex gap-[1rem]">

                                        <span className="cursor-pointer text-[#28c76f] text-xl font-['Material_icons']" onClick={() => {(sameIdP && paramValue) ? setValue("parametry", [...getValues("parametry"), {id: sameIdP, value: paramValue}]) : ""; setSameIdP(""); setParamValue(""); navigate(`/produkty/edytuj/${id}`)}}>add</span> 

                                        <select className="w-full font-bold whitespace-nowrap bg-transparent outline-none cursor-pointer appearance-none"
                                            value={sameIdP}
                                            onChange={event => setSameIdP(event.target.value)}>
                                                <option disabled value="">Parametr</option>
                                                {
                                                    store.parameter.map(e =>
                                                    (
                                                        <option key={e.id} value={e.id}>{e.nazwa}</option>
                                                    ))
                                                }
                                        </select>

                                        <input className="w-full bg-transparent outline-none text-center"
                                            value={paramValue}
                                            placeholder="..."
                                            onChange={event => setParamValue(event.target.value)}/>

                                    </div>

                                    {getValues("parametry")?.map((x, i) =>
                                    (
                                        <div className="flex gap-[1rem]" key={x.id}>
                                            
                                            <span className="cursor-pointer text-[#ed143d] text-xl font-['Material_icons']" onClick={() => {setValue("parametry", [...getValues("parametry").filter(l => l.id !== x.id)]); navigate(`/produkty/edytuj/${id}`)}}>delete</span> 
                                            <p className="font-bold">{store.parameter.find(l => l.id === x.id).nazwa}</p>
                                            <p className="">{getValues(`parametry.[${i}].value`)}</p>

                                        </div>
                                    ))}

                                </div>

                                <p className="font-bold text-xl text-[#ffffff] text-center">Powiązania</p>

                                <div className="flex flex-col">

                                    <div className="flex gap-[1rem]">

                                        <span className="cursor-pointer text-[#28c76f] text-xl font-['Material_icons']" onClick={() => {sameId ? setValue("powiazania", [...getValues("powiazania"), {id: sameId}]) : ""; setSameId(""); navigate(`/produkty/edytuj/${id}`)}}>add</span> 

                                        <select className="w-full font-bold whitespace-nowrap bg-transparent outline-none cursor-pointer appearance-none"
                                            value={sameId}
                                            onChange={event => setSameId(event.target.value)}>
                                                <option disabled value="">Produkt</option>
                                                {
                                                    store.product.map(e =>
                                                    (
                                                        <option key={e.id} value={e.id}>{e.nazwa}</option>
                                                    ))
                                                }
                                        </select>

                                    </div>

                                    {getValues("powiazania")?.map(x =>
                                    (
                                        <div className="flex gap-[1rem]" key={x.id}>
                                            
                                            <span className="cursor-pointer text-[#ed143d] text-xl font-['Material_icons']" onClick={() => {setValue("powiazania", [...getValues("powiazania").filter(l => l.id !== x.id)]); navigate(`/produkty/edytuj/${id}`)}}>delete</span> 
                                            <p className="font-bold">{store.product.find(l => l.id === x.id).nazwa}</p>

                                        </div>
                                    ))}

                                </div>

                            </>
                        }





































                        {type === "order" && 
                            <>
                                <div className="flex flex-col">
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Id</p>
                                        <p className="">{getValues("id")}</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Użytkownik</p>
                                        <p className="">{getValues("iduser")}</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Zlecenie</p>
                                        <p className="">{getValues("idtask")}</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Status</p>
                                        <p className={color}>{getValues("status")}</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Dodano</p>
                                        <p className="">{getValues("createdAt") ? useTimestamp(getValues("createdAt")) : " | "}</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Edytowano</p>
                                        <p className="">{getValues("editedAt") ? useTimestamp(getValues("editedAt")) : " | "}</p>
                                    </div>
                                </div>

                                <p className="font-bold text-xl text-[#ffffff] text-center">Dane</p>

                                <div className="flex flex-col">
 
                                    <Select render="orderStatus" register={register} errors={errors} value={getValues("status")}/>   
                                    <Input render="orderWZ" register={register} errors={errors} value={getValues("WZ")}/>
                                    <Input render="orderFV" register={register} errors={errors} value={getValues("FV")}/>
                                    <Input render="orderDostawa" register={register} errors={errors} value={getValues("dostawa")}/>
                                    <Input render="orderZaplata" register={register} errors={errors} value={getValues("zaplata")}/>
 
                                </div>

                                <p className="font-bold text-xl text-[#ffffff] text-center">Paczkomat</p>

                                <div className="flex flex-col">

                                    <Input render="paczkomat" register={register} errors={errors} value={getValues("paczkomat")}/>

                                </div>

                                <p className="font-bold text-xl text-[#ffffff] text-center">Kurier</p>

                                <div className="flex flex-col">
  
                                    <Input render="kurierimie" register={register} errors={errors} value={getValues("kurierimie")}/>
                                    <Input render="kuriernazwisko" register={register} errors={errors} value={getValues("kuriernazwisko")}/>
                                    <Input render="kurierulicainumer" register={register} errors={errors} value={getValues("kurierulicainumer")}/>
                                    <Input render="kuriermiejscowosc" register={register} errors={errors} value={getValues("kuriermiejscowosc")}/>
                                    <Input render="kurierkodpocztowy" register={register} errors={errors} value={getValues("kurierkodpocztowy")}/>

                                </div>

                                <p className="font-bold text-xl text-[#ffffff] text-center">Faktura</p>

                                <div className="flex flex-col">

                                    <Input render="fakturanazwa" register={register} errors={errors} value={getValues("fakturanazwa")}/>
                                    <Input render="fakturanip" register={register} errors={errors} value={getValues("fakturanip")}/>
                                    <Input render="fakturaulicainumer" register={register} errors={errors} value={getValues("fakturaulicainumer")}/>
                                    <Input render="fakturamiejscowosc" register={register} errors={errors} value={getValues("fakturamiejscowosc")}/>
                                    <Input render="fakturakodpocztowy" register={register} errors={errors} value={getValues("fakturakodpocztowy")}/>

                                </div>

                                <p className="font-bold text-xl text-[#ffffff] text-center">Produkty</p>

                                <div className="flex flex-col gap-[2rem]">
                                    {getValues("produkty")?.map((e, i) =>
                                    (
                                        <div className="flex flex-col" key={e.id}>
                                            <div className="flex gap-[1rem] cursor-pointer" onClick={() => navigate(`/produkty/edytuj/${e.id}`)}>
                                                <p className="font-bold">#{i+1}</p>
                                                {e.status === "wystawiony" && <p className="font-['Material_icons'] text-[#00cfe8]">settings</p>}
                                                {e.status === "niedostępny" && <p className="font-['Material_icons'] text-[#dcde43]">settings</p>}
                                                {e.status === "wystawiony" && <p className="text-[#00cfe8]">{e.status}</p>}
                                                {e.status === "niedostępny" && <p className="text-[#dcde43]">{e.status}</p>}
                                            </div>
                                            <img width="100px" height="100px" src={e.zdjecie}/>
                                            <div className="flex gap-[1rem]">
                                                <p className="font-bold">Nazwa</p>
                                                <p className="">{e.nazwa}</p>
                                            </div>
                                            <div className="flex gap-[1rem]">
                                                <p className="font-bold">Ilość</p>
                                                <p className="">{e.ilosc}</p>
                                            </div>
                                            <div className="flex gap-[1rem]">
                                                <p className="font-bold">Rabat</p>
                                                <p className="">{e.rabat ? `${e.rabat} %` : `-`}</p>
                                            </div>
                                            <div className="flex gap-[1rem]">
                                                <p className="font-bold">Cena netto</p>
                                                <p className="">{e.cenanetto} zł | {e.cenanetto*e.ilosc} zł</p>
                                            </div>
                                            <div className="flex gap-[1rem]">
                                                <p className="font-bold">Cena brutto</p>
                                                <p className="">{e.cenabrutto} zł | {e.cenabrutto*e.ilosc} zł</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </>
                        }



















                        {type === "task" && 
                            <>
                                <div className="flex flex-col">
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Id</p>
                                        <p className="">{getValues("id")}</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Użytkownik</p>
                                        <p className="">{getValues("iduser")}</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Status</p>
                                        <p className={color}>{getValues("status")}</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Weryfikacja (zlecenie)</p>
                                        <p className={getValues("isZlecenie") ? `font-['Material_icons'] text-[#28c76f]` : `font-['Material_icons'] text-[#ed143d]`}>task</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Potwierdzenie (klient)</p>
                                        <p className={getValues("isZlecenieDoneK") ? `font-['Material_icons'] text-[#28c76f]` : `font-['Material_icons'] text-[#ed143d]`}>done</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Potwierdzenie (instalator)</p>
                                        <p className={getValues("isZlecenieDoneI") ? `font-['Material_icons'] text-[#28c76f]` : `font-['Material_icons'] text-[#ed143d]`}>done</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Dodano</p>
                                        <p className="">{getValues("createdAt") ? useTimestamp(getValues("createdAt")) : " | "}</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Edytowano</p>
                                        <p className="">{getValues("editedAt") ? useTimestamp(getValues("editedAt")) : " | "}</p>
                                    </div>
                                </div>

                                <p className="font-bold text-xl text-[#ffffff] text-center">Dane</p>

                                <div className="flex flex-col">
 
                                    <Select render="statusTask" register={register} errors={errors} value={getValues("status")}/> 
                                    <Select render="isZlecenie" register={register} errors={errors} value={getValues("isZlecenie")}/>    
                                    <Input render="taskNR" register={register} errors={errors} value={getValues("NR")}/> 
                                    <Input render="taskTelefon" register={register} errors={errors} value={getValues("telefon")} readOnly/>
                                    <Input render="taskNazwa" register={register} errors={errors} value={getValues("nazwa")}/> 
                                    <Input render="taskTyp" register={register} errors={errors} value={getValues("typ")} readOnly/>
                                    <Input render="taskRodzaj" register={register} errors={errors} value={getValues("rodzaj")} readOnly/>
                                    <Input render="taskRodzajInne" register={register} errors={errors} value={getValues("rodzajInne")} readOnly/>
                                    <Input render="taskObiekt" register={register} errors={errors} value={getValues("obiekt")} readOnly/>
                                    <Input render="taskObiektInne" register={register} errors={errors} value={getValues("obiektInne")} readOnly/>
                                    <Input render="taskWojewodztwo" register={register} errors={errors} value={getValues("wojewodztwo")}/>
                                    <Input render="taskMiejsce" register={register} errors={errors} value={getValues("miejsce")}/>
                                    <Input render="taskData" register={register} errors={errors} value={getValues("data")} readOnly/>
                                    <div className="flex gap-[1rem]">
                                        <span className={getValues("opis") ? `font-['Material_icons'] text-[#28c76f]` : `font-['Material_icons'] text-[#ed143d]`}>edit</span>
                                        <label className="font-bold whitespace-nowrap">Opis</label>
                                    </div>
                                    <textarea className="h-[20rem] bg-transparent outline-none resize-none" {...register("opis", {/*pattern: ", required: true*/})}/>
 
                                </div>

                                <p className="font-bold text-xl text-[#ffffff] text-center">Instalator</p>

                                {getValues("worker") && <div className="flex flex-col gap-[2rem]">

                                    <div className="flex flex-col">
                                        <div className="flex gap-[1rem]">
                                            <p className="font-bold">Instalator</p>
                                            <p className="">{store.user?.find(o => o.id === getValues("worker.id")).email}</p>
                                        </div>

                                        <div className="flex gap-[1rem]">
                                            <p className="font-bold">Telefon</p>
                                            <p className="">{getValues("worker.telefon")}</p>
                                        </div>

                                        <div className="flex gap-[1rem]">
                                            <p className="font-bold">Wiadomość</p>
                                            <p className="">{getValues("worker.msg")}</p>
                                        </div>

                                        <div className="flex gap-[1rem]">
                                            <p className="font-bold">Kwota</p>
                                            <p className="">{getValues("worker.price")} zł</p>
                                        </div>
                                    </div>

                                </div>}

                                <p className="font-bold text-xl text-[#ffffff] text-center">Oferty</p>

                                {getValues("installer")?.length > 0 && <div className="flex flex-col gap-[2rem]">

                                    {getValues("installer")?.map((e, i) =>
                                        <div key={i} className="flex flex-col">
                                            <div className="flex gap-[1rem]">
                                                <p className="font-bold">Instalator</p>
                                                <p className="">{store.user?.find(o => o.id === e.id).email}</p>
                                            </div>

                                            <div className="flex gap-[1rem]">
                                                <p className="font-bold">Telefon</p>
                                                <p className="">{e.telefon}</p>
                                            </div>

                                            <div className="flex gap-[1rem]">
                                                <p className="font-bold">Wiadomość</p>
                                                <p className="">{e.msg}</p>
                                            </div>

                                            <div className="flex gap-[1rem]">
                                                <p className="font-bold">Kwota</p>
                                                <p className="">{e.price} zł</p>
                                            </div>
                                        </div>
                                    )}

                                </div>}

                                <p className="font-bold text-xl text-[#ffffff] text-center">Czat</p>

                                {getValues("chat")?.length > 0 && <div className="flex flex-col">

                                    {getValues("chat")?.map((x, i) =>
                                        <div key={i} className="flex flex-col">
                                            <div className="flex gap-[1rem]">
                                                <p className={store.user.find(o => o.id === x.writer).status === "instalator" ? "font-bold text-[#dcde43]" : "font-bold text-[#00cfe8]"}>{store.user.find(o => o.id === x.writer).status === "instalator" ? "Instalator:" : "Klient:"}</p>
                                                <p className="">{x.msg}</p>
                                            </div>
                                        </div>
                                    )}

                                </div>}

                                <p className="font-bold text-xl text-[#ffffff] text-center">Produkty</p>

                                {getValues("produkty")?.length > 0 && getValues("produkty")?.map((o, i) => <>
                                    {i > 0 && <span className="h-[1px] w-full bg-[#ffffff40]"></span>}
                                    <div className="flex flex-col items-start w-full" key={o.id}>
                                        <img width="100px" height="100px" src={o.zdjecie}/>
                                        <div className="flex gap-[1rem]">
                                            <p className="font-bold">Nazwa</p>
                                            <p className="">{o.nazwa}</p>
                                        </div>
                                        <div className="flex gap-[1rem]">
                                            <p className="font-bold">Ilość</p>
                                            <p className="">{o.ilosc}</p>
                                        </div>
                                        <div className="flex gap-[1rem]">
                                            <p className="font-bold">Rabat</p>
                                            <p className="">{o.rabat ? `${o.rabat} %` : `-`}</p>
                                        </div>
                                        <div className="flex gap-[1rem]">
                                            <p className="font-bold">Cena netto</p>
                                            <p className="">{o.cenanetto} zł | {o.cenanetto*o.ilosc} zł</p>
                                        </div>
                                        <div className="flex gap-[1rem]">
                                            <p className="font-bold">Cena brutto</p>
                                            <p className="">{o.cenabrutto} zł | {o.cenabrutto*o.ilosc} zł</p>
                                        </div>
                                    </div>
                                </>)}

                                <p className="font-bold text-xl text-[#ffffff] text-center">Zamówione</p>

                                {list?.map(o => <>
                                    <div className="flex flex-col items-start w-full" key={o.id}>
                                        <img width="100px" height="100px" src={o.zdjecie}/>
                                        <div className="flex gap-[1rem]">
                                            <p className="font-bold">Nazwa</p>
                                            <p className="">{o.nazwa}</p>
                                        </div>
                                        <div className="flex gap-[1rem]">
                                            <p className="font-bold">Ilość</p>
                                            <p className="">{o.ilosc}</p>
                                        </div>
                                        <div className="flex gap-[1rem]">
                                            <p className="font-bold">Rabat</p>
                                            <p className="">{o.rabat ? `${o.rabat} %` : `-`}</p>
                                        </div>
                                        <div className="flex gap-[1rem]">
                                            <p className="font-bold">Cena netto</p>
                                            <p className="">{o.cenanetto} zł | {o.cenanetto*o.ilosc} zł</p>
                                        </div>
                                        <div className="flex gap-[1rem]">
                                            <p className="font-bold">Cena brutto</p>
                                            <p className="">{o.cenabrutto} zł | {o.cenabrutto*o.ilosc} zł</p>
                                        </div>
                                    </div>
                                </>)}

                                <p className="font-bold text-xl text-[#ffffff] text-center">Robocizna</p>

                                <div className="flex flex-col justify-start w-full">
                                    {store.task?.find(o => o.id === getValues("id"))?.robocizna?.map((x, i) => !x.isDone &&
                                        <div key={i} className="flex gap-[.5rem]">
                                            {x.isOkay && <p className="font-['Material_icons'] text-[#28c76f] cursor-pointer">done</p>}
                                            {!x.isOkay && <p className="font-['Material_icons'] text-[#ed143d] cursor-pointer">close</p>}
                                            <p>{x.name}</p>
                                            <p className="text-white italic">{x.price} zł</p>
                                        </div>
                                    )}
                                </div>

                                <p className="flex gap-[.5rem] text-left w-full font-bold">SUMA<p className="text-white italic">{store.task?.find(o => o.id === id)?.robocizna?.reduce((total, item) => (item.isDone !== true && item.isOkay === true) ? total+(Number(item.price)) : total, 0).toFixed(2)} zł</p></p>

                                <p className="font-bold text-xl text-[#ffffff] text-center">Zapłacone</p>

                                <div className="flex flex-col justify-start w-full">
                                    {store.task?.find(o => o.id === getValues("id"))?.robocizna?.map((x, i) => x.isDone &&
                                        <div key={i} className="flex gap-[.5rem]">
                                            <p className="font-['Material_icons'] text-[#28c76f] cursor-pointer">done</p>
                                            <p>{x.name}</p>
                                            <p className="text-white italic">{x.price} zł</p>
                                        </div>
                                    )}
                                </div>

                                <p className="flex gap-[.5rem] text-left w-full font-bold">SUMA<p className="text-white italic">{store.task?.find(o => o.id === id)?.robocizna?.reduce((total, item) => item.isDone === true ? total+(Number(item.price)) : total, 0).toFixed(2)} zł</p></p>

                            </>
                        }













                            {type === "work" && 
                            <>
                                <div className="flex flex-col">
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Id</p>
                                        <p className="">{getValues("id")}</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Użytkownik</p>
                                        <p className="">{getValues("iduser")}</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Zlecenie</p>
                                        <p className="">{getValues("idtask")}</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Status</p>
                                        <p className={color}>{getValues("status")}</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Dodano</p>
                                        <p className="">{getValues("createdAt") ? useTimestamp(getValues("createdAt")) : " | "}</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Edytowano</p>
                                        <p className="">{getValues("editedAt") ? useTimestamp(getValues("editedAt")) : " | "}</p>
                                    </div>
                                </div>

                                <p className="font-bold text-xl text-[#ffffff] text-center">Dane</p>

                                <div className="flex flex-col">
 
                                    <Select render="orderStatus" register={register} errors={errors} value={getValues("status")}/>   
                                    <Input render="orderWZ" register={register} errors={errors} value={getValues("WZ")}/>
                                    <Input render="orderFV" register={register} errors={errors} value={getValues("FV")}/>
                                    <Input render="orderDostawa" register={register} errors={errors} value={getValues("dostawa")}/>
                                    <Input render="orderZaplata" register={register} errors={errors} value={getValues("zaplata")}/>
 
                                </div>

                                <p className="font-bold text-xl text-[#ffffff] text-center">Paczkomat</p>

                                <div className="flex flex-col">

                                    <Input render="paczkomat" register={register} errors={errors} value={getValues("paczkomat")}/>

                                </div>

                                <p className="font-bold text-xl text-[#ffffff] text-center">Kurier</p>

                                <div className="flex flex-col">
  
                                    <Input render="kurierimie" register={register} errors={errors} value={getValues("kurierimie")}/>
                                    <Input render="kuriernazwisko" register={register} errors={errors} value={getValues("kuriernazwisko")}/>
                                    <Input render="kurierulicainumer" register={register} errors={errors} value={getValues("kurierulicainumer")}/>
                                    <Input render="kuriermiejscowosc" register={register} errors={errors} value={getValues("kuriermiejscowosc")}/>
                                    <Input render="kurierkodpocztowy" register={register} errors={errors} value={getValues("kurierkodpocztowy")}/>

                                </div>

                                <p className="font-bold text-xl text-[#ffffff] text-center">Faktura</p>

                                <div className="flex flex-col">

                                    <Input render="fakturanazwa" register={register} errors={errors} value={getValues("fakturanazwa")}/>
                                    <Input render="fakturanip" register={register} errors={errors} value={getValues("fakturanip")}/>
                                    <Input render="fakturaulicainumer" register={register} errors={errors} value={getValues("fakturaulicainumer")}/>
                                    <Input render="fakturamiejscowosc" register={register} errors={errors} value={getValues("fakturamiejscowosc")}/>
                                    <Input render="fakturakodpocztowy" register={register} errors={errors} value={getValues("fakturakodpocztowy")}/>

                                </div>

                                <p className="font-bold text-xl text-[#ffffff] text-center">Produkty</p>

                                <div className="flex flex-col gap-[2rem]">
                                    {getValues("produkty")?.map((e, i) =>
                                    (
                                        <div className="flex flex-col" key={e.id}>
                                            <div className="flex gap-[1rem] cursor-pointer" onClick={() => navigate(`/produkty/edytuj/${e.id}`)}>
                                                <p className="font-bold">#{i+1}</p>
                                                {e.status === "wystawiony" && <p className="font-['Material_icons'] text-[#00cfe8]">settings</p>}
                                                {e.status === "niedostępny" && <p className="font-['Material_icons'] text-[#dcde43]">settings</p>}
                                                {e.status === "wystawiony" && <p className="text-[#00cfe8]">{e.status}</p>}
                                                {e.status === "niedostępny" && <p className="text-[#dcde43]">{e.status}</p>}
                                            </div>
                                            <img width="100px" height="100px" src={e.zdjecie}/>
                                            <div className="flex gap-[1rem]">
                                                <p className="font-bold">Nazwa</p>
                                                <p className="">{e.nazwa}</p>
                                            </div>
                                            <div className="flex gap-[1rem]">
                                                <p className="font-bold">Ilość</p>
                                                <p className="">{e.ilosc}</p>
                                            </div>
                                            <div className="flex gap-[1rem]">
                                                <p className="font-bold">Rabat</p>
                                                <p className="">{e.rabat ? `${e.rabat} %` : `-`}</p>
                                            </div>
                                            <div className="flex gap-[1rem]">
                                                <p className="font-bold">Cena netto</p>
                                                <p className="">{e.cenanetto} zł | {e.cenanetto*e.ilosc} zł</p>
                                            </div>
                                            <div className="flex gap-[1rem]">
                                                <p className="font-bold">Cena brutto</p>
                                                <p className="">{e.cenabrutto} zł | {e.cenabrutto*e.ilosc} zł</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                
                                <p className="font-bold text-xl text-[#ffffff] text-center">Robocizna</p>

                                <div className="flex flex-col justify-start w-full">
                                    {getValues("robocizna")?.map((x, i) => x.isDone &&
                                        <div key={i} className="flex gap-[.5rem]">
                                            <p className="font-['Material_icons'] text-[#28c76f] cursor-pointer">done</p>
                                            <p>{x.name}</p>
                                            <p className="text-white italic">{x.price} zł</p>
                                        </div>
                                    )}
                                </div>

                                <p className="flex gap-[.5rem] text-left w-full font-bold">SUMA<p className="text-white italic">{getValues("robocizna")?.reduce((total, item) => item.isDone === true ? total+(Number(item.price)) : total, 0).toFixed(2)} zł</p></p>

                            </>
                        }











































                        {type === "article" && 
                            <>
                                <div className="flex flex-col">
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Id</p>
                                        <p className="">{getValues("id")}</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Status</p>
                                        <p className={color}>{getValues("status")}</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Dodano</p>
                                        <p className="">{getValues("createdAt") ? useTimestamp(getValues("createdAt")) : " | "}</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Edytowano</p>
                                        <p className="">{getValues("editedAt") ? useTimestamp(getValues("editedAt")) : " | "}</p>
                                    </div>
                                </div>

                                <p className="font-bold text-xl text-[#ffffff] text-center">Dane</p>
                                
                                <div className="flex flex-col">

                                    <Select render="articleStatus" register={register} errors={errors} value={getValues("status")}/>   
                                    <Input render="articleNazwa" register={register} errors={errors} value={getValues("nazwa")}/>
                                    <div className="flex gap-[1rem]">
                                        <span className={getValues("opis") ? `font-['Material_icons'] text-[#28c76f]` : `font-['Material_icons'] text-[#ed143d]`}>edit</span>
                                        <label className="font-bold whitespace-nowrap">Opis</label>
                                    </div>
                                    <textarea className="h-[20rem] bg-transparent outline-none resize-none" {...register("opis", {/*pattern: ", required: true*/})}/>

                                </div>
                            </>
                        }

















                        {type === "parameter" && 
                            <>
                                <div className="flex flex-col">
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Id</p>
                                        <p className="">{getValues("id")}</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Dodano</p>
                                        <p className="">{getValues("createdAt") ? useTimestamp(getValues("createdAt")) : " | "}</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Edytowano</p>
                                        <p className="">{getValues("editedAt") ? useTimestamp(getValues("editedAt")) : " | "}</p>
                                    </div>
                                </div>

                                <p className="font-bold text-xl text-[#ffffff] text-center">Dane</p>

                                <div className="flex flex-col">
 
                                    <Input render="parameterNazwa" register={register} errors={errors} value={getValues("nazwa")}/>

                                </div>
                            </>
                        }





                        {type === "producer" && 
                            <>
                                <div className="flex flex-col">
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Id</p>
                                        <p className="">{getValues("id")}</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Dodano</p>
                                        <p className="">{getValues("createdAt") ? useTimestamp(getValues("createdAt")) : " | "}</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Edytowano</p>
                                        <p className="">{getValues("editedAt") ? useTimestamp(getValues("editedAt")) : " | "}</p>
                                    </div>
                                </div>

                                <p className="font-bold text-xl text-[#ffffff] text-center">Dane</p>

                                <div className="flex flex-col">
 
                                    <Input render="producerNazwa" register={register} errors={errors} value={getValues("nazwa")}/>

                                </div>
                            </>
                        }










                        {type === "category" && 
                            <>
                                <div className="flex flex-col">
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Id</p>
                                        <p className="">{getValues("id")}</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Dodano</p>
                                        <p className="">{getValues("createdAt") ? useTimestamp(getValues("createdAt")) : " | "}</p>
                                    </div>
                                    <div className="flex gap-[1rem]">
                                        <p className="font-bold">Edytowano</p>
                                        <p className="">{getValues("editedAt") ? useTimestamp(getValues("editedAt")) : " | "}</p>
                                    </div>
                                </div>

                                <p className="font-bold text-xl text-[#ffffff] text-center">Dane</p>

                                <div className="flex flex-col">
 
                                    <Input render="producerNazwa" register={register} errors={errors} value={getValues("nazwa")}/>
                                    <Select render="productKategoria" register={register} errors={errors} value={getValues("kategoria")} getValues={getValues}/> 
                                    {watch("kategoria") === "kategoria2" && <Select render="categoryKategoria1" register={register} errors={errors} value={getValues("kategoria1")} kat1={getValues("kategoria1")} kat2={getValues("kategoria2")} kat3={getValues("kategoria3")}/>}
                                    {watch("kategoria") === "kategoria3" && <Select render="categoryKategoria1" register={register} errors={errors} value={getValues("kategoria1")} kat1={getValues("kategoria1")} kat2={getValues("kategoria2")} kat3={getValues("kategoria3")}/>}
                                    {watch("kategoria") === "kategoria4" && <Select render="categoryKategoria1" register={register} errors={errors} value={getValues("kategoria1")} kat1={getValues("kategoria1")} kat2={getValues("kategoria2")} kat3={getValues("kategoria3")}/>}
                                    {watch("kategoria") === "kategoria3" && watch("kategoria1") && <Select render="categoryKategoria2" register={register} errors={errors} value={getValues("kategoria2")} kat1={getValues("kategoria1")} kat2={getValues("kategoria2")} kat3={getValues("kategoria3")}/>}
                                    {watch("kategoria") === "kategoria4" && watch("kategoria1") && <Select render="categoryKategoria2" register={register} errors={errors} value={getValues("kategoria2")} kat1={getValues("kategoria1")} kat2={getValues("kategoria2")} kat3={getValues("kategoria3")}/>}
                                    {watch("kategoria") === "kategoria4" && watch("kategoria2") && <Select render="categoryKategoria3" register={register} errors={errors} value={getValues("kategoria3")} kat1={getValues("kategoria1")} kat2={getValues("kategoria2")} kat3={getValues("kategoria3")}/>}

                                </div>
                            </>
                        }











                </form>

                <form id="formDelete" onSubmit={del}></form>

                <div className="fixed overflow-auto right-0 bottom-[0] flex flex-col gap-[2rem] p-[2rem] w-[595px] h-[300px] bg-[#00000040] shadow-[inset_0_0_5rem_0_#123456] border-[#000000] border-[.1rem] rounded-[2rem] backdrop-blur-[.3rem]">
                    <div className="flex items-center justify-center h-full gap-[2rem] flex-wrap text-center">
                        <Link className="p-[1rem] w-full bg-transparent shadow-[inset_0_0_5rem_0_#ffffff40] border-[#000000] border-[.1rem] rounded-[1rem] duration-[.5s] hover:text-[#ffffff]" to={`${url}?${createSearchParams(param)}`}>Zamknij</Link>
                        <button className="p-[1rem] w-full bg-transparent shadow-[inset_0_0_5rem_0_#de8d43] border-[#000000] border-[.1rem] rounded-[1rem] duration-[.5s] hover:text-[#ffffff]" form="formEdit">Edytuj</button>
                        <button className="p-[1rem] w-full bg-transparent shadow-[inset_0_0_5rem_0_#ed143d] border-[#000000] border-[.1rem] rounded-[1rem] duration-[.5s] hover:text-[#ffffff]" form="formDelete">Usuń</button>
                        {render === "order" && <button className="p-[1rem] w-full bg-transparent shadow-[inset_0_0_5rem_0_#7367f0] border-[#000000] border-[.1rem] rounded-[1rem] duration-[.5s] hover:text-[#ffffff]" onClick={handlePrintFV}>Drukuj FV</button>}
                        {render === "order" && <button className="p-[1rem] w-full bg-transparent shadow-[inset_0_0_5rem_0_#7367f0] border-[#000000] border-[.1rem] rounded-[1rem] duration-[.5s] hover:text-[#ffffff]" onClick={handlePrintOF}>Drukuj OF</button>}
                        {render === "order" && <button className="p-[1rem] w-full bg-transparent shadow-[inset_0_0_5rem_0_#7367f0] border-[#000000] border-[.1rem] rounded-[1rem] duration-[.5s] hover:text-[#ffffff]" onClick={handlePrintOFR}>Drukuj OFR</button>}
                    </div>
                </div>

                <div style={{ display: "none" }}>
                    <div ref={refFV}>
                        <PrintFV id={id}/>
                    </div>
                </div>

                <div style={{ display: "none" }}>
                    <div ref={refOF}>
                        <PrintOF id={id}/>
                    </div>
                </div>

                <div style={{ display: "none" }}>
                    <div ref={refOFR}>
                        <PrintOFR id={id}/>
                    </div>
                </div>
        </>
    )
}