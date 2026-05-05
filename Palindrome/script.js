const inputText = document.querySelector("#text-input");
const checkBtn = document.querySelector("#check-btn");
const result = document.querySelector("#result");


const inputRegex= /[^a-z\d]/ig;

checkBtn.addEventListener("click",() =>
{
    inputValue = inputText.value;
    if(inputValue=="")
    {
        alert("Please input a value");
    }
    else
    {
        let cleaned = inputValue.replace(inputRegex, "").toLowerCase();
        cleanedRev = cleaned.split("").reverse().join("");
        if(cleaned==cleanedRev)
        {
            result.textContent = ` ${inputValue} is a palindrome`;

        }
        else
        {
            result.textContent = `${inputValue} is not a palindrome`;
        }


    }

})