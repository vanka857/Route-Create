function getImage() {

  const heading = document.getElementById('heading-cell').getAttribute('value');
  const pitch = document.getElementById('pitch-cell').getAttribute('value');
  const zoom = parseFloat(document.getElementById('zoom-cell').getAttribute('value'));
  const pano = document.getElementById('pano-cell').getAttribute('value');

  const fov = 180 / Math.pow(2, zoom);

  let request = "https://maps.googleapis.com/maps/api/streetview?" + "size=" + 640 + "x" + 480;

  request += "&pano=" + pano;
  request += "&fov=" + fov;
  request += "&heading=" + heading;
  request += "&pitch=" + pitch;
  request += "&key=AIzaSyBIPkoosmsx89Rh20-Xl4krj1Ax6YLQzvA";

  //console.log(request);

  // var w = document.getElementById('pano').offsetWidth * scale;
  // var h = document.getElementById('pano').offsetHeight;
  //
  // console.log(w);
  // console.log(h);

  document.getElementById('photo_image').src = request;
  document.getElementById('a_download').href = request;
}

function capturePic() {
  document.getElementById('is_image_active').setAttribute('value', "true");
  getImage();
}

function setDefaultPicture() {
  $.get('/get_default_photo_url', {}).done(function (response) {
    let image = document.getElementById('photo_image');
    image.src = response['src'];
    //image.src = createCanvas(image).toDataURL();
  });
}

function deletePic() {
  console.log("deleting");
  document.getElementById('photo_image').src = '#';
  document.getElementById('is_image_active').setAttribute('value', "false");
  setDefaultPicture();
}

function editByLUT(lutID, filename) {
  const is_active = document.getElementById('is_image_active').getAttribute('value');

  if(is_active === "false") {
    return;
  }

  $.get('/get_lut', { id: lutID, filename: filename}).done(function (data) {
    const image = document.getElementById('photo_image');
    let canvas = createCanvas(image);
    let context = canvas.getContext('2d');

    const width = canvas.width;
    const height = canvas.height;

    const lut = createLUT(data);

    const newData = apply3DLUT64(context.getImageData(0, 0, width, height), lut.data, width, height, lut.dim);
    context.putImageData(newData, 0, 0);

    image.src = canvas.toDataURL();

    document.getElementById('a_download').href = document.getElementById('photo_image').src;
  });
}

class LUT {
  data;
  dim;
  constructor(data, dim) {
    this.data = data;
    this.dim = dim;
  }
}

function createLUT(str) {
  const lines = str.split('\n');

    let i = 0;

    for (i; i < lines.length; ++i) {
      console.log(lines[i]);
      if (lines[i].startsWith("LUT_3D_SIZE")) {
        break;
      }
    }

    const dim = parseInt(lines[i].split(" ")[1]);
    console.log(dim);

    for (i; i < lines.length; ++i) {
      console.log(lines[i]);
      if (lines[i].startsWith("#LUT data points")) {
        break;
      }
    }

    const result = new Uint8ClampedArray(dim**3 *3);

    let j = 0;
    for (i = i + 1; i < lines.length; ++i) {
      const value = lines[i].split(" ");
      result[++j] = parseFloat(value[0]) * 256;
      result[++j] = parseFloat(value[1]) * 256;
      result[++j] = parseFloat(value[2]) * 256;
    }

    return new LUT(result, dim);
}

function apply3DLUT64(imageData, LUTArray, width, height, dim) {
  if (!imageData.data) return;

  let pixels = imageData.data;
  let r, g, b,
      idx;

  for (let i = 0, e = pixels.length; i < e; i += 4) {
    // get the pixel value
    r = pixels[i];
    g = pixels[i + 1];
    b = pixels[i + 2];

    // Play it dumb for now: we don't try to compensate
    // for the quantization introduced by the LUT
    idx = getIdX(r, b, g, dim);

    // apply LUT and move on to the next pixel.
    pixels[i] = LUTArray[idx];
    pixels[i + 1] = LUTArray[idx + 1];
    pixels[i + 2] = LUTArray[idx + 2];

  }
  return new ImageData(pixels, width);
}

function getIdX(r, g, b, dim) {
  if (dim === 64) {
    r >>= 2;
    r <<= 12;
    g >>= 2;
    g <<= 6;
    b >>= 2;

    return (r + g + b) * 3;
  }
  if (dim === 32) {
    // r >>= 3;
    // r <<= 10;
    // g >>= 3;
    // g <<= 5;
    // b >>= 3;

    // return (r + g + b) * 3 + 1;
    const factor = 30/255;
    r = Math.round(r * factor);
    g = Math.round(g * factor);
    b = Math.round(b * factor);
    return (r*(dim*dim) + g*dim + b) * 3;
  }
  if (dim === 33) {
    const factor = 31/255;
    r = Math.round(r * factor);
    g = Math.round(g * factor);
    b = Math.round(b * factor);
    return (r*(dim*dim) + g*dim + b) * 3 + 1;
  }
}

function createCanvas(image) {
  let canvas = document.getElementById('image_canvas');
  canvas.width = 640;
  canvas.height = 480;

  let context = canvas.getContext('2d');
  context.drawImage(image, 0, 0);

  return canvas;
}

function savePic() {

}

function downloadPic(el) {
  //console.log(el.offsetHeight);

  //el.appendChild(a);

}


//TODO сделать скачивание картинки через динамическое добавление ссылки, как в этой функции
function download() {
  let dataURL = this.canvas.toDataURL(); // defaults to png
  let a = dom.create(`a`, `download`, {
      download: `lut.png`,
      href: dataURL,
      style: `display: none`
  });
  dom.add(a);
  a.click();
  dom.remove(a);
}

