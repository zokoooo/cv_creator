import { useRef } from "react"

export default function Softskill({ onChange, dataInput }) {
    let listsftskl = ['Communicative', 'Friendly', 'Fast learner', 'Supporting', 'Stress-resistant', 'Patient'];

    let listChoose = dataInput.softskill

    const handle = (e) => {
        const item = e.target.value;
        if (listChoose.includes(item)) {
            listChoose = listChoose.filter(i => i !== item);
            onChange({name: "softskill", value: listChoose});
        } else { 
            listChoose.push(item);
            onChange({name: "softskill", value: listChoose});
        }
    }

    return (
        <>
            <div className="inputs">
               <p className="title_form">Soft Skills</p>
              {listsftskl.map((item, index) => {
                if (dataInput.softskill.includes(item)) {
                    return <label htmlFor=""><input type="checkbox" key={index} value={item} checked onChange={handle}/>{item}</label>
                } else {
                    return <label htmlFor=""><input type="checkbox" key={index} value={item} onChange={handle}/>{item}</label>
                }
                })}
            </div>
        </>
    )
}