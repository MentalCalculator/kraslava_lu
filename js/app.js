AOS.init();
AOS.refresh();

// Navigācijas josla
let hamburgerButton = document.getElementById("hamburgerButton");
let navigation = document.getElementById("navigation");
let openedNav = false;

hamburgerButton.addEventListener("click", toggleNavigation);

function toggleNavigation(){
    navigation.classList.toggle("shown");
    if(openedNav == false){
        openedNav = true;
        hamburgerButton.innerHTML = "✖";
    } else{
        openedNav = false;
        hamburgerButton.innerHTML = "☰";
    }
}

// Formas datu apstrāde
let correctName = false;
let correctEmail = false;
let correctMessage = false;

function checkName (){
    let name = document.getElementById("name").value;
    let warningText = document.getElementById("nameWarningText");

    if(name == ''){
        warningText.innerHTML = "Vārdam jābūt ievadītam.";
        correctName = false;
    }
    else if(name.length < 3 || name.length > 100){
        warningText.innerHTML = "Vārdam jābūt ne īsākam par 3 simbolu garam un ne garākam par 100 simbolu garam.";
        correctName = false;
    }
    else{
        warningText.innerHTML = "";
        correctName = true;
    }

    validateForm()
}

function checkEmail (){
    let email = document.getElementById("email").value;
    let warningText = document.getElementById("emailWarningText");
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(email == ''){
        warningText.innerHTML = "E-pasta adresei jābūt ievadītai.";
        correctEmail = false;
    }
    else if(email != '' && !email.match(emailPattern)){
        warningText.innerHTML = "E-pasta adresei jābūt pareizā formātā.";
        correctEmail = false;
    }
    else{
        warningText.innerHTML = "";
        correctEmail = true;
    }

    validateForm();
}

function checkMessage (){
    let message = document.getElementById("messageText").value;
    let warningText = document.getElementById("messageWarningText");

    if(message == ''){
        warningText.innerHTML = "Vēstulei jābūt ievadītai.";
        correctMessage = false;
    }
    else if(message.length < 20){
        warningText.innerHTML = "Vēstulei jābūt vismaz 20 simbolu garai.";
        correctMessage = false;
    }
    else{
        warningText.innerHTML = "";
        correctMessage = true;
    }

    validateForm();
}

function validateForm (){
    let submitButton = document.getElementById("submitButton");
    if(correctName == true && correctEmail == true && correctMessage == true){
        submitButton.disabled = false;
        submitButton.style.backgroundColor = "#405A78";
    }
    else{
        submitButton.disabled = true;
        submitButton.style.backgroundColor = "#848484";
    }
    console.log(correctName + " - " + correctEmail + " - " + correctMessage);
}

function submitMessage (){
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("messageText").value;

    Email.send({
        Host: "smtp.gmail.com",
        Username: "deniss.ozerskis2@gmail.com",
        Password: "Do285748572228574*",
        To: 'deniss.ozerskis2@gmail.com',
        From: email,
        Subject: "Vēstule no lietotāja " + name,
        Body: message,
      })
        .then(function (message) {
          alert("Vēstule nosūtīta veiksmīgi.")
        });
}

let images = document.getElementsByClassName("galleryImage");
let imageNo = 0;
let imagesCount = images.length;

let numberTextField = document.getElementById("imageNumber");
let numberText = (imageNo + 1) + " / " + imagesCount;
numberTextField.innerHTML = numberText;

let galleryLeftButton = document.getElementById("changeImageBack");
let galleryRightButton = document.getElementById("changeImageNext");

galleryLeftButton.addEventListener("click", setPreviousImage);
galleryRightButton.addEventListener("click", setNextImage);

function setPreviousImage(){
    if(imageNo == 0){
        images[imageNo].classList.add("hidden");
        imageNo = imagesCount - 1;
        images[imageNo].classList.remove("hidden");
    }
    else{
        images[imageNo].classList.add("hidden");
        imageNo -= 1;
        images[imageNo].classList.remove("hidden");
    }
    numberTextField.innerHTML = (imageNo + 1) + " / " + imagesCount;
}

function setNextImage(){
    if(imageNo == imagesCount - 1){
        images[imageNo].classList.add("hidden");
        imageNo = 0;
        images[imageNo].classList.remove("hidden");
    }
    else{
        images[imageNo].classList.add("hidden");
        imageNo += 1;
        images[imageNo].classList.remove("hidden");
    }
    numberTextField.innerHTML = (imageNo + 1) + " / " + imagesCount;
}