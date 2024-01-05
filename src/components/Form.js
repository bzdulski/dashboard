import { useStore } from "../zustand.config"

export const Form = ({ render, handleSubmit, children }) => {
    const store = useStore()
    let classForm = "flex flex-col items-center gap-[2rem] m-auto p-[2rem] w-full max-w-[30rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] border-[#000000] border-[.1rem] rounded-[2rem] backdrop-blur-[.3rem]"
    let onSubmit

    switch(render) {
        case "login": { onSubmit = handleSubmit(event => store.login(event)); break }
    }

    return ( 
        <form className={classForm} 
            onSubmit={onSubmit} 
            noValidate>
            {children}
        </form>
    )
}