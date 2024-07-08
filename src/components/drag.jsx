import { useCallback, useState, useRef, useEffect } from "react";
import upload from "./img/upload.png";

export default function DragAndDrop({ data }) {
    let [drag, setDrag] = useState(false);
    let [isActive, setIsActive] = useState(false);
    const fileInputRef = useRef(null);
    let [imageSrc, setImageSrc] = useState(null);

    const handleDivClick = () => {
      fileInputRef.current.click();
    };
  
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            let src = URL.createObjectURL(file);
            let image = new Image();
            image.onload = () => {
                data({imagesrc: image});
            }
            image.src = src;
            setImageSrc(src);
        };
    };

    useEffect(() => {
        return () => {
          if (imageSrc) {
            URL.revokeObjectURL(imageSrc);
          }
        };
      }, [imageSrc]);

    const onDropHandler = useCallback((e) => {
        e.preventDefault();
        setDrag(false);
        let files = e.dataTransfer.files;
        if (files.length <= 1) {

            let file = files[0];

            if (file.type === "image/png" || file.type === "image/jpeg") {
                setIsActive(false);
                const src = URL.createObjectURL(file);
                setImageSrc(src);

                console.log('ok');
            } else {
                setIsActive(true); 

                setTimeout(() => {
                    setIsActive(false);
                }, 500)

                console.log('no');
            }
        } else {
            setIsActive(true); 

                setTimeout(() => {
                    setIsActive(false);
                }, 500)

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
                {imageSrc  && <img className="img_content" src={imageSrc} alt="Uploaded" />}
            </div>
        </div>
    )
}