import { useForm } from "react-hook-form"

import { useStore } from "../zustand.config"
import { Form } from "./Form"
import { Input } from "./Input"
import { Button } from "./Button"

export const AppLogin = () => {
    const store = useStore()
    const { register, handleSubmit, formState: { errors } } = useForm()

    return ( 
        <Form render="login" handleSubmit={handleSubmit}>

            <h1 className="text-xl font-bold text-[#ffffff]">Logowanie</h1>

            <div className="flex flex-col items-center gap-[2rem] mt-[2rem] mb-[2rem] w-full">

                <Input render="email" register={register} errors={errors}/>
                <Input render="password" register={register} errors={errors}/>  

            </div>

            <Button render="login"/>
            {store.error && <div className="text-[#ed143d]">{store.error}</div>}

        </Form>
    )
}