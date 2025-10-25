sap.ui.define([
    "student/com/sap/training/advancedsapui5/listdetail/controller/BaseController"
],
    function (Controller) {
        "use strict";

        return Controller.extend("student.com.sap.training.advancedsapui5.listdetail.controller.Carrier", {

            onInit: function () {
                var oList = this.byId("list");
                this._oList = oList;
                this.getView().addEventDelegate({
                    onBeforeFirstShow: function () {
                        this.getOwnerComponent().oListSelector.setBoundMasterList(this._oList);
                    }.bind(this)
                });
                this.getRouter().getRoute("Overview").attachPatternMatched(this._onListMatched, this);
                this.getRouter().attachBypassed(this.onBypassed, this);
            },

            _navigateToCarreirDetails: function (sCarrierId, bReplace) {
                this.getRouter().navTo("flights", { carrid: sCarrierId }, bReplace);
            },

            _showDetail: function (oItem) {
                var sCarrierId = oItem.getBindingContext().getProperty("Carrid");
                this._navigateToCarreirDetails(sCarrierId, !sap.ui.Device.system.phone);
            },

            onSelect: function (oEvent) {
                this._showDetail(oEvent.getParameter("listItem") || oEvent.getSource());
            },

            onBypassed: function () {
                this._oList.removeSelections(true);
            },

            _onListMatched: function () {
                this.getListSelector().oWhenListLoadingIsDone.then(
                    function (mParams) {
                        var sObjectId = mParams.oFirstListItem.getBindingContext().getProperty("Carrid");
                        this._navigateToCarreirDetails(sObjectId, !sap.ui.Device.system.phone);
                    }.bind(this)
                );
            }
        });
    });
