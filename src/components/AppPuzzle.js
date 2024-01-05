import { Length } from "./Length"

export const AppPuzzle = ({ render }) => {
    return ( 
        <>

            {[`user`].includes(render) &&
                <>
                    <Length render="użytkownik"/>
                    <Length render="admin"/>
                    <Length render="instalator"/>
                    <Length render="klient"/>
                    <Length render="isListTrue"/>
                    <Length render="isListFalse"/>
                    <Length render="isZweryfikowanyTrue"/>
                    <Length render="isZweryfikowanyFalse"/>
                </>
            }

            {[`product`].includes(render) &&
                <>
                    <Length render="produkt"/>
                    <Length render="wystawiony"/>
                    <Length render="niedostępny"/>
                </>
            }

            {[`order`].includes(render) &&
                <>
                    <Length render="zamówienie"/>
                    <Length render="nowe"/>
                    <Length render="zakończone"/>
                    <Length render="zapłacone"/>
                    <Length render="nieopłacone"/>
                    <Length render="wygasłe"/>
                    <Length render="fakturaTrue"/>
                    <Length render="fakturaFalse"/>
                </>
            }

            {[`work`].includes(render) &&
                <>
                    <Length render="robocizna"/>
                </>
            }

            {[`task`].includes(render) &&
                <>
                    <Length render="zlecenie"/>
                    <Length render="noweZ"/>
                    <Length render="zakończoneZ"/>
                    {/* <Length render="realizowaneZ"/> */}
                    <Length render="podjęteZ"/>
                    <Length render="anulowaneZ"/>
                    <Length render="zlecenieTrue"/>
                    <Length render="zlecenieFalse"/>
                </>
            }

            {[`article`].includes(render) &&
                <>
                    <Length render="aktualnosci"/>
                    <Length render="aktualne"/>
                    <Length render="przestarzałe"/>
                </>
            }

            {[`category`].includes(render) &&
                <Length render="kategoria"/>
            }

            {[`producer`].includes(render) &&
                <Length render="producent"/>
            }
            
            {[`parameter`].includes(render) &&
                <Length render="parametry"/>
            }

        </>
    )
}