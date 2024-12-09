import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { setDescription } from "../store";

export default function PersInf() {
    const stateStore = useSelector(state => state);

    const dispatch = useDispatch();
    
    return (<div className="personal_information section">
                <p className="title_form">Personal Information</p>

                <Input 
                value={stateStore.firstname === null ? '' : stateStore.firstname} 
                name="firstname"
                type="text" 
                placeholder="Fisrt name"
                maxLength={30}/>

                <Input
                value={stateStore.lastname === null ? '' : stateStore.lastname}
                name="lastname"
                type="text"
                placeholder="Last name"
                maxLength={30}/>

                <Input
                value={stateStore.location === null ? '' : stateStore.location}
                name="location"
                type="text"
                placeholder="Location"
                maxLength={30}/>

                <Input
                value={stateStore.phonenumber === null ? '' : stateStore.phonenumber}
                name="phonenumber"
                type="text"
                placeholder="Phone number"
                maxLength={30}/>

                <Input
                value={stateStore.email === null ? '' : stateStore.email}
                name="email"
                type="text"
                placeholder="Email"
                maxLength={30}
                regex={/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/}/>


                <div className="text_area">
                    <textarea
                    onChange={(event) => dispatch(setDescription(event.target.value))}
                    maxLength={2000} 
                    name="description" 
                    type="text" 
                    placeholder="Description" 
                    value={stateStore.description === null ? '' : stateStore.description}/>
                    <p className="max_text">max: 2000 ({stateStore.description === null ? 0 : stateStore.description.length})</p>
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
