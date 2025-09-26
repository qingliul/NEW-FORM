const form=document.getElementById("registration-form");
const username=document.getElementById("username");
const email=document.getElementById("email");
const password=document.getElementById("password");
const confirmPassword=document.getElementById("confirm password");
form.addEventListener("submit",function(e){
    e.preventDefault();
    const isRequiredValid=checkRequired([username,email,password,confirmPassword]);
    let isFormValid =isRequiredValid;
    if(isRequiredValid)
    {
        const isusernameValid = checkLength(username,3,15);
        const isEmailValid=checkEmail(email);
        const isPassWordValid=checkLength(password,6,25);
        const isPassWordsMatch = checkPassWordsMatch(password,confirmPassword);
        isFormValid=isusernameValid&&isEmailValid&&isPassWordValid&&isPassWordsMatch;
    }
    if (isFormValid)
    {
        alert("Registration successful!");
        form.reset();
        document.querySelectorAll(".form-item").forEach(group => {
        group.className=".form-item";
        });
    }
});
function checkLength(input,min,max)
{
    if(input.value.length<min)
    {
        showError(input,`${formatFieldName(input)} must be at least ${min} characters.`);
        return false;
    }
    else if(input.value.length>max)
    {
        showError(input,`${formatFieldName(input)} must be less than ${max} characters.`);
        return false;
    }
    else
    {
      showSuccess(input);
      return true;

    }
}        
function formatFieldName(input)
{
    return input.id.charAt(0).toUpperCase()+input.id.slice(1);
}
function checkEmail(email)
{
    const emailRegex=/^[^\s@]+@[^\s@]+.[^\s@]+$/;
    if(emailRegex.test(email.value.trim()))
    {
        showSuccess(email);
        return true;
    }
    else
    {
        showError(email,"Email in not valid");
        return false;
    }

}
function checkPassWordsMatch(input1,input2)
{
    if(input1.value !==input2.value)
    {
        showError(input2,"Passwords do not match");
        return false;
    }
    return true;
}

function checkRequired(inputArray)
{
    let isValid=true;
    inputArray.forEach(input => {
         if(input.value.trim()=== "")
    {
        showError(input,`${formatFieldName(input)} is required`);
        isValid=false;
    }
    else{
        showSuccess(input);
    }

    });
   return isValid;
}
function showError(input,message)
{
    const formGroup = input.parentElement;
    formGroup.className="form-item error";
    const small=formGroup.querySelector("small");
    small.innerText=message;
}
function showSuccess(input)
{
    const formGroup = input.parentElement;
    formGroup.className="form-item success";
}
