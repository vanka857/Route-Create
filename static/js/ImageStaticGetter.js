function getImage() {
  //var position = $('position-cell').text();
  var heading = $('heading-cell').text();
  var pitch = $('pitch-cell').text();
  var pano = $('pano-cell').text();

  var position = document.getElementById('position-cell').textContent;

  console.log(position);

  var w = 640
  var h = 480

  var request = "https://maps.googleapis.com/maps/api/streetview?" + "size=" + w + "x" + h;
  request += "location="; //+ //46.414382,10.013988
  document.getElementById('photo').src="https://maps.googleapis.com/maps/api/streetview?size=16000x13000&location=46.414382,10.013988&heading=151.78&pitch=-0.76&key=AIzaSyBIPkoosmsx89Rh20-Xl4krj1Ax6YLQzvA";
  //$('#photo').setAttribute("src", "https://maps.googleapis.com/maps/api/streetview?size=600x300&location=46.414382,10.013988&heading=151.78&pitch=-0.76&key=YOUR_API_KEY&signature=YOUR_SIGNATURE");
}

function capture_pic() {
  console.log("im here");
  getImage();
}
