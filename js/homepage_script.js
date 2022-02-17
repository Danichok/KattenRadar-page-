/* COOKIE DATA  */
var cookieArray;
getCookie()

function getCookie() {
    var str = document.cookie;

    cookieArray = str.split(/[;] */).reduce(function (result, pairStr) {
        var arr = pairStr.split('=');
        if (arr.length === 2) { result[arr[0]] = arr[1]; }
        return result;
    }, {});
}

console.log(cookieArray)

/* DASHBOARD POPUP */
$('#dashboard__send').click(function () {
    var dashboardEmail = $('#dashboardEmail').val();
    // var dashboardEmail = 'exodusdevelop1@gmail.com';
    grecaptcha.ready(function () {
        grecaptcha.execute('6LdBDO4dAAAAAHksjb-qcwb7j-Ke3cEJwkBgIF4C', {
            action: 'submitEmail'
        }).then(function (token) {
            var url = 'https://server.kattenradar.nl/test-recaptcha?token=' + token
            var requestOptions = {
                method: 'POST',
                redirect: 'follow',
            };
            fetch(url, requestOptions)
                .then(response => response.text())
                .then(result => {
                    if (result == 'failed') {
                        console.log('failed')
                    } else {
                        var myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

                        var urlencoded = new URLSearchParams();
                        urlencoded.append("contactDetails", dashboardEmail);

                        var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: urlencoded,
                            redirect: 'follow'
                        };

                        fetch("https://server.kattenradar.nl/test-dashboard-link", requestOptions)
                            .then(response => response.text())
                            .then(result => {

                                if (result == 'success') {
                                    dashboardSuccess()
                                    console.log('RESULT: ' + result)
                                } else {
                                    dashboardFailed()
                                    console.log('RESULT: ' + result)
                                }
                            })
                            .catch(error => console.log('error', error));
                    }
                })
                .catch(error => console.log('error', error));
        });
    });
})

function dashboardSuccess() {
    $('.dashboard__popup_start').attr('style', 'display: none')
    $('.dashboard__popup_done').attr('style', 'display: block')
}

function dashboardFailed() {
    $('.dashboard__popup_start').attr('style', 'display: none')
    $('.dashboard__popup_failed').attr('style', 'display: block')
}

$('#dashboard__failed_repeat').click(function () {
    $('.dashboard__popup_failed').attr('style', 'display: none')
    $('.dashboard__popup_start').attr('style', 'display: block')
})

$('.dashboard__top_button').click(function () {
    dashboardClose()
    $('html, body').animate({ scrollTop: '0px' }, 1000);
})
/* DASHBOARD POPUP END */

/* FEEDBACK FORM  */

$('.feedback__send').click(function () {
    var formEmail = $('#form__email').val();
    var formPhone = $('#form__phone').val();
    var formMSG = $('#message').val();
    var selectedLang = $('#language').text();

    grecaptcha.ready(function () {
        grecaptcha.execute('6LdBDO4dAAAAAHksjb-qcwb7j-Ke3cEJwkBgIF4C', {
            action: 'submitForm'
        }).then(function (token) {
            var url = 'https://server.kattenradar.nl/test-recaptcha?token=' + token
            var requestOptions = {
                method: 'POST',
                redirect: 'follow',
            };
            fetch(url, requestOptions)
                .then(response => response.text())
                .then(result => {
                    if (result == 'failed') {
                        console.log('failed')
                    } else {
                        var myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

                        var urlencoded = new URLSearchParams();
                        urlencoded.append("email", formEmail);
                        urlencoded.append("phone", formPhone);
                        urlencoded.append("message", formMSG);
                        urlencoded.append("language", selectedLang);

                        var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: urlencoded,
                            redirect: 'follow'
                        };

                        fetch("https://server.kattenradar.nl/test-sm", requestOptions)
                            .then(response => response.text())
                            .then(result =>
                                $('.form__send_status').css('display', 'block')
                            )
                            .catch(error => console.log('error', error));
                    }
                })
                .catch(error => console.log('error', error));
        });
    });
})
/* FEEDBACK FORM  END */

/* REVIEWS SLIDER */

var numberSlider = 1;

setInterval(() => {
    var revItemWidth = 380;
    var firstSlide = $('#review-' + numberSlider).html()
    var translateWidth = numberSlider * revItemWidth;
    $('.reviews__items').attr('style', 'transform: translateX(-' + translateWidth + 'px)')
    $('.reviews__items').append("<div class='review__item' id='review-" + (numberSlider + 6) + "'>" + firstSlide + "</div>")
    numberSlider++
}, 3000);

/* REVIEWS SLIDER END */

/* FEEDBACK POPUP */

var feedbackH = $('.feedback__popup').height()

$('.footer_contact').click(function () {
    $('.blur__wrapper').attr('style', 'filter: blur(10px)')
    $('.feedback').attr('style', 'display: block')
    header.removeClass('header__fixed')
    header.addClass('header__hidden')
    setTimeout(() => {
        $('.feedback__popup').addClass('feedbackShow');
    }, 100);
})

$('.popup_close').click(function () {
    feedbackClose()
})
$('.feedback__send').click(function () {
    //  feedbackClose()
})
$('.feedback').click(function () {
    feedbackClose()
})

function feedbackClose() {
    $('.feedback__popup').removeClass('feedbackShow');
    $('.blur__wrapper').attr('style', 'filter: blur(0px)')
    $('.feedback').attr('style', 'display: none')

    header.addClass('header__fixed')
    header.removeClass('header__hidden')
}

/* FEEDBACK POPUP END */

/* DASHBOARD POPUP */

$('.footer_dashboard').click(function () {
    $('.blur__wrapper').attr('style', 'filter: blur(10px)')
    $('.feedback').attr('style', 'display: block')
    header.removeClass('header__fixed')
    header.addClass('header__hidden')
    setTimeout(() => {
        $('.dashboard__popup').addClass('feedbackShow');
    }, 100);
})

$('.popup_close').click(function () {
    dashboardClose()
})
$('.feedback__send').click(function () {
    //  dashboardClose()
})
$('.feedback').click(function () {
    dashboardClose()
})

function dashboardClose() {
    $('.dashboard__popup').removeClass('feedbackShow');
    $('.blur__wrapper').attr('style', 'filter: blur(0px)')
    $('.feedback').attr('style', 'display: none')

    header.addClass('header__fixed')
    header.removeClass('header__hidden')
}

/* DASHBOARD POPUP END */

var recentSearches = {};
var recentFound = [];
var recentNotFound = [];

var allFound = [];
var allNotFound = [];
$.ajax({
    url: 'https://server.kattenradar.nl/test-rs',
    method: 'get',
    dataType: 'json',
    async: false,
    data: recentSearches,
    success: function (data) {
        recentFound = data.Found;
        recentNotFound = data.notFound;

        console.log(recentFound)
        console.log(recentNotFound)
    }
});

$.ajax({
    url: 'https://server.kattenradar.nl/test-as',
    method: 'get',
    dataType: 'json',
    async: false,
    data: recentSearches,
    success: function (data) {
        allFound = data.Found;
        allNotFound = data.notFound;
    }
});

var trackStep = $('.map__radius_track').width();

$('.faq__item').click(function () {
    var currentFaq = $(this)
    currentFaq.find('.faq__item_answer').toggleClass('faq_ans_open')
    currentFaq.toggleClass('faq_open');

    if (currentFaq.hasClass('faq_open')) {
        $(this).find('.faq__open').attr('src', 'img/homepage/faq_minus.svg')
    } else {
        $(this).find('.faq__open').attr('src', 'img/homepage/faq_plus.svg')
    }
})

$('.current__map_buttons button').click(function () {
    $('.current__map_buttons button').removeClass('current__button_active')
    $(this).addClass('current__button_active')
})

var slideNumber = 1;

setInterval(() => {
    var slideWidth = $('.reviews__image_wrapper > img').width();
    var translateWidth = ((slideNumber - 1) * slideWidth)
    $('.review__slider_dot').removeClass('slider__dot_active')
    $('#slider_dot_' + slideNumber).addClass('slider__dot_active')

    $('.reviews__image_wrapper').attr('style', 'transform: translateX(-' + translateWidth + 'px)')

    if (slideNumber == 4) {
        slideNumber = 0;
    }

    slideNumber++
}, 3000);

/* LEAFLET MAP */

var secondMap = L.map('current_map', {
    zoomControl: false,
    gestureHandling: true
}).setView([52.1231241, 5.2773372], 8);

// zoom in function
$('#map_minus').click(function () {
    secondMap.setZoom(secondMap.getZoom() + 1)
});


// zoom out function
$('#map_plus').click(function () {
    secondMap.setZoom(secondMap.getZoom() - 1)
});
//https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png
//https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2FuaXN0cmF5IiwiYSI6ImNreGVueTljbTEzdTAybm1tYXRzaHBnaTYifQ.Ux9ySMRvhgcwFd7_gPXCWg
//pk.eyJ1Ijoic2FuaXN0cmF5IiwiYSI6ImNreGVueTljbTEzdTAybm1tYXRzaHBnaTYifQ.Ux9ySMRvhgcwFd7_gPXCWg
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2FuaXN0cmF5IiwiYSI6ImNreGVueTljbTEzdTAybm1tYXRzaHBnaTYifQ.Ux9ySMRvhgcwFd7_gPXCWg', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoic2FuaXN0cmF5IiwiYSI6ImNreGVueTljbTEzdTAybm1tYXRzaHBnaTYifQ.Ux9ySMRvhgcwFd7_gPXCWg',
}).addTo(secondMap);

var mapMarker = L.icon({
    iconUrl: 'img/homepage/recentSearches.svg',
    iconSize: [35, 46],
    iconAnchor: [17, 46],
    popupAnchor: [-3, -45] // point from which the popup should open relative to the iconAnchor
});
var mapMarkerGreen = L.icon({
    iconUrl: 'img/homepage/allSearches.svg',
    iconSize: [35, 46],
    iconAnchor: [17, 46],
    popupAnchor: [-3, -45] // point from which the popup should open relative to the iconAnchor
});

/* MAP MARKERS */

var markersList = [];
var allMarkers = [];
$.each(recentNotFound, (key, value) => {
    markerNotFoundRed = L.marker([Number(recentNotFound[key].lat), Number(recentNotFound[key].lng)], { icon: mapMarker, title: recentNotFound[key].picLink }).addTo(secondMap);
    markersList.push(markerNotFoundRed);
    console.log('35')
})

$.each(markersList, (key, value) => {
    markersList[key].bindPopup("<div class='map__popup_block'> <img class='map_popup__image' src='" + markersList[key].options.title + "'><div class='map__popup_bottom'><a href='#'><button class='map__popup_button'>Stuur tip!</button></a></div></div>", { closeButton: false });
    markersList[key].on('mouseover', function (e) {
        this.openPopup();
    });
    markersList[key].on('mouseout', function (e) {
        setTimeout(() => {
            this.closePopup();
        }, 5000);
    });
})

var greenMarker = [];

$.each(recentFound, (key, value) => {
    markerFoundGreen = L.marker([Number(recentFound[key].lat), Number(recentFound[key].lng)], { icon: mapMarkerGreen, title: recentFound[key].picLink }).addTo(secondMap);
    allMarkers.push(markerFoundGreen);
    greenMarker.push(markerFoundGreen);
})

allMarkersPopup()

function allMarkersPopup() {
    $.each(allMarkers, (key, value) => {
        allMarkers[key].bindPopup("<div class='map__popup_block map__popup_green'> <img class='map_popup__image' src='" + allMarkers[key].options.title + "'><div class='map__popup_bottom popup__green'><a href='#'><button class='map__popup_green map__popup_button'>Stuur tip!</button></a></div></div></div>", { closeButton: false });
        $('.test').hide()
        allMarkers[key].on('mouseover', function (e) {
            this.openPopup();
        });
        allMarkers[key].on('mouseout', function (e) {
            setTimeout(() => {
                this.closePopup();
            }, 5000);
        });
    })
}

/* MAP MARKERS END */

/* ALL MARKERS START */

var AllmarkersList = [];
var allMarker = [];


$('.current_right_b').click(function () {
    $.each(greenMarker, (key, value) => {
        secondMap.removeLayer(greenMarker[key]);
    })

    $.each(allNotFound, (key, value) => {
        markerAllNotFound = L.marker([Number(allNotFound[key].lat), Number(allNotFound[key].lng)], { icon: mapMarker, title: allNotFound[key].picLink }).addTo(secondMap);
        AllmarkersList.push(markerAllNotFound);
    })
    $.each(AllmarkersList, (key, value) => {
        AllmarkersList[key].bindPopup("<div class='map__popup_block'><img class='map_popup__image' src='" + AllmarkersList[key].options.title + "'><div class='map__popup_bottom'><a href='#'><button class='map__popup_button'>Stuur tip!</button></a></div></div>", { closeButton: false });
        AllmarkersList[key].on('mouseover', function (e) {
            this.openPopup();
        });
        AllmarkersList[key].on('mouseout', function (e) {
            setTimeout(() => {
                this.closePopup();
            }, 5000);
        });
    })
    $.each(allMarker, (key, value) => {
        allMarker[key].bindPopup("<div class='map__popup_block'><img class='map_popup__image' src='" + allMarker[key].options.title + "'><div class='map__popup_bottom'><a href='#'><button class='map__popup_button'>Stuur tip!</button></a></div></div>", { closeButton: false });
        $('.green__popup').css('background-color', 'green !important')
        allMarker[key].on('mouseover', function (e) {
            this.openPopup();
        });
        allMarker[key].on('mouseout', function (e) {
            setTimeout(() => {
                this.closePopup();
            }, 5000);
        });
    })
})

$('.current_left_b').click(function () {
    $.each(recentFound, (key, value) => {
        markerFoundGreen = L.marker([Number(recentFound[key].lat), Number(recentFound[key].lng)], { icon: mapMarkerGreen, title: recentFound[key].picLink }).addTo(secondMap);
        allMarkers.push(markerFoundGreen);
        greenMarker.push(markerFoundGreen);
    })
    allMarkersPopup()
    $.each(allMarker, (key, value) => {
        secondMap.removeLayer(allMarker[key]);
    })
    $.each(AllmarkersList, (key, value) => {
        secondMap.removeLayer(AllmarkersList[key]);
    })
})

/* ALL MARKERS END */


/* GOOGLE MAP */

// This example requires the Places library. Include the libraries=places + AIzaSyDFA6udGwPSgJt_QacZp9tatCTazR32t2U
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&libraries=places">
var map4000Zoomed;
var map7000Zoomed;
var map2000Zoomed;
var map1000Zoomed;

var myLatlng;
var userEmail;
var catAdress;
var mapRadius = 1000;
var cityCircle;

function initMap() {
    const componentForm = [
        'location',
        'locality',
        'administrative_area_level_1',
        'country',
        'postal_code',
    ];

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: { lat: 52.12, lng: 5.27 },
        mapTypeControl: false,
        mapTypeId: "terrain",
        fullscreenControl: false,
        zoomControl: false,
        draggable: false,
        scrollwheel: false,
        streetViewControl: false
    });
    cityCircle = new google.maps.Circle({
        strokeColor: "#F8A35B",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#F8A35B",
        fillOpacity: 0.3,
        map,
        center: { lat: 52.12, lng: 5.27 },
        radius: 1000,
    });
    $('.search__map_center').attr('style', 'display: block')
    image = 'img/icons/marker.svg'
    const marker = new google.maps.Marker({ map: map, draggable: false, icon: image });
    const autocompleteInput = document.getElementById('location');
    const autocomplete = new google.maps.places.Autocomplete(autocompleteInput, {
        fields: ["address_components", "geometry", "name"],
        types: ["address"],

    });

    var radiusOnMap;

    $('#location').keypress(function (e) {
        if (e.which == 13) {
            adressSelect()
            return false; //prevent duplicate submission
        }
    });

    function mapRadiusDraggeble() {
        $(".map__radius_draggable").draggable({
            containment: "parent",
            axis: "x",

            drag: function (e, ui) {
                x2 = ui.position.left;
                var trackPercent = ((x2 * 100) / trackStep).toFixed(0)
                if (trackPercent > 80) {
                    $('.map__radius_draggable').text('8 km')
                    mapRadius = 8000;
                    cityCircle.setRadius(8000);
                    $(".map__radius_dot").trigger("click");
                    mapZoom()
                } else if (trackPercent > 70) {
                    $('.map__radius_draggable').text('7 km')
                    mapRadius = 7000;
                    cityCircle.setRadius(7000);
                    $(".map__radius_dot").trigger("click");
                    mapZoom()
                } else if (trackPercent > 60) {
                    $('.map__radius_draggable').text('6 km')
                    mapRadius = 6000;
                    cityCircle.setRadius(6000);
                    $(".map__radius_dot").trigger("click");
                    mapZoom()
                } else if (trackPercent > 50) {
                    $('.map__radius_draggable').text('5 km')
                    mapRadius = 5000;
                    cityCircle.setRadius(5000);
                    $(".map__radius_dot").trigger("click");
                    mapZoom()

                } else if (trackPercent > 35) {
                    $('.map__radius_draggable').text('4 km')
                    mapRadius = 4000;
                    cityCircle.setRadius(4000);
                    $(".map__radius_dot").trigger("click");
                    mapZoom()

                } else if (trackPercent > 20) {
                    $('.map__radius_draggable').text('3 km')
                    mapRadius = 3000;
                    cityCircle.setRadius(3000);
                    $(".map__radius_dot").trigger("click");
                    mapZoom()

                } else if (trackPercent > 5) {
                    $('.map__radius_draggable').text('2 km')
                    mapRadius = 2000;
                    cityCircle.setRadius(2000);
                    $(".map__radius_dot").trigger("click");
                    mapZoom()

                } else if (trackPercent < 1) {
                    $('.map__radius_draggable').text('1 km')
                    mapRadius = 1000;
                    cityCircle.setRadius(1000);
                    $(".map__radius_dot").trigger("click");
                    mapZoom()
                }
            }
        });
    }
    $('.map__radius_draggable').click(function () {
        mapZoom()
    })

    function mapZoom() {
        if (mapRadius == 7000) {
            if (map7000Zoomed == true) {
                return false;
            } else {

                map7000Zoomed = true;

                setTimeout(() => {
                    map7000Zoomed = false;
                }, 1000);
            }
        } else if (mapRadius == 4000) {
            if (map4000Zoomed == true) {
                return false;
            } else {
                map.setZoom(12)
                map4000Zoomed = true;

                setTimeout(() => {
                    map4000Zoomed = false;
                }, 1000);
            }
        } else if (mapRadius == 2000) {
            if (map2000Zoomed == true) {
                return false;
            } else {
                map.setZoom(13)
                map2000Zoomed = true;

                setTimeout(() => {
                    map2000Zoomed = false;
                }, 1000);
            }
        } else if (mapRadius == 1000) {
            if (map1000Zoomed == true) {
                return false;
            } else {
                map.setZoom(14)
                map1000Zoomed = true;

                setTimeout(() => {
                    map1000Zoomed = false;
                }, 1000);
            }
        }
    }
    $('#location').click(function () {
        mapRadiusDraggeble()
    });

    var adressLat;
    var adressLng;
    var city;
    function adressSelect() {
        marker.setVisible(false);
        const place = autocomplete.getPlace();
        catAdress = place.address_components[0].long_name;
        catAdressCity = place.address_components[1].long_name;
        city = place.address_components[2].short_name;
        adressLat = place.geometry.location.lat();
        adressLng = place.geometry.location.lng();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert('No details available for input: \'' + place.name + '\'');
            return;
        }
        renderAddress(place);
        fillInAddress(place);

        var markersArray = [];

        markersArray.push(
            [
                place.name, {
                    center: place.geometry.location,
                    population: mapRadius,
                }
            ]
        )


        cityCircle = new google.maps.Circle({
            strokeColor: "#F8A35B",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#F8A35B",
            fillOpacity: 0.3,
            map,
            center: markersArray[0][1].center,
            radius: mapRadius,
        });
        map.setZoom(14)

        mapInput()

        function mapInput() {

            var mapButton = $('.search__map_button')
            mapButton.css('background', '#f8a45b').css('color', 'white')
            mapButton.addClass('button__2step')
            mapButton.click(function () {
                if (mapButton.hasClass('button__2step')) {
                    document.cookie = "steps=2";
                    document.cookie = "adress=" + catAdress;
                    //    document.location.href = "/search.html";
                }
            })

        }
        var sendedData = {};
        if (cookieArray.id == 'undefined') {
            sendedData = {
                'chatFlow': 'a',
                'lat': adressLat,
                'lng': adressLng,
                'street': catAdress,
                'city': city,
            };
        } else {
            sendedData = {
                'chatFlow': 'a',
                'lat': adressLat,
                'lng': adressLng,
                'street': catAdress,
                'city': city,
                'id': cookieArray.id
            };
        }
        sendData(sendedData)
console.log(sendedData)
        function sendData(arr) {
            var settings = {
                "url": "https://server.kattenradar.nl/test-su-data",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                "data": arr
            };
            console.log(arr)

            $.ajax(settings).done(function (response) {
                console.log(response);
                document.cookie = "id=" + response.id;
            });
        }
    }
    $('.search__map_button').click(function () {
        adressSelect()
    })

    function fillInAddress(place) { // optional parameter
        const addressNameFormat = {
            'street_number': 'short_name',
            'route': 'long_name',
            'locality': 'long_name',
            'administrative_area_level_1': 'short_name',
            'country': 'long_name',
            'postal_code': 'short_name',
        };
        const getAddressComp = function (type) {
            for (const component of place.address_components) {
                if (component.types[0] === type) {

                    return component[addressNameFormat[type]];
                }
            }
            return '';
        };
        document.getElementById('location').value = getAddressComp('street_number') + ' ' +
            getAddressComp('route');
        for (const component of componentForm) {
            // Location field is handled separately above as it has different logic.
            if (component !== 'location') {
                document.getElementById(component).value = getAddressComp(component);
            }
        }

    }

    function renderAddress(place) {

        map.setCenter(place.geometry.location);
        //    marker.setPosition(place.geometry.location);
        marker.setVisible(true);
    }
}
/* GOOGLE MAP END */