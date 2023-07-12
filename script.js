const encrypt = document.getElementById("encrypt-text");
encrypt.addEventListener("click", encryptf);

const decrypt = document.getElementById("decrypt-text");
decrypt.addEventListener("click", decryptf);

const reset = document.getElementById("reset-text");
reset.addEventListener("click", resetf);








/*functions*/

function padding(str, n) {
    let pad = n-str.length;
    for(let i=0; i<pad; i++) {
        str = '0'+str;
    }
    return str;
}

function encryptf() {
    let input = document.getElementById("text-input").value;
    let key = Math.floor(Math.random()*1000)%128;
    let keyBinary = padding(key.toString(2),7);
    let inputBinary = "";
    for(let i=0; i<input.length; i++) {
        inputBinary += padding((input.charCodeAt(i)^key).toString(2),7);
    }
    let outputBinary = "";
    outputBinary += keyBinary.substring(0,4);
    outputBinary += inputBinary;
    outputBinary += keyBinary.substring(4);
    
    let output = "";
    for(let i=0; i<(outputBinary.length/7); i++) {
        let character = outputBinary.substring(7*i, 7*i+7);
        output += String.fromCharCode(parseInt(character,2));
    }

    document.getElementById("text-output").value = output;
    console.log("key is: " + key);
}

function decryptf() {
    input = document.getElementById("text-output").value;
    inputBinary = "";
    for(let i=0; i<input.length; i++) {
        inputBinary += padding(input.charCodeAt(i).toString(2), 7);
    }

    let keyBinary = inputBinary.substring(0,4)+inputBinary.substring(inputBinary.length-3);
    let key = parseInt(keyBinary, 2);
    let outputBinary = inputBinary.substring(4,inputBinary.length-3);
    let output = "";
    for(let i=0; i<(outputBinary.length/7); i++) {
        let character = outputBinary.substring(7*i, 7*i+7);
        output += String.fromCharCode(parseInt(character,2)^key);
    }
    
    document.getElementById("text-input").value = output;
}

function resetf() {
    document.getElementById("text-input").value = "";
    document.getElementById("text-output").value = "";
}