import StoreHouse from "./StoreHouseModel.js";
import StoreHouseController from "./StoreHouseController.js";
import StoreHouseView from "./StoreHouseView.js";

$(function() {
    const StoreHouseApp = new StoreHouseController(
        StoreHouse.getInstance(), new StoreHouseView()
    );
});

