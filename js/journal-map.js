 am4core.useTheme(am4themes_animated);

    var chart = am4core.create("journal-worldmap", am4maps.MapChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.geodata = am4geodata_worldLow;
    chart.projection = new am4maps.projections.Miller();

    // var title = chart.chartContainer.createChild(am4core.Label);
    // title.text = "Life expectancy in the World";
    // title.fontSize = 20;
    // title.paddingTop = 30;
    // title.align = "center";
    // title.zIndex = 100;

    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}: {value.value.formatNumber('#.0')}";
    polygonSeries.heatRules.push({
        property: "fill",
        target: polygonSeries.mapPolygons.template,
        min: am4core.color("#a9cce3"),
        max: am4core.color("#007398")
    });
    polygonSeries.useGeodata = true;

    // // add heat legend
    // var heatLegend = chart.chartContainer.createChild(am4maps.HeatLegend);
    // heatLegend.valign = "bottom";
    // heatLegend.align = "left";
    // heatLegend.width = am4core.percent(100);
    // heatLegend.series = polygonSeries;
    // heatLegend.orientation = "horizontal";
    // heatLegend.padding(20, 20, 20, 20);
    // heatLegend.valueAxis.renderer.labels.template.fontSize = 10;
    // heatLegend.valueAxis.renderer.minGridDistance = 40;

    polygonSeries.mapPolygons.template.events.on("over", event => {
        handleHover(event.target);
    });

    polygonSeries.mapPolygons.template.events.on("hit", event => {
        handleHover(event.target);
    });

    function handleHover(mapPolygon) {
        if (!isNaN(mapPolygon.dataItem.value)) {
            heatLegend.valueAxis.showTooltipAt(mapPolygon.dataItem.value);
        } else {
            heatLegend.valueAxis.hideTooltip();
        }
    }

    polygonSeries.mapPolygons.template.strokeOpacity = 0.4;
    polygonTemplate.fill = am4core.color("#CCC");
    polygonSeries.mapPolygons.template.events.on("out", event => {
        heatLegend.valueAxis.hideTooltip();
    });

    chart.zoomControl = new am4maps.ZoomControl();
    chart.zoomControl.valign = "top";

    // life expectancy data
    polygonSeries.data = [
        { id: "US", value: 40 },
        { id: "DE", value: 16 },
        { id: "GB", value: 15 },
        { id: "CN", value: 1 },
        { id: "CH", value: 5 },
        { id: "NL", value: 6 },
        { id: "RO", value: 1 },
        { id: "FR", value: 1 },
        { id: "SI", value: 2 },
        { id: "HR", value: 2 },
        { id: "MX", value: 5 },
        { id: "MY", value: 1 },
        { id: "IT", value: 1 },
        { id: "PL", value: 2 },
        { id: "SG", value: 7 },
        { id: "AE", value: 1 },
        { id: "JP", value: 3 },
        { id: "IL", value: 1 }
    ];

    // excludes Antarctica
    polygonSeries.exclude = ["AQ"];