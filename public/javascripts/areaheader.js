AreaHeader = function(indicatorArr, gender, container, widgetId){

    var self = this;

    this.widgetId = widgetId;
    this.indicatorArr = indicatorArr;
    //this.indicatorMapped = controller.config.indicatorMapping[indicator];
    this.gender = gender;
    this.container = container;

    var areaType = controller.state.areaType;
    //var indicatorMapped = this.indicatorMapped;
    var current_period = controller.state.current_period;
    var current_area = controller.state.current_area;

    //this.config = controller.config;

    //this.data = controller.filterData(areaType, gender, indicatorMapped);
    //this.data_period = controller.filterDataPeriod(areaType, gender, indicatorMapped, current_period);
    //this.val = controller.getValueFromPeriodData(areaType, gender, indicatorMapped, current_period, current_area);

    
    this.cs = controller.config.colorScheme;
    this._init();


};

AreaHeader.prototype._init = function(){

    this._draw_all();
    //this._bindEvents();

};

AreaHeader.prototype._draw_all = function(){

    this._build_graph();
    this._add_help_button();

    this._draw_header();
    this._draw_gender();
    this._draw_area_name();
    this._draw_area_type();
    this._draw_map();
    this._draw_timeSlider();
    //this._draw_value();
    //this._draw_count();
    //this._draw_gauge();
    //this._draw_rank();
    //this._draw_densityGraph();
    //this._draw_label();
    //this._draw_lineGraph();

};

AreaHeader.prototype._build_graph = function() {

    var config = controller.config;
    var self = this;

    config.full_width = 300;
    config.full_height = 800;


    this.width =  config.full_width - config.margin.left  - config.margin.right;
    this.height = config.full_height - config.margin.bottom - config.margin.top;

    this._svg = d3.select(this.container)
        .append("div")
        .classed("svg-container", true)
        .append("svg")
        .attr("class", "widget")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 " + config.full_width + " " + config.full_height )
        .classed("svg-content-responsive", true)

    this._chart = this._svg
        .append('g')
        .attr("transform", "translate(" + config.margin.left + "," + config.margin.top + ")");

};


AreaHeader.prototype._draw_header = function(){

    var self = this;

    this._indicator_text = component.text(self, {
        str: "Area Report:",
        font_size: "2em",
        x: 0,
        y: 1.65 * 14,
        dy: 0,
        width: this.width,
        id: "#indicator" + this.widgetId
    })

    this._indicator_text.render()

};

AreaHeader.prototype._draw_gender = function(){

    var self = this;

    this._gender_text = component.text(self, {
        str: this.gender,
        font_size: "1.5em",
        x: 0,
        y: 4 * 14,
        width: this.width,
        id: "#gender" + this.widgetId
    })

    this._gender_text.render()

};

AreaHeader.prototype._draw_area_name = function(){

    var self = this;

    var current_area_name = controller._get_area_name(controller.state.current_area);

    this._area_text = component.text(self, {
        str: current_area_name,
        font_size: "1.5em",
        x: 0,
        y: 6.5 * 14,
        width: this.width,
        fill: controller.config.colorScheme.highlight_color,
        id: "#areaName" + this.widgetId
    })

    this._area_text.render()

};


AreaHeader.prototype._draw_area_type = function(){

    var self = this;

    var areaType = controller.getKeyByValue(controller.config.areaTypeMapping, controller.state.areaType); //get the area type
    areaTypeLabel = controller.config.areaTypeLabels[areaType];

    this._area_text = component.text(self, {
        str: "Wessex " + areaTypeLabel,
        font_size: "1.5em",
        x: 0,
        y: 13 * 14,
        width: this.width,
        id: "#areaType" + this.widgetId
    })

    this._area_text.render()

};

AreaHeader.prototype._draw_map = function(){


    var fFill = function(d){
        if(d.properties.id == controller.state.current_area){
            return controller.config.colorScheme.highlight_color
        } else {
            return "white"
        }
    };

    var self = this;

    this._map = component.map(self, {

        x:0,
        y:16 * 14,
        compHeight: 10 * 14,
        compWidth: self.width,
        style: {
            stroke: controller.config.colorScheme.background_color,
            "stroke-width": 2,
            fill: fFill
        }


    })

    this._map.render();

};

AreaHeader.prototype._draw_timeSlider = function(){

    var self = this;


    this._timeSlider = component.timeSlider(self, {

        x:0,
        y: 34 * 14,
        compHeight: 3 * 14,
        compWidth: self.width,
        firstPeriod: controller.config.firstPeriod,
        lastPeriod: controller.config.lastPeriod

    })

    this._timeSlider.render();

};








AreaHeader.prototype._add_help_button = function(){

    var config = controller.config;
    var self = this;

    var r = 10
    var margin = 5;
    var x =  config.full_width - r - margin;
    var y = r + margin

    this.help_circle = this._svg
        .append("circle")
        .attr("class", "clickable")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", r)
        .style("fill", "white")
        .on("click", self._draw_help.bind(this));


    this._help_text = this._svg
        .append('text')
        .attr("class", "clickable")
        .attr("x", x)
        .attr("y", y)
        .attr("dy", margin)
        .attr("text-anchor", "middle")
        .attr('font-family', 'FontAwesome')
        .style("fill", self.cs.background_color)
        .text('\uf128')
        .on("click", self._draw_help.bind(this));


};

AreaHeader.prototype._add_return_to_graph_button = function(){

    var config = controller.config;
    var self = this;

    var r = 10
    var margin = 5;
    var x =  config.full_width - r - margin;
    var y = r + margin

    this.help_circle = this._svg
        .append("circle")
        .attr("class", "clickable")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", r)
        .style("fill", "white")
        .on("click", self._redraw.bind(this));



    this._help_text = this._svg
        .append('text')
        .attr("class", "clickable")
        .attr("x", x)
        .attr("y", y)
        .attr("dy", margin)
        .attr("text-anchor", "middle")
        .attr('font-family', 'FontAwesome')
        .style("fill", self.cs.background_color)
        .text('\uf112')
        .on("click", self._redraw.bind(this));

};

AreaHeader.prototype._draw_help = function(){

    this._svg.remove();
    this._build_graph();
    this._draw_help_text();
    this._add_return_to_graph_button();

};

AreaHeader.prototype._redraw = function(){

    this._svg.remove();
    this._draw_all();

};

AreaHeader.prototype._draw_help_text = function(){
    //todo
};