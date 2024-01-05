import { useStore } from "../zustand.config"
import { useDate } from "../hooks/useDate"
import { useNewDate } from "../hooks/useNewDate"

export const PrintOFR = ({ id }) => {
    const store = useStore()   

    if(id === null) {
        return null
    }

    return ( 
        <div className="w-[100%] p-[2rem] bg-[#ffffff] text-[#000000]">

            <div className="flex mb-[5rem]">

                <div className="w-[50%]">

                <p className="text-2xl leading-none font-bold text-[#000000] text-center">Dashboard</p>

                </div>

                <div className="flex flex-col w-[50%]">

                    <p className="_print-text-title">Data wystawienia oferty</p>
                    <p className="_print-text">{useDate()}</p>
                    <p className="_print-text-title">Oferta ważna do</p>
                    <p className="_print-text">{useNewDate()}</p>

                </div>

            </div>

            <p className="font-bold text-center">Oferta</p>

            <div className="flex justify-between bg-[lightgray] text-center p-[1rem]">

                <p className="_print-text-120">Zdjęcie</p>
                <p className="_print-text-120">Nazwa</p>
                <p className="_print-text-120">Ilość</p>
                <p className="_print-text-120">Rabat</p>
                <p className="_print-text-120">Cena Netto</p>
                <p className="_print-text-120">Cena Brutto</p>

            </div>

            {store.order.find(x => x.id === id)?.produkty.map(e => (

                <div className="flex items-center justify-between text-center p-[1rem] border-[.1rem] border-solid border-[#000000] gap-[1rem]" key={e.id}>

                    <img className="max-w-[100%] max-h-[100%] w-[90px] h-[90px] object-contain" alt={e.nazwa} src={e.zdjecie[0]}/>
                    <p className="_print-text-120">{e.nazwa}</p>
                    <p className="_print-text-120">{e.ilosc}</p>
                    <p className="_print-text-120">{e.rabat ? `${e.rabat} %` : "-"}</p>
                    <p className="_print-text-120">{e.rabat ? ((100-e.rabat)*(e.cenanetto*e.ilosc)/100) : e.cenanetto*e.ilosc} zł</p>
                    <p className="_print-text-120">{e.rabat ? ((100-e.rabat)*(e.cenabrutto*e.ilosc)/100) : e.cenabrutto*e.ilosc} zł</p>

                </div>

            ))}

            <div className="flex flex-col justify-end items-end mt-[5rem] text-center">

                <div className="flex">

                    <p className="_print-text-mr">Suma Netto</p>
                    <p className="_print-text">{store?.reduceOrderProduktyNetto(id)} zł</p>

                </div>

                <div className="flex">

                    <p className="_print-text-mr">Suma Brutto</p>
                    <p className="_print-text">{store?.reduceOrderProduktyBrutto(id)} zł</p>

                </div>

            </div>
            
        </div>
    )
}