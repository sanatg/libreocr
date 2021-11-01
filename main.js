function readURL(input) {
  if (input.files && input.files[0]) {
    // if input is file, files has content
    var inputFileData = input.files[0]; // shortcut
    var reader = new FileReader(); // FileReader() : init
    reader.onload = function (e) {
      /* FileReader : set up ************** */
      console.log("e", e);
      $(".file-upload-placeholder").hide(); // call for action element : hide
      $(".file-upload-image").attr("src", e.target.result); // image element : set src
      window.localStorage.setItem("image", e.target.result); // set image to localStorage
  
      $(".file-upload-preview").show(); // image element's container : show
      $(".image-title").html(inputFileData.name); // set image's title
    };
    // console.log('input.files[0]',input.files[0])
    reader.readAsDataURL(inputFileData); // reads target inputFileData, launch `.onload` actions
  } else {
    removeUpload();
  }
}

function removeUpload() {
  var $clone = $(".file-upload-input").val("").clone(true); // create empty clone
  $(".file-upload-input").replaceWith($clone); // reset input: replaced by empty clone
  $(".file-upload-placeholder").show(); // show placeholder
  $(".file-upload-preview").hide(); // hide preview
}

// Style when drag-over
$(".file-upload-placeholder").bind("dragover", function () {
  $(".file-upload-placeholder").addClass("image-dropping");
});
$(".file-upload-placeholder").bind("dragleave", function () {
  $(".file-upload-placeholder").removeClass("image-dropping");
});

function ocr_start() {
 var imgurl =   $(".input-img-url").val(); // get
 document.getElementById("start-text").innerHTML = "Starting the OCR....";

 if (imgurl == "") {
  var image = window.localStorage.getItem("image");
  Tesseract.recognize(
    image,
    'eng',
    { logger: m => document.getElementById("percent-done").innerHTML = m.progress+"00% done" }
  ).then(({ data: { text } }) => {
    console.log(text);
    document.getElementById("start-text").innerHTML = "OCR Completed....";
    toggleModal()
    document.getElementById("ocr-result").value = text;
  })
 }
 else {
   imgurlcors = "https://libreproxy.herokuapp.com/"+imgurl;
   Tesseract.recognize(
    imgurlcors,
    'eng',
    { logger: m => document.getElementById("percent-done").innerHTML = m.progress+"00% done" }
  ).then(({ data: { text } }) => {
    console.log(text);
    document.getElementById("start-text").innerHTML = "OCR Completed....";
    toggleModal()
    document.getElementById("ocr-result").value = text;
  })
 }
}

function toggleModal() {
  document.getElementById('modal').classList.toggle('hidden')
}
function copytext(){
  var copyText = document.getElementById("ocr-result");
  copyText.select()
  document.execCommand("copy");
  toggleModal()
}