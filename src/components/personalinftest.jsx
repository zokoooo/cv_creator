import { useEffect, useState, useRef } from "react"
import useInput from "../hooks/useInput"

export default function PersInf( { onChange }) {

    const [countSymbols, setCountSymbols] = useState(0);
    const [valueTextArea, setValueTextArea] = useState('');

    //Использование кастомного хука useInput для всех input-ов
    const firstname = useInput('');
    const lastname = useInput('');
    const location = useInput('');
    const phonenumber = useInput('');
    const email = useInput('', /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);

    useEffect(firstname.useEffect, [firstname.value]);
    useEffect(lastname.useEffect, [lastname.value]);
    useEffect(location.useEffect, [location.value]);
    useEffect(phonenumber.useEffect, [phonenumber.value]);
    useEffect(email.useEffect, [email.value]);

    const handleHandData = (event) => {
        onChange({
            value: event.target.value,
            name: event.target.name
        });
    }

    const handleOnChange = (event) => {
        handleHandData(event);

    }

    return (<div className="personal_information section">
                <p className="title_form">Personal Information</p>

                {['firstname', 'lastname', 'location', 'phonenumber', 'email'].map((key) => <input></input>)}

                <div className="text_area">
                    <textarea 
                    maxLength="2000" 
                    name="description" 
                    type="text" 
                    placeholder="Description" 
                    onChange={(e) => {setValueTextArea(e.target.value); setCountSymbols(e.target.value.length)}} 
                    value={valueTextArea}/>
                    <p className="max_text">max: 2000 ({countSymbols})</p>
                </div>

            </div>)
}