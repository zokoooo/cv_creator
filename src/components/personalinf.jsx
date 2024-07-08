import { useCallback, useState } from "react"

export default function PersInf({ data }) {

    let [personalData, setPersonalData] = useState({
        firstname: '',
        lastname: '',
        location: '',
        phonenumber: '',
        email: '',
        description: ''
    })

    const handle = useCallback((e) => {
        const { name, value } = e.target;
        setPersonalData((prevPersonalData) => {
            const nextPersonalData = {...prevPersonalData, [name]: value};
            data(nextPersonalData);
            return nextPersonalData;
        });
    });                 

    return (<div className="personal_information section">
                <p className="title_form">Personal Information</p>
                <input name="firstname" type="text" placeholder="Fisrt name" onChange={handle}/>
                <input name="lastname" type="text" placeholder="Last name" onChange={handle}/>
                <input name="location" type="text" placeholder="Location" onChange={handle}/>
                <input name="phonenumber" type="text" placeholder="Phone number" onChange={handle}/>
                <input name="email" type="text" placeholder="Email" onChange={handle}/>
                <textarea name="description" type="text" placeholder="Description" onChange={handle}/>
            </div>)
}