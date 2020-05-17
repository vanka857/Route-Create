var fenway = {lat: 42.345573, lng: -71.098326};

class GoogleMaps {

  constructor() {
    this.map = this.getMap();
    this.generatePanoramaAndConnectToMap(this.map);

    //this.openShareModal = this.openShareModal.bind(this);

    // This next line should be defined by ionic itself so it won't be needed
    //document.getElementById('open').addEventListener('click', this.openShareModal);
  }

  generatePanoramaAndConnectToMap(map) {
    var self = this;

    var streetviewService = new google.maps.StreetViewService;
    streetviewService.getPanorama({
        location: fenway,
        preference: google.maps.StreetViewPreference.NEAREST,
        radius: 100
      },
      function (result, status) {
        // console.log("Adjusted latitude: ", result.location.latLng.lat(),
        //     "\nAdjusted longitude: ", result.location.latLng.lng());
        self.panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), {
          position: fenway,
          pov: {
            heading: 0,
            pitch: 15
          },

          addressControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT
          },
          linksControl: false,
          panControl: true,
          enableCloseButton: false,
          fullscreenControl: true,
          zoomControl: false,
        });
        map.setStreetView(self.panorama);
        self.bindEvents();
      });
  }

  getMap() {
    return new google.maps.Map(
        document.getElementById('map'), {
      center: fenway,
      zoom: 14
    });
  }

  bindEvents(listener) {
    var self = this
    this.panorama.addListener('pano_changed', function() {
        var panoCell = document.getElementById('pano-cell');
        panoCell.setAttribute('value', self.panorama.getPano());
    });

    // this.panorama.addListener('links_changed', function() {
    //     var linksTable = document.getElementById('links_table');
    //     while (linksTable.hasChildNodes()) {
    //       linksTable.removeChild(linksTable.lastChild);
    //     }
    //     var links = self.panorama.getLinks();
    //     for (var i in links) {
    //       var row = document.createElement('tr');
    //       linksTable.appendChild(row);
    //       var labelCell = document.createElement('td');
    //       labelCell.innerHTML = '<b>Link: ' + i + '</b>';
    //       var valueCell = document.createElement('td');
    //       valueCell.innerHTML = links[i].description;
    //       linksTable.appendChild(labelCell);
    //       linksTable.appendChild(valueCell);
    //     }
    // });

    this.panorama.addListener('position_changed', function() {
        var positionCell = document.getElementById('position-cell');
        positionCell.setAttribute('value', self.panorama.getPosition());

        update_pov(self.panorama);
    });

    this.panorama.addListener('pov_changed', function () {
      update_pov(self.panorama);
    });
  }

  openShareModal() {
    console.log("Final Latitude: ", this.panorama.getPosition().lat());
    console.log("Final Longitude: ", this.panorama.getPosition().lng());
    console.log("Final Heading:", this.panorama.getPov().heading);
    console.log("Final Heading:", this.panorama.getPov().pitch);
    alert('If you see this alert this.panorama was defined :)');
    /* let myModal = this.modalCtrl.create(ShareModalPage); */
    /* myModal.present() */
  }
}

function update_pov(panorama) {
  let headingCell = document.getElementById('heading-cell');
  let pitchCell = document.getElementById('pitch-cell');
  let zoomCell = document.getElementById('zoom-cell');
  zoomCell.setAttribute('value', panorama.zoom);
  headingCell.setAttribute('value', panorama.getPov().heading);
  pitchCell.setAttribute('value', panorama.getPov().pitch);
}

function initialize() {
  new GoogleMaps();
}

//initialize()
