//common functions
function padding(input, l) {
    let n = l - input.length;
    for (let i = 0; i < n; i++) {
      input = "0" + input;
    }
    return input;
}

window.onload = function() {
    let canvas = document.getElementById("canvas-sysGen-encrypt");
    let ctx = canvas.getContext("2d");

    let default_img = new Image();
    default_img.onload = function () {
        ctx.drawImage(default_img, 0, 0, canvas.width, canvas.height);
    }
    default_img.src = "./images/jZhAM.png";

}



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
    // input = document.getElementById("try-sysGenKey-fields-plaintext").value;
    // let key0 = (Math.floor(Math.random()*1000)%61)+161;
    // let key1 = (Math.floor(Math.random()*1000)%61)+161;
    // output = "";
    // for(let i=0; i<input.length; i++) {
    //     if(i%3==0) {
    //         output += String.fromCharCode(input.charCodeAt(i)+key0);
    //     }
    //     else {
    //         output += String.fromCharCode(input.charCodeAt(i)+key1);
    //     }
    // }

    // document.getElementById("try-sysGenKey-fields-ciphertext").value = output;
    // document.getElementById("try-sysGenKey-fields-key").value = key0.toString() + key1.toString();

    input = document.getElementById("try-sysGenKey-fields-plaintext").value;
    let keybin = "";
    let encrypted = "";
    let encryptbin = "";
    var add = 33;
    for (let i = 0; i < input.length; i++) {
        let keynum = Math.floor(Math.random() * (126 - 33 + 1)) + 33; // Generate random ASCII value in the range 33 to 126
        keybin += padding(keynum.toString(2),8);
    }
    let inputbin = "";
    for (let i = 0; i < input.length; i++) {
      inputbin += padding((input.charCodeAt(i)).toString(2), 8);
    }
    if(inputbin.length != keybin.length){
        document.getElementById("try-sysGenKey-fields-ciphertext").value = "Error!";
        document.getElementById("try-sysGenKey-fields-key").value = "Error!";
    }
    for (let i = 0; i < inputbin.length; i = i+8) {
        let encryp = (parseInt(inputbin.substring(i, i + 8), 2) ^ parseInt(keybin.substring(i, i + 8), 2));
        encryptbin += padding((parseInt(padding(encryp.toString(2),8),2)+parseInt(padding(add.toString(2),8),2)).toString(2),8);
      }
  
    if(encryptbin.length != keybin.length && encryptbin.length != inputbin.length){
        document.getElementById("try-sysGenKey-fields-ciphertext").value = "Error!";
        document.getElementById("try-sysGenKey-fields-key").value = "Error!";
    }
    
    for (let i = 0; i < encryptbin.length; i += 8) {
        encrypted += String.fromCharCode(parseInt(encryptbin.substring(i, i + 8), 2));
    }
    let finalkey = "";
    for (let i = 0; i < keybin.length; i += 8) {
        finalkey += String.fromCharCode(parseInt(keybin.substring(i, i + 8), 2));
    }
    if (encrypted.length != input.length && finalkey.length != encrypted.length) {
        document.getElementById("try-sysGenKey-fields-ciphertext").value = "Error!";
        document.getElementById("try-sysGenKey-fields-key").value = "Error!";
    }

    document.getElementById("try-sysGenKey-fields-ciphertext").value = encrypted;
    document.getElementById("try-sysGenKey-fields-key").value = finalkey;
    console.log("final key is: " + finalkey);

});

trySysGenKeyDecryptB = document.getElementById("try-sysGenKey-decrypt");
trySysGenKeyDecryptB.addEventListener("click", function () {
    // input = document.getElementById("try-sysGenKey-fields-ciphertext").value;
    // let keys = document.getElementById("try-sysGenKey-fields-key").value;
    // let key0 = parseInt(keys.substring(0,3),10);
    // let key1 = parseInt(keys.substring(3), 10);
    // output = "";
    // for(let i=0; i<input.length; i++) {
    //     if(i%3 == 0) {
    //         output += String.fromCharCode(input.charCodeAt(i)-key0);
    //     }
    //     else {
    //         output += String.fromCharCode(input.charCodeAt(i)-key1);
    //     }
    // }

    // document.getElementById("try-sysGenKey-fields-plaintext").value = output;

    input2 = document.getElementById("try-sysGenKey-fields-ciphertext").value;
    let key2 = document.getElementById("try-sysGenKey-fields-key").value;
    let decrypted = "";
    let bindecrypted = "";
    let key2bin = "";
    var sub = 33;
    let input2bin = "";
    for (let i = 0; i < input2.length; i++) {
        input2bin += padding(input2.charCodeAt(i).toString(2),8);
    }

    for (let i = 0; i < key2.length; i++) {
        key2bin += padding(key2.charCodeAt(i).toString(2), 8);
    }

    for(let i = 0; i < input2bin.length; i = i+8){
        bindecrypted += padding((parseInt(padding((parseInt(input2bin.substring(i,i+8),2)-sub).toString(2),8),2)^parseInt(key2bin.substring(i,i+8),2)).toString(2),8);
    }
    for (let i = 0; i < bindecrypted.length; i += 8) {
        decrypted += String.fromCharCode(parseInt(bindecrypted.substring(i, i + 8), 2));
    }
    document.getElementById("try-sysGenKey-fields-plaintext").value = decrypted;

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

tryUserGenKeyResetB = document.getElementById("try-userGenKey-reset");
tryUserGenKeyResetB.addEventListener("click", function () {
    document.getElementById("try-userGenKey-fields-ciphertext").value = "";
    document.getElementById("try-userGenKey-fields-key").value = "";
    document.getElementById("try-userGenKey-fields-plaintext").value = "";

});


//sysGen-img

sysGenImgEncryptB = document.getElementById("sysGen-img-encrypt-button");
sysGenImgEncryptB.addEventListener("click", function() {
    let canvas = document.getElementById("canvas-sysGen-encrypt");
    let ctx = canvas.getContext("2d");
    let imageData = ctx.getImageData(0,0, canvas.width, canvas.height);
    let data = imageData.data;
    let inputText = document.getElementById("sysGen-img-plainText").value;
    let key = Math.floor(Math.random()*1000)%256;
    let i;
    
    data[0] = key;
    for(i=1; i<=inputText.length; i++) {
        data[4*i] = key^(inputText.charCodeAt(i-1));
    }
    data[4*i] = 255;
    data[4*i+1] = 255;
    data[4*i+2] = 255;
    ctx.putImageData(imageData,0,0);
});

sysGenImgDecryptB = document.getElementById("sysGen-img-decrypt-button");
sysGenImgDecryptB.addEventListener("click", function() {
    let canvas = document.getElementById("canvas-sysGen-decrypt");
    let ctx = canvas.getContext("2d");
    let file = document.getElementById("sysGen-img-decrypt-file").files[0];
    let reader = new FileReader();
    reader.onload = function(event) {
        let dataUrl = event.target.result;
        let newImg = new Image();
        newImg.onload = function () {
            ctx.drawImage(newImg, 0, 0);
            let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let data = imageData.data;
            let i=4;
            let outputStr = "";
            let key = data[0];
            while(((data[i] != 255) || (data[i+1]!=255) || (data[i+2] != 255)) && (i<data.length)) {
                outputStr += String.fromCharCode(key^data[i]);
                i += 4;
            }
            document.getElementById("sysGen-img-decryptedText").value = outputStr;
        }
        newImg.src=dataUrl;
    }
    reader.readAsDataURL(file);
})
