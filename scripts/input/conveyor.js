const euiEvents = require("utils/event/events");
const drawPlans = require("utils/draw/build-plan");
const adjacentPosition = require("utils/ai/adjacent-position");
const pathfind = require("utils/ai/pathfind");
const busy = require("input/busy");

const pathfindSelector = (block) => {
    if (block == Blocks.conveyor ||
        block == Blocks.titaniumConveyor) return pathfind.conveyorPathfind;
    if (block == Blocks.junction) return pathfind.junctionPathfind;
    if (block == Blocks.underflowGate) return pathfind.gatePathfind;
}

let isListen = false;
let buildPlans = [];
let lastStartTile = null;
let lastMouseTile = null;

Events.run(Trigger.draw, () => {
    if (buildPlans) {
        drawPlans.draw(buildPlans);
    }
});

const listener = (startPos, startTile, pos, mouseTile) => {
    if (Core.input.keyTap(Packages.arc.input.KeyCode.mouseRight)) {
        buildPlans = [];
        endListen();
        return;
    }
    if (startTile == lastStartTile && mouseTile == lastMouseTile) return;
    if (startTile == mouseTile) {
        buildPlans = [];
        return;
    }

    lastStartTile = startTile;
    lastMouseTile = mouseTile;
    const destination = adjacentPosition.find(mouseTile, startTile, Blocks.copperWall);
    if (!destination) return;

    const startBlock = startTile.block();
    buildPlans = pathfindSelector(startBlock)(startTile, destination, mouseTile, startBlock);
}

euiEvents.on(euiEvents.eventType.dragStarted, (startPos, startTile) => {
    if (startTile && pathfindSelector(startTile.block()) && !busy.isBusy() && !isListen) {
        startListen();
    }
});

euiEvents.on(euiEvents.eventType.dragEnded, () => {
    if (isListen) endListen();
});

function startListen() {
    if (Core.settings.getBool("eui-DragPathfind", false)) {
        isListen = true;
        euiEvents.on(euiEvents.eventType.dragged, listener);
    }
}

function endListen() {
    if (buildPlans) {
        buildPlans.forEach(plan => Vars.player.unit().addBuild(plan));
        buildPlans = [];
    }
    isListen = false;
    euiEvents.removeListener(euiEvents.eventType.dragged, listener);
}
