import { useSearchParams } from "react-router-dom";
import { useAddParam } from "../hooks/useAddParam"
import { useDeleteParam } from "../hooks/useDeleteParam"

export const Input = ({ render, register, errors, value, setValue, getValues, readOnly }) => {
    const [param, setParam] = useSearchParams()
    let classContainer = `relative` 
    let classInput = `p-[.7rem] w-[20rem] bg-transparent shadow-[inset_0_0_1rem_0_#123456] border-[#123456] border-[.1rem] rounded-[1rem] duration-[.5s] outline-none focus:shadow-[inset_0_0_1rem_0_#561234] focus:border-[#561234] peer`
    let classCheckbox = `ml-[.7rem]`
    let classLabel = `absolute p-[.7rem] duration-[.5s] pointer-events-none peer-focus:text-[#ffffff] peer-focus:translate-y-[-40px] peer-valid:text-[#ffffff] peer-valid:translate-y-[-40px]`
    let classLabelReadOnly = `absolute p-[.7rem] left-[0] duration-[.5s] pointer-events-none text-[#ffffff] translate-y-[-40px]`
    let classError = `absolute top-[3.3rem] right-[0] text-[#ed143d]`
    let classSearch = `w-[300px] p-[12px] bg-[#00000040] border-[2px] border-solid border-[#123456] rounded-[10px] duration-[.5s] shadow-[inset_0_0_1rem_0_#123456] outline-none focus:shadow-[inset_0_0_1rem_0_#561234] focus:border-[2px] focus:border-solid focus:border-[#561234]`
    let type, input, label, pattern, required, placeholder

    switch(render) {
        case "search": { type = "text", placeholder = "Wyszukiwanie..."; break}
        case "email": { type = "text", input = "email", label = "Email", required = "Niepoprawny email!"; break}
        case "password": { type = "password", input = "password", label = "Hasło", required = "Niepoprawne hasło!"; break}
        case "telefon": { type = "text", input = "telefon", label = "Telefon", required = "Niepoprawny telefon!"; break}
        case "imie": { type = "text", input = "imie", label = "Imię", required = "Niepoprawne imię!"; break}
        case "nazwisko": { type = "text", input = "nazwisko", label = "Nazwisko", required = "Niepoprawne nazwisko!"; break}
        case "nazwa": { type = "text", input = "nazwa", label = "Nazwa", required = "Niepoprawna nazwa!"; break}
        case "nip": { type = "text", input = "nip", label = "Nip", required = "Niepoprawny nip!"; break}
        case "ulicainumer": { type = "text", input = "ulicainumer", label = "Ulica i numer", required = "Niepoprawna ulica i numer!"; break}
        case "miejscowosc": { type = "text", input = "miejscowosc", label = "Miejscowość", required = "Niepoprawna miejscowość!"; break}
        case "kodpocztowy": { type = "text", input = "kodpocztowy", label = "Kod pocztowy", required = "Niepoprawny kod pocztowy!"; break}
        case "koszyk": { type = "text", input = "koszyk.nazwa", label = "Nazwa", required = "Niepoprawna nazwa!"; break}
        case "kurierimie": { type = "text", input = "kurierimie", label = "Imię", required = "Niepoprawne imię!"; break}
        case "kuriernazwisko": { type = "text", input = "kuriernazwisko", label = "Nazwisko", required = "Niepoprawne nazwisko!"; break}
        case "kurierulicainumer": { type = "text", input = "kurierulicainumer", label = "Ulica i numer", required = "Niepoprawna ulica i numer!"; break}
        case "kuriermiejscowosc": { type = "text", input = "kuriermiejscowosc", label = "Miejscowość", required = "Niepoprawna miejscowość!"; break}
        case "kurierkodpocztowy": { type = "text", input = "kurierkodpocztowy", label = "Kod pocztowy", required = "Niepoprawny kod pocztowy!"; break}
        case "paczkomat": { type = "text", input = "paczkomat", label = "Numer paczkomatu", required = "Niepoprawny paczkomat!"; break}
        case "fakturanazwa": { type = "text", input = "fakturanazwa", label = "Nazwa", required = "Niepoprawna nazwa!"; break}
        case "fakturanip": { type = "text", input = "fakturanip", label = "Nip", required = "Niepoprawny nip!"; break}
        case "fakturaulicainumer": { type = "text", input = "fakturaulicainumer", label = "Ulica i numer", required = "Niepoprawna ulica i numer!"; break}
        case "fakturamiejscowosc": { type = "text", input = "fakturamiejscowosc", label = "Miejscowość", required = "Niepoprawna miejscowość!"; break}
        case "fakturakodpocztowy": { type = "text", input = "fakturakodpocztowy", label = "Kod pocztowy", required = "Niepoprawny kod pocztowy!"; break}
        case "isList": { type = "checkbox", input = "isList", label = "List"; break}
        case "isZweryfikowany": { type = "checkbox", input = "isZweryfikowany", label = "Zweryfikowany"; break}
        case "productNazwa": { type = "text", input = "nazwa", label = "Nazwa", required = "Niepoprawna nazwa!"; break}
        case "productSeria": { type = "text", input = "seria", label = "Seria", required = "Niepoprawna seria!"; break}
        case "productIndex": { type = "text", input = "index", label = "Index", required = "Niepoprawny index!"; break}
        case "productDostawca": { type = "text", input = "dostawca", label = "Dostawca", required = "Niepoprawny dostawca!"; break}
        case "productNetto": { type = "text", input = "cenanetto", label = "Cena netto", required = "Niepoprawna cena netto!"; break}
        case "productBrutto": { type = "text", input = "cenabrutto", label = "Cena brutto", required = "Niepoprawna cena brutto!"; break}
        case "productStan": { type = "text", input = "magazynstan", label = "Magazyn stan", required = "Niepoprawny stan!"; break}
        case "productAdres": { type = "text", input = "magazynadres", label = "Magazyn adres", required = "Niepoprawny adres!"; break}
        case "productDokumentacja": { type = "text", input = "dokumentacja", label = "Dokumentacja", required = "Niepoprawna dokumentacja!"; break}
        case "orderWZ": { type = "text", input = "WZ", label = "WZ", required = "Niepoprawny WZ!"; break}
        case "orderFV": { type = "text", input = "FV", label = "FV", required = "Niepoprawna FV!"; break}
        case "orderDostawa": { type = "text", input = "dostawa", label = "dostawa", required = "Niepoprawna dostawa!"; break}
        case "orderZaplata": { type = "text", input = "zaplata", label = "zaplata", required = "Niepoprawna zaplata!"; break}
        case "articleNazwa": { type = "text", input = "nazwa", label = "Nazwa", required = "Niepoprawna nazwa!"; break}
        case "parameterNazwa": { type = "text", input = "nazwa", label = "Nazwa", required = "Niepoprawna nazwa!"; break}
        case "producerNazwa": { type = "text", input = "nazwa", label = "Nazwa", required = "Niepoprawna nazwa!"; break}
        case "taskNazwa": { type = "text", input = "nazwa", label = "Nazwa", required = "Niepoprawna nazwa!"; break}
        case "taskNR": { type = "text", input = "NR", label = "NR", required = "Niepoprawny NR!"; break}
        case "taskTyp": { type = "text", input = "typ", label = "Typ", required = "Niepoprawny typ!"; break}
        case "taskRodzaj": { type = "text", input = "rodzaj", label = "Rodzaj", required = "Niepoprawny rodzaj!"; break}
        case "taskObiekt": { type = "text", input = "obiekt", label = "Obiekt", required = "Niepoprawny obiekt!"; break}
        case "taskRodzajInne": { type = "text", input = "rodzajInne", label = "Rodzaj Inne", required = "Niepoprawny rodzaj!"; break}
        case "taskObiektInne": { type = "text", input = "obiektInne", label = "Obiekt Inne", required = "Niepoprawny obiekt!"; break}
        case "taskWojewodztwo": { type = "text", input = "wojewodztwo", label = "Województwo", required = "Niepoprawne wojewdództwo!"; break}
        case "taskMiejsce": { type = "text", input = "miejsce", label = "Miejsce", required = "Niepoprawne miejsce!"; break}
        case "tasknazwa": { type = "text", input = "nazwa", label = "Nazwa", required = "Niepoprawne nazwa!"; break}
        case "taskData": { type = "text", input = "data", label = "Data", required = "Niepoprawne data!"; break}
        case "taskTelefon": { type = "text", input = "telefon", label = "Telefon", required = "Niepoprawny telefon!"; break}
    }

    return ( 
        <div className="flex gap-[1rem]">

            {[`taskMiejsce`, `taskData`, `taskNazwa`, `taskTelefon`, `taskWojewodztwo`, `taskObiektInne`, `taskRodzajInne`, `taskObiekt`, `taskRodzaj`, `taskTyp`, `taskNazwa`, `taskNR`, `telefon`, `imie`, `nazwisko`, `nazwa`, `nip`, `ulicainumer`, `miejscowosc`, `kodpocztowy`, `productNazwa`, `productSeria`, `productIndex`, `productDostawca`, `productStan`, `productAdres`, `productDokumentacja`, `orderWZ`, `orderFV`, `orderDostawa`, `orderZaplata`, `kurierimie`, `kuriernazwisko`, `kurierulicainumer`, `kuriermiejscowosc`, `kurierkodpocztowy`, `paczkomat`, `fakturanazwa`, `fakturanip`, `fakturaulicainumer`, `fakturamiejscowosc`, `fakturakodpocztowy`, `articleNazwa`, `parameterNazwa`, `producerNazwa`].includes(render) &&
                <>
                    <span className={value ? `font-['Material_icons'] text-[#28c76f]` : `font-['Material_icons'] text-[#ed143d]`}>edit</span>
                    <p className="font-bold whitespace-nowrap">{label}</p>
                    <input className="w-full bg-transparent outline-none"
                        type={type} 
                        pattern={pattern} 
                        required={required} 
                        readOnly={readOnly} 
                        {...register(input, {/*pattern: "", required: required*/})}/>

                    {errors[input] && 
                        <div className={classError}>
                            {errors[input].message}
                        </div>
                    }
                </>
            }

            {[`koszyk`].includes(render) &&
                <>
                    <span className={value ? `font-['Material_icons'] text-[#28c76f]` : `font-['Material_icons'] text-[#ed143d]`}>edit</span>
                    <p className="font-bold whitespace-nowrap">{label}</p>
                    <input className="w-full bg-transparent outline-none"
                        type={type} 
                        pattern={pattern} 
                        required={required} 
                        readOnly={true} 
                        {...register(input, {/*pattern: "", required: required*/})}/>

                    {errors[input] && 
                        <div className={classError}>
                            {errors[input].message}
                        </div>
                    }
                </>
            }

            {[`search`].includes(render) &&
                <input className={classSearch}
                    type={type} 
                    placeholder={placeholder}
                    value={param.get("search") ? param.get("search") : ""} 
                    onChange={(event) => event.target.value === "" ? useDeleteParam(param, setParam, "search") : useAddParam(param, setParam, "search", event.target.value)}/>
            }

            {[`productNetto`].includes(render) &&
                <>
                    <span className={value ? `font-['Material_icons'] text-[#28c76f]` : `font-['Material_icons'] text-[#ed143d]`}>edit</span>
                    <p className="font-bold whitespace-nowrap">{label}</p>
                    <input className="w-full bg-transparent outline-none"
                        type={type} 
                        pattern={pattern} 
                        required={required} 
                        readOnly={readOnly} 
                        {...register(input, {onChange: () => setValue("cenabrutto", (getValues("cenanetto") * 1.23).toFixed(2)) })}/>

                    {errors[input] && 
                        <div className={classError}>
                            {errors[input].message}
                        </div>
                    }
                </>
            }

            {[`productBrutto`].includes(render) &&
                <>
                    <span className={value ? `font-['Material_icons'] text-[#28c76f]` : `font-['Material_icons'] text-[#ed143d]`}>edit</span>
                    <p className="font-bold whitespace-nowrap">{label}</p>
                    <input className="w-full bg-transparent outline-none"
                        type={type} 
                        pattern={pattern} 
                        required={required} 
                        readOnly={readOnly} 
                        {...register(input, {onChange: () => setValue("cenanetto", (getValues("cenabrutto") / 1.23).toFixed(2)) })}/>

                    {errors[input] && 
                        <div className={classError}>
                            {errors[input].message}
                        </div>
                    }
                </>
            }




{/* `email`, `password`, `telefon`, `imie`, `nazwisko`, `nazwa`, `nip`, `ulicainumer`, `miejscowosc`, `kodpocztowy`, `koszyk`, `kurierimie`, `kuriernazwisko`, `kurierulicainumer`, `kuriermiejscowosc`, `kurierkodpocztowy`, `paczkomat`, `fakturanazwa`, `fakturanip`, `fakturaulicainumer`, `fakturamiejscowosc`, `fakturakodpocztowy` */}
            {[`email`, `password`].includes(render) &&
                <>
                    <input className={classInput} 
                        type={type} 
                        pattern={pattern} 
                        required={required} 
                        readOnly={readOnly} 
                        {...register(input, {/*pattern: "", required: required*/})}/>
        
                    <label className={readOnly ? classLabelReadOnly : classLabel}>
                        {label}
                    </label>

                    {errors[input] && 
                        <div className={classError}>
                            {errors[input].message}
                        </div>
                    }
                </>
            }

            {[`isList`, `isZweryfikowany`].includes(render) &&
                <>
                    <input className={classCheckbox} 
                        type={type} 
                        pattern={pattern} 
                        required={required} 
                        readOnly={readOnly} 
                        {...register(input, {/*pattern: "", required: required*/})}/>
        
                    <label className={classLabelReadOnly}>
                        {label}
                    </label>
                </>
            }

        </div>  
    )
}