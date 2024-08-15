import { useState } from "react";

export default function useInput(initialValue = '', regex = null) {
    let [value, setValue] = useState(initialValue);
    let [isDirty, setIsDirty] = useState(false);
    let [isValid, setIsValid] = useState(false);

    // С помощью useEffect проверяем условие
    const useEffect = () => {
        if (regex === null) {
            switch (value.length) {
                case 0:
                    setIsValid(false);
                    break;
                default:
                    setIsValid(true);
                    break;
            }
        } else {
            switch (regex.test(value)) {
                case true:
                    setIsValid(true);
                    break;
                default:
                    setIsValid(false);
                    break;
            }
        }
        
    }

    // Обновляем состояние value при изменении
    const onChange = (event) => {
        setValue(event.target.value);
    }

    // Обновляем состояние isDirty при выходе из фокуса 
    const onBlur = (event) => {
        setIsDirty(true);
    };

    const resetInput = (event) => {
        setValue('');
    }

    return {
        value,
        isDirty,
        isValid,
        onChange,
        onBlur,
        useEffect,
        resetInput
    }
}