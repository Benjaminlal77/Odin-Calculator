const buttons = document.querySelectorAll('button');
const memory = document.getElementById('memory');
const result = document.getElementById('result');
buttons.forEach(button=>button.addEventListener('click',checkInput));

function checkInput(e){
  if (e.target.className==='number-button'){
    result.textContent+=e.target.value;
  } 
  else if (e.target.className==='operator-button'){
    if (result.textContent!==''){
      memory.textContent += result.textContent + ' ' + e.target.value + ' ';
      result.textContent = '';
    } else {
      if (lastInputIsOperator()){
        memory.textContent = memory.textContent.slice(0,-2)+e.target.value+' '
      }
    }
  }
}
function lastInputIsOperator(){
  return /[/x\-\+]/.test(memory.textContent.slice(-2));
}