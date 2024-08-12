import { useRef } from "react";
import DragAndDrop from "./drag.jsx";
import Hardskill from "./hardskill.jsx";
import PersInf from "./personalinf.jsx";
import Softskill from "./softskill.jsx";
import jsPDF, { AcroFormTextField } from "jspdf";

export default function Form() {

    let data_for_cv = useRef({
        firstname: null,
        lastname: null,
        location: null,
        phonenumber: null,
        email: null,
        description: null,
        hardskill: null,
        softskill: null,
        imagesrc: null
    });

    const handleSetDataForCV = (data) => {
        data_for_cv.current = {...data_for_cv.current, [data.name]: data.value};
        console.log(data_for_cv.current);
    };

    const validData = (data) => {
        for (let item in data) {
            if (data[item] === null) {
                return false
            }
        }
        return true;
    }

    const generate_CV = () => {
        if (validData(data_for_cv.current)) {
            let file = new jsPDF({
                orientation: "portrait",
                unit: "px",
                format: "a4"
            });

            let height_img = data_for_cv.current.imagesrc.height * 120 / data_for_cv.current.imagesrc.width;
            
            file.addImage(data_for_cv.current.imagesrc, "JPEG", 30, 15, 120, height_img);
            file.setFontSize(36);
            file.text('CV', 270, 35);

            // Общая информация
            file.setFontSize(18);
            file.text('General information:', 175, 70);
            file.setFontSize(14);
            file.text('First name: ' + data_for_cv.current.firstname, 175, 85)
            file.text('Last name: ' + data_for_cv.current.lastname, 175, 100)
            file.text('Location: ' + data_for_cv.current.location, 175, 115)
            file.text('Phonenumber: ' + data_for_cv.current.phonenumber, 175, 130)
            file.text('Email: ' + data_for_cv.current.email, 175, 145)
            // Список softskills
            // file.setFontSize(18);
            // file.text('Soft skills:', 320, 70);
            // file.setFontSize(14);
            // let x = 320;
            // let y = 90;
            // for (let softskill of data_for_cv.current.softskill) {
            //     file.text('• ' + softskill, x, y);
            //     y += 15;
            // }
            // Description
            file.setFontSize(14);
            // let textfield = new AcroFormTextField(x = 10, y = 10);

            file.text(data_for_cv.current.description, 30, height_img + 30)



            file.save();
        } else {
            console.error('Заполните все поля!!!');
        }
    };

    return (
        <>
            <div className="back_form">
                <div className="main">  
                    <PersInf onChange={handleSetDataForCV}/>
                    <Hardskill onChange={handleSetDataForCV}/>
                    <Softskill onChange={handleSetDataForCV}/>
                    <div className="buttons section">
                        <button className="button_reset button_blue" style={{backgroundColor: '#b81b1b'}}>Reset</button>
                        <button onClick={generate_CV} className="button_generate button_blue" style={{backgroundColor: '#055f47'}}>Generate PDF</button>
                    </div>
                </div>
                <DragAndDrop onChange={handleSetDataForCV}/>
            </div>
        </>
    )
}