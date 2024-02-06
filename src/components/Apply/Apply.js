// Apply.js
import React, { useState, useRef } from "react";
import styles from "./Apply.module.css";
import { questions } from "./Question"

function Main() {
  const questionRefs = {};

  function FormBox({questionNumber, questionText}) {
    const questionId = `Q${questionNumber}`;
    questionRefs[questionId] = useRef();

    return(
      <div className={styles.form}>
        <div className={styles.question}>
            <h1 className={styles.question}>{`질문 ${questionNumber}`}</h1>
            <p>{questionText}</p>
        </div>
      <textarea type="text" 
      name={questionId}
      ref={questionRefs[questionId]}
      className={styles.textbox}>
      </textarea>
    </div>
    )
  }

  const formBoxes = Object.entries(questions).map(([key, value]) => (
    <FormBox key={key} questionNumber={key} questionText={value} />
  ));
  
  //제출 버튼을 눌렀을 때 페이지를 초기화시키는 reset함수
  function resetForm(formData) {
    for(let entry of formData.entries()){
      let fieldName = entry[0];
      document.querySelector(`[name="${fieldName}"]`).value = "";
    }
  }

  // 이벤트 핸들러 함수: 제출 버튼 onClick시 실행하는 콜백함수
  const handleSubmit= async (event) => {
    event.preventDefault();
    //alert("아직 지원 기간이 아닙니다. \n서류 지원 기간: 2월20일 ~ 3월 1일");
    event.preventDefault();

    let formData = new FormData(event.target);
    for(let entry of formData.entries()){
      console.log(entry);
      //formData들을 객체에 추가하고 메일로 전송하는 nodejs코드 구현하기
    }
    alert(`제출 완료되었습니다. \n${formData.get("name")}님 행운을 빌어요!`);
    console.log(formData);
    resetForm(formData);
  }


  return (
    <form onSubmit={handleSubmit} method="post">
      <div className={styles.main}>
        <h1 className={styles.title}>34기 지원서 </h1>
        <label>
          이름
          <input name="name" type="text"></input>
        </label>
        <label>
          전화 번호
          <input name="phoneNumber" type="text"></input>
        </label>
        Email
        <input name="mail" type="text"></input>
        {formBoxes}
      </div>
      <div className={styles.ButtonContainer}>
        <button type="submit" className={styles.admitButton}>
          제출하기
        </button>
      </div>
    </form>
  );
}

export default Main;
