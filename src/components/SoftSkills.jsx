import { useDispatch, useSelector } from "react-redux";
import { setSoftSkills } from "../store";

export default function Softskill() {
    let listsftskl = ['Communicative', 'Friendly', 'Fast learner', 'Supporting', 'Stress-resistant', 'Patient'];    

    const softSkills = useSelector(state => state.softskill)
    const dispatch = useDispatch();

    let listChoose = softSkills

    const handle = (e) => {
        const item = e.target.value;
        console.log();
        
        if (listChoose.includes(item)) {
            listChoose = listChoose.filter(i => i !== item);
            dispatch(setSoftSkills(listChoose))
        } else { 
            listChoose.push(item);
            dispatch(setSoftSkills(listChoose))
        }
    }

    return (
        <>
            <div className="inputs">
               <p className="title_form">Soft Skills</p>
               {listsftskl.map((item, index) => (
                    <label htmlFor="" key={index}>
                        <input
                            type="checkbox"
                            value={item}
                            checked={softSkills.includes(item)}
                            onChange={handle}
                        />
                        {item}
                    </label>
                ))}
            </div>
        </>
    )
}