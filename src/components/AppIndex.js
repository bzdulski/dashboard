import { useEffect } from "react"
import { Outlet } from "react-router-dom"

import { useStore } from "../zustand.config"
import { AppImage } from "./AppImage"
import { AppLoader } from "./AppLoader"
import { AppHeader } from "./AppHeader"
import { AppMain } from "./AppMain"
import { AppLogin } from "./AppLogin"
import { AppMobile } from "./AppMobile"

export const AppIndex = () => {
    const store = useStore()

    useEffect(() => {
        const timeout = setTimeout(async () => {
            await store.fetch()
          }, 1000)
      
          return () => {
            clearTimeout(timeout)
          }
    }, [])
  
    return(
        <>
            {window.innerHeight <= 768 || window.innerWidth <= 768 ?
                <>
                    <AppImage/>
                    <AppMain render="isLoading">
                        <AppMobile/>
                    </AppMain>
                </>
            :
                store.loading ?
                    <>
                        <AppImage/>
                        <AppMain render="isLoading">
                            <AppLoader/>
                        </AppMain>
                    </>
                :
                    <>
                        {store.auth ?
                            <>
                                <AppImage/>
                                <AppHeader/>
                                <AppMain render="isLoaded">
                                    <Outlet/>
                                </AppMain>
                            </>
                        :
                            <>
                                <AppImage/>
                                <AppMain render="isLoaded">
                                    <AppLogin/>
                                </AppMain>
                            </>
                        }
                    </>  
            }
        </>  
    )
}