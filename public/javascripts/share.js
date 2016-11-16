
var sharePath = function() {

    var path;

    var areaType = config_obj.areaTypeArray.indexOf(state_obj.areaType);
    var indicator = config_obj.indicatorArray.indexOf(state_obj.indicatorArr[0]);
    var gender = config_obj.genderArray.indexOf(state_obj.genderArr[0]);


    switch (state_obj.reportType) {

        case "IndicatorReport":
            path = window.location.protocol + "//" + window.location.host + "/datavis/copd/IndicatorReport/" + areaType + "/" + indicator + "/" + gender  + "/" + state_obj.current_area;
            break;

        case "OverviewReport":
            path = window.location.protocol + "//" + window.location.host + "/datavis/copd/OverviewReport/" + areaType + "/" + state_obj.current_area + "/" + gender;
            break;

        case "AreaReport":
            path = window.location.protocol + "//" + window.location.host + "/datavis/copd/AreaReport/" + areaType + "/" + state_obj.current_area + "/" + gender;
            break;
    }

    return path
};

var getPage = function(){
    window.location.href = sharePath();
};

var appUrl = sharePath();

var summaryText = "Explore local alcohol profiles in Wessex:";
var titleText = "Wessex alcohol report";

var encoded_appUrl =  encodeURIComponent(appUrl);
var encoded_summaryText = encodeURIComponent(summaryText);
var encoded_titleText =  encodeURIComponent(titleText);

var body = "Explore the local alcohol profiles in Wessex: " + encoded_appUrl;


var introUrl =  window.location.protocol + "//" + window.location.host + "/datavis/copd"
var encoded_introUrl =  encodeURIComponent(introUrl);
var introBody =  "Explore the local alcohol profiles in Wessex: " + encoded_introUrl;


var shareIt = function(type){

    switch(type) {

        case "mail":
            window.open("mailto: ?subject=" + titleText + "&body=" + body, "_blank");

        case "twitter":
            window.open("https://twitter.com/intent/tweet?url=" + encoded_appUrl + "&text=" + encoded_summaryText, "_blank");

        case "facebook":
            window.open("https://www.facebook.com/sharer/sharer.php?u=" + encoded_appUrl, "_blank");


        case "mailIntro":
            window.open("mailto: ?subject=" + titleText + "&body=" + introBody, "_blank");

        case "twitterIntro":
            window.open("https://twitter.com/intent/tweet?url=" + encoded_introUrl + "&text=" + encoded_summaryText, "_blank");

        case "facebookIntro":
            window.open("https://www.facebook.com/sharer/sharer.php?u=" + encoded_introUrl, "_blank");




    }

};