import { useDispatch } from "react-redux";
import useInput from "../hooks/useInput";

export default function Input({ regex, ...props }) {
    const dispatch = useDispatch();
    const hookInput = useInput('', regex);

    return (
        <input
            onChange={(event) => {
                hookInput.onChange(event);
                dispatch({
                    type: 'SET_' + props.name.toUpperCase(),
                    payload: event.target.value,
                });
            }}
            onBlur={hookInput.onBlur}
            style={hookInput.isDirty && !hookInput.isValid ? { borderColor: 'red' } : { borderColor: 'white' }}
            className={hookInput.isDirty && !hookInput.isValid ? 'error_input' : ''}
            {...props}
        />
    );
}
