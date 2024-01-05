
import { useSearchParams } from "react-router-dom"
import { useAddParam } from "../hooks/useAddParam"
import { useDeleteParam } from "../hooks/useDeleteParam"
import { useResetParam } from "../hooks/useResetParam"
import { useStore } from "../zustand.config"

export const Button = ({ render, rRender }) => {
    const store = useStore()
    const [param, setParam] = useSearchParams()

    let classButton, type, text, onClick

    switch(render) {
        case "login": 
        {
            classButton = "p-[1rem] w-full bg-transparent shadow-[inset_0_0_5rem_0_#561234] border-[#000000] border-[.1rem] rounded-[1rem] duration-[.5s] hover:text-[#ffffff]",
            type = "submit",
            text = "Zaloguj się";
            break 
        }
        case "reset": 
        {
            classButton = "font-['Material_Icons'] leading-none cursor-pointer text-xl text-[#ffffff]",
            type = "button",
            text = "autorenew",
            onClick = () => useResetParam(param, setParam);
            break 
        }
        case "descasc": 
        {
            classButton = "font-['Material_Icons'] cursor-pointer text-[#ffffff]",
            type = "button",
            text = param.get("sort") ? "expand_less" : "expand_more",
            onClick = () => param.get("sort") ? useDeleteParam(param, setParam, "sort") : useAddParam(param, setParam, "sort", "sort");
            break 
        }
        case "download": 
        {
            classButton = "font-['Material_Icons'] cursor-pointer text-[#7367f0]",
            type = "button",
            text = "download",
            onClick = () => store.download(rRender);
            break 
        }
        case "fakeAdd": 
        {
            classButton = "font-['Material_Icons'] cursor-pointer text-[#ed143d]",
            type = "button",
            text = "add";
            break 
        }
    }

    return ( 
        <button className={classButton} 
            type={type}
            onClick={onClick}>
            {text}
        </button>
    )
}