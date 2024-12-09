import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setHardSkills } from "../store";

export default function Hardskill() {
    let [listStack, setListStack] = useState([]);
    let [textExp, setTextExp] = useState('');
    let [editIndex, setEditIndex] = useState(-1);

    const hardSkills = useSelector(state => state.hardskill)
    const dispatch = useDispatch();

    // Добавляет в state hardskill 
    let addExp = () => {
        if (textExp.trim()) {
            setListStack((prev) => {
                dispatch(setHardSkills([...prev, textExp]));
                return [...prev, textExp]
            });
            setTextExp('');
        }
    };

    // Добавляет в state hardskill 
    let deleteExp = () => {
        if (listStack.length > 0) {
            setListStack((prev) => {
                dispatch(setHardSkills(listStack.slice(0, -1)))
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
                dispatch(setHardSkills(newListStack))
                return newListStack
            });
            setEditIndex(-1);
            setTextExp('');
        } else {
            let newListStack = [...listStack];
            newListStack.splice(index, 1)
            setListStack(() => {
                dispatch(setHardSkills(newListStack))
                return newListStack
            });
            setEditIndex(-1);
            setTextExp('');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            addExp(event);
        }
    }

    return (
        <div className="experience section">
            <p className="title_form">Hard Skills</p>
            <div className="add_exp">
                <input className="input_exp" onChange={(e) => setTextExp(e.target.value)} value={textExp} type="text" placeholder="For example: React" onKeyDown={handleKeyDown}/>
                <button className="button_exp button_blue" onClick={addExp}>Add</button>
                <button className="button_exp button_blue" onClick={deleteExp}>Delete last</button>
            </div>
            {listStack.length !== 0 ? <ul className="ul_exp" style={{display: listStack.length > 0 ? "block" : "none"}}>
                {hardSkills.map((item, index) => (
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
            </ul> : null}
        </div>
    );
}
