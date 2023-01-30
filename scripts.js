const buttons = document.querySelectorAll('button');
const memory = document.getElementById('memory');
const result = document.getElementById('result');
buttons.forEach(button=>button.addEventListener('click',checkInput));

function checkInput(e){
  let buttonPressed = e.target.className;
  let input = e.target.value;
  if (buttonPressed==='number-button'){
    result.textContent+=input;
  } 
  else if (buttonPressed==='operator-button'){
    if (result.textContent!==''&&result.textContent!=='-'){
      memory.textContent += result.textContent + ' ' + input + ' ';
      result.textContent = '';
    } else {
      if (lastInputIsOperator()){
        memory.textContent = memory.textContent.slice(0,-2)+input+' '
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
    if (e.target.value==='AC'){
      result.textContent='';
      memory.textContent='';
    } else {
      result.textContent=result.textContent.slice(0,-1);
    }
  }
}
function lastInputIsOperator(){
  return /[/x\-\+]/.test(memory.textContent.slice(-2));
}
function doesNotHaveDecimal(){
  return !/[.]/.test(result.textContent);
}
function isNegative(){
  return result.textContent.charAt(0)==='-';
}