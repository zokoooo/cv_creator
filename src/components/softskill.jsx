import { useRef } from "react"

export default function Softskill({ onChange }) {
    let listsftskl = ['Communicative', 'Friendly', 'Fast learner', 'Supporting', 'Stress-resistant', 'Patient'];

    let listChoose = useRef([]);

    const handle = (e) => {
        const item = e.target.value;
        if (listChoose.current.includes(item)) {
            listChoose.current = listChoose.current.filter(i => i !== item);
            onChange({name: "softskill", value: listChoose.current});
        } else { 
            listChoose.current.push(item);
            onChange({name: "softskill", value: listChoose.current});
        }
    }

    return (
        <>
            <div className="inputs">
               <p className="title_form">Soft Skills</p>
              {listsftskl.map((item, index) => (<label htmlFor=""><input type="checkbox" key={index} value={item} onChange={handle}/>{item}</label>))}
            </div>
        </>
    )
}