import { useEffect, useState } from "react"
import Input from "./input";

export default function PersInf( { onChange, dataInput }) {
    const handleHandData = (event) => {
        onChange({
            value: event.target.value,
            name: event.target.name
        });
    }
    
    return (<div className="personal_information section">
                <p className="title_form">Personal Information</p>

                <Input 
                value={dataInput.firstname === null ? '' : dataInput.firstname} 
                name="firstname"
                type="text" 
                placeholder="Fisrt name"
                onChange={handleHandData}
                maxLength={30}/>

                <Input
                value={dataInput.lastname === null ? '' : dataInput.lastname}
                name="lastname"
                type="text"
                placeholder="Last name"
                onChange={handleHandData}
                maxLength={30}/>

                <Input
                value={dataInput.location === null ? '' : dataInput.location}
                name="location"
                type="text"
                placeholder="Location"
                onChange={handleHandData}
                maxLength={30}/>

                <Input
                value={dataInput.phonenumber === null ? '' : dataInput.phonenumber}
                name="phonenumber"
                type="text"
                placeholder="Phone number"
                onChange={handleHandData}
                maxLength={30}/>

                <Input
                value={dataInput.email === null ? '' : dataInput.email}
                name="email"
                type="text"
                placeholder="Email"
                onChange={handleHandData}
                maxLength={30}
                regex={/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/}/>


                <div className="text_area">
                    <textarea 
                    maxLength={2000} 
                    name="description" 
                    type="text" 
                    placeholder="Description" 
                    onChange={(event) => {onChange({value: event.target.value, name: "description"})}}
                    value={dataInput.description === null ? '' : dataInput.description}/>
                    <p className="max_text">max: 2000 ({dataInput.description === null ? 0 : dataInput.description.length})</p>
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
