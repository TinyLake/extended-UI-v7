const Alerts = require("ui/alerts/alert");
const output = require("utils/output-wrapper");
const supportUnits = require("units/support-units");

const maxTime = 60*300 // 5 min;

let sended;
let timer;

Events.on(EventType.WorldLoadEvent, () => {
    sended = false;
    timer = Time.time;
});

let event = (event) => {
    const unit = event.unit;
    if (sended || !supportUnits.includes(unit.type.toString()) || unit.team != Vars.player.team()) return;
    if (Time.time - timer < maxTime) {
        output.ingameAlert(Core.bundle.get("alerts.losing-support"));
        sended = true;
    }
}

new Alerts.BaseAlert(
    () => {
        Events.on(UnitDestroyEvent, event);
    },
    () => {
        Events.remove(UnitDestroyEvent, event);
    }
)
