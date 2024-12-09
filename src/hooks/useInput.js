import { useState, useEffect } from "react";

export default function useInput(initialValue = '', regex = null) {
    let [value, setValue] = useState(initialValue);
    let [isDirty, setIsDirty] = useState(false);
    let [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (regex === null) {
            setIsValid(value.length > 0);
        } else {
            setIsValid(regex.test(value));
        }
    }, [value, regex]);

    const onChange = (event) => {
        setValue(event.target.value);
    };

    const onBlur = () => {
        setIsDirty(true);
    };

    const resetInput = () => {
        setValue('');
    };

    return {
        value,
        isDirty,
        isValid,
        onChange,
        onBlur,
        resetInput,
    };
}
