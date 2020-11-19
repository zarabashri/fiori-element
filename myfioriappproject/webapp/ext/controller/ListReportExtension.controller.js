sap.ui.define([
    "sap/ui/comp/smartfilterbar/SmartFilterBar",
    "sap/m/ComboBox",
    "sap/ui/model/Filter",
    "sap/ui/comp/smartfield/SmartField",
    "sap/m/Dialog",
    "sap/m/Text",
    "sap/m/Button",
    "sap/m/ButtonType",
    "sap/m/DialogType"
], function (SmartFilterBar, ComboBox, Filter, SmartField, Dialog, Text, Button, ButtonType, DialogType) {
    "use strict";

    return sap.ui.controller("com.rizing.myfioriappproject.ext.controller.ListReportExtension", {

        /**
         * Event handler before rebinding the smarttable.
         * @param {sap.ui.base.Event} oEvent The smarttable beforeRebindTable event.
         * @public
         */
        onBeforeRebindTableExtension: function (oEvent) {
            var oBindingParams = oEvent.getParameter("bindingParams");
            oBindingParams.parameters = oBindingParams.parameters || {};

            var oSmartTable = oEvent.getSource();
            var oSmartFilterBar = this.byId(oSmartTable.getSmartFilterId());
            var vCategory;

            if (oSmartFilterBar instanceof SmartFilterBar) {
                //Custom TotalSales filter
                var oCustomControl = oSmartFilterBar.getControlByKey(
                    "CustomTotalSalesFilter"
                );
                if (oCustomControl instanceof ComboBox) {
                    vCategory = oCustomControl.getSelectedKey();
                    switch (vCategory) {
                        case "0":
                            oBindingParams.filters.push(
                                new Filter("TotalSales", "LE", "500000")
                            );
                            break;
                        case "1":
                            oBindingParams.filters.push(
                                new Filter("TotalSales", "GT", "500000")
                            );
                            break;
                        default:
                            break;
                    }
                }
            }
        },

        /**
        * Event handler when user pressed the Change Total Sales button.
        * @param {sap.ui.base.Event} oEvent The button press event.
        * @public
        */
        onPressChangeTotalSales: function (oEvent) {
            var oSmartTable = oEvent.getSource().getParent().getParent().getParent().getTable();
            var oItem = oSmartTable.getSelectedItem();
            if (oItem) {
                var oContext = oItem.getBindingContext();
                this._showChangeTotalSalesPopup(oContext);
            }
        },

        /**
        * Show the Change Total Sales Popup.
        * @param {object} oContext Selected Item Context.
        * @private
        */
        _showChangeTotalSalesPopup: function (oContext) {
            var oModel = this.getView().getModel();
            var oI18nModel = this.getView().getModel("@i18n");

            var oField = new SmartField({
                value: "{TotalSales}",
            });

            var oParameterDialog = new Dialog({
                type: DialogType.Message,
                title: oI18nModel.getProperty("changeTotalSalesLabel"),
                content: [
                    new Text({
                        text: oI18nModel.getProperty("newTotalSalesLabel"),
                    }),
                    oField,
                ],
                beginButton: new Button({
                    type: ButtonType.Emphasized,
                    text: oI18nModel.getProperty("okButton"),
                    press: function () {
                        this.getView().getModel().submitChanges();
                        oParameterDialog.close();
                    }.bind(this),
                }),
                endButton: new Button({
                    text: oI18nModel.getProperty("cancelButton"),
                    press: function () {
                        this.getView().getModel().resetChanges();
                        oParameterDialog.close();
                    }.bind(this),
                }),
                afterClose: function () {
                    oParameterDialog.destroy();
                },
            });
            oParameterDialog.setModel(oModel);
            oParameterDialog.setBindingContext(oContext);
            oParameterDialog.open();
        }
    });
});