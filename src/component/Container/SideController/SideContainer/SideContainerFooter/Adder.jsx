import React, { useState } from "react";
import styles from "../../../../../styles/Adder.module.css";
import adder from "../../../../../assets/base/adder.png";
import remover from "../../../../../assets/base/remover.png";
import adderHover from "../../../../../assets/hover/adder.png";
import removerHover from "../../../../../assets/hover/remover.png";
import adderClick from "../../../../../assets/onClick/adder.png";
import removerClick from "../../../../../assets/onClick/remover.png";

const Adder = ({onIsDeleteClick}) =>{
  const [imgAdderClick, setImgAdderClick] = useState(false);
  const [imgRemoverClick, setImgRemoverClick] = useState(false);
  const [imgAdderHover, setImgAdderHover] = useState(false);
  const [imgRemoverHover, setImgRemoverHover] = useState(false);
  
  const adderImage = imgAdderClick ? adderClick : imgAdderHover ? adderHover : adder;
  const removerImage = imgRemoverClick ? removerClick : imgRemoverHover ? removerHover : remover;

  return (
    <div className={styles["adder-wrapper"]}>
      <div className={styles["button-area"]}>
        <div className={styles["adder"]}>
          <img 
          src={adderImage}
          alt="adder"
          onClick={() => {
            setImgAdderClick(prev=>!prev);
          }}
          onMouseEnter={() => setImgAdderHover(true)}
          onMouseLeave={() => setImgAdderHover(false)}
          />
        </div>
        <div className={styles["remover"]}>
          <img 
          src={removerImage}
          alt="remover"
          onClick={() => {
            setImgRemoverClick(prev=>!prev);
            onIsDeleteClick();
          }}
          onMouseEnter={() => setImgRemoverHover(true)}
          onMouseLeave={() => setImgRemoverHover(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Adder;