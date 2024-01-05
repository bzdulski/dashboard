import { useStore } from "../zustand.config"

export const AppFilter = ({ render }) => {
    const store = useStore()

    let number

    switch(render) {
        case "user": { number = 5; break }
        case "product": { number = 5; break }
        case "order": { number = 5; break }
        case "task": { number = 5; break }
        case "work": { number = 1; break }
        case "article": { number = 3; break }
        case "parameter": { number = 2; break }
        case "producer": { number = 2; break }
        case "category": { number = 3; break }
    }

    return (
        <>

            {[...Array(number)].map((e, i) =>
            

                    <select className="font-bold cursor-pointer appearance-none bg-transparent outline-none w-[6.563rem] truncate"
                        key={i}
                        name={i} 
                        value={store.filter[render][i]} 
                        onChange={(event) => store.filterSet(render, event.target.name, event.target.value)}>

                        {store.arrayFilter[render].map(x => 
                            <option className="text-[#000000]" key={x.value} value={x.value}>{x.name}</option>
                        )}

                    </select>

            )}

            {number < 2 && <span className="w-[6.563rem]"></span>}
            {number < 3 && <span className="w-[6.563rem]"></span>}
            {number < 4 && <span className="w-[6.563rem]"></span>}
            {number < 5 && <span className="w-[6.563rem]"></span>}
            
            <p className="font-bold cursor-pointer appearance-none bg-transparent outline-none w-[6.563rem] truncate">Data dodania</p>

        </>
    )
}