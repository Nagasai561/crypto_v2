//selection

checkBoxText = document.getElementById("checkbox-text");
checkBoxText.addEventListener("click", function() {
    checkBoxImg.checked = false;
    dropImg.disabled = true;
    dropText.disabled = false;

});

checkBoxImg = document.getElementById("checkbox-img");
checkBoxImg.addEventListener("click", function() {
    checkBoxText.checked = false;
    dropText.disabled = true;
    dropImg.disabled = false;
});

dropText = document.getElementById("drop-text");
dropText.addEventListener("change", function() {
    let list = document.getElementsByClassName("try-subcontainer")
    for(let i=0; i<list.length; i++) {
        list[i].style.display = "none";
    }
    if(dropText.value != "none") {
        document.getElementById(dropText.value).style.display = "block";
    }
});

dropImg = document.getElementById("drop-img");
dropImg.addEventListener("change", function() {
    let list = document.getElementsByClassName("try-subcontainer");
    for(let i=0; i<list.length; i++) {
        list[i].style.display = "none";
    }
    if(dropImg.value != "none") {
        document.getElementById(dropImg.value).style.display = "block";
    }
});


//try-noKey

tryNoKeyEncryptB = document.getElementById("try-noKey-encrypt");
tryNoKeyEncryptB.addEventListener("click", function () {                    // There are two keys which are generated randomly key0 and key1 resp
    input = document.getElementById("try-no-key-fields-plaintext").value;   //we encrypt unicode values as x -> (x+key0 or x+key1)
    let key0 = (Math.floor(Math.random()*1000)%61)+161;                     // depending on index of x 
    let key1 = (Math.floor(Math.random()*1000)%61)+161;                     // after encrypting the original string 
    output = "";                                                            // we concatenate "key0" + "encyrpted" + "key1"
    output += String.fromCharCode(key0);                                    // this is our output
    for(let i=0; i<input.length; i++) {                                     // note that keys are always in range [161,221]
        if(i%3==0) {
            output += String.fromCharCode(input.charCodeAt(i)+key0);
        }
        else {
            output += String.fromCharCode(input.charCodeAt(i)+key1);
        }
    }
    output += String.fromCharCode(key1);

    document.getElementById("try-no-key-fields-ciphertext").value = output;

});

tryNoKeyDecryptB = document.getElementById("try-noKey-decrypt");
tryNoKeyDecryptB.addEventListener("click", function () {                        // same as above but reverse
    let input = document.getElementById("try-no-key-fields-ciphertext").value;
    let key0 = input.charCodeAt(0);
    let key1 = input.charCodeAt(input.length-1);
    input = input.substring(1,input.length-1);
    output = "";
    for(let i=0; i<input.length; i++) {
        if(i%3 == 0) {
            output += String.fromCharCode(input.charCodeAt(i)-key0);
        }
        else {
            output += String.fromCharCode(input.charCodeAt(i)-key1);
        }
    }
    document.getElementById("try-no-key-fields-plaintext").value = output;
});

tryNoKeyResetB = document.getElementById("try-noKey-reset");
tryNoKeyResetB.addEventListener("click", function () {
    document.getElementById("try-no-key-fields-plaintext").value = "";
    document.getElementById("try-no-key-fields-ciphertext").value = "";
});

//try-sysGenKey

trySysGenKeyEncryptB = document.getElementById("try-sysGenKey-encrypt");
trySysGenKeyEncryptB.addEventListener("click", function () {
    input = document.getElementById("try-sysGenKey-fields-plaintext").value;
    let key0 = (Math.floor(Math.random()*1000)%61)+161;
    let key1 = (Math.floor(Math.random()*1000)%61)+161;
    output = "";
    for(let i=0; i<input.length; i++) {
        if(i%3==0) {
            output += String.fromCharCode(input.charCodeAt(i)+key0);
        }
        else {
            output += String.fromCharCode(input.charCodeAt(i)+key1);
        }
    }

    document.getElementById("try-sysGenKey-fields-ciphertext").value = output;
    document.getElementById("try-sysGenKey-fields-key").value = key0.toString() + key1.toString();
});

trySysGenKeyDecryptB = document.getElementById("try-sysGenKey-decrypt");
trySysGenKeyDecryptB.addEventListener("click", function () {
    input = document.getElementById("try-sysGenKey-fields-ciphertext").value;
    let keys = document.getElementById("try-sysGenKey-fields-key").value;
    let key0 = parseInt(keys.substring(0,3),10);
    let key1 = parseInt(keys.substring(3), 10);
    output = "";
    for(let i=0; i<input.length; i++) {
        if(i%3 == 0) {
            output += String.fromCharCode(input.charCodeAt(i)-key0);
        }
        else {
            output += String.fromCharCode(input.charCodeAt(i)-key1);
        }
    }

    document.getElementById("try-sysGenKey-fields-plaintext").value = output;
});

trySysGenKeyResetB = document.getElementById("try-sysGenKey-reset");
trySysGenKeyResetB.addEventListener("click", function () {
    document.getElementById("try-sysGenKey-fields-ciphertext").value = "";
    document.getElementById("try-sysGenKey-fields-key").value = "";
    document.getElementById("try-sysGenKey-fields-plaintext").value = "";
});

// try-userGenKey

tryUserGenKeyEncryptB = document.getElementById("try-userGenKey-encrypt");
tryUserGenKeyEncryptB.addEventListener("click", function () {
    let input = document.getElementById("try-userGenKey-fields-plaintext").value;                // key is num <= 60000
    let key = parseInt(document.getElementById("try-userGenKey-fields-key").value,10)+161161;   // this is chosen so that key will be between 
    let key0 = parseInt(key.toString().substring(0,3),10);                                                   // 161161 and 221221
    let key1 = parseInt(key.toString().substring(3),10);                                                     // consider this num as key0 + key1
    output = "";
    for(let i=0; i<input.length; i++) {
        if(i%3 == 0) {
            output += String.fromCharCode(input.charCodeAt(i)+key0);
        }
        else {
            output += String.fromCharCode(input.charCodeAt(i)+key1);
        }
    }

    document.getElementById("try-userGenKey-fields-ciphertext").value = output;
});

tryUserGenKeyDecryptB = document.getElementById("try-userGenKey-decrypt");
tryUserGenKeyDecryptB.addEventListener("click", function () {
    let input = document.getElementById("try-userGenKey-fields-ciphertext").value;
    let key = parseInt(document.getElementById("try-userGenKey-fields-key").value,10)+161161;
    let key0 = parseInt(key.toString().substring(0,3),10);                                                   // 161161 and 221221
    let key1 = parseInt(key.toString().substring(3),10);  
    output = "";
    for(let i=0; i<input.length; i++) {
        if(i%3 == 0) {
            output += String.fromCharCode(input.charCodeAt(i)-key0);
        }
        else {
            output += String.fromCharCode(input.charCodeAt(i)-key1);
        }
    }
    document.getElementById("try-userGenKey-fields-plaintext").value = output;
});