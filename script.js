function addNewWEField() {
    // alert('Dory putr ki hal hy')

    let newNode = document.createElement('textarea')
    newNode.classList.add("form-control")
    newNode.classList.add('weField')
    newNode.classList.add("mt-2")
    newNode.setAttribute('rows', 3)
    newNode.setAttribute('placeholder', "Enter you Work experience")

    let weOb = document.getElementById('we')
    let weAddButtonOb = document.getElementById('weAddButton')

    weOb.insertBefore(newNode, weAddButtonOb)
}


function addNewAQField() {
    let newNode = document.createElement('textarea')
    newNode.classList.add('form-control')
    newNode.classList.add('aqField')
    newNode.classList.add('mt-2')
    newNode.setAttribute('rows', 3)
    newNode.setAttribute('placeholder', "Enter you Academic Qualification")

    let aqOb = document.getElementById('aq')
    let aqAddButtonOb = document.getElementById('aqAddButton')

    aqOb.insertBefore(newNode, aqAddButtonOb)
}

// generating CV

function generateCV() {
    let nameField = document.getElementById('nameField').value;

    let nameT1 = document.getElementById('nameT1')

    nameT1.innerHTML = nameField

    // direct

    document.getElementById('nameT2').innerHTML = nameField



    // contact
    document.getElementById('contactT').innerHTML = document.getElementById('contactField').value

    // address
    document.getElementById('addressT').innerHTML = document.getElementById('addressField').value

    // links
    document.getElementById('fbT').innerHTML = document.getElementById('fbField').value
    document.getElementById('instaT').innerHTML = document.getElementById('instaField').value
    document.getElementById('linkedT').innerHTML = document.getElementById('linkedField').value


    //objectives
    document.getElementById('objectiveT').innerHTML = document.getElementById('objectiveField').value


    //WES
    let wes = document.getElementsByClassName('weField')

    let str = "";

    for (let e of wes) {
        str = str + `<li> ${e.value}</li>`
    }

    document.getElementById('weT').innerHTML = str



    //AQS
    let aqs = document.getElementsByClassName('aqField')
    
    let str1 = '';

    for (let e of aqs) {
        str1 = str1+`<li>${e.value}</li>`    
    }

    document.getElementById('aqT').innerHTML = str1;


    document.getElementById('cv-form').style.display='none'
    document.getElementById('cv-template').style.display='block'


  
}
const imgField = document.getElementById('imgField');
const imgT = document.getElementById('imgT');

const defaultImageUrl = 'https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpga'

// Function to handle file selection
imgField.addEventListener('change', function() {
    const file = imgField.files[0]; // Get the selected file
    const reader = new FileReader(); // Create a FileReader object

    // Check if a file was selected
    if (file) {
        // When the file is read, set the src of the img tag
        reader.onload = function(e) {
            imgT.src = e.target.result; // Set the image source to the result of FileReader
        };

        // Read the image file as a Data URL
        reader.readAsDataURL(file);
    } else {
        imgT.src = defaultImageUrl;
    }
});

let cropper;
// const imgField = document.getElementById('imgField');
const imgToCrop = document.getElementById('imgToCrop');
// const imgT = document.getElementById('imgT');
const cropBtn = document.getElementById('cropBtn');
const okBtn = document.getElementById('okBtn');

imgField.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imgToCrop.src = e.target.result;

            // Initialize Cropper.js on the image
            cropper = new Cropper(imgToCrop, {
                aspectRatio: 1,    // Square aspect ratio for profile pic
                viewMode: 1,
                autoCropArea: 1
            });

            // Show the Crop and OK buttons
            cropBtn.style.display = 'inline-block';
            okBtn.style.display = 'inline-block';
        };
        reader.readAsDataURL(file);
    }
});

// Crop the image and display the cropped result
cropBtn.addEventListener('click', function() {
    if (cropper) {
        const canvas = cropper.getCroppedCanvas();
        imgT.src = canvas.toDataURL();
    }
});

// Confirm cropping and hide Crop/OK buttons and the cropper
okBtn.addEventListener('click', function() {
    if (cropper) {
        cropper.destroy();          // Remove cropper instance
        cropper = null;             // Ensure cropper is fully removed

        // Hide Crop and OK buttons
        cropBtn.style.display = 'none';
        okBtn.style.display = 'none';

        // Hide the image container where the cropper was
        imgToCrop.style.display = 'none'; // Hide the image used for cropping
    }
});



document.getElementById('printBtn').addEventListener('click', function() {
    const printBtn = document.getElementById('printBtn');
    const cv = document.getElementById('cv');

    // Temporarily hide the Print CV button
    printBtn.style.display = 'none';

    // Configure html2pdf options
    const opt = {
        margin:       0.5,
        filename:     'cv.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },  // Ensures high-quality rendering
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Generate the PDF and show the Print button again afterward
    html2pdf().from(cv).set(opt).save().then(() => {
        printBtn.style.display = 'inline-block';  // Show the button after saving PDF
    });
});
