import { useEffect, useState } from "react";
import DragAndDrop from "./drag.jsx";
import Hardskill from "./hardskill.jsx";
import PersInf from "./personalinf.jsx";
import Softskill from "./softskill.jsx";
import Modal from "./modal.jsx"
import jsPDF from "jspdf";

export default function Form() {

    let [modal, setModal] = useState(false);

    let [data_for_cv, setData_for_cv] = useState({
        firstname: null,
        lastname: null,
        location: null,
        phonenumber: null,
        email: null,
        description: null,
        hardskill: [],
        softskill: [],
        imagesrc: null
    });

    useEffect(() => {
        console.log(data_for_cv);
    }, [data_for_cv, modal])

    const handleSetDataForCV = (data) => {
        setData_for_cv((prev) => {return {...prev, [data.name]: data.value}});
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
        if (validData(data_for_cv)) {
            let image = new Image();
            image.src = data_for_cv.imagesrc;
            
            let file = new jsPDF({
                orientation: "portrait",
                unit: "px",
                format: "a4"
            });

            //Размеры изображения для файла
            let width_img = 120;
            let height_img = image.height * width_img / image.width;
            
            file.addImage(image, "JPEG", 30, 15, width_img, height_img);
            file.setFontSize(36);
            file.text('CV', 270, 35);

            // Общая информация
            file.setFontSize(18);
            let x_for_general = 175;
            file.text('General information:', x_for_general, 70);
            file.setFontSize(14);
            file.text('First name: ' + data_for_cv.firstname, x_for_general, 85)
            file.text('Last name: ' + data_for_cv.lastname, x_for_general, 100)
            file.text('Location: ' + data_for_cv.location, x_for_general, 115)
            file.text('Phonenumber: ' + data_for_cv.phonenumber, x_for_general, 130)
            file.text('Email: ' + data_for_cv.email, x_for_general, 145)

            // Список softskills
            file.setFontSize(18);
            file.text('Soft skills:', 30, height_img + 40);
            file.setFontSize(14);
            let x = 30;
            let y = height_img + 55;
            for (let softskill of data_for_cv.softskill) {
                file.text('• ' + softskill, x, y);
                y += 15;
            }

            // Список hardskills
            y += 15;
            file.setFontSize(18);
            file.text('Hard skills:', 30, y);
            file.setFontSize(14);
            y += 15;
            for (let hardskill of data_for_cv.hardskill) {
                file.text('• ' + hardskill, x, y);
                y += 15;
            }

            // Description (Описание о себе)
            file.setFontSize(12);
            let textlines = file.splitTextToSize(data_for_cv.description, 250)
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

    const handleResetForm = () => {
        setModal(false);
        setData_for_cv({
            firstname: null,
            lastname: null,
            location: null,
            phonenumber: null,
            email: null,
            description: null,
            hardskill: [],
            softskill: [],
            imagesrc: null
        });
    }

    const closeModal = () => {
        setModal(false);
    }

    return (
        <>
            <div className="back_form">
                <div className="main">  
                    <PersInf onChange={handleSetDataForCV} dataInput={data_for_cv}/>
                    <Hardskill onChange={handleSetDataForCV} dataInput={data_for_cv}/>
                    <Softskill onChange={handleSetDataForCV} dataInput={data_for_cv}/>
                    <div className="buttons section">
                        <button className="button_reset button_blue" style={{backgroundColor: '#b81b1b'}} onClick={() => setModal(true)}>Reset</button>
                        <button onClick={generate_CV} className="button_generate button_blue" style={{backgroundColor: '#055f47'}}>Generate PDF</button>
                    </div>
                </div>
                <DragAndDrop onChange={handleSetDataForCV} dataInput={data_for_cv}/>
            </div>
            {modal && <Modal onClickNo={closeModal} onClickYes={handleResetForm}/>}
        </>
    )
}