import { BrowserRouter, Routes, Route } from "react-router-dom"

import { AppIndex } from "./AppIndex"
import { AppHome } from "./AppHome"
import { AppPage } from "./AppPage"
import { AppError } from "./AppError"

export const AppRouter = () => 
{
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<AppIndex/>}>

              <Route path="/" element={<AppHome/>}/>

              <Route path="/uzytkownicy" element={<AppPage render="user"/>}/>
              <Route path="/uzytkownicy/edytuj/:id" element={<AppPage render="user"/>}/>
              
              <Route path="/produkty" element={<AppPage render="product"/>}/>
              <Route path="/produkty/dodaj" element={<AppPage render="product"/>}/>
              <Route path="/produkty/edytuj/:id" element={<AppPage render="product"/>}/>

              <Route path="/zamowienia" element={<AppPage render="order"/>}/>
              <Route path="/zamowienia/edytuj/:id" element={<AppPage render="order"/>}/>

              <Route path="/zlecenia" element={<AppPage render="task"/>}/>
              <Route path="/zlecenia/edytuj/:id" element={<AppPage render="task"/>}/>

              <Route path="/robocizna" element={<AppPage render="work"/>}/>
              <Route path="/robocizna/edytuj/:id" element={<AppPage render="work"/>}/>

              <Route path="/aktualnosci" element={<AppPage render="article"/>}/>
              <Route path="/aktualnosci/dodaj" element={<AppPage render="article"/>}/>
              <Route path="/aktualnosci/edytuj/:id" element={<AppPage render="article"/>}/>

              <Route path="/kategorie" element={<AppPage render="category"/>}/>
              <Route path="/kategorie/dodaj" element={<AppPage render="category"/>}/>
              <Route path="/kategorie/edytuj/:id" element={<AppPage render="category"/>}/>

              <Route path="/producenci" element={<AppPage render="producer"/>}/>
              <Route path="/producenci/dodaj" element={<AppPage render="producer"/>}/>
              <Route path="/producenci/edytuj/:id" element={<AppPage render="producer"/>}/>

              <Route path="/parametry" element={<AppPage render="parameter"/>}/>
              <Route path="/parametry/dodaj" element={<AppPage render="parameter"/>}/>
              <Route path="/parametry/edytuj/:id" element={<AppPage render="parameter"/>}/>

              <Route path="*" element={<AppError/>}/>
              
            </Route>
        </Routes>
    </BrowserRouter>
  )
}