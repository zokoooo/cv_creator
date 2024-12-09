import { useState, useRef, useEffect } from "react";
import upload from "./img/upload.png";
import { useDispatch, useSelector } from "react-redux";
import { setImageSrc } from "../store";

export default function DragAndDrop() {
    let [drag, setDrag] = useState(false);
    let [isActive, setIsActive] = useState(false);
    const fileInputRef = useRef(null);

    const imageSrc = useSelector(state => state.imagesrc);
    const dispatch = useDispatch();

    // Освобождает ссылку на изображении
    useEffect(() => {
        return () => {
          if (imageSrc) {
            URL.revokeObjectURL(imageSrc);
          }
        };
      }, [imageSrc]);

    // Иммитация клика на инпут, когда нажато на div
    const handleDivClick = () => {
      fileInputRef.current.click();
    };
  
    // Обработка изображения при загрузке
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            let src = URL.createObjectURL(file);
            dispatch(setImageSrc(src))
        };
        fileInputRef.current.value = '';
    };

    // Обработка загруженного файла
    const onDropHandler = (e) => {
        e.preventDefault();
        setDrag(false);
        let files = e.dataTransfer.files;
        if (files.length <= 1) {
            let file = files[0];
            if (file.type === "image/png" || file.type === "image/jpeg") {
                setIsActive(false);
                const src = URL.createObjectURL(file);
                dispatch(setImageSrc(src))
                // setImageSrc(src);
                console.log('ok');
            } else {
                setIsActive(true); 
                dispatch(setImageSrc(null))
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
    }

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
            <div className="flex_drag">
                <div onClick={handleDivClick} className={`field_upload ${isActive ? 'active_animation' : ''}`} 
                    onDragLeave={(e) => {e.preventDefault(); setDrag(false)}} 
                    onDragOver={(e) => {e.preventDefault(); setDrag(true)}} 
                    onDrop={onDropHandler}>
                    {drag ? drag_t : drag_f}   
                </div>
                <div>
                    {imageSrc && <img className="img_content" src={imageSrc} alt="Uploaded" />}
                </div>
            </div>
        </div>
    )
}