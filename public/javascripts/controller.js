
var ee = new EventEmitter();

var Controller = function(data_obj, config, state_obj){

    var self = this;

    this.data_obj = data_obj;

    this.config = config;

    this.state = state_obj;

    this.state.current_period = config.defaultPeriod;

    var areaType = this.state.areaType;
    var indicatorArr = this.state.indicatorArr;
    var genderArr = this.state.genderArr;

    if(this.state.current_area == null) {

        //pick a random area
        var temp_arr = data_obj.data_arr.filter(function (obj) {
            if (obj[config.source.areaType] == self.state.areaType) {
                return obj
            }
        });
        temp_arr = this.getUniqueArray(config.source.id, temp_arr);
        var randomIndex = Math.floor(Math.random() * temp_arr.length);
        this.state.current_area = temp_arr[randomIndex];
    }


    this.state.current_secondary_areas = [];
    this.state.secondary_areas_colors = ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"];


    this._update_selects()


};

Controller.prototype._update_selects = function(){

    if(this.state.reportType == "IndicatorReport"){
        document.getElementById("indicatorTypeSelect").value = this.state.indicatorArr[0];
        document.getElementById("genderTypeSelect").value = this.state.genderArr[0];
        document.getElementById("areaTypeSelect").value = this.state.areaType;
    }


};

Controller.prototype._get_area_name = function(id){
    var self = this;
    return self.config.areaList[self.state.areaType].filter(function(d){
        if(d.id == id){return d}
    })[0].name;
};

Controller.prototype._get_area_short_name = function(id){
    var self = this;
    return self.config.areaList[self.state.areaType].filter(function(d){
        if(d.id == id){return d}
    })[0].short_name;
};





//Controller.prototype._init_dimensions = function(areaType, indicator, genderType){
//
//
//
//    //move to config file??
//    this[areaType][indicator][genderType].cf_data = crossfilter(this[areaType][indicator][genderType].data);
//    this[areaType][indicator][genderType].periodDimension = this[areaType][indicator][genderType].cf_data.dimension(function(d){return d["Map Period"]});
//    //console.log("init demensions call period change")
//    this._period_change(this.state.current_period);
//
//
//
//};

Controller.prototype._period_change = function(value){

    this.state.current_period = value;

    ee.emitEvent("period_change")
};



Controller.prototype._area_change = function(id){

    this.state.current_area = id;
    this.state.current_area_name = this._get_area_name(id);

    ee.emitEvent("area_change")
};


Controller.prototype._secondary_area_change = function(){


    ee.emitEvent("secondary_area_change")



}


Controller.prototype.validate_NaN_to_0 = function(val){
    if(isNaN(val)) return 0; else return Number(val);
};

Controller.prototype.median = function(values){
    values.sort( function(a,b) {return a - b;} );
    var half = Math.floor(values.length/2);
    if(values.length % 2)
        return values[half];
    else
        return (values[half-1] + values[half]) / 2.0;
};

Controller.prototype._wrap = function(text, width, string){
    text.each(function () {
        var text = d3.select(this),
            words = string.split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            x = text.attr("x"),
            y = text.attr("y"),
            dy = 0, //parseFloat(text.attr("dy")),
            tspan = text.text(null)
                .append("tspan")
                .attr("x", x)
                .attr("y", y)
                .attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                    .attr("x", x)
                    .attr("y", y)
                    .attr("dy", ++lineNumber * lineHeight + dy + "em")
                    .text(word);
            }
        }
    });
};


Controller.prototype.getKeyByValue = function( obj, value ) {
    for( var prop in obj) {
        if( obj.hasOwnProperty( prop ) ) {
            if( obj[ prop ] === value )
                return prop;
        }
    }
};


Controller.prototype.getUniqueArray = function(key, arr){
    var uniqueArr = [];
    for(var i in arr){
        var prop = arr[i][key];
        if(uniqueArr.indexOf(prop) == -1){uniqueArr.push(prop)}
    }
    return uniqueArr
};


Controller.prototype.filterData = function(areaType, gender, indicator){

    var src = this.config.source;

    var data = this.data_obj.data_arr.filter(function(obj){
        if(
            obj[src.areaType] == areaType &&
            obj[src.indicator] == indicator &&
            obj[src.gender] == gender
        ){
            return obj
        }
    });

    data.sort(function(a, b) {return d3.ascending(a[src.name], b[src.name])});
    return data
};

Controller.prototype.filterDataPeriod = function(areaType, gender, indicator, period){


    var src = this.config.source;

    var data = this.data_obj.data_arr.filter(function(obj){
        if(
            obj[src.areaType] == areaType &&
            obj[src.indicator] == indicator &&
            obj[src.gender] == gender &&
            obj[src.period] == period
        ){
            return obj
        }
    });

    data.sort(function(a, b) {return d3.ascending(a[src.name], b[src.name])});
    return data
};

Controller.prototype.filterDataPeriodArea = function(areaType, gender, indicator, period, id){

    var src = this.config.source;

    var data = this.data_obj.data_arr.filter(function(obj){
        if(
            obj[src.areaType] == areaType &&
            obj[src.indicator] == indicator &&
            obj[src.gender] == gender &&
            obj[src.period] == period &&
            obj[src.id] == id
        ){
            return obj
        }
    });
    data.sort(function(a, b) {return d3.ascending(a[src.name], b[src.name])});
    return data
};

Controller.prototype.filterDataArea = function(areaType, gender, indicator, id){

    var src = this.config.source;

    var data = this.data_obj.data_arr.filter(function(obj){
        if(
            obj[src.areaType] == areaType &&
            obj[src.indicator] == indicator &&
            obj[src.gender] == gender &&
            obj[src.id] == id
        ){
            return obj
        }
    });


    data.sort(function(a, b) {return d3.ascending(a[src.name], b[src.name])});
    return data
};

Controller.prototype.getValueFromPeriodData = function(areaType,gender, indicatorMapped, current_period, id){

    var self = this;
    var config = self.config;


    var obj = this.filterDataPeriodArea(
        areaType,
        gender,
        indicatorMapped,
        current_period,
        id
    );

    var value = obj[0][config.source.value];
    var count = obj[0][config.source.count];


    var orderedList = controller.data_obj.ordered_list_obj[areaType][gender][indicatorMapped][current_period];

    var index;
    if(config.indicatorHighIsBad){
        index = orderedList.indexOf(value) + 1;
    } else {
        index =  orderedList.length - orderedList.indexOf(value);
    }

    var percent = index / orderedList.length;

    return {"value": value, "count": count, "index": index, "indexMax": orderedList.length, "percent": percent}

};


