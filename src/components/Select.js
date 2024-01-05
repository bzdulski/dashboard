import { useStore } from "../zustand.config"

export const Select = ({ render, register, errors, value, setValue, getValues, reset, readOnly, kat1, kat2, kat3 }) => {
    const store = useStore()
    let classContainer = `relative` 
    let classSelect = `w-full whitespace-nowrap bg-transparent outline-none cursor-pointer appearance-none`
    // let classSelect = `appearance-none p-[.7rem] w-[20rem] bg-transparent shadow-[inset_0_0_1rem_0_#123456] border-[#123456] border-[.1rem] rounded-[1rem] duration-[.5s] outline-none focus:shadow-[inset_0_0_1rem_0_#561234] focus:border-[#561234] peer`
    let classLabel = `absolute p-[.7rem] left-[0] duration-[.5s] pointer-events-none peer-focus:text-[#ffffff] peer-focus:translate-y-[-40px] peer-valid:text-[#ffffff] peer-valid:translate-y-[-40px]`
    let classLabelReadOnly = `absolute p-[.7rem] left-[0] duration-[.5s] pointer-events-none text-[#ffffff] translate-y-[-40px]`
    let select, label, cat, required

    switch(render) {
        case "statusUser": { select = "status", label = "Status"; break}
        case "statusProduct": { select = "status", label = "Status"; break}
        case "orderStatus": { select = "status", label = "Status"; break}
        case "articleStatus": { select = "status", label = "Status"; break}
        case "statusOrder": { select = "status", label = "Status"; break}
        case "statusTask": { select = "status", label = "Status"; break}
        case "isZweryfikowany": { select = "isZweryfikowany", label = "Zweryfikowany"; break}
        case "isFirma": { select = "isFirma", label = "Firma"; break}
        case "isList": { select = "isList", label = "List"; break}
        case "isZlecenie": { select = "isZlecenie", label = "Weryfikacja"; break}
        case "productKategoria": { select = "kategoria", label = "Kategoria"; break}
        case "productKategoria1": { select = "kategoria1", label = "Kategoria 1"; break}
        case "productKategoria2": { select = "kategoria2", label = "Kategoria 2"; break}
        case "productKategoria3": { select = "kategoria3", label = "Kategoria 3"; break}
        case "productKategoria4": { select = "kategoria4", label = "Kategoria 4"; break}
        case "categoryKategoria1": { select = "kategoria1", label = "Kategoria 1"; break}
        case "categoryKategoria2": { select = "kategoria2", label = "Kategoria 2"; break}
        case "categoryKategoria3": { select = "kategoria3", label = "Kategoria 3"; break}
        case "categoryKategoria4": { select = "kategoria4", label = "Kategoria 4"; break}
        case "productProducent": { select = "producent", label = "Producent"; break}
        case "productMiara": { select = "miara", label = "Miara"; break}
    }

    return ( 
        <div className={classContainer}>

            {[`statusProduct`, `statusTask`, `statusUser`, `productMiara`, `isZlecenie`, `productKategoria`, `productKategoria1`, `productKategoria2`, `productKategoria3`, `productKategoria4`, `categoryKategoria1`, `categoryKategoria2`, `categoryKategoria3`, `categoryKategoria4`, `productProducent`, `orderStatus`, `articleStatus`].includes(render) &&
                <div className="flex gap-[1rem]">

                    <span className={value ? `font-['Material_icons'] text-[#28c76f]` : `font-['Material_icons'] text-[#ed143d]`}>edit</span>

                    <label className="font-bold whitespace-nowrap">
                        {label}
                    </label>

                    {[`isZlecenie`].includes(render) &&
                        <select className={classSelect} 
                            readOnly={readOnly} 
                            {...register(select, {/*pattern: "",*/ required: required})}>
                                <option value={false}>Nie</option>
                                <option value={true}>Tak</option>
                        </select>
                    } 

                    {[`statusUser`].includes(render) &&
                        <select className={classSelect} 
                            readOnly={readOnly} 
                            {...register(select, {/*pattern: "",*/ required: required})}>
                                <option disabled value="admin">Admin</option>
                                <option value="klient">Klient</option>
                                <option value="instalator">Instalator</option>
                        </select>
                    }

                    {[`statusProduct`].includes(render) &&
                        <select className={classSelect}
                            readOnly={readOnly} 
                            {...register(select, {/*pattern: "",*/ required: required})}>
                                <option value="wystawiony">Wystawiony</option>
                                <option value="niedostępny">Niedostępny</option>
                        </select>
                    }

                    {[`articleStatus`].includes(render) &&
                        <select className={classSelect}
                            readOnly={readOnly} 
                            {...register(select, {/*pattern: "",*/ required: required})}>
                                <option value="aktualne">Aktualne</option>
                                <option value="przestarzałe">Przestarzałe</option>
                        </select>
                    }

                    {[`orderStatus`].includes(render) &&
                        <select className={classSelect}
                            readOnly={readOnly} 
                            {...register(select, {/*pattern: "",*/ required: required})}>
                                <option value="nowe">Nowe</option>
                                <option value="zakończone">Zakończone</option>
                                <option value="zapłacone">Zapłacone</option>
                                <option value="nieopłacone">Nieopłacone</option>
                                <option value="expired">Wygasłe</option>
                        </select>
                    }

                    {[`statusTask`].includes(render) &&
                        <select className={classSelect}
                            readOnly={readOnly} 
                            {...register(select, {/*pattern: "",*/ required: required})}>
                                <option value="nowe">Nowe</option>
                                <option value="zakończone">Zakończone</option>
                                {/* <option value="realizowane">Realizowane</option> */}
                                <option value="podjęte">Podjęte</option>
                                <option value="anulowane">Anulowane</option>
                        </select>
                    }

                    {[`productKategoria`].includes(render) &&
                        <select className={classSelect}
                            readOnly={readOnly}
                            {...register(select, {/*pattern: "",*/ required: required}, {onChange: (x) => {setValue("kategoria", x.target.value)}})}>
                                <option value="kategoria1">Kategoria 1</option>
                                <option value="kategoria2">Kategoria 2</option>
                                <option value="kategoria3">Kategoria 3</option>
                                <option value="kategoria4">Kategoria 4</option>
                        </select>
                    }

                    {[`productKategoria1`].includes(render) &&
                        <select className={classSelect}
                            readOnly={readOnly}
                            {...register(select, {/*pattern: "",*/ required: required})}>
                                <option value=""></option>
                                {[].concat(store.category)?.sort((a, b) => a.nazwa > b.nazwa ? 1 : -1)?.map(e => e.kategoria === "kategoria1" &&
                                (
                                    <option key={e.id} value={e.nazwa}>{e.nazwa}</option>
                                ))}
                        </select>
                    }

                {[`productKategoria2`].includes(render) &&
                        <select className={classSelect}
                            readOnly={readOnly}
                            {...register(select, {/*pattern: "",*/ required: required})}>
                                <option value=""></option>
                                {[].concat(store.category)?.sort((a, b) => a.nazwa > b.nazwa ? 1 : -1)?.map(e => e.kategoria === "kategoria2" && e.kategoria1 === kat1 && 
                                (
                                    <option key={e.id} value={e.nazwa}>{e.nazwa}</option>
                                ))}
                        </select>
                    }

                    {[`productKategoria3`].includes(render) &&
                        <select className={classSelect}
                            readOnly={readOnly} 
                            {...register(select, {/*pattern: "",*/ required: required})}>
                                <option value=""></option>
                                {[].concat(store.category)?.sort((a, b) => a.nazwa > b.nazwa ? 1 : -1)?.map(e => e.kategoria === "kategoria3" && e.kategoria2 === kat2 &&
                                (
                                    <option key={e.id} value={e.nazwa}>{e.nazwa}</option>
                                ))}
                        </select>
                    }

                    {[`productKategoria4`].includes(render) &&
                        <select className={classSelect}
                            readOnly={readOnly} 
                            {...register(select, {/*pattern: "",*/ required: required})}>
                                <option value=""></option>
                                {[].concat(store.category)?.sort((a, b) => a.nazwa > b.nazwa ? 1 : -1)?.map(e => e.kategoria === "kategoria4" && e.kategoria3 === kat3 &&
                                (
                                    <option key={e.id} value={e.nazwa}>{e.nazwa}</option>
                                ))}
                        </select>
                    }

                    {[`categoryKategoria1`].includes(render) &&
                        <select className={classSelect}
                            readOnly={readOnly}
                            {...register(select, {/*pattern: "",*/ required: required})}>
                                <option value=""></option>
                                {[].concat(store.category)?.sort((a, b) => a.nazwa > b.nazwa ? 1 : -1)?.map(e => e.kategoria === "kategoria1" &&
                                (
                                    <option key={e.id} value={e.nazwa}>{e.nazwa}</option>
                                ))}
                        </select>
                    }

                {[`categoryKategoria2`].includes(render) &&
                        <select className={classSelect}
                            readOnly={readOnly}
                            {...register(select, {/*pattern: "",*/ required: required})}>
                                <option value=""></option>
                                {[].concat(store.category)?.sort((a, b) => a.nazwa > b.nazwa ? 1 : -1)?.map(e => e.kategoria === "kategoria2" && e.kategoria1 === kat1 &&
                                (
                                    <option key={e.id} value={e.nazwa}>{e.nazwa}</option>
                                ))}
                        </select>
                    }

                    {[`categoryKategoria3`].includes(render) &&
                        <select className={classSelect}
                            readOnly={readOnly} 
                            {...register(select, {/*pattern: "",*/ required: required})}>
                                <option value=""></option>
                                {[].concat(store.category)?.sort((a, b) => a.nazwa > b.nazwa ? 1 : -1)?.map(e => e.kategoria === "kategoria3" && e.kategoria2 === kat2 &&
                                (
                                    <option key={e.id} value={e.nazwa}>{e.nazwa}</option>
                                ))}
                        </select>
                    }

                    {[`categoryKategoria4`].includes(render) &&
                        <select className={classSelect}
                            readOnly={readOnly} 
                            {...register(select, {/*pattern: "",*/ required: required})}>
                                <option value=""></option>
                                {[].concat(store.category)?.sort((a, b) => a.nazwa > b.nazwa ? 1 : -1)?.map(e => e.kategoria === "kategoria4" &&  e.kategoria3 === kat3 &&
                                (
                                    <option key={e.id} value={e.nazwa}>{e.nazwa}</option>
                                ))}
                        </select>
                    }

                    {[`productProducent`].includes(render) &&
                        <select className={classSelect}
                            readOnly={readOnly} 
                            {...register(select, {/*pattern: "",*/ required: required})}>
                                <option value=""></option>
                                {store.producer.map(e => 
                                (
                                    <option key={e.id} value={e.nazwa}>{e.nazwa}</option>
                                ))}
                        </select>
                    }

                    {[`productMiara`].includes(render) &&
                        <select className={classSelect}
                            readOnly={readOnly} 
                            {...register(select, {/*pattern: "",*/ required: required})}>
                                <option value="Sztuka">Sztuka</option>
                                <option value="Metr">Metr</option>
                        </select>
                    }
                    
                </div>
            }

            {[`statusOrder`].includes(render) &&
                <select className={classSelect} 
                    readOnly={readOnly} 
                    {...register(select, {/*pattern: "",*/ required: required})}>
                        <option value="nowe">Nowe</option>
                        <option value="zakończone">Zakończone</option>
                        <option value="nieopłacone">Nieopłacone</option>
                        <option value="expired">Wygasłe</option>
                </select>
            }

            {[`isZweryfikowany`, `isFirma`, `isList`].includes(render) &&
                <select className={classSelect} 
                    readOnly={readOnly} 
                    {...register(select, {/*pattern: "",*/ required: required})}>
                        <option value={false}>Nie</option>
                        <option value={true}>Tak</option>
                </select>
            } 

            {/* <label className={readOnly ? classLabelReadOnly : classLabel}>
                {label}
            </label> */}

        </div>  
    )
}