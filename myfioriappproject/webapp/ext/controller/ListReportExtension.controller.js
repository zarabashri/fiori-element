sap.ui.define([
    "sap/ui/comp/smartfilterbar/SmartFilterBar",
    "sap/m/ComboBox",
    "sap/ui/model/Filter"
], function (SmartFilterBar, ComboBox, Filter) {
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
        }
    });
});