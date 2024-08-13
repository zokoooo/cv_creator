import { useRef } from "react";
import DragAndDrop from "./drag.jsx";
import Hardskill from "./hardskill.jsx";
import PersInf from "./personalinf.jsx";
import Softskill from "./softskill.jsx";
import jsPDF from "jspdf";

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

            //Размеры изображения для файла
            let width_img = 120;
            let height_img = data_for_cv.current.imagesrc.height * width_img / data_for_cv.current.imagesrc.width;
            
            file.addImage(data_for_cv.current.imagesrc, "JPEG", 30, 15, width_img, height_img);
            file.setFontSize(36);
            file.text('CV', 270, 35);

            // Общая информация
            file.setFontSize(18);
            let x_for_general = 175;
            file.text('General information:', x_for_general, 70);
            file.setFontSize(14);
            file.text('First name: ' + data_for_cv.current.firstname, x_for_general, 85)
            file.text('Last name: ' + data_for_cv.current.lastname, x_for_general, 100)
            file.text('Location: ' + data_for_cv.current.location, x_for_general, 115)
            file.text('Phonenumber: ' + data_for_cv.current.phonenumber, x_for_general, 130)
            file.text('Email: ' + data_for_cv.current.email, x_for_general, 145)

            // Список softskills
            file.setFontSize(18);
            file.text('Soft skills:', 30, height_img + 40);
            file.setFontSize(14);
            let x = 30;
            let y = height_img + 55;
            for (let softskill of data_for_cv.current.softskill) {
                file.text('• ' + softskill, x, y);
                y += 15;
            }

            // Список hardskills
            y += 15;
            file.setFontSize(18);
            file.text('Hard skills:', 30, y);
            file.setFontSize(14);
            y += 15;
            for (let hardskill of data_for_cv.current.hardskill) {
                file.text('• ' + hardskill, x, y);
                y += 15;
            }

            // Description (Описание о себе)
            file.setFontSize(12);
            let textlines = file.splitTextToSize(data_for_cv.current.description, 250)
            x = 175;
            y = height_img + 40;
            let countLines = 17;
            for (let string = 0; string < textlines.length; string++) {
                if (countLines === 55) {
                    file.addPage();
                    countLines = 0;
                    y = 20;
                };
                file.text(textlines[string], x, y);
                countLines += 1;
                y += 11;
            }

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