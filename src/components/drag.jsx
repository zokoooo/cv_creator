import { useCallback, useState, useRef, useEffect } from "react";
import upload from "./img/upload.png";

export default function DragAndDrop({ onChange, dataInput, ...props }) {
    let [drag, setDrag] = useState(false);
    let [isActive, setIsActive] = useState(false);
    const fileInputRef = useRef(null);

    // Освобождает ссылку на изображении
    useEffect(() => {
        
        return () => {
          if (dataInput.imagesrc) {
            URL.revokeObjectURL(dataInput.imagesrc);
          }
        };
      }, [dataInput.imagesrc]);

    // Иммитация клика на инпут, когда нажато на div
    const handleDivClick = () => {
      fileInputRef.current.click();
    };
  
    // Обработка изображения при загрузке
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            let src = URL.createObjectURL(file);
            onChange({name: "imagesrc", value: src});
        };
        fileInputRef.current.value = '';
    };

    // Обработка загруженного файла
    const onDropHandler = useCallback((e) => {
        e.preventDefault();
        setDrag(false);
        let files = e.dataTransfer.files;
        if (files.length <= 1) {
            let file = files[0];
            if (file.type === "image/png" || file.type === "image/jpeg") {
                setIsActive(false);
                const src = URL.createObjectURL(file);
                onChange({name: "imagesrc", value: src});
                // setImageSrc(src);
                console.log('ok');
            } else {
                setIsActive(true); 
                onChange({name: "imagesrc", value: null});
                // Таймер на анимацию
                setTimeout(() => {
                    setIsActive(false);
                }, 500);
                console.log('no');
            }
        } else {
            setIsActive(true); 
            // Таймер на анимацию
            setTimeout(() => {
                setIsActive(false);
            }, 500);
            console.log('many files');
        }
    })

    const drag_f = (<>
                        <img src={upload} alt="upload" className="upload" />
                        <div className="upload_text_caption">
                            <p className="caption">Upload your photo</p>
                            <p className="upload_text">(.jpg .png)</p>
                        </div>
                    </>)

    
    const drag_t = (<>
                        <p className="caption">Release</p>
                    </>)

    return (
        <div className='add_photo section'>
            <div className="add">Your photo</div>
            <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".png, .jpg"
            />
            <div onClick={handleDivClick} className={`field_upload ${isActive ? 'active_animation' : ''}`} 
                onDragLeave={(e) => {e.preventDefault(); setDrag(false)}} 
                onDragOver={(e) => {e.preventDefault(); setDrag(true)}} 
                onDrop={onDropHandler}>
                {drag ? drag_t : drag_f}   
            </div>
            <div>
                {dataInput.imagesrc && <img className="img_content" src={dataInput.imagesrc} alt="Uploaded" />}
            </div>
        </div>
    )
}