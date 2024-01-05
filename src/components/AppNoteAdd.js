import { useStore } from "../zustand.config"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { Link, useParams, useNavigate, createSearchParams, useSearchParams } from "react-router-dom"
import { Input } from "./Input"
import { Href } from "./Href"
import { Select } from "./Select"
import { useTimestamp } from "../hooks/useTimestamp"

export const AppNoteAdd = ({ render }) => {
    const store = useStore()
    const { id } = useParams()
    const [discountName, setDiscountName] = useState("")
    const [discountPrice, setDiscountPrice] = useState("")
    const [sameId, setSameId] = useState("")
    const [sameIdP, setSameIdP] = useState("")
    const [param, setParam] = useSearchParams()
    // const [zdjecieFile, setZdjecieFile] = useState("")
    const navigate = useNavigate()
    const { register, handleSubmit, getValues, setValue, watch, reset, formState: { errors } } = useForm()
    let type, text, url, ev, del

    switch(render) {
        case "user": { type = "user", text = "Użytkownik", url = "/uzytkownicy", ev = handleSubmit(event => store.userUpdate({...event, id: id})), del = handleSubmit(() => {store.userDelete(id); navigate(`/`+"uzytkownicy")}); break }
        case "product": { type = "product", text = "Produkt", url = "/produkty", ev = handleSubmit(event => store.create({doc: "product", data: event, file: zdjecieFile})), del = handleSubmit(() => {store.productDelete(id); navigate(`/`+"produkty")}); break }
        case "order": { type = "order", text = "Zamówienie", url = "/zamowienia", ev = handleSubmit(event => store.orderUpdate({...event, id: id})), del = handleSubmit(() => {store.orderDelete(id); navigate(`/`+"zamowienia")}); break }
        case "category": { type = "category", text = "Kategoria", url = "/kategorie", ev = handleSubmit(event => store.create({doc: "category", data: event})); break }
        case "producer": { type = "producer", text = "Producent", url = "/producenci", ev = handleSubmit(event => store.create({doc: "producer", data: event})); break }
        case "article": { type = "article", text = "Aktualność", url = "/aktualnosci", ev = handleSubmit(event => store.create({doc: "article", data: event})); break }
        case "parameter": { type = "parameter", text = "Parametry", url = "/parametry", ev = handleSubmit(event => store.create({doc: "parameter", data: event})); break }
    }

    const [zdjecieFile, setZdjecieFile] = useState([]);

    const handleImageUpload = (event) => {
      const files = Array.from(event.target.files);
      setZdjecieFile(files);
    };
  
    const moveImageToFirst = (index) => {
        console.log(index)
      const image = zdjecieFile[index];
      const updatedImages = [image, ...zdjecieFile.filter((_, i) => i !== index)];
      setZdjecieFile(updatedImages);
    };

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
        case "wygasłe": { color = `text-[#ed143d]`; break }
    }

    return (
<>
                    <form className="fixed overflow-auto right-0 top-0 bottom-[320px] flex flex-col gap-[2rem] p-[2rem] w-[595px] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] border-[#000000] border-[.1rem] rounded-[2rem] backdrop-blur-[.3rem]"
                        id="formEdit" onSubmit={ev} noValidate>

                        <p className="font-bold text-xl text-[#ffffff] text-center">{text}</p>

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
                                        <label className="cursor-pointer text-[#28c76f] font-['Material_icons']" htmlFor="zdjecia">
                                        add
                                        </label>
                                        <input
                                        className="hidden"
                                        id="zdjecia"
                                        type="file"
                                        {...register("zdjecie")}
                                        multiple="multiple"
                                        onChange={handleImageUpload}
                                        />
                                        <p className="font-bold">Zdjęcia</p>

                                        <div className="flex flex-wrap justify-center gap-[1rem]">
                                        {zdjecieFile.map((image, index) => (
                                            <div key={index} className="flex flex-col gap-[.5rem]">
                                            <img className="max-w-[100%] max-h-[100%] w-[90px] h-[90px] object-contain" src={URL.createObjectURL(image)} />
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
                                    </div>

                                {/* <div className="flex flex-col gap-[1rem]">

                                    <div className="flex gap-[1rem]">
                                    <label className="cursor-pointer text-[#28c76f] font-['Material_icons']" htmlFor="zdjecia">add</label>
                                    <input className="hidden" id="zdjecia" type="file" {...register("zdjecie")} multiple="multiple" onChange={event => {setZdjecieFile([event.target.files[0], event.target.files[1], event.target.files[2], event.target.files[3], event.target.files[4]]); setValue("zdjecie", [event.target.files[0] ? URL.createObjectURL(event.target.files[0]) : "", event.target.files[1] ? URL.createObjectURL(event.target.files[1]) : "", event.target.files[2] ? URL.createObjectURL(event.target.files[2]) : "", event.target.files[3] ? URL.createObjectURL(event.target.files[3]) : "", event.target.files[4] ? URL.createObjectURL(event.target.files[4]) : ""])}}/>
                                    <p className="font-bold">Zdjęcia</p>


                                    <div className="flex flex-wrap justify-center gap-[1rem]">

                                        {getValues("zdjecie.[0]") && <img className="max-w-[100%] max-h-[100%] w-[90px] h-[90px] object-contain" src={getValues("zdjecie.[0]")}/>}
                                        {!getValues("zdjecie.[0]") && <label className="font-['Material_icons'] text-[90px] leading-none opacity-[50%]">image</label>}

                                        {getValues("zdjecie.[1]") && <img className="max-w-[100%] max-h-[100%] w-[90px] h-[90px] object-contain" src={getValues("zdjecie.[1]")}/>}
                                        {!getValues("zdjecie.[1]") && <label className="font-['Material_icons'] text-[90px] leading-none opacity-[50%]">image</label>}

                                        {getValues("zdjecie.[2]") && <img className="max-w-[100%] max-h-[100%] w-[90px] h-[90px] object-contain" src={getValues("zdjecie.[2]")}/>}
                                        {!getValues("zdjecie.[2]") && <label className="font-['Material_icons'] text-[90px] leading-none opacity-[50%]">image</label>}

                                        {getValues("zdjecie.[3]") && <img className="max-w-[100%] max-h-[100%] w-[90px] h-[90px] object-contain" src={getValues("zdjecie.[3]")}/>}
                                        {!getValues("zdjecie.[3]") && <label className="font-['Material_icons'] text-[90px] leading-none opacity-[50%]">image</label>}

                                        {getValues("zdjecie.[4]") && <img className="max-w-[100%] max-h-[100%] w-[90px] h-[90px] object-contain" src={getValues("zdjecie.[4]")}/>}
                                        {!getValues("zdjecie.[4]") && <label className="font-['Material_icons'] text-[90px] leading-none opacity-[50%]">image</label>}

                                    </div>

                                </div> */}

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
                                    <Input render="productNetto" register={register} errors={errors} setValue={setValue} getValues={getValues}/>
                                    <Input render="productBrutto" register={register} errors={errors} setValue={setValue} getValues={getValues}/>
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

                                        {/* <span className="cursor-pointer text-[#28c76f] text-xl font-['Material_icons']" onClick={() => {sameIdP ? setValue("parametry", [...getValues("parametry"), {id: sameIdP}]) : ""; setSameIdP(""); navigate(`/produkty/dodaj`)}}>add</span>  */}
                                        <span className="cursor-pointer text-[#ed143d] text-xl font-['Material_icons']">add</span> 

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

                                    </div>

                                    {getValues("parametry")?.map(x =>
                                    (
                                        <div className="flex gap-[1rem]" key={x.id}>
                                            
                                            <span className="cursor-pointer text-[#ed143d] text-xl font-['Material_icons']" onClick={() => {setValue("parametry", [...getValues("parametry").filter(l => l.id !== x.id)]); navigate(`/produkty/dodaj`)}}>delete</span> 
                                            <p className="font-bold">{store.parameter.find(l => l.id === x.id).name}</p>

                                        </div>
                                    ))}

                                </div>

                                <p className="font-bold text-xl text-[#ffffff] text-center">Powiązania</p>

                                <div className="flex flex-col">

                                    <div className="flex gap-[1rem]">

                                        {/* <span className="cursor-pointer text-[#28c76f] text-xl font-['Material_icons']" onClick={() => {sameId ? setValue("powiazania", [...getValues("powiazania"), {id: sameId}]) : ""; setSameId(""); navigate("/produkty/dodaj")}}>add</span>  */}
                                        <span className="cursor-pointer text-[#ed143d] text-xl font-['Material_icons']">add</span> 

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
                                            <span className="cursor-pointer text-[#ed143d] text-xl font-['Material_icons']" onClick={() => {setValue("powiazania", [...getValues("powiazania").filter(l => l.id !== x.id)]); navigate("/produkty/dodaj")}}>delete</span> 
                                            <p className="font-bold">{store.product.find(l => l.id === x.id).nazwa}</p>

                                        </div>
                                    ))}

                                </div>

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
                                    <Select render="productKategoria" register={register} errors={errors} setValue={setValue} reset={reset}/> 
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
                        <button className="p-[1rem] w-full bg-transparent shadow-[inset_0_0_5rem_0_#28c76f] border-[#000000] border-[.1rem] rounded-[1rem] duration-[.5s] hover:text-[#ffffff]" form="formEdit">Dodaj</button>
                        {/* <button className="p-[1rem] w-full bg-transparent shadow-[inset_0_0_5rem_0_#ed143d] border-[#000000] border-[.1rem] rounded-[1rem] duration-[.5s] hover:text-[#ffffff]" form="formDelete">Usuń</button> */}
                        {/* <button className="p-[1rem] w-full bg-transparent shadow-[inset_0_0_5rem_0_#7367f0] border-[#000000] border-[.1rem] rounded-[1rem] duration-[.5s] hover:text-[#ffffff]" onClick={() => handlePrint()}>Drukuj</button> */}
                    </div>
                </div>
        </>
    )
}