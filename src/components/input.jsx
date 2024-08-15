import { useEffect } from "react";
import useInput from "../hooks/useInput";

export default function Input( { onChange, regex, ...props } ) {

    let hookInput = useInput('', regex);

    useEffect(hookInput.useEffect, [hookInput.useEffect])

    return (
        <input 
        onChange={(event) => {hookInput.onChange(event); onChange(event)}}
        onBlur={hookInput.onBlur}
        style={hookInput.isDirty && !hookInput.isValid ? {borderColor: 'red'} : {borderColor: 'white'}}
        className={hookInput.isDirty && !hookInput.isValid ? 'error_input' : ''}
        {...props}></input>
    )
}