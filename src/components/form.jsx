import { useCallback, useRef } from "react";
import DragAndDrop from "./drag.jsx";
import Hardskill from "./hardskill.jsx";
import PersInf from "./personalinf.jsx";
import Softskill from "./softskill.jsx";
import jsPDF from "jspdf";

export default function Form() {

    let object1 = useRef({
        firstname: '',
        lastname: '',
        location: '',
        phonenumber: '',
        email: '',
        description: '',
        imagesrc: null,
        hardskill: [],
        softskill: [],
    });

    let generateCv = useCallback(() => {
        let doc = new jsPDF({
            unit: 'px'
        });
        doc.setFontSize(10);
        let image = object1.current.imagesrc;
        const height_image = Math.floor(image.height * 100 / image.width);
        console.log(image.width);

        doc.addImage(image, 'JPEG', 15, 40, 100, height_image);

        // let [x, y] = [0, 0];

        // for (let i in object1.current) {
        //     doc.text(object1.current[i], x, y);
        //     y += 20;
        // };
        doc.save('CV.pdf');
    });

    generateCv.bind(object1);

    const data = useCallback((newData) => {
        object1.current = {...object1.current, ...newData};
    });

    return (
        <>
            <div className="back_form">
                <div className="main">  
                    <PersInf data={data}/>
                    <Hardskill data={data}/>
                    <Softskill data={data}/>
                    <div className="buttons section">
                        <button className="button_reset button_blue" style={{backgroundColor: '#b81b1b'}}>Reset</button>
                        <button className="button_generate button_blue" onClick={generateCv} style={{backgroundColor: '#055f47'}}>Generate PDF</button>
                    </div>
                </div>
                <DragAndDrop data={data}/>
            </div>
        </>
    )
}