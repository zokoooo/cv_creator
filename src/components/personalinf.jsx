import { useEffect, useState } from "react"
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
    
    return (<div className="personal_information section">
                <p className="title_form">Personal Information</p>

                <input value={firstname.value} 
                name="firstname"
                type="text" 
                placeholder="Fisrt name" 
                onChange={(event) => {firstname.onChange(event); handleHandData(event)}}
                onBlur={firstname.onBlur} 
                style={firstname.isDirty && !firstname.isValid ? {borderColor: 'red'} : {borderColor: 'white'}} 
                className={firstname.isDirty && !firstname.isValid ? 'error_input' : ''}
                maxLength={30}/>

                <input value={lastname.value} 
                name="lastname"
                type="text" 
                placeholder="Last name" 
                onChange={(event) => {lastname.onChange(event); handleHandData(event)}} 
                onBlur={lastname.onBlur} 
                style={lastname.isDirty && !lastname.isValid ? {borderColor: 'red'} : {borderColor: 'white'}} 
                className={lastname.isDirty && !lastname.isValid ? 'error_input' : ''}
                maxLength={30}/>

                <input value={location.value} 
                name="location" 
                type="text" 
                placeholder="Location" 
                onChange={(event) => {location.onChange(event); handleHandData(event)}} 
                onBlur={location.onBlur} 
                style={location.isDirty && !location.isValid ? {borderColor: 'red'} : {borderColor: 'white'}} 
                className={location.isDirty && !location.isValid ? 'error_input' : ''}
                maxLength={30}/>

                <input value={phonenumber.value} 
                name="phonenumber" 
                type="text" 
                placeholder="Phone number" 
                onChange={(event) => {phonenumber.onChange(event); handleHandData(event)}} 
                onBlur={phonenumber.onBlur} 
                style={phonenumber.isDirty && !phonenumber.isValid ? {borderColor: 'red'} : {borderColor: 'white'}} 
                className={phonenumber.isDirty && !phonenumber.isValid ? 'error_input' : ''}
                maxLength={30}/>

                <input value={email.value} 
                name="email" 
                type="text" 
                placeholder="Email" 
                onChange={(event) => {email.onChange(event); handleHandData(event)}} 
                onBlur={email.onBlur} 
                style={email.isDirty && !email.isValid ? {borderColor: 'red'} : {borderColor: 'white'}} 
                className={email.isDirty && !email.isValid ? 'error_input' : ''}
                maxLength={30}/>

                <div className="text_area">
                    <textarea 
                    maxLength={2000} 
                    name="description" 
                    type="text" 
                    placeholder="Description" 
                    onChange={(event) => {setValueTextArea(event.target.value); setCountSymbols(event.target.value.length); onChange({value: event.target.value, name: "description"})}}
                    value={valueTextArea}/>
                    <p className="max_text">max: 2000 ({countSymbols})</p>
                </div>

            </div>)
}


    // let [personalData, setPersonalData] = useState({
    //     firstname: '',
    //     lastname: '',
    //     location: '',
    //     phonenumber: '',
    //     email: '',
    //     description: ''
    // })

    // const handle = useCallback((e) => {
    //     const { name, value } = e.target;
    //     setPersonalData((prevPersonalData) => {
    //         const nextPersonalData = {...prevPersonalData, [name]: value};
    //         data(nextPersonalData);
    //         return nextPersonalData;
    //     });
    // });                 
