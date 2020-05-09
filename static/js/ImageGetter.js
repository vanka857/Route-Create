function get_image() {

  $.get('/get_photo', {
    position: 123012,//$('position-cell').text(),
    heading: $('heading-cell').text(),
    pitch: $('pitch-cell').text(),
    pano: $('pano-cell').text(),
  }).done(function (response) {
    $('#photo').attr('src', response['src'])
  });
}

//get_image()

