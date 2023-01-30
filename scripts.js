const buttons = document.querySelectorAll('button');
const equationNode = document.getElementById('equation');
let equation='';
const resultNode = document.getElementById('result');
let result='',memory='';
let evaluated=false;

buttons.forEach(button=>button.addEventListener('click',checkInput));

function checkInput(e){
  let buttonPressed = e.target.className;
  let input = e.target.value;
  if (evaluated){
    equation='';
    result='';
    evaluated=false;
  }
  if (buttonPressed==='number-button'){
    result+=input;
  } 

  else if (buttonPressed==='operator-button'){
    if (input==='='){
      equation += result;
      result = evaluate().toString();
      memory = result;
      if (lastInputIsOperator()){
        equation = equation.slice(0,-3);
      }
      equation += ' = ';
      evaluated=true;
    }else if (result!==''&&result!=='-'){
      equation += result + ' ' + input + ' ';
      result = '';
    } else if (lastInputIsOperator()){
      equation = equation.slice(0,-2)+input+' ';
    }
  }
  
  else if (buttonPressed==='decimal-button'){
    if (doesNotHaveDecimal()){
      result+=input;
    }
  }
  
  else if (buttonPressed==='plinus-button'){
    if (isNegative()){
      result=result.slice(1);
    } else {
      result='-'+result;
    }
  }
  
  else if (buttonPressed==='clear-button'){
    if (input==='AC'){
      result='';
      equation='';
    } else {
      console.log(result);
      result=result.slice(0,-1);
    }
  }

  else if (buttonPressed==='memory-button'){
    if (lastInputIsOperator()){
      equation+=memory + ' ';
      result='';
    } else {
      result=memory;
    }
  }
  resultNode.textContent=result;
  equationNode.textContent=equation;
}

function lastInputIsOperator(){
  return /[/x\-\+]/.test(equation.slice(-2));
}
function evaluate(){
  let equationArray=equation.split(' ');
  equationArray.pop()
  if (lastInputIsOperator()&&result===''){
    equationArray.pop();
  } else if (result !== '') {
    equationArray.push(result);
  }
  console.log(equationArray);

  equationArray=evalMultiAndDiv(equationArray);
  if(equationArray.length>1){return evalAddAndSub(equationArray);}
  else {return equationArray[0];}
}
function evalMultiAndDiv(equationArray){
  for (let i=1;i<equationArray.length;i+=2){
    let operator = equationArray[i];
    if (operator==='x'){
      let temp = +equationArray[i-1]*+equationArray[i+1];
      equationArray.splice(i-1,2);
      equationArray[i-1]=temp;
      i-=2;
    } else if (operator==='/'){
      let temp = +equationArray[i-1]/+equationArray[i+1];
      equationArray.splice(i-1,2);
      equationArray[i-1]=temp;
      i-=2;
    }
  }
  return equationArray;
}
function evalAddAndSub(equationArray){
  let total = +equationArray[0];
  for (let i=1;i<equationArray.length;i+=2){
    let operator = equationArray[i];
    if (operator==='+'){
      total+= +equationArray[i+1];
    } else {
      total-= +equationArray[i+1];
    }
  } 
  return total;
}

function doesNotHaveDecimal(){
  return !/[.]/.test(result);
}

function isNegative(){
  return result.charAt(0)==='-';
}