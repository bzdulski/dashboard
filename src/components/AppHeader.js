import { Href } from "./Href"

export const AppHeader = () => {
    return ( 
        <header className="p-[2rem] fixed h-full bg-[#00000040] shadow-[inset_0_0_5rem_0_#561234] border-[#000000] border-[.1rem] rounded-[2rem] backdrop-blur-[.3rem] z-[100]">

            <nav className="flex flex-col justify-between h-full gap-[2rem]">

                <Href render="logo"/>

                <div className="flex flex-col gap-[1rem] h-full">

                    <Href render="start"/>
                    <Href render="uzytkownicy"/>
                    <Href render="produkty"/>
                    <Href render="zamowienia"/>
                    <Href render="zlecenia"/>
                    <Href render="robocizna"/>
                    <Href render="aktualnosci"/>
                    <Href render="kategorie"/>
                    <Href render="producenci"/>
                    <Href render="parametry"/>
                    <Href render="logi"/>

                </div>

                <div className="flex flex-col gap-[1rem]">

                    <Href render="konto"/>
                    <Href render="logout"/>

                </div>

            </nav>

        </header>
    )
}