import { useState } from "react"

export default function Hardskill({ data }) {
    let [listStack, setListStack] = useState([]);
    let [textExp, setTextExp] = useState('');
    let [editIndex, setEditIndex] = useState(-1);

    let addExp = () => {
        if (textExp.trim()) {
            setListStack((prev) => {
                data({hardskill: [...prev, textExp]})
                return [...prev, textExp]
            });
            setTextExp('');
        }
    };

    let deleteExp = () => {
        if (listStack.length > 0) {
            setListStack((prev) => {
                data({hardskill: listStack.slice(0, -1)})
                return listStack.slice(0, -1)
            });
        }
    };

    let editExp = (index) => {
        setEditIndex(index);
        setTextExp(listStack[index]);
    };

    let saveExp = (index) => {
        if (textExp.length !== 0) {
            let newListStack = [...listStack];
            newListStack[index] = textExp;
            setListStack(() => {
                data({hardskill: newListStack})
                return newListStack
            });
            setEditIndex(-1);
            setTextExp('');
        } else {
            let newListStack = [...listStack];
            newListStack.splice(index, 1)
            setListStack(() => {
                data({hardskill: newListStack})
                return newListStack
            });
            setEditIndex(-1);
            setTextExp('');
        }
    };

    return (
        <div className="experience section">
            <p className="title_form">Hard Skills</p>
            <div className="add_exp">
                <input className="input_exp" onChange={(e) => setTextExp(e.target.value)} value={textExp} type="text" placeholder="For example: React"/>
                <button className="button_exp button_blue" onClick={addExp}>Add</button>
                <button className="button_exp button_blue" onClick={deleteExp}>Delete last</button>
            </div>
            <ul className="ul_exp" style={{display: listStack.length > 0 ? "block" : "none"}}>
                {listStack.map((item, index) => (
                    editIndex === index ? (
                        <input
                            className="input_exp edit"
                            value={textExp}
                            onChange={(e) => setTextExp(e.target.value)}
                            onBlur={() => saveExp(index)}
                            key={index}
                            autoFocus
                        />
                    ) : (
                        <li key={index} onClick={() => editExp(index)}>{item}</li>
                    )
                ))}
            </ul>
        </div>
    );
}
