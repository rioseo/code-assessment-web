function weekDayName() {
    var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    var d = new Date();
    return days[d.getDay()];
}
"use strict";

$(document).ready(function () {

    ko.applyBindings(new TruckLocationsViewModel());

    wireEventHandlers();
});

function wireEventHandlers() {
    $(".details-modal-close").click(function (event) {
        $(".details-modal-container").hide();
    });
}

function TacoTruckLocation(data) {
    var self = this;

    // primary fields
    self.id = ko.observable(data.id);
    self.name = ko.observable(data.name);
    self.url = ko.observable(data.url);
    self.address = ko.observable(data.address);
    self.city = ko.observable(data.city);
    self.state = ko.observable(data.state);
    self.postal_code = ko.observable(data.postal_code);
    self.latitude = ko.observable(data.latitude);
    self.longitude = ko.observable(data.longitude);
    self.monday_open = ko.observable(data.monday_open);
    self.monday_close = ko.observable(data.monday_close);
    self.tuesday_open = ko.observable(data.tuesday_open);
    self.tuesday_close = ko.observable(data.tuesday_close);
    self.wednesday_open = ko.observable(data.wednesday_open);
    self.wednesday_close = ko.observable(data.wednesday_close);
    self.thursday_open = ko.observable(data.thursday_open);
    self.thursday_close = ko.observable(data.thursday_close);
    self.friday_open = ko.observable(data.friday_open);
    self.friday_close = ko.observable(data.friday_close);
    self.saturday_open = ko.observable(data.saturday_open);
    self.saturday_close = ko.observable(data.saturday_close);
    self.sunday_open = ko.observable(data.sunday_open);
    self.sunday_close = ko.observable(data.sunday_close);

    // computed fields
    self.cityStateZip = ko.computed(function () {
        return self.city() + ", " + self.state() + " " + self.postal_code();
    });
    self.todayClose = ko.computed(function () {
        // 1. I tried to make a call to a dynamically-named function,
        // but it seems it's not working
        // return self[weekDayName() + "_close"]();

        // 2. So then, I fell back to a more ugly switch statement:
        switch (weekDayName()) {
            case "monday":
                return self.monday_close();
            case "tuesday":
                return self.tuesday_close();
            case "wednesday":
                return self.wednesday_close();
            case "thursday":
                return self.thursday_close();
            case "friday":
                return self.friday_close();
            case "saturday":
                return self.saturday_close();
            case "sunday":
                return self.sunday_close();
            default:
                return "Not Available";
        }
    });
    self.googleMapHtml = ko.computed(function () {
        var mapHtml = "<iframe class='truck-map' frameborder='0' src='https://www.google.com/maps/embed/v1/place?key=AIzaSyDUj-ZpeGB8iNrmb946i82jC8S8V6IZYM8&q=_latitude_,_longitude_' allowfullscreen></iframe>";
        mapHtml = mapHtml.replace("_latitude_", self.latitude());
        mapHtml = mapHtml.replace("_longitude_", self.longitude());
        return mapHtml;
    });
    self.googleDirectionUrl = ko.computed(function () {
        var directionUrl = "https://www.google.com/maps/dir/?api=1&destination=_latitude_,_longitude_";
        directionUrl = directionUrl.replace("_latitude_", self.latitude());
        directionUrl = directionUrl.replace("_longitude_", self.longitude());
        return directionUrl;
    });
}

function TruckLocationsViewModel() {
    // Data
    var self = this;
    self.tacoTruckLocations = ko.observableArray([]);

    $.getJSON("https://my.api.mockaroo.com/locations.json?key=a45f1200", function (allData) {
        var mappedtacoTruckLocations = $.map(allData, function (item) { return new TacoTruckLocation(item); });
        self.tacoTruckLocations(mappedtacoTruckLocations);
    });

    // Behaviours
    self.showMap = function (tacoTruckLocation, event) {


        $(".map-placeholder").remove();

        $mapContainer = $(".map-container");
        $mapContainer.html(tacoTruckLocation.googleMapHtml());
        $mapContainer[0].scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        $(".return-to-card>a").attr("href", "#" + tacoTruckLocation.id());

        var parentCard = $(event.target).closest("div[class*='loc-card']");
        $("div.card.loc-card").removeClass("active");
        parentCard.addClass("active");

    };

    self.openDirectionInNewTab = function (tacoTruckLocation) {
        var win = window.open(tacoTruckLocation.googleDirectionUrl(), '_blank');
        win.focus();
    };

    self.showMoreInfo = function (tacoTruckLocation) {

        var $modal = $(".details-modal-container");

        $modal.find(".truck-id").html(tacoTruckLocation.id());
        $modal.find(".street-address").html(tacoTruckLocation.address());
        $modal.find(".city-state-zip").html(tacoTruckLocation.cityStateZip());
        $modal.find(".direction").attr("href", tacoTruckLocation.googleDirectionUrl());
        $modal.find(".btn-full-details").attr("href", tacoTruckLocation.url());
        $modal.find(".monday .from").html(tacoTruckLocation.monday_open());
        $modal.find(".tuesday .from").html(tacoTruckLocation.tuesday_open());
        $modal.find(".wednesday .from").html(tacoTruckLocation.wednesday_open());
        $modal.find(".thursday .from").html(tacoTruckLocation.thursday_open());
        $modal.find(".friday .from").html(tacoTruckLocation.friday_open());
        $modal.find(".saturday .from").html(tacoTruckLocation.saturday_open());
        $modal.find(".sunday .from").html(tacoTruckLocation.sunday_open());
        $modal.find(".monday .to").html(tacoTruckLocation.monday_close());
        $modal.find(".tuesday .to").html(tacoTruckLocation.tuesday_close());
        $modal.find(".wednesday .to").html(tacoTruckLocation.wednesday_close());
        $modal.find(".thursday .to").html(tacoTruckLocation.thursday_close());
        $modal.find(".friday .to").html(tacoTruckLocation.friday_close());
        $modal.find(".saturday .to").html(tacoTruckLocation.saturday_close());
        $modal.find(".sunday .to").html(tacoTruckLocation.sunday_close());
        $modal.find(".weekly-schedules tr").css("font-weight", "normal");
        $modal.find("." + weekDayName()).css("font-weight", "bold");

        $modal.show();
    };
}