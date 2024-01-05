import { useStore } from "../zustand.config"
import { useDate } from "../hooks/useDate"

export const PrintFV = ({ id }) => {
    const store = useStore()   

    if(id === null) {
        return null
    }

    return ( 
        <div className="w-[100%] p-[2rem] bg-[#ffffff] text-[#000000]">

            <div className="flex mb-[5rem]">

                <div className="flex flex-col w-[50%]">

                     <p className="text-2xl leading-none font-bold text-[#000000] text-center">Dashboard</p>

                </div>

                <div className="flex flex-col w-[50%]">

                    <p className="_print-text-title">Miejsce wystawienia</p>
                    <p className="_print-text">Grójec</p>
                    <p className="_print-text-title">Data wystawienia</p>
                    <p className="_print-text">{useDate()}</p>
                    <p className="_print-text-title">Data sprzedaży</p>
                    <p className="_print-text">{useDate()}</p>

                </div>

            </div>

            <div className="flex mb-[5rem]">
                
                <div className="flex flex-col w-[50%]">

                    <p className="_print-text-title">Sprzedawca</p>
                    <p className="_print-text-left">Dashboard</p>
                    <p className="_print-text-left">NIP: 1234567890</p>
                    <p className="_print-text-left">Złota 12</p>
                    <p className="_print-text-left">02-222 Warszawa</p>

                </div>

                <div className="flex flex-col w-[50%]">

                    <p className="_print-text-title">Nabywca</p>
                    <p className="_print-text-left">{store.order.find(e => e.id === id)?.fakturanazwa}</p>
                    <p className="_print-text-left">NIP: {store.order.find(e => e.id === id)?.fakturanip}</p>
                    <p className="_print-text-left">{store.order.find(e => e.id === id)?.fakturaulica}</p>
                    <p className="_print-text-left">{store.order.find(e => e.id === id)?.fakturakodpocztowy} {store.order.find(e => e.id === id)?.fakturamiejscowosc}</p>

                </div>

            </div>

            <p className="font-bold text-center">Faktura VAT {store.order.find(e => e.id === id)?.FV}</p>

            <div className="flex justify-between bg-[lightgray] text-center p-[1rem]">

                <p className="w-[12rem] truncate text-center">LP</p>
                <p className="w-[12rem] truncate text-center">Nazwa</p>
                <p className="w-[12rem] truncate text-center">Ilość</p>
                <p className="w-[12rem] truncate text-center">Miara</p>
                <p className="w-[12rem] truncate text-center">Cena Netto</p>
                <p className="w-[12rem] truncate text-center">Cena Brutto</p>

            </div>

            {store.order.find(x => x.id === id)?.produkty.map((e, i) => (

                <div className="flex justify-between text-center p-[1rem] border-[.1rem] border-solid border-[#000000]" 
                    key={e.id}>

                    <p className="w-[12rem] truncate text-center">{i+1}</p>
                    <p className="w-[12rem] truncate text-center">{e.nazwa}</p>
                    <p className="w-[12rem] truncate text-center">{e.ilosc}</p>
                    <p className="w-[12rem] truncate text-center">{e.miara}</p>
                    <p className="w-[12rem] truncate text-center">{e.cenanetto*e.ilosc} zł</p>
                    <p className="w-[12rem] truncate text-center">{e.cenabrutto*e.ilosc} zł</p>

                </div>

            ))}

            <div className="flex flex-col justify-end items-end mt-[5rem] text-center">

                <div className="flex mb-[2rem] gap-[.5rem]">

                    <p className="_print-text-mr">Sposób płatności</p>
                    <p className="_print-text">{store.order.find(e => e.id === id)?.zaplata}</p>

                </div>

                <div className="flex mb-[2rem] gap-[.5rem]">

                    <p className="_print-text-mr">Do zapłaty</p>
                    <p className="_print-text">{store.order.find(e => e.id === id)?.produkty.reduce((total, item) => total+(item.cenabrutto * item.ilosc), 0).toFixed(2)} zł</p>

                </div>

            </div>
            
        </div>
    )
}