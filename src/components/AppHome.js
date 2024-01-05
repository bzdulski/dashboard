import { AppDash } from "./AppDash"

export const AppHome = () => {
    return ( 
        <div className="flex flex-col m-auto gap-[1rem]">

            <AppDash render="user"/>
            <AppDash render="product"/>
            <AppDash render="order"/>
            <AppDash render="task"/>
            <AppDash render="work"/>
            <AppDash render="article"/>
            <AppDash render="category"/>
            <AppDash render="producer"/>
            <AppDash render="parameter"/>
  
      </div>
    )
}