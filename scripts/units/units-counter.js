const iterationTools = require("utils/iteration-tools");
const relativeValue = require("utils/relative-value");
const supportUnits = require("units/support-units");
const coreUnits = require("units/core-units");
const blacklist = require("units/blacklist");

exports.getUnitsValueTop = function(amountToDisplay, granulatiry, hideCoreUnits, hideSupportUnits) {
    let unitsIterator = Groups.unit.iterator();
    let top = new Map();

    let unitCounter = (unit) => {
        if (hideCoreUnits && coreUnits.includes(unit.type.toString())) return;
        if (hideSupportUnits && supportUnits.includes(unit.type.toString())) return;
        if (blacklist.includes(unit.type.toString())) return;

        let team = unit.team;
        let units;

        if (!top.has(team.id)) {
            top.set(team.id, {team: team, units: {}});
        }
        units = top.get(team.id).units;

        if (!units[unit.type]) {
            units[unit.type] = {amount: 0, entity: unit};
        }
        units[unit.type].amount++;
    }

    iterationTools.iterateSeq(unitCounter, unitsIterator);

    top.forEach((teamInfo, team_id) => {
        let value = 0;
        let units = teamInfo.units;
        for (let unit in units) {
            let unitValue = units[unit].amount * relativeValue.getUnitValue(unit);
            units[unit].value = unitValue;
            value += unitValue;
        }
        top.get(team_id).units = Object.fromEntries(
            Object.entries(units)
                .sort(([,a],[,b]) => b.value - a.value)
                .slice(0, granulatiry)
        );
        top.get(team_id).value = value;
    })

    return Array.from(top.entries()).sort((a, b) => b[1].value - a[1].value).slice(0, amountToDisplay);
}

exports.isDangerous = function(unit) {
    let type = unit.type.toString();
    if (coreUnits.includes(type)) return false;
    if (supportUnits.includes(type)) return false;
    return true;
}
