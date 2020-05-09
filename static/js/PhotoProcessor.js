function getImage() {

  const heading = document.getElementById('heading-cell').getAttribute('value');
  const pitch = document.getElementById('pitch-cell').getAttribute('value');
  const zoom = parseFloat(document.getElementById('zoom-cell').getAttribute('value'));
  const pano = document.getElementById('pano-cell').getAttribute('value');

  const fov = 180 / Math.pow(2, zoom);

  var w = 640
  var h = 480

  let request = "https://maps.googleapis.com/maps/api/streetview?" + "size=" + w + "x" + h;

  request += "&pano=" + pano;
  request += "&fov=" + fov;
  request += "&heading=" + heading;
  request += "&pitch=" + pitch;
  request += "&key=AIzaSyBIPkoosmsx89Rh20-Xl4krj1Ax6YLQzvA";

  console.log(request);
  document.getElementById('photo').src = request;
}

function capture_pic() {
  getImage();
}

function delete_pic() {
  document.getElementById('photo').src="";
}

function save_pic() {

}
