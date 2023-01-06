// operand  0-9
// operator + - x /
// 10 (+-x/=) 5 = answer

const calculatorDisplay = document.querySelector('h1');
const inputBtn = document.querySelectorAll('button'); // ได้ออกมาเป็น array
const clearBtn = document.getElementById('clear-btn');

const calculate = {
    "/":(firstNumber,secondNumber) => secondNumber !=0 ? firstNumber / secondNumber : "error",
    "*":(firstNumber,secondNumber) => firstNumber * secondNumber,
    "+":(firstNumber,secondNumber) => firstNumber + secondNumber,
    "-":(firstNumber,secondNumber) => firstNumber - secondNumber,
    "=":(firstNumber,secondNumber) => secondNumber
}

function setNumberValue(number){
    if(waitForNext){
        calculatorDisplay.textContent = number;
        waitForNext=false;
    }else{
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue+number;
    /* ตรวจสอบว่า if displayValue = 0 ให้ใส่เลข number ที่ input เข้าไป else ให้เอาตัวเลขต่อไปต่อท้าย*/
    }
    
}

//* ตัวเลขที่ 1 ตัวดำเนินการ ตัวเลขที่ 2 เช่น 10 + 20*//
let firstValue = 0; //ตัวเลขที่ 1
let operatorValue = ''; // เก็บตัวดำเนินการ
let waitForNext = false; // เก็บสถานะตัวเลขและตัวดำเนินการ
let secondValue = 0; //ตัวเลขที่ 2


function callOperator(operator){
   const currentValue = Number(calculatorDisplay.textContent); // แปลงจาก string เป็นตัวเลข
    if(operatorValue && waitForNext){
        operatorValue = operator;
        return;
    }
   if(!firstValue){
    firstValue = currentValue; // ถ้าไม่มีการใส่ค่าแรก ให้เอา current มาแทน
   }else{
     const result = calculate[operatorValue](firstValue,currentValue);
     calculatorDisplay.textContent = result;
     firstValue = result;
     if(firstValue === "error"){
        resetAll();
     }
   }
   operatorValue=operator;
   waitForNext=true;
}

function addDecimal(){
    if(waitForNext) return;
    if(!calculatorDisplay.textContent.includes('.')){ // ถ้าไม่เจอ . ให้ใส่จุดหลังตัวเลขได้ include เจอจะไม่สามารถใส่ได้
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
  
}

inputBtn.forEach((input) =>{
    //ปุ่มตัวเลข 0-9 เพราะไม่มีการระบุ class
    if(input.classList.length === 0){
        input.addEventListener('click',()=>setNumberValue(input.value)); // input.value คือค่าที่เรากดปุ่ม
    }else if(input.classList.contains("operator")){ //contains คือเช็กชื่อ class
        input.addEventListener('click',()=>callOperator(input.value));
    }else if(input.classList.contains("decimal")){
        input.addEventListener('click',()=>addDecimal());
    }
})
function resetAll(){
    firstValue =0;
    operatorValue = '';
    waitForNext = false;
    calculatorDisplay.textContent = '0';
}

clearBtn.addEventListener('click',()=>resetAll());