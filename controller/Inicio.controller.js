sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("netflix.controller.Inicio", {
            onInit: function () {
                let menu = {
                    first : "HOME",
                    second : "SERIES"
                };

                let menuModel = new JSONModel();
                menuModel.setData(menu);

                let screen = this.getView();
            screen.setModel(menuModel, "ModelMenu");

            let result = {
                titles : []
            };
            let seriesModel = new JSONModel();
            seriesModel.setData(result);
            screen.setModel(seriesModel, "APISeries");

            },
            onPressLinkHome: function() {
                alert("Você clicou em home")
            },
            onPressLinkSeries: function() {
                alert("Você clicou em séries")
            },
            onPressSearch: function() {
                let query = this.byId("inputSearch").getValue();
                // alert(query)
                
                const settings = {
                    async: true,
                    crossDomain: true,
                    url: 'https://netflix54.p.rapidapi.com/search/?query=' + query + '&offset=0&limit_titles=50&limit_suggestions=20&lang=en',
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': 'ebbc03753bmsh9597ecd442aaa7ap156c6cjsna2169b1acd1d',
                        'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
                    }
                };
                
                $.ajax(settings).done(function (response) {
                   // console.log(response);
                   let view = this.getView();
                   let model = view.getModel("APISeries");
                   let dataResult = model.getData();

                   dataResult.titles = [];
                   dataResult.titles = response.titles;
                   model.refresh();
                }.bind(this));
            }
        });
    });
