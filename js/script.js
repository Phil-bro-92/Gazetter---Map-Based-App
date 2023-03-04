//TIME OF DAY FOR GREETING
const timeOfDay = document.getElementById("timeOfDay");
const date = new Date();
const hours = date.getHours();
if (hours < 12) {
  timeOfDay.innerHTML = "Good Morning";
} else if (hours < 18) {
  timeOfDay.innerHTML = "Good Afternoon";
} else {
  timeOfDay.innerHTML = "Good Evening";
}

// MAPS
const Esri_NatGeoWorldMap = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",
  {
    attribution:
      "Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC",
    minZoom: 2,
    maxZoom: 16,
  }
);
const USGS_USImageryTopo = L.tileLayer(
  "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}",
  {
    minZoom: 2,
    maxZoom: 16,
    attribution:
      'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>',
  }
);
const OpenStreetMap_Mapnik = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    minZoom: 2,
    maxZoom: 16,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
);
const Stamen_Watercolor = L.tileLayer(
  "https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}",
  {
    attribution:
      'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: "abcd",
    minZoom: 2,
    maxZoom: 16,
    ext: "jpg",
  }
);
const Stamen_Toner = L.tileLayer(
  "https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}",
  {
    attribution:
      'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: "abcd",
    minZoom: 2,
    maxZoom: 16,
    ext: "png",
  }
);
const mapSelection = {
  "National Geographic": Esri_NatGeoWorldMap,
  Natural: USGS_USImageryTopo,
  "Street Map": OpenStreetMap_Mapnik,
  Watercolor: Stamen_Watercolor,
  "Black and White": Stamen_Toner,
};

//LAYERS
const OpenRailwayMap = L.tileLayer(
  "https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png",
  {
    minZoom: 2,
    maxZoom: 16,
    attribution:
      'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://www.OpenRailwayMap.org">OpenRailwayMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
  }
);
const Stamen_TonerLines = L.tileLayer(
  "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lines/{z}/{x}/{y}{r}.{ext}",
  {
    attribution:
      'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: "abcd",
    minZoom: 2,
    maxZoom: 16,
    ext: "png",
  }
);
const airportOverlay = L.markerClusterGroup({
  iconCreateFunction: function (cluster) {
    return new L.DivIcon({
      html:
        "<div><span><i class='fa-solid fa-plane-departure'></i><br>" +
        cluster.getChildCount() +
        "</span></div>",
      className: "marker-cluster marker-cluster-small",
      iconSize: new L.Point(40, 40),
    });
  },
});
const cityOverlay = L.markerClusterGroup({
  iconCreateFunction: function (cluster) {
    return new L.DivIcon({
      html:
        "<div><span><i class='fa-solid fa-city'></i><br>" +
        cluster.getChildCount() +
        "</span></div>",
      className: "marker-cluster marker-cluster-medium",
      iconSize: new L.Point(40, 40),
    });
  },
});
const webcamOverlay = L.markerClusterGroup({
  iconCreateFunction: function (cluster) {
    return new L.DivIcon({
      html:
        "<div><span><i class='fa-solid fa-video'></i><br>" +
        cluster.getChildCount() +
        "</span></div>",
      className: "marker-cluster marker-cluster-large",
      iconSize: new L.Point(40, 40),
    });
  },
});
const overlaySelection = {
  Railways: OpenRailwayMap,
  Borders: Stamen_TonerLines,
  Webcams: webcamOverlay,
  City: cityOverlay,
  Airport: airportOverlay,
};

// Map initialization
const map = L.map("map").locate({
  setView: true,
  maxZoom: 5,
});

//Tile Layer Control Selection
const layerControl = L.control
  .layers(mapSelection, overlaySelection)
  .addTo(map);
// Open Esri_NatGeoWorldMap as default map
Esri_NatGeoWorldMap.addTo(map);
//Map scale bars
L.control.scale({ maxWidth: 200 }).addTo(map);

//BUTTONS
const navigateBackButton = L.easyButton({
  id: "navigateBackButton",
  states: [
    {
      title: "General Information",
      icon: "fa-location-crosshairs fa-2x",
      onClick: function () {
        if (navigator.geolocation) {
          getUserLocation();
        } else {
          defaultCountry();
        }
      },
    },
  ],
}).addTo(map);
// General Information Modal
const generalInfoButton = L.easyButton({
  id: "generalInfoButton",
  states: [
    {
      title: "General Information",
      icon: "fa-solid fa-info fa-2x",
      onClick: function () {
        $("#generalInfoModal").modal("toggle");
      },
    },
  ],
}).addTo(map);
const countryInfoButton = L.easyButton({
  id: "countryInfoButton",
  states: [
    {
      title: "Country Information",
      icon: "fa-earth-europe fa-2x",
      onClick: function () {
        $("#countryInfoModal").modal("toggle");
      },
    },
  ],
}).addTo(map);
const weatherInfoModal = L.easyButton({
  id: "weatherInfoButton",
  states: [
    {
      stateName: "buttonOff",
      title: "Weather Information",
      icon: "fa-solid fa-cloud-sun fa-cloud-sun1 fa-2x",
      onClick: function () {
        $("#weatherInfoModal").modal("toggle");
      },
    },
  ],
}).addTo(map);
const newsInfoButton = L.easyButton({
  id: "newsInfoButton",
  states: [
    {
      title: "News Information",
      icon: "fa-solid fa-radio fa-2x",
      onClick: function () {
        $("#newsInfoModal").modal("toggle");
      },
    },
  ],
}).addTo(map);
const seasonInfoButton = L.easyButton({
  id: "seasonInfoButton",
  states: [
    {
      title: "Season Information",
      icon: "fa-solid fa-leaf fa-2x",
      onClick: function () {
        $("#seasonInfoModal").modal("toggle");
      },
    },
  ],
}).addTo(map);
const airQualityButton = L.easyButton({
  id: "airQualityButton",
  states: [
    {
      title: "Air Quality Information",
      icon: "fa-solid fa-smog fa-2x",
      onClick: function () {
        $("#airQualityModal").modal("toggle");
      },
    },
  ],
}).addTo(map);
const triviaInfoButton = L.easyButton({
  id: "triviaInfoButton",
  states: [
    {
      title: "Trivia Information",
      icon: "fa-solid fa-question fa-2x",
      onClick: function () {
        $("#triviaInfoModal").modal("toggle");
      },
    },
  ],
}).addTo(map);

//GET USER LOCATION
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, defaultCountry);
  } else {
    defaultCountry();
  }
}
function defaultCountry() {
  $("#countrySelect").val("GB").change();
}
function showPosition(position) {
  let userLat = position.coords.latitude;
  let userLng = position.coords.longitude;
  $.ajax({
    url: "php/getUserLocation.php",
    type: "POST",
    dataType: "json",
    data: {
      lat: userLat,
      lng: userLng,
    },
    success: function (result) {
      $("#countrySelect")
        .val(result.data.countryCode)
        .prop("selected", true)
        .change();
    },
    error: function (errorThrown) {
      console.log(errorThrown);
      defaultCountry();
    },
  });
}

//GET COUNTRY NAME FOR SELECTION LIST
$.ajax({
  url: "php/getCountryNames.php",
  type: "GET",
  dataType: "json",
  success: function (result) {
    const data = result.data;
    if (result.status.name == "ok") {
      let sortedCountries = countrySort(data);
      for (i = 0; i < data.length; i++) {
        $("#countrySelect").append(
          '<option value="' +
            sortedCountries[i].iso +
            '"> ' +
            sortedCountries[i].name +
            "</option>"
        );
      }
      getUserLocation();
    }
  },
  error: function (errorThrown) {
    console.log(errorThrown);
  },
});

// SORT COUNTRY NAME ALPHABETICALLY & ALIGN WITH ISO CODES
function countrySort(country) {
  let sortedList = [];
  let sortedNames = [];
  for (i = 0; i < country.length; i++) {
    sortedNames.push(country[i].name);
  }
  sortedNames.sort();
  for (i = 0; i < sortedNames.length; i++) {
    for (j = 0; j < country.length; j++) {
      if (sortedNames[i] === country[j].name) {
        sortedList.push(country[j]);
      }
    }
  }
  return sortedList;
}

//GET BORDERS
let borderLayer;
$("#countrySelect").on("change", function () {
  if (borderLayer !== undefined && borderLayer !== null) {
    borderLayer.remove();
  }
  cityOverlay.clearLayers();
  airportOverlay.clearLayers();
  webcamOverlay.clearLayers();
  $.ajax({
    url: "php/getBorders.php",
    type: "POST",
    dataType: "json",
    data: { country: $("#countrySelect").val() },
    success: function (result) {
      const data = result.data;
      if (result.status.name == "ok") {
        const borderColors = [
          "red",
          "maroon",
          "black",
          "navy",
          "green",
          "blue",
          "crimson",
          "darkgoldenrod",
          "deeppink",
          "purple",
        ];
        const randomNumber = Math.floor(Math.random() * borderColors.length);
        borderLayer = L.geoJSON(data, {
          color: borderColors[randomNumber],
          weight: 2,
        }).addTo(map);

        map.fitBounds(borderLayer.getBounds());
        const countryCentrePoint = borderLayer.getBounds().getCenter();
        getWeatherInfo(countryCentrePoint.lat, countryCentrePoint.lng);
        getAirQuality(countryCentrePoint.lat, countryCentrePoint.lng);
      }
    },
    error: function (errorThrown) {
      console.log(errorThrown);
    },
  });
});

//GET COUNTRY INFORMATION (MODAL)
$("#countrySelect").on("change", function () {
  $.ajax({
    url: "php/getCountryInfo.php",
    type: "POST",
    dataType: "json",
    data: {
      country: $("#countrySelect").val(),
    },
    success: function (result) {
      const data = result.data[0];
      const numberFormat = new Intl.NumberFormat();
      if (result.status.name == "ok") {
        $(".country").html(data.countryName);
        $("#continent").html(data.continent);
        $("#capital").html(data.capital);
        $("#population").html(numberFormat.format(data.population));
        $("#area").html(numberFormat.format(data.areaInSqKm));
        $("#currencyCode").html(data.currencyCode);
        $(".countryFlag").attr(
          "src",
          "https://countryflagsapi.com/png/" + data.isoAlpha3
        );
      }
    },
    error: function (errorThrown) {
      console.log(errorThrown);
    },
  });
});

//GET COUNTRY WEATHER INFORMATION (MODAL)
function getWeatherInfo(lat, lon) {
  $.ajax({
    url: "php/getWeatherInfo.php",
    type: "POST",
    dataType: "json",
    data: {
      lat: lat,
      lon: lon,
    },
    success: function (result) {
      let sunset = new Date(result.data.current.sunset * 1000);
      const sunrise = () => {
        let x = new Date(result.data.current.sunrise * 1000);
        if (x.getMinutes() < 10) {
          return x.getHours() + ":0" + x.getMinutes();
        } else {
          return x.getHours() + ":" + x.getMinutes();
        }
      };
      const day1 = Date.today().add(1).day().toString("ddd dS");
      const day2 = Date.today().add(2).day().toString("ddd dS");
      const day3 = Date.today().add(3).day().toString("ddd dS");
      const day4 = Date.today().add(4).day().toString("ddd dS");
      $("#timeZone").html(result.data.timezone);
      $("#weekdayTemp0").html(
        Math.round(result.data.current.temp, 1) + "\u00B0C"
      );
      $("#weekdayTemp1").html(
        Math.round(result.data.daily[1].temp.max, 1) + "\u00B0C"
      );
      $("#weekdayTemp2").html(
        Math.round(result.data.daily[2].temp.max, 1) + "\u00B0C"
      );
      $("#weekdayTemp3").html(
        Math.round(result.data.daily[3].temp.max, 1) + "\u00B0C"
      );
      $("#weekdayTemp4").html(
        Math.round(result.data.daily[4].temp.max, 1) + "\u00B0C"
      );
      $("#lowTemp1").html(
        Math.round(result.data.daily[1].temp.min, 1) + "\u00B0C"
      );
      $("#lowTemp2").html(
        Math.round(result.data.daily[2].temp.min, 1) + "\u00B0C"
      );
      $("#lowTemp3").html(
        Math.round(result.data.daily[3].temp.min, 1) + "\u00B0C"
      );
      $("#lowTemp4").html(
        Math.round(result.data.daily[4].temp.min, 1) + "\u00B0C"
      );
      $("#weatherTime").html(
        "<i class='fa-solid fa-cloud-sun'></i> " +
          sunrise() +
          "  <i class='fa-solid fa-moon'></i> " +
          sunset.getHours() +
          ":" +
          sunset.getMinutes()
      );
      $("#day1").html(day1);
      $("#day2").html(day2);
      $("#day3").html(day3);
      $("#day4").html(day4);
      $("#weatherSummary").html(result.data.current.weather[0].description);
      $("#windSpeed0").html(
        Math.round(result.data.current.wind_speed, 2) * 3.6 + " km/h"
      );
      $("#windSpeed1").html(
        Math.round(result.data.daily[1].wind_speed, 2) * 3.6 + " km/h"
      );
      $("#windSpeed2").html(
        Math.round(result.data.daily[2].wind_speed, 2) * 3.6 + " km/h"
      );
      $("#windSpeed3").html(
        Math.round(result.data.daily[3].wind_speed, 2) * 3.6 + " km/h"
      );
      $("#windSpeed4").html(
        Math.round(result.data.daily[4].wind_speed, 2) * 3.6 + " km/h"
      );

      if (result.data.minutely) {
        $("#precipitation0").html(
          result.data.minutely[0].precipitation + "mm/h"
        );
        $("#precipitation1").html(
          result.data.minutely[0].precipitation + "mm/h"
        );
      } else {
        $("#precipitation0").html("No precipitation data for this area.");
      }
    },
    error: function (errorThrown) {
      console.log(errorThrown);
    },
  });
}

//GET NEWS INFORMATION (MODAL)
$("#countrySelect").on("change", function () {
  $.ajax({
    url: "php/getNewsInfo.php",
    type: "POST",
    dataType: "json",
    data: {
      country: $("#countrySelect").val(),
    },
    success: function (result) {
      const data = result.data.results;
      if (result.data.status === "success") {
        $(".newsStory").show();
        $("#story1Img").show().attr("src", data[0].image_url);
        $("#story2Img").show().attr("src", data[1].image_url);
        $("#story3Img").show().attr("src", data[2].image_url);
        $("#story1Title").show().html(data[0].title);
        $("#story2Title").show().html(data[1].title);
        $("#story3Title").show().html(data[2].title);
        $("#story1Link").show().prop("href", data[0].link);
        $("#story2Link").show().prop("href", data[1].link);
        $("#story3Link").show().prop("href", data[2].link);
      } else {
        $("#story1Title").html("Sorry, no news for this country");
        $("#story1Img").hide().attr("src", "#");
        $("#story2Img").hide().attr("src", "#");
        $("#story3Img").hide().attr("src", "#");
        $("#story2Title").hide().html("");
        $("#story3Title").hide().html("");
        $("#story1Link").hide().prop("href", "#");
        $("#story2Link").hide().prop("href", "#");
        $("#story3Link").hide().prop("href", "#");
        $(".newsStory").hide();
        $(".newsStory").first().show();
      }
    },
    error: function (errorThrown) {
      console.log(errorThrown);
    },
  });
});

//GET SEASONS
$("#countrySelect").on("change", function () {
  const year = new Date().getFullYear();
  $.ajax({
    url: "php/getSeasons.php",
    type: "POST",
    dataType: "json",
    data: {
      country: $("#countrySelect").val(),
      year: year,
    },
    success: function (result) {
      const data = result.data;
      $("#seasonCountry").html(data[0].country);
      $("#seasonYear").html(data[0].year);
      $("#seasonName").html(data[0].name);
      $("#seasonDate").html(Date.parse(data[0].date).toString("ddd MMMM ddS"));
      $("#seasonName1").html(data[1].name);
      $("#seasonDate1").html(Date.parse(data[1].date).toString("ddd MMMM ddS"));
      $("#seasonName2").html(data[2].name);
      $("#seasonDate2").html(Date.parse(data[2].date).toString("ddd MMMM ddS"));
      $("#seasonName3").html(data[3].name);
      $("#seasonDate3").html(Date.parse(data[3].date).toString("ddd MMMM ddS"));
    },
    error: function (errorThrown) {
      console.log(errorThrown);
    },
  });
});

//GET AIR QUALITY
function getAirQuality(lat, lon) {
  $.ajax({
    url: "php/getAirQuality.php",
    type: "POST",
    dataType: "json",
    data: {
      lat: lat,
      lon: lon,
    },
    success: function (result) {
      const data = result.data;
      $("#co").html(data.CO.concentration);
      $("#coAqi").html(data.CO.aqi);
      $("#no2").html(data.NO2concentration);
      $("#no2Aqi").html(data.NO2.aqi);
      $("#o3").html(data.O3.concentration);
      $("#o3Aqi").html(data.O3.aqi);
      $("#pm2.5").html(data["PM2.5"].concentration);
      $("#pm2.5Aqi").html(data["PM2.5"].aqi);
      $("#pm10").html(data.PM10.concentration);
      $("#pm10Aqi").html(data.PM10.aqi);
      $("#so2").html(data.SO2.concentration);
      $("#so2Aqi").html(data.SO2.aqi);
    },
    error: function (errorThrown) {
      console.log(errorThrown);
    },
  });
}

//GET TRIVIA QUESTIONS (MODAL)
$.ajax({
  url: "php/getTrivia.php",
  type: "POST",
  dataType: "json",
  success: function (result) {
    $("#triviaQuestion").html(result.data.results[0].question);
    $("#triviaAnswer").html(result.data.results[0].correct_answer);
  },
  error: function (errorThrown) {
    console.log(errorThrown);
  },
});

//GET AIRPORT INFORMATION & CREATE MARKER
$("#countrySelect").on("change", function () {
  $.ajax({
    url: "php/getAirports.php",
    type: "POST",
    dataType: "json",
    data: {
      country: $("#countrySelect").val(),
    },
    success: function (result) {
      const data = result.data;
      for (i = 0; i < data.length; i++) {
        const name = data[i].name;
        const city = data[i].city;
        const icao = data[i].icao;
        const lat = data[i].latitude;
        const lon = data[i].longitude;
        const marker = airportMarker(name, city, icao, lat, lon);
        airportOverlay.addLayer(marker);
        airportOverlay.addTo(map);
      }
    },
    error: function (errorThrown) {
      console.log(errorThrown);
    },
  });
});
function airportMarker(name, city, icao, lat, lon) {
  const popup =
    "<h4>" +
    name +
    "</h4>" +
    "<p>City: " +
    city +
    "<br/>Airport Identifier: " +
    icao +
    "</p>";
  const style = L.ExtraMarkers.icon({
    icon: "fa-solid fa-plane-departure",
    iconColor: "white",
    markerColor: "green",
    prefix: "fa",
    svg: true,
  });
  return L.marker([lat, lon], {
    icon: style,
  }).bindPopup(popup);
}

//GET CITY INFORMATION & CREATE MARKER
$("#countrySelect").on("change", function () {
  $.ajax({
    url: "php/getCities.php",
    type: "POST",
    dataType: "json",
    data: {
      country: $("#countrySelect").val(),
    },
    success: function (result) {
      const data = result.data;
      for (i = 0; i < data.length; i++) {
        const name = data[i].name;
        const population = data[i].population;
        const lat = data[i].latitude;
        const lon = data[i].longitude;
        const marker = cityMarker(name, population, lat, lon);
        cityOverlay.addLayer(marker);
        cityOverlay.addTo(map);
      }
    },
    error: function (errorThrown) {
      console.log(errorThrown);
    },
  });
});
function cityMarker(name, population, lat, lon) {
  const numberFormat = new Intl.NumberFormat();
  const popup =
    "<h4>" +
    name +
    "</h4>" +
    "<p>population: " +
    numberFormat.format(population) +
    "</p>";
  const style = L.ExtraMarkers.icon({
    icon: "fa-city",
    iconColor: "white",
    markerColor: "yellow",
    prefix: "fa",
    svg: true,
  });
  return L.marker([lat, lon], {
    icon: style,
  }).bindPopup(popup);
}

//GET WEBCAM INFORMATION & CREATE MARKER
$("#countrySelect").on("change", function () {
  $.ajax({
    url: "php/getWebcam.php",
    type: "POST",
    dataType: "json",
    data: {
      country: $("#countrySelect").val(),
    },
    success: function (result) {
      const data = result.data.result.webcams;
      for (i = 0; i < result.data.result.webcams.length; i++) {
        const lat = data[i].location.latitude;
        const lon = data[i].location.longitude;
        const location = data[i].location.city;
        const day = data[i].player.day.embed;
        const live = data[i].player.live.embed;
        const player = live ? live : day;
        const marker = webcamMarker(location, player, lat, lon);
        webcamOverlay.addLayer(marker);
        webcamOverlay.addTo(map);
      }
    },
    error: function (errorThrown) {
      console.log(errorThrown);
    },
  });
});
function webcamMarker(location, player, lat, lon) {
  const popup =
    "<h4>" +
    location +
    "</h4>" +
    "<iframe src='" +
    player +
    "?autoplay=1'</iframe>";
  const style = L.ExtraMarkers.icon({
    icon: "fa-solid fa-video",
    iconColor: "white",
    markerColor: "fireBrick",
    prefix: "fa",
    svg: true,
  });
  return L.marker([lat, lon], {
    icon: style,
  }).bindPopup(popup);
}

//PRELOADER
$(window).on("load", function () {
  if ($("#preloader").length) {
    $("#preloader")
      .delay(1000)
      .fadeOut("slow", function () {
        $(this).remove();
      });
  }
});
