import { useState } from "react";
import { GeneralObject, GeneralObjectFunction } from "../types/general";

const useForm = (defVals: GeneralObject, onSubmitCallback: GeneralObjectFunction) => {
    const [values, setValues] = useState(defVals);

    const onChange = (e: any) => {
        setValues((prevVals) => {
            const newVals = { ...prevVals };
            newVals[e.target.name] = e.target.value;
            setValues(newVals);
        });
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        onSubmitCallback(values);
    }

    return {
        values,
        onChange,
        onSubmit,
    }
}

export default useForm;