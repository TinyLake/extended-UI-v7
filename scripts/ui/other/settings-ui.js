Events.on(EventType.ClientLoadEvent, () => {
    Vars.ui.settings.addCategory("@eui.name", contentTable => {
        // contentTable.checkPref("eui-showPowerBar", true);
        // contentTable.checkPref("eui-showFactoryProgress", true);
        // contentTable.checkPref("eui-showUnitBar", true);
        contentTable.checkPref("eui-ShowUnitTable", true);
        // contentTable.checkPref("eui-ShowBlockInfo", true);
        contentTable.checkPref("eui-ShowAlerts", true);
        contentTable.checkPref("eui-ShowAlertsBottom", false);
        // contentTable.checkPref("eui-ShowResourceRate", false);
        contentTable.checkPref("eui-ShowSchematicsTable", true);
        contentTable.checkPref("eui-ShowSchematicsPreview", true);
        contentTable.sliderPref("eui-SchematicsTableRows", 4, 2, 10, 1, i => i);
        contentTable.sliderPref("eui-SchematicsTableColumns", 5, 4, 8, 1, i => i);
        contentTable.sliderPref("eui-SchematicsTableButtonSize", 30, 20, 80, 5, i => i);
        // contentTable.checkPref("eui-ShowEfficiency", false);
        // contentTable.sliderPref("eui-EfficiencyTimer", 15, 10, 180, 5, i => i);
        // contentTable.checkPref("eui-TrackPlayerCursor", false);
        // contentTable.sliderPref("eui-playerCursorStyle", 7, 1, 7, 1, i => i);
        // contentTable.checkPref("eui-ShowOwnCursor", false);
        // contentTable.checkPref("eui-TrackLogicControl", false);
        // contentTable.sliderPref("eui-maxZoom", 10, 1, 10, 1, i => i);
        // contentTable.checkPref("eui-makeMineble", false);
        contentTable.checkPref("eui-showInteractSettings", true);
        contentTable.sliderPref("eui-action-delay", 500, 0, 3000, 25, i => i + " ms");
        if (!Vars.mobile) {
            contentTable.checkPref("eui-DragBlock", false);
            contentTable.checkPref("eui-DragPathfind", false);
        }
    })
});
