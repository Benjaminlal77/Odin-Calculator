const buttons = document.querySelectorAll('button');
const expression = document.getElementById('expression');
const result = document.getElementById('result');
buttons.forEach(button=>button.addEventListener('click',checkInput));

function checkInput(e){
  let buttonPressed = e.target.className;
  let input = e.target.value;
  if (buttonPressed==='number-button'){
    result.textContent+=input;
  } 

  else if (buttonPressed==='operator-button'){
    if (input==='='){
      result.textContent = evaluate();
    }else if (result.textContent!==''&&result.textContent!=='-'){
      expression.textContent += result.textContent + ' ' + input + ' ';
      result.textContent = '';
    } else{
      if (lastInputIsOperator()){
        expression.textContent = expression.textContent.slice(0,-2)+input+' '
      }
    }
  }
  
  else if (buttonPressed==='decimal-button'){
    if (doesNotHaveDecimal()){
      result.textContent+=input;
    }
  }
  
  else if (buttonPressed==='plinus-button'){
    if (isNegative()){
      result.textContent=result.textContent.slice(1);
    } else {
      result.textContent='-'+result.textContent;
    }
  }
  
  else if (buttonPressed==='clear-button'){
    if (input==='AC'){
      result.textContent='';
      expression.textContent='';
    } else {
      result.textContent=result.textContent.slice(0,-1);
    }
  }
}

function lastInputIsOperator(){
  return /[/x\-\+]/.test(expression.textContent.slice(-2));
}
function evaluate(){
  let equationArray=expression.textContent.split(' ');
  equationArray.pop();
  if (lastInputIsOperator()&&result.textContent===''){
    equationArray.pop();
  } else {
    equationArray.push(result.textContent);
  }

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
  return !/[.]/.test(result.textContent);
}

function isNegative(){
  return result.textContent.charAt(0)==='-';
}