// Variables
let gamemode = 2; // 2 = ranked, 3 = private

const defaultMatchCount = 5;
const matchCountLimit = 5;

let previousName = "(Search for player)";
let previousMatchCount = defaultMatchCount;
let matchCount = defaultMatchCount;

let ign = "(Search for player)";
let uuid = "";

let versusUUID = "";
let versusToggle = false;
let versusIGN = "(Search for player 2)"
let previousVersusIGN = "(Search for player 2)";

let versus_gamemode2 = 2;

let versus_matchCount2 = defaultMatchCount;
let versus_previousMatchCount1 = defaultMatchCount;
let versus_previousMatchCount2 = defaultMatchCount;

const parrots = [
    "gifs/BlueParrotDancing.gif",
    "gifs/CyanParrotDancing.gif",
    "gifs/GreyParrotDancing.gif",
    "gifs/RedParrotDancing.gif"
]

let overworlds = {
    "BURIED_TREASURE": [0, 0],
    "VILLAGE": [0, 0],
    "SHIPWRECK": [0, 0],
    "DESERT_TEMPLE": [0, 0],
    "RUINED_PORTAL": [0, 0],
}

let bastions = {
    "BRIDGE": [0, 0, 0],
    "HOUSING": [0, 0, 0],
    "STABLES": [0, 0, 0],
    "TREASURE": [0, 0, 0]
}

let timings = {
    "overworld": {
        "splits": [0, 0],
        "timestamps": [0, 0],
        "deaths": 0
    },
    "nether": {
        "splits": [0, 0],
        "timestamps": [0, 0],
        "deaths": 0
    },
    "bastion": {
        "splits": [0, 0],
        "timestamps": [0, 0],
        "deaths": 0
    },
    "fortress": {
        "splits": [0, 0],
        "timestamps": [0, 0],
        "deaths": 0
    },
    "blind": {
        "splits": [0, 0],
        "timestamps": [0, 0],
        "deaths": 0
    },
    "stronghold": {
        "splits": [0, 0],
        "timestamps": [0, 0],
        "deaths": 0
    },
    "end": {
        "splits": [0, 0],
        "timestamps": [0, 0],
        "deaths": 0
    },
    "completions": [0, 0]
};

let versus_overworlds2 = {
    "BURIED_TREASURE": [0, 0],
    "VILLAGE": [0, 0],
    "SHIPWRECK": [0, 0],
    "DESERT_TEMPLE": [0, 0],
    "RUINED_PORTAL": [0, 0],
}

let versus_bastions2 = {
    "BRIDGE": [0, 0, 0],
    "HOUSING": [0, 0, 0],
    "STABLES": [0, 0, 0],
    "TREASURE": [0, 0, 0]
}

let versus_timings2 = {
    "overworld": {
        "splits": [0, 0],
        "timestamps": [0, 0],
        "deaths": 0
    },
    "nether": {
        "splits": [0, 0],
        "timestamps": [0, 0],
        "deaths": 0
    },
    "bastion": {
        "splits": [0, 0],
        "timestamps": [0, 0],
        "deaths": 0
    },
    "fortress": {
        "splits": [0, 0],
        "timestamps": [0, 0],
        "deaths": 0
    },
    "blind": {
        "splits": [0, 0],
        "timestamps": [0, 0],
        "deaths": 0
    },
    "stronghold": {
        "splits": [0, 0],
        "timestamps": [0, 0],
        "deaths": 0
    },
    "end": {
        "splits": [0, 0],
        "timestamps": [0, 0],
        "deaths": 0
    },
    "completions": [0, 0]
};

// Elements
const PageTitle = document.getElementById("pageTitle");

const Nameplate = document.getElementById("nameplate");

const PlayerName = document.getElementById("playerName");
const PbLabel = document.getElementById("pbLabel");
const WinRateLabel = document.getElementById("winRateLabel");
const PlayerModel = document.getElementById("playerModel");
const NameplateParrot = document.getElementById("nameplateParrot");

const PlayerNameContainer = document.getElementById("playerNameContainer");
const PlayerModelContainer = document.getElementById("playerModelContainer");
const PlayerInfoContainer = document.getElementById("playerInfoContainer");
const NameplateLoading = document.getElementById("nameplateLoading");

const configUI = document.getElementById("configUI");

const GamemodeDiv = document.getElementById("gamemodeDiv");

const RankedButton = document.getElementById("Ranked");
const PrivateButton = document.getElementById("Private");

const MatchCountChanger = document.getElementById("matchCountChanger");

const MatchCount = document.getElementById("MatchCount");
const MatchCountSlider = document.getElementById("matchCountSlider");

const VersusButton = document.getElementById("versusButton");
const VersusSearch = document.getElementById("versusSearch");
const VersusSearchText = document.getElementById("versusSearchText");

const Versus_NameplatePlayer1 = document.getElementById("nameplatePlayer1");
const Versus_WinRateLabel1 = document.getElementById("versus_winRateLabel1");
const Versus_PbLabel1 = document.getElementById("versus_pbLabel1");
const Versus_PlayerName1 = document.getElementById("versus_playerName1");
const Versus_PlayerModel1 = document.getElementById("versus_playerModel1");

const Versus_RankedButton1 = document.getElementById("versus_ranked1");
const Versus_RankedButton2 = document.getElementById("versus_ranked2");
const Versus_PrivateButton1 = document.getElementById("versus_private1");
const Versus_PrivateButton2 = document.getElementById("versus_private2");

const Versus_MatchCount1 = document.getElementById("versus_matchCount1");
const Versus_MatchCount2 = document.getElementById("versus_matchCount2");
const Versus_MatchCountSlider1 = document.getElementById("versus_matchCountSlider1");
const Versus_MatchCountSlider2 = document.getElementById("versus_matchCountSlider2");

const Versus_NameplatePlayer2 = document.getElementById("nameplatePlayer2");
const Versus_WinRateLabel2 = document.getElementById("versus_winRateLabel2");
const Versus_PbLabel2 = document.getElementById("versus_pbLabel2");
const Versus_PlayerName2 = document.getElementById("versus_playerName2");
const Versus_PlayerModel2 = document.getElementById("versus_playerModel2");

const Versus_Config1 = document.getElementById("versus_config1");
const Versus_Config2 = document.getElementById("versus_config2");

const LoadingText = document.getElementById("loadingText");
const LoadingParrot = document.getElementById("loadingParrot");

const dataSection = document.getElementById("data");

const OverworldSplit = document.getElementById("overworldSplit");
const NetherSplit = document.getElementById("netherSplit");
const BastionSplit = document.getElementById("bastionSplit");
const FortressSplit = document.getElementById("fortressSplit");
const BlindSplit = document.getElementById("blindSplit");
const StrongholdSplit = document.getElementById("strongholdSplit");
const EndSplit = document.getElementById("endSplit");
const CompletionSplits = document.getElementById("completionSplits");

const OverworldDeaths = document.getElementById("overworldDeaths");
const NetherDeaths = document.getElementById("netherDeaths");
const BastionDeaths = document.getElementById("bastionDeaths");
const FortressDeaths = document.getElementById("fortressDeaths");
const BlindDeaths = document.getElementById("blindDeaths");
const StrongholdDeaths = document.getElementById("strongholdDeaths");
const EndDeaths = document.getElementById("endDeaths");

const NetherTimestamp = document.getElementById("netherTimestamp");
const BastionTimestamp = document.getElementById("bastionTimestamp");
const FortressTimestamp = document.getElementById("fortressTimestamp");
const BlindTimestamp = document.getElementById("blindTimestamp");
const StrongholdTimestamp = document.getElementById("strongholdTimestamp");
const EndTimestamp = document.getElementById("endTimestamp");
const AverageCompletion = document.getElementById("avgCompletion");

const BuriedTreasure = document.getElementById("bt");
const Village = document.getElementById("village");
const Shipwreck = document.getElementById("shipwreck");
const DesertTemple = document.getElementById("dt");
const RuinedPortal = document.getElementById("rp");

const Bridge = document.getElementById("bridge");
const Housing = document.getElementById("housing");
const Stables = document.getElementById("stables");
const Treasure = document.getElementById("treasure");

const BridgeDeaths = document.getElementById("bridgeDeaths");
const HousingDeaths = document.getElementById("housingDeaths");
const StablesDeaths = document.getElementById("stablesDeaths");
const TreasureDeaths = document.getElementById("treasureDeaths");

const Versus_Data1 = document.getElementById("versus_data1");
const Versus_Data2 = document.getElementById("versus_data2");

const Versus_OverworldSplit1 = document.getElementById("versus_overworldSplit1");
const Versus_NetherSplit1 = document.getElementById("versus_netherSplit1");
const Versus_BastionSplit1 = document.getElementById("versus_bastionSplit1");
const Versus_FortressSplit1 = document.getElementById("versus_fortressSplit1");
const Versus_BlindSplit1 = document.getElementById("versus_blindSplit1");
const Versus_StrongholdSplit1 = document.getElementById("versus_strongholdSplit1");
const Versus_EndSplit1 = document.getElementById("versus_endSplit1");
const Versus_CompletionSplits1 = document.getElementById("versus_completionSplits1");

const Versus_OverworldSplitDiff1 = document.getElementById("versus_overworldSplitDiff1");
const Versus_NetherSplitDiff1 = document.getElementById("versus_netherSplitDiff1");
const Versus_BastionSplitDiff1 = document.getElementById("versus_bastionSplitDiff1");
const Versus_FortressSplitDiff1 = document.getElementById("versus_fortressSplitDiff1");
const Versus_BlindSplitDiff1 = document.getElementById("versus_blindSplitDiff1");
const Versus_StrongholdSplitDiff1 = document.getElementById("versus_strongholdSplitDiff1");
const Versus_EndSplitDiff1 = document.getElementById("versus_endSplitDiff1");
const Versus_CompletionSplitDiff1 = document.getElementById("versus_completionSplitsDiff1");

const Versus_OverworldSplitDiff2 = document.getElementById("versus_overworldSplitDiff2");
const Versus_NetherSplitDiff2 = document.getElementById("versus_netherSplitDiff2");
const Versus_BastionSplitDiff2 = document.getElementById("versus_bastionSplitDiff2");
const Versus_FortressSplitDiff2 = document.getElementById("versus_fortressSplitDiff2");
const Versus_BlindSplitDiff2 = document.getElementById("versus_blindSplitDiff2");
const Versus_StrongholdSplitDiff2 = document.getElementById("versus_strongholdSplitDiff2");
const Versus_EndSplitDiff2 = document.getElementById("versus_endSplitDiff2");
const Versus_CompletionSplitDiff2 = document.getElementById("versus_completionSplitsDiff2");

const Versus_OverworldDeaths1 = document.getElementById("versus_overworldDeaths1");
const Versus_NetherDeaths1 = document.getElementById("versus_netherDeaths1");
const Versus_BastionDeaths1 = document.getElementById("versus_bastionDeaths1");
const Versus_FortressDeaths1 = document.getElementById("versus_fortressDeaths1");
const Versus_BlindDeaths1 = document.getElementById("versus_blindDeaths1");
const Versus_StrongholdDeaths1 = document.getElementById("versus_strongholdDeaths1");
const Versus_EndDeaths1 = document.getElementById("versus_endDeaths1");

const Versus_NetherTimestamp1 = document.getElementById("versus_netherTimestamp1");
const Versus_BastionTimestamp1 = document.getElementById("versus_bastionTimestamp1");
const Versus_FortressTimestamp1 = document.getElementById("versus_fortressTimestamp1");
const Versus_BlindTimestamp1 = document.getElementById("versus_blindTimestamp1");
const Versus_StrongholdTimestamp1 = document.getElementById("versus_strongholdTimestamp1");
const Versus_EndTimestamp1 = document.getElementById("versus_endTimestamp1");
const Versus_AverageCompletion1 = document.getElementById("versus_avgCompletion1");

const Versus_NetherEnterDiff1 = document.getElementById("versus_netherEnterDiff1");
const Versus_BastionEnterDiff1 = document.getElementById("versus_bastionEnterDiff1");
const Versus_FortressEnterDiff1 = document.getElementById("versus_fortressEnterDiff1");
const Versus_BlindEnterDiff1 = document.getElementById("versus_blindEnterDiff1");
const Versus_StrongholdEnterDiff1 = document.getElementById("versus_strongholdEnterDiff1");
const Versus_EndEnterDiff1 = document.getElementById("versus_endEnterDiff1");
const Versus_AvgCompletionDiff1 = document.getElementById("versus_avgCompletionDiff1");

const Versus_NetherEnterDiff2 = document.getElementById("versus_netherEnterDiff2");
const Versus_BastionEnterDiff2 = document.getElementById("versus_bastionEnterDiff2");
const Versus_FortressEnterDiff2 = document.getElementById("versus_fortressEnterDiff2");
const Versus_BlindEnterDiff2 = document.getElementById("versus_blindEnterDiff2");
const Versus_StrongholdEnterDiff2 = document.getElementById("versus_strongholdEnterDiff2");
const Versus_EndEnterDiff2 = document.getElementById("versus_endEnterDiff2");
const Versus_AvgCompletionDiff2 = document.getElementById("versus_avgCompletionDiff2");

const Versus_BuriedTreasure1 = document.getElementById("versus_bt1");
const Versus_Village1 = document.getElementById("versus_village1");
const Versus_Shipwreck1 = document.getElementById("versus_shipwreck1");
const Versus_DesertTemple1 = document.getElementById("versus_dt1");
const Versus_RuinedPortal1 = document.getElementById("versus_rp1");

const Versus_BuriedTreasureDiff1 = document.getElementById("versus_btDiff1");
const Versus_VillageDiff1 = document.getElementById("versus_villageDiff1");
const Versus_ShipwreckDiff1 = document.getElementById("versus_shipwreckDiff1");
const Versus_DesertTempleDiff1 = document.getElementById("versus_dtDiff1");
const Versus_RuinedPortalDiff1 = document.getElementById("versus_rpDiff1");

const Versus_BuriedTreasureDiff2 = document.getElementById("versus_btDiff2");
const Versus_VillageDiff2 = document.getElementById("versus_villageDiff2");
const Versus_ShipwreckDiff2 = document.getElementById("versus_shipwreckDiff2");
const Versus_DesertTempleDiff2 = document.getElementById("versus_dtDiff2");
const Versus_RuinedPortalDiff2 = document.getElementById("versus_rpDiff2");

const Versus_Bridge1 = document.getElementById("versus_bridge1");
const Versus_Housing1 = document.getElementById("versus_housing1");
const Versus_Stables1 = document.getElementById("versus_stables1");
const Versus_Treasure1 = document.getElementById("versus_treasure1");

const Versus_BridgeDeaths1 = document.getElementById("versus_bridgeDeaths1");
const Versus_HousingDeaths1 = document.getElementById("versus_housingDeaths1");
const Versus_StablesDeaths1 = document.getElementById("versus_stablesDeaths1");
const Versus_TreasureDeaths1 = document.getElementById("versus_treasureDeaths1");

const Versus_BridgeDiff1 = document.getElementById("versus_bridgeDiff1");
const Versus_HousingDiff1 = document.getElementById("versus_housingDiff1");
const Versus_StablesDiff1 = document.getElementById("versus_stablesDiff1");
const Versus_TreasureDiff1 = document.getElementById("versus_treasureDiff1");

const Versus_BridgeDiff2 = document.getElementById("versus_bridgeDiff2");
const Versus_HousingDiff2 = document.getElementById("versus_housingDiff2");
const Versus_StablesDiff2 = document.getElementById("versus_stablesDiff2");
const Versus_TreasureDiff2 = document.getElementById("versus_treasureDiff2");

const Versus_OverworldSplit2 = document.getElementById("versus_overworldSplit2");
const Versus_NetherSplit2 = document.getElementById("versus_netherSplit2");
const Versus_BastionSplit2 = document.getElementById("versus_bastionSplit2");
const Versus_FortressSplit2 = document.getElementById("versus_fortressSplit2");
const Versus_BlindSplit2 = document.getElementById("versus_blindSplit2");
const Versus_StrongholdSplit2 = document.getElementById("versus_strongholdSplit2");
const Versus_EndSplit2 = document.getElementById("versus_endSplit2");
const Versus_CompletionSplits2 = document.getElementById("versus_completionSplits2");

const Versus_OverworldDeaths2 = document.getElementById("versus_overworldDeaths2");
const Versus_NetherDeaths2 = document.getElementById("versus_netherDeaths2");
const Versus_BastionDeaths2 = document.getElementById("versus_bastionDeaths2");
const Versus_FortressDeaths2 = document.getElementById("versus_fortressDeaths2");
const Versus_BlindDeaths2 = document.getElementById("versus_blindDeaths2");
const Versus_StrongholdDeaths2 = document.getElementById("versus_strongholdDeaths2");
const Versus_EndDeaths2 = document.getElementById("versus_endDeaths2");

const Versus_NetherTimestamp2 = document.getElementById("versus_netherTimestamp2");
const Versus_BastionTimestamp2 = document.getElementById("versus_bastionTimestamp2");
const Versus_FortressTimestamp2 = document.getElementById("versus_fortressTimestamp2");
const Versus_BlindTimestamp2 = document.getElementById("versus_blindTimestamp2");
const Versus_StrongholdTimestamp2 = document.getElementById("versus_strongholdTimestamp2");
const Versus_EndTimestamp2 = document.getElementById("versus_endTimestamp2");
const Versus_AverageCompletion2 = document.getElementById("versus_avgCompletion2");

const Versus_BuriedTreasure2 = document.getElementById("versus_bt2");
const Versus_Village2 = document.getElementById("versus_village2");
const Versus_Shipwreck2 = document.getElementById("versus_shipwreck2");
const Versus_DesertTemple2 = document.getElementById("versus_dt2");
const Versus_RuinedPortal2 = document.getElementById("versus_rp2");

const Versus_Bridge2 = document.getElementById("versus_bridge2");
const Versus_Housing2 = document.getElementById("versus_housing2");
const Versus_Stables2 = document.getElementById("versus_stables2");
const Versus_Treasure2 = document.getElementById("versus_treasure2");

const Versus_BridgeDeaths2 = document.getElementById("versus_bridgeDeaths2");
const Versus_HousingDeaths2 = document.getElementById("versus_housingDeaths2");
const Versus_StablesDeaths2 = document.getElementById("versus_stablesDeaths2");
const Versus_TreasureDeaths2 = document.getElementById("versus_treasureDeaths2");

// Misc functions
function msToMinSecs(ms) {
    let mins = ms / 60000;
    let secs = parseInt(60 * (mins - parseInt(mins)));

    if (isNaN(mins) || isNaN(secs)) {
        return "N/A";
    }

    if (secs < 10) {
        return String(parseInt(mins)) + ":0" + String(secs);
    }

    return String(parseInt(mins)) + ":" + String(secs);
}

function percentageCalc(e1, e2) {
    let result = e1 / e2 * 100;
    if (isNaN(result)) {
        return "N/A";
    }

    return result.toFixed(1) + "%";
}

function randomiseParrot(parrot) {
    if (parrot == 0) { // Loading Parrot
        LoadingParrot.src = parrots[Math.floor(Math.random() * (3 + 1) )];
    } else { // Nameplate Parrot
        NameplateParrot.src = parrots[Math.floor(Math.random() * (3 + 1) )];
    }
}

function calculateDiff(time1, time2, label) {
    result = Math.abs(time1 - time2);
    converted = msToMinSecs(result);

    if (converted == "N/A") {
        label.textContent = " (N/A)";
        label.style.color = "orange";
        return;
    }

    if (time1 > time2) {
        label.textContent = " (+" + converted + ")";
        label.style.color = "red";
    } else {
        label.textContent = " (-" + converted + ")";
        label.style.color = "lime";
    }
}

function configureInVersusMode() {
    if (versusToggle) {
        versusToggle = false;
        VersusSearch.style.display = "none";
        VersusButton.style.backgroundColor = "#202F3D";
        const text = PlayerName.innerText.trim();
        if (text) {
            history.pushState({}, '', '/' + encodeURIComponent(text));
        } else {
            history.pushState({}, '', '/');
        }
    }
}

async function versus1ChangeStats() {
    await call_Ranked_GetMatches_Internal();
    versus_display_info();
}

// Calling APIs
async function call_Ranked_GetMatch(matchID) {
    try {
        const response = await fetch("https://api.mcsrranked.com/matches/" + matchID);
        const statusCode = response.status;

        if (statusCode != 200) {
            PageTitle.textContent = "Error code: " + statusCode + " | Ranked Analysis"; 
            switch (statusCode) {
                case 400:
                    loadingText.textContent = "Invalid IGN!";
                    break;
                case 429:
                    loadingText.textContent = "Too many requests being made! Please wait a few minutes before proceeding!";
                    break;
            }
            return;
        }

        const data = await response.json();
        const timelines = data["data"]["timelines"];
        const overworldType = data["data"]["seed"]["overworld"];
        const bastionType = data["data"]["seed"]["nether"];

        let latestReset = 0;
        let finished = false;
        let finalTime = 0;
        let latestSplit = "overworld";

        let timestamps = {
            "enter_nether": 0,
            "enter_bastion": 0,
            "enter_fortress": 0,
            "blind": 0,
            "enter_stronghold": 0,
            "enter_end": 0
        };

        for (let i = 0; i < data["data"]["completions"].length; i++) {
            const c = data["data"]["completions"][i];
            if (c["uuid"] == uuid) {
                finalTime = c["time"];
                finished = true;
                timings["completions"][0] += c["time"];
                timings["completions"][1] += 1;
                break;
            }
        }

        for (let i = timelines.length - 1; i >= 0; i--) { // Start in ow, end in completion
            const timeline = timelines[i];

            if (timeline["uuid"] != uuid) continue;

            switch (timeline["type"]) {
                case "projectelo.timeline.reset":
                    latestReset = timeline["time"];
                    break;

                case "projectelo.timeline.death":
                    timings[latestSplit]["deaths"] += 1;
                    if (latestSplit == "bastion") {
                        bastions[bastionType][2] += 1;
                    }
                    break;
                
                case "story.enter_the_nether":
                    timestamps["enter_nether"] = timeline["time"];
                    timings["overworld"]["splits"][0] += timeline["time"] - latestReset;
                    timings["overworld"]["splits"][1] += 1;
                    timings["nether"]["timestamps"][0] += timeline["time"] - latestReset;
                    timings["nether"]["timestamps"][1] += 1;
                    latestSplit = "nether";
                    if (overworldType != null) {
                        overworlds[overworldType][0] += timeline["time"] - latestReset;
                        overworlds[overworldType][1] += 1;
                    }
                    break;
                
                case "nether.find_bastion":
                    timestamps["enter_bastion"] = timeline["time"];
                    timings["bastion"]["timestamps"][0] += timeline["time"] - latestReset;
                    timings["bastion"]["timestamps"][1] += 1;
                    timings["nether"]["splits"][0] += timeline["time"] - timestamps["enter_nether"];
                    timings["nether"]["splits"][1] += 1;
                    latestSplit = "bastion";
                    break;
                
                case "nether.find_fortress":
                    timestamps["enter_fortress"] = timeline["time"];
                    timings["fortress"]["timestamps"][0] += timeline["time"] - latestReset;
                    timings["fortress"]["timestamps"][1] += 1;
                    timings["bastion"]["splits"][0] += timeline["time"] - timestamps["enter_bastion"];
                    timings["bastion"]["splits"][1] += 1;
                    latestSplit = "fortress";
                    if (bastionType != null) {
                        bastions[bastionType][0] += timeline["time"] - timestamps["enter_bastion"];
                        bastions[bastionType][1] += 1;
                    }
                    break;

                case "projectelo.timeline.blind_travel":
                    timestamps["blind"] = timeline["time"];
                    timings["blind"]["timestamps"][0] += timeline["time"] - latestReset;
                    timings["blind"]["timestamps"][1] += 1;
                    timings["fortress"]["splits"][0] += timeline["time"] - timestamps["enter_fortress"];
                    timings["fortress"]["splits"][1] += 1;
                    latestSplit = "blind";
                    break;

                case "story.follow_ender_eye":
                    timestamps["enter_stronghold"] = timeline["time"];
                    timings["stronghold"]["timestamps"][0] += timeline["time"] - latestReset;
                    timings["stronghold"]["timestamps"][1] += 1;
                    timings["blind"]["splits"][0] += timeline["time"] - timestamps["blind"];
                    timings["blind"]["splits"][1] += 1;
                    latestSplit = "stronghold";
                    break;

                case "story.enter_the_end":
                    timestamps["enter_end"] = timeline["time"];
                    timings["end"]["timestamps"][0] += timeline["time"] - latestReset;
                    timings["end"]["timestamps"][1] += 1;
                    timings["stronghold"]["splits"][0] += timeline["time"] - timestamps["enter_stronghold"];
                    timings["stronghold"]["splits"][1] += 1;        
                    latestSplit = "end";
                    break;
            }
        }

        if (finished) {
            timings["end"]["splits"][0] += finalTime - timestamps["enter_end"];
            timings["end"]["splits"][1] += 1;
        }
    } catch (error) {
        console.error("ERROR IN 'call_Ranked_GetMatch': ", error);
    }
}

async function versus_call_Ranked_GetMatch2(matchID) {
    try {
        const response = await fetch("https://api.mcsrranked.com/matches/" + matchID);
        const statusCode = response.status;

        if (statusCode != 200) {
            PageTitle.textContent = "Error code: " + statusCode + " | Ranked Analysis"; 
            switch (statusCode) {
                case 400:
                    break;
                case 429:
                    break;
            }
            return;
        }

        const data = await response.json();
        const timelines = data["data"]["timelines"];
        const overworldType = data["data"]["seed"]["overworld"];
        const bastionType = data["data"]["seed"]["nether"];

        let latestReset = 0;
        let finished = false;
        let finalTime = 0;
        let latestSplit = "overworld";

        let timestamps = {
            "enter_nether": 0,
            "enter_bastion": 0,
            "enter_fortress": 0,
            "blind": 0,
            "enter_stronghold": 0,
            "enter_end": 0
        };

        for (let i = 0; i < data["data"]["completions"].length; i++) {
            const c = data["data"]["completions"][i];
            if (c["uuid"] == versusUUID) {
                finalTime = c["time"];
                finished = true;
                versus_timings2["completions"][0] += c["time"];
                versus_timings2["completions"][1] += 1;
                break;
            }
        }

        for (let i = timelines.length - 1; i >= 0; i--) { // Start in ow, end in completion
            const timeline = timelines[i];

            if (timeline["uuid"] != versusUUID) continue;

            switch (timeline["type"]) {
                case "projectelo.timeline.reset":
                    latestReset = timeline["time"];
                    break;

                case "projectelo.timeline.death":
                    versus_timings2[latestSplit]["deaths"] += 1;
                    if (latestSplit == "bastion") {
                        versus_bastions2[bastionType][2] += 1;
                    }
                    break;
                
                case "story.enter_the_nether":
                    timestamps["enter_nether"] = timeline["time"];
                    versus_timings2["overworld"]["splits"][0] += timeline["time"] - latestReset;
                    versus_timings2["overworld"]["splits"][1] += 1;
                    versus_timings2["nether"]["timestamps"][0] += timeline["time"] - latestReset;
                    versus_timings2["nether"]["timestamps"][1] += 1;
                    latestSplit = "nether";
                    if (overworldType != null) {
                        versus_overworlds2[overworldType][0] += timeline["time"] - latestReset;
                        versus_overworlds2[overworldType][1] += 1;
                    }
                    break;
                
                case "nether.find_bastion":
                    timestamps["enter_bastion"] = timeline["time"];
                    versus_timings2["bastion"]["timestamps"][0] += timeline["time"] - latestReset;
                    versus_timings2["bastion"]["timestamps"][1] += 1;
                    versus_timings2["nether"]["splits"][0] += timeline["time"] - timestamps["enter_nether"];
                    versus_timings2["nether"]["splits"][1] += 1;
                    latestSplit = "bastion";
                    break;
                
                case "nether.find_fortress":
                    timestamps["enter_fortress"] = timeline["time"];
                    versus_timings2["fortress"]["timestamps"][0] += timeline["time"] - latestReset;
                    versus_timings2["fortress"]["timestamps"][1] += 1;
                    versus_timings2["bastion"]["splits"][0] += timeline["time"] - timestamps["enter_bastion"];
                    versus_timings2["bastion"]["splits"][1] += 1;
                    latestSplit = "fortress";
                    if (bastionType != null) {
                        versus_bastions2[bastionType][0] += timeline["time"] - timestamps["enter_bastion"];
                        versus_bastions2[bastionType][1] += 1;
                    }
                    break;

                case "projectelo.timeline.blind_travel":
                    timestamps["blind"] = timeline["time"];
                    versus_timings2["blind"]["timestamps"][0] += timeline["time"] - latestReset;
                    versus_timings2["blind"]["timestamps"][1] += 1;
                    versus_timings2["fortress"]["splits"][0] += timeline["time"] - timestamps["enter_fortress"];
                    versus_timings2["fortress"]["splits"][1] += 1;
                    latestSplit = "blind";
                    break;

                case "story.follow_ender_eye":
                    timestamps["enter_stronghold"] = timeline["time"];
                    versus_timings2["stronghold"]["timestamps"][0] += timeline["time"] - latestReset;
                    versus_timings2["stronghold"]["timestamps"][1] += 1;
                    versus_timings2["blind"]["splits"][0] += timeline["time"] - timestamps["blind"];
                    versus_timings2["blind"]["splits"][1] += 1;
                    latestSplit = "stronghold";
                    break;

                case "story.enter_the_end":
                    timestamps["enter_end"] = timeline["time"];
                    versus_timings2["end"]["timestamps"][0] += timeline["time"] - latestReset;
                    versus_timings2["end"]["timestamps"][1] += 1;
                    versus_timings2["stronghold"]["splits"][0] += timeline["time"] - timestamps["enter_stronghold"];
                    versus_timings2["stronghold"]["splits"][1] += 1;    
                    latestSplit = "end";
                    break;
            }
        }

        if (finished) {
            versus_timings2["end"]["splits"][0] += finalTime - timestamps["enter_end"];
            versus_timings2["end"]["splits"][1] += 1;
            console.log("S");
        }
    } catch (error) {
        console.error("ERROR IN 'call_Ranked_GetMatch': ", error);
    }
}

async function call_Ranked_GetMatches_Internal() {
    const response = await fetch("https://api.mcsrranked.com/users/" + ign + "/matches?type=" + gamemode + "&count=" + matchCount);
    const statusCode = response.status;

    console.log("INT: " + ign);

    promises = [];

    overworlds = {
        "BURIED_TREASURE": [0, 0],
        "VILLAGE": [0, 0],
        "SHIPWRECK": [0, 0],
        "DESERT_TEMPLE": [0, 0],
        "RUINED_PORTAL": [0, 0],
    }

    bastions = {
        "BRIDGE": [0, 0, 0],
        "HOUSING": [0, 0, 0],
        "STABLES": [0, 0, 0],
        "TREASURE": [0, 0, 0]
    }

    timings = {
        "overworld": {
            "splits": [0, 0],
            "timestamps": [0, 0],
            "deaths": 0
        },
        "nether": {
            "splits": [0, 0],
            "timestamps": [0, 0],
            "deaths": 0
        },
        "bastion": {
            "splits": [0, 0],
            "timestamps": [0, 0],
            "deaths": 0
        },
        "fortress": {
            "splits": [0, 0],
            "timestamps": [0, 0],
            "deaths": 0
        },
        "blind": {
            "splits": [0, 0],
            "timestamps": [0, 0],
            "deaths": 0
        },
        "stronghold": {
            "splits": [0, 0],
            "timestamps": [0, 0],
            "deaths": 0
        },
        "end": {
            "splits": [0, 0],
            "timestamps": [0, 0],
            "deaths": 0
        },
        "completions": [0, 0]
    };

    if (statusCode != 200) {
        PageTitle.textContent = "Error code: " + statusCode + " | Ranked Analysis"; 
        switch (statusCode) {
            case 400:
                loadingText.textContent = "Invalid IGN!";
                break;
            case 429:
                loadingText.textContent = "Too many requests being made! Please wait a few minutes before proceeding!";
                break;
        }
        return;
    }

    const data = await response.json();

    for (const match of data["data"]) {
        const matchID = match["id"];
        promises.push(call_Ranked_GetMatch(matchID));
    }

    await Promise.all(promises);
        
    OverworldSplit.textContent = msToMinSecs(timings["overworld"]["splits"][0] / timings["overworld"]["splits"][1]) + " (" + timings["overworld"]["splits"][1] + ")";
    NetherSplit.textContent = msToMinSecs(timings["nether"]["splits"][0] / timings["nether"]["splits"][1]) + " (" + timings["nether"]["splits"][1] + ")";
    BastionSplit.textContent = msToMinSecs(timings["bastion"]["splits"][0] / timings["bastion"]["splits"][1]) + " (" + timings["bastion"]["splits"][1] + ")";
    FortressSplit.textContent = msToMinSecs(timings["fortress"]["splits"][0] / timings["fortress"]["splits"][1]) + " (" + timings["fortress"]["splits"][1] + ")";
    BlindSplit.textContent = msToMinSecs(timings["blind"]["splits"][0] / timings["blind"]["splits"][1]) + " (" + timings["blind"]["splits"][1] + ")";
    StrongholdSplit.textContent = msToMinSecs(timings["stronghold"]["splits"][0] / timings["stronghold"]["splits"][1]) + " (" + timings["stronghold"]["splits"][1] + ")";
    EndSplit.textContent = msToMinSecs(timings["end"]["splits"][0] / timings["end"]["splits"][1]) + " (" + timings["end"]["splits"][1] + ")";
    CompletionSplits.textContent = msToMinSecs(timings["overworld"]["splits"][0] / timings["overworld"]["splits"][1] + timings["nether"]["splits"][0] / timings["nether"]["splits"][1] + timings["bastion"]["splits"][0] / timings["bastion"]["splits"][1] + timings["fortress"]["splits"][0] / timings["fortress"]["splits"][1] + timings["blind"]["splits"][0] / timings["blind"]["splits"][1] + timings["stronghold"]["splits"][0] / timings["stronghold"]["splits"][1] + timings["end"]["splits"][0] / timings["end"]["splits"][1]) + " (Splits)";
    
    OverworldDeaths.textContent = percentageCalc(timings["overworld"]["deaths"], timings["overworld"]["splits"][1]);
    NetherDeaths.textContent = percentageCalc(timings["nether"]["deaths"], timings["nether"]["timestamps"][1]);
    BastionDeaths.textContent = percentageCalc(timings["bastion"]["deaths"], timings["bastion"]["timestamps"][1]);
    FortressDeaths.textContent = percentageCalc(timings["fortress"]["deaths"], timings["fortress"]["timestamps"][1]);
    BlindDeaths.textContent = percentageCalc(timings["blind"]["deaths"], timings["blind"]["timestamps"][1]);
    StrongholdDeaths.textContent = percentageCalc(timings["stronghold"]["deaths"], timings["stronghold"]["timestamps"][1]);
    EndDeaths.textContent = percentageCalc(timings["end"]["deaths"], timings["end"]["timestamps"][1]);

    NetherTimestamp.textContent = msToMinSecs(timings["overworld"]["splits"][0] / timings["overworld"]["splits"][1]) + " (" + timings["overworld"]["splits"][1] + ")";
    BastionTimestamp.textContent = msToMinSecs(timings["bastion"]["timestamps"][0] / timings["bastion"]["timestamps"][1]) + " (" + timings["bastion"]["timestamps"][1] + ")";
    FortressTimestamp.textContent = msToMinSecs(timings["fortress"]["timestamps"][0] / timings["fortress"]["timestamps"][1]) + " (" + timings["fortress"]["timestamps"][1] + ")";
    BlindTimestamp.textContent = msToMinSecs(timings["blind"]["timestamps"][0] / timings["blind"]["timestamps"][1]) + " (" + timings["blind"]["timestamps"][1] + ")";
    StrongholdTimestamp.textContent = msToMinSecs(timings["stronghold"]["timestamps"][0] / timings["stronghold"]["timestamps"][1]) + " (" + timings["stronghold"]["timestamps"][1] + ")";
    EndTimestamp.textContent = msToMinSecs(timings["end"]["timestamps"][0] / timings["end"]["timestamps"][1]) + " (" + timings["end"]["timestamps"][1] + ")";
    AverageCompletion.textContent = msToMinSecs(timings["completions"][0] / timings["completions"][1]) + " (" + timings["completions"][1] + ")";
    
    BuriedTreasure.textContent = msToMinSecs(overworlds["BURIED_TREASURE"][0] / overworlds["BURIED_TREASURE"][1]) + " (" + overworlds["BURIED_TREASURE"][1] + ")";
    Village.textContent = msToMinSecs(overworlds["VILLAGE"][0] / overworlds["VILLAGE"][1]) + " (" + overworlds["VILLAGE"][1] + ")";
    Shipwreck.textContent = msToMinSecs(overworlds["SHIPWRECK"][0] / overworlds["SHIPWRECK"][1]) + " (" + overworlds["SHIPWRECK"][1] + ")";
    DesertTemple.textContent = msToMinSecs(overworlds["DESERT_TEMPLE"][0] / overworlds["DESERT_TEMPLE"][1]) + " (" + overworlds["DESERT_TEMPLE"][1] + ")";
    RuinedPortal.textContent = msToMinSecs(overworlds["RUINED_PORTAL"][0] / overworlds["RUINED_PORTAL"][1]) + " (" + overworlds["RUINED_PORTAL"][1] + ")";
    
    Bridge.textContent = msToMinSecs(bastions["BRIDGE"][0] / bastions["BRIDGE"][1]) + " (" + bastions["BRIDGE"][1] + ")";
    Housing.textContent = msToMinSecs(bastions["HOUSING"][0] / bastions["HOUSING"][1]) + " (" + bastions["HOUSING"][1] + ")";
    Stables.textContent = msToMinSecs(bastions["STABLES"][0] / bastions["STABLES"][1]) + " (" + bastions["STABLES"][1] + ")";
    Treasure.textContent = msToMinSecs(bastions["TREASURE"][0] / bastions["TREASURE"][1]) + " (" + bastions["TREASURE"][1] + ")";

    BridgeDeaths.textContent = percentageCalc(bastions["BRIDGE"][2], bastions["BRIDGE"][1]);
    HousingDeaths.textContent = percentageCalc(bastions["HOUSING"][2], bastions["HOUSING"][1]);
    StablesDeaths.textContent = percentageCalc(bastions["STABLES"][2], bastions["STABLES"][1]);
    TreasureDeaths.textContent = percentageCalc(bastions["TREASURE"][2], bastions["TREASURE"][1]);

    console.log(timings);
}

async function call_Ranked_GetUserMatches_External() {
    try {
        randomiseParrot(0);
        loadingText.textContent = "Loading . .";

        dataSection.style.display = "none";
        configUI.style.display = "none";
        LoadingText.style.display = "block";
        LoadingParrot.style.display = "inline";

        await call_Ranked_GetMatches_Internal();

        loadingText.style.display = "none";
        LoadingParrot.style.display = "none";
        dataSection.style.display = "block";
        configUI.style.display = "flex";

        playerModel.style.visibility = "visible";
        PlayerNameContainer.style.display = "inline";
        playerInfoContainer.style.display = "inline";
        NameplateLoading.style.display = "none";
    } catch (error) {
        console.error("ERROR IN 'call_Ranked_GetUserMatches_External': ", error);
    }
}

async function call_Ranked_GetUser() {
    try {
        randomiseParrot(1);

        playerModel.style.visibility = "hidden";
        PlayerNameContainer.style.display = "none";
        playerInfoContainer.style.display = "none";
        NameplateLoading.style.display = "inline";

        const response = await fetch("https://api.mcsrranked.com/users/" + ign);
        const statusCode = response.status;

        if (statusCode != 200) {
            playerModel.style.visibility = "visible";
            PlayerNameContainer.style.display = "inline";
            playerInfoContainer.style.display = "inline";
            NameplateLoading.style.display = "none";
            PbLabel.textContent = "PB: N/A";
            WinRateLabel.textContent = "W/L%: N/A";
            PageTitle.textContent = "Error code: " + statusCode + " | Ranked Analysis"; 
            switch (statusCode) {
                case 400:
                    loadingText.textContent = "Invalid IGN!";
                    break;
                case 429:
                    loadingText.textContent = "Too many requests being made! Please wait a few minutes before proceeding!";
                    break;
            }
            return;
        }

        const data = await response.json();
        const pb = data["data"]["statistics"]["season"]["bestTime"]["ranked"];
        const wins = data["data"]["statistics"]["season"]["wins"]["ranked"];
        const losses = data["data"]["statistics"]["season"]["loses"]["ranked"];

        PageTitle.textContent = data["data"]["nickname"] + " | Ranked Analysis";
        WinRateLabel.textContent = "W/L%: " + percentageCalc(wins, wins + losses);
        uuid = data["data"]["uuid"];
        PbLabel.textContent = "PB: " + msToMinSecs(pb);
        PlayerName.textContent = data["data"]["nickname"];
        ign = data["data"]["nickname"];

        if (pb == null) PbLabel.textContent = "PB: N/A";
    } catch (error) {
        console.error("ERROR IN 'call_Ranked_GetUser': ", error);
    }
}

async function call_Ranked_GetUser_Versus(versusPlayerName, versusPbLabel, versusWinRateLabel, playerNum, playerName) {
    try {
        const response = await fetch("https://api.mcsrranked.com/users/" + playerName);
        const statusCode = response.status;

        if (statusCode != 200) {
            versusPbLabel.textContent = "PB: N/A";
            versusWinRateLabel.textContent = "W/L%: N/A";
            switch (statusCode) {
                case 400:
                    break;
                case 429:
                    break;
            }
            return;
        }

        const data = await response.json();
        const pb = data["data"]["statistics"]["season"]["bestTime"]["ranked"];
        const wins = data["data"]["statistics"]["season"]["wins"]["ranked"];
        const losses = data["data"]["statistics"]["season"]["loses"]["ranked"];

        versusWinRateLabel.textContent = "W/L%: " + percentageCalc(wins, wins + losses);
        versusPbLabel.textContent = "PB: " + msToMinSecs(pb);
        versusPlayerName.textContent = data["data"]["nickname"];

        if (playerNum == 1) {
            versusUUID = data["data"]["uuid"];
            versusIGN = data["data"]["nickname"];
            PageTitle.textContent = ign + " vs " + data["data"]["nickname"] + " | Ranked Analysis";
        } else {
            uuid = data["data"]["uuid"];
        }

        if (pb == null) versusPbLabel.textContent = "PB: N/A";
    } catch (error) {
        console.error("ERROR IN 'call_Ranked_GetUser': ", error);
    }
}

function versus_display_info() {
    Versus_OverworldSplit1.textContent = msToMinSecs(timings["overworld"]["splits"][0] / timings["overworld"]["splits"][1]) + " (" + timings["overworld"]["splits"][1] + ")";
    Versus_NetherSplit1.textContent = msToMinSecs(timings["nether"]["splits"][0] / timings["nether"]["splits"][1]) + " (" + timings["nether"]["splits"][1] + ")";
    Versus_BastionSplit1.textContent = msToMinSecs(timings["bastion"]["splits"][0] / timings["bastion"]["splits"][1]) + " (" + timings["bastion"]["splits"][1] + ")";
    Versus_FortressSplit1.textContent = msToMinSecs(timings["fortress"]["splits"][0] / timings["fortress"]["splits"][1]) + " (" + timings["fortress"]["splits"][1] + ")";
    Versus_BlindSplit1.textContent = msToMinSecs(timings["blind"]["splits"][0] / timings["blind"]["splits"][1]) + " (" + timings["blind"]["splits"][1] + ")";
    Versus_StrongholdSplit1.textContent = msToMinSecs(timings["stronghold"]["splits"][0] / timings["stronghold"]["splits"][1]) + " (" + timings["stronghold"]["splits"][1] + ")";
    Versus_EndSplit1.textContent = msToMinSecs(timings["end"]["splits"][0] / timings["end"]["splits"][1]) + " (" + timings["end"]["splits"][1] + ")";
    Versus_CompletionSplits1.textContent = msToMinSecs(timings["overworld"]["splits"][0] / timings["overworld"]["splits"][1] + timings["nether"]["splits"][0] / timings["nether"]["splits"][1] + timings["bastion"]["splits"][0] / timings["bastion"]["splits"][1] + timings["fortress"]["splits"][0] / timings["fortress"]["splits"][1] + timings["blind"]["splits"][0] / timings["blind"]["splits"][1] + timings["stronghold"]["splits"][0] / timings["stronghold"]["splits"][1] + timings["end"]["splits"][0] / timings["end"]["splits"][1]) + " (Splits)";
        
    Versus_OverworldDeaths1.textContent = percentageCalc(timings["overworld"]["deaths"], timings["overworld"]["splits"][1]);
    Versus_NetherDeaths1.textContent = percentageCalc(timings["nether"]["deaths"], timings["nether"]["timestamps"][1]);
    Versus_BastionDeaths1.textContent = percentageCalc(timings["bastion"]["deaths"], timings["bastion"]["timestamps"][1]);
    Versus_FortressDeaths1.textContent = percentageCalc(timings["fortress"]["deaths"], timings["fortress"]["timestamps"][1]);
    Versus_BlindDeaths1.textContent = percentageCalc(timings["blind"]["deaths"], timings["blind"]["timestamps"][1]);
    Versus_StrongholdDeaths1.textContent = percentageCalc(timings["stronghold"]["deaths"], timings["stronghold"]["timestamps"][1]);
    Versus_EndDeaths1.textContent = percentageCalc(timings["end"]["deaths"], timings["end"]["timestamps"][1]);

    Versus_NetherTimestamp1.textContent = msToMinSecs(timings["overworld"]["splits"][0] / timings["overworld"]["splits"][1]) + " (" + timings["overworld"]["splits"][1] + ")";
    Versus_BastionTimestamp1.textContent = msToMinSecs(timings["bastion"]["timestamps"][0] / timings["bastion"]["timestamps"][1]) + " (" + timings["bastion"]["timestamps"][1] + ")";
    Versus_FortressTimestamp1.textContent = msToMinSecs(timings["fortress"]["timestamps"][0] / timings["fortress"]["timestamps"][1]) + " (" + timings["fortress"]["timestamps"][1] + ")";
    Versus_BlindTimestamp1.textContent = msToMinSecs(timings["blind"]["timestamps"][0] / timings["blind"]["timestamps"][1]) + " (" + timings["blind"]["timestamps"][1] + ")";
    Versus_StrongholdTimestamp1.textContent = msToMinSecs(timings["stronghold"]["timestamps"][0] / timings["stronghold"]["timestamps"][1]) + " (" + timings["stronghold"]["timestamps"][1] + ")";
    Versus_EndTimestamp1.textContent = msToMinSecs(timings["end"]["timestamps"][0] / timings["end"]["timestamps"][1]) + " (" + timings["end"]["timestamps"][1] + ")";
    Versus_AverageCompletion1.textContent = msToMinSecs(timings["completions"][0] / timings["completions"][1]) + " (" + timings["completions"][1] + ")";
        
    Versus_BuriedTreasure1.textContent = msToMinSecs(overworlds["BURIED_TREASURE"][0] / overworlds["BURIED_TREASURE"][1]) + " (" + overworlds["BURIED_TREASURE"][1] + ")";
    Versus_Village1.textContent = msToMinSecs(overworlds["VILLAGE"][0] / overworlds["VILLAGE"][1]) + " (" + overworlds["VILLAGE"][1] + ")";
    Versus_Shipwreck1.textContent = msToMinSecs(overworlds["SHIPWRECK"][0] / overworlds["SHIPWRECK"][1]) + " (" + overworlds["SHIPWRECK"][1] + ")";
    Versus_DesertTemple1.textContent = msToMinSecs(overworlds["DESERT_TEMPLE"][0] / overworlds["DESERT_TEMPLE"][1]) + " (" + overworlds["DESERT_TEMPLE"][1] + ")";
    Versus_RuinedPortal1.textContent = msToMinSecs(overworlds["RUINED_PORTAL"][0] / overworlds["RUINED_PORTAL"][1]) + " (" + overworlds["RUINED_PORTAL"][1] + ")";
        
    Versus_Bridge1.textContent = msToMinSecs(bastions["BRIDGE"][0] / bastions["BRIDGE"][1]) + " (" + bastions["BRIDGE"][1] + ")";
    Versus_Housing1.textContent = msToMinSecs(bastions["HOUSING"][0] / bastions["HOUSING"][1]) + " (" + bastions["HOUSING"][1] + ")";
    Versus_Stables1.textContent = msToMinSecs(bastions["STABLES"][0] / bastions["STABLES"][1]) + " (" + bastions["STABLES"][1] + ")";
    Versus_Treasure1.textContent = msToMinSecs(bastions["TREASURE"][0] / bastions["TREASURE"][1]) + " (" + bastions["TREASURE"][1] + ")";

    Versus_BridgeDeaths1.textContent = percentageCalc(bastions["BRIDGE"][2], bastions["BRIDGE"][1]);
    Versus_HousingDeaths1.textContent = percentageCalc(bastions["HOUSING"][2], bastions["HOUSING"][1]);
    Versus_StablesDeaths1.textContent = percentageCalc(bastions["STABLES"][2], bastions["STABLES"][1]);
    Versus_TreasureDeaths1.textContent = percentageCalc(bastions["TREASURE"][2], bastions["TREASURE"][1]);
        
    Versus_OverworldSplit2.textContent = msToMinSecs(versus_timings2["overworld"]["splits"][0] / versus_timings2["overworld"]["splits"][1]) + " (" + versus_timings2["overworld"]["splits"][1] + ")";
    Versus_NetherSplit2.textContent = msToMinSecs(versus_timings2["nether"]["splits"][0] / versus_timings2["nether"]["splits"][1]) + " (" + versus_timings2["nether"]["splits"][1] + ")";
    Versus_BastionSplit2.textContent = msToMinSecs(versus_timings2["bastion"]["splits"][0] / versus_timings2["bastion"]["splits"][1]) + " (" + versus_timings2["bastion"]["splits"][1] + ")";
    Versus_FortressSplit2.textContent = msToMinSecs(versus_timings2["fortress"]["splits"][0] / versus_timings2["fortress"]["splits"][1]) + " (" + versus_timings2["fortress"]["splits"][1] + ")";
    Versus_BlindSplit2.textContent = msToMinSecs(versus_timings2["blind"]["splits"][0] / versus_timings2["blind"]["splits"][1]) + " (" + versus_timings2["blind"]["splits"][1] + ")";
    Versus_StrongholdSplit2.textContent = msToMinSecs(versus_timings2["stronghold"]["splits"][0] / versus_timings2["stronghold"]["splits"][1]) + " (" + versus_timings2["stronghold"]["splits"][1] + ")";
    Versus_EndSplit2.textContent = msToMinSecs(versus_timings2["end"]["splits"][0] / versus_timings2["end"]["splits"][1]) + " (" + versus_timings2["end"]["splits"][1] + ")";
    Versus_CompletionSplits2.textContent = msToMinSecs(versus_timings2["overworld"]["splits"][0] / versus_timings2["overworld"]["splits"][1] + versus_timings2["nether"]["splits"][0] / versus_timings2["nether"]["splits"][1] + versus_timings2["bastion"]["splits"][0] / versus_timings2["bastion"]["splits"][1] + versus_timings2["fortress"]["splits"][0] / versus_timings2["fortress"]["splits"][1] + versus_timings2["blind"]["splits"][0] / versus_timings2["blind"]["splits"][1] + versus_timings2["stronghold"]["splits"][0] / versus_timings2["stronghold"]["splits"][1] + versus_timings2["end"]["splits"][0] / versus_timings2["end"]["splits"][1]) + " (Splits)";
        
    Versus_OverworldDeaths2.textContent = percentageCalc(versus_timings2["overworld"]["deaths"], versus_timings2["overworld"]["splits"][1]);
    Versus_NetherDeaths2.textContent = percentageCalc(versus_timings2["nether"]["deaths"], versus_timings2["nether"]["timestamps"][1]);
    Versus_BastionDeaths2.textContent = percentageCalc(versus_timings2["bastion"]["deaths"], versus_timings2["bastion"]["timestamps"][1]);
    Versus_FortressDeaths2.textContent = percentageCalc(versus_timings2["fortress"]["deaths"], versus_timings2["fortress"]["timestamps"][1]);
    Versus_BlindDeaths2.textContent = percentageCalc(versus_timings2["blind"]["deaths"], versus_timings2["blind"]["timestamps"][1]);
    Versus_StrongholdDeaths2.textContent = percentageCalc(versus_timings2["stronghold"]["deaths"], versus_timings2["stronghold"]["timestamps"][1]);
    Versus_EndDeaths2.textContent = percentageCalc(versus_timings2["end"]["deaths"], versus_timings2["end"]["timestamps"][1]);

    Versus_NetherTimestamp2.textContent = msToMinSecs(versus_timings2["overworld"]["splits"][0] / versus_timings2["overworld"]["splits"][1]) + " (" + versus_timings2["overworld"]["splits"][1] + ")";
    Versus_BastionTimestamp2.textContent = msToMinSecs(versus_timings2["bastion"]["timestamps"][0] / versus_timings2["bastion"]["timestamps"][1]) + " (" + versus_timings2["bastion"]["timestamps"][1] + ")";
    Versus_FortressTimestamp2.textContent = msToMinSecs(versus_timings2["fortress"]["timestamps"][0] / versus_timings2["fortress"]["timestamps"][1]) + " (" + versus_timings2["fortress"]["timestamps"][1] + ")";
    Versus_BlindTimestamp2.textContent = msToMinSecs(versus_timings2["blind"]["timestamps"][0] / versus_timings2["blind"]["timestamps"][1]) + " (" + versus_timings2["blind"]["timestamps"][1] + ")";
    Versus_StrongholdTimestamp2.textContent = msToMinSecs(versus_timings2["stronghold"]["timestamps"][0] / versus_timings2["stronghold"]["timestamps"][1]) + " (" + versus_timings2["stronghold"]["timestamps"][1] + ")";
    Versus_EndTimestamp2.textContent = msToMinSecs(versus_timings2["end"]["timestamps"][0] / versus_timings2["end"]["timestamps"][1]) + " (" + versus_timings2["end"]["timestamps"][1] + ")";
    Versus_AverageCompletion2.textContent = msToMinSecs(versus_timings2["completions"][0] / versus_timings2["completions"][1]) + " (" + versus_timings2["completions"][1] + ")";
        
    Versus_BuriedTreasure2.textContent = msToMinSecs(versus_overworlds2["BURIED_TREASURE"][0] / versus_overworlds2["BURIED_TREASURE"][1]) + " (" + versus_overworlds2["BURIED_TREASURE"][1] + ")";
    Versus_Village2.textContent = msToMinSecs(versus_overworlds2["VILLAGE"][0] / versus_overworlds2["VILLAGE"][1]) + " (" + versus_overworlds2["VILLAGE"][1] + ")";
    Versus_Shipwreck2.textContent = msToMinSecs(versus_overworlds2["SHIPWRECK"][0] / versus_overworlds2["SHIPWRECK"][1]) + " (" + versus_overworlds2["SHIPWRECK"][1] + ")";
    Versus_DesertTemple2.textContent = msToMinSecs(versus_overworlds2["DESERT_TEMPLE"][0] / versus_overworlds2["DESERT_TEMPLE"][1]) + " (" + versus_overworlds2["DESERT_TEMPLE"][1] + ")";
    Versus_RuinedPortal2.textContent = msToMinSecs(versus_overworlds2["RUINED_PORTAL"][0] / versus_overworlds2["RUINED_PORTAL"][1]) + " (" + versus_overworlds2["RUINED_PORTAL"][1] + ")";
        
    Versus_Bridge2.textContent = msToMinSecs(versus_bastions2["BRIDGE"][0] / versus_bastions2["BRIDGE"][1]) + " (" + versus_bastions2["BRIDGE"][1] + ")";
    Versus_Housing2.textContent = msToMinSecs(versus_bastions2["HOUSING"][0] / versus_bastions2["HOUSING"][1]) + " (" + versus_bastions2["HOUSING"][1] + ")";
    Versus_Stables2.textContent = msToMinSecs(versus_bastions2["STABLES"][0] / versus_bastions2["STABLES"][1]) + " (" + versus_bastions2["STABLES"][1] + ")";
    Versus_Treasure2.textContent = msToMinSecs(versus_bastions2["TREASURE"][0] / versus_bastions2["TREASURE"][1]) + " (" + versus_bastions2["TREASURE"][1] + ")";

    Versus_BridgeDeaths2.textContent = percentageCalc(versus_bastions2["BRIDGE"][2], versus_bastions2["BRIDGE"][1]);
    Versus_HousingDeaths2.textContent = percentageCalc(versus_bastions2["HOUSING"][2], versus_bastions2["HOUSING"][1]);
    Versus_StablesDeaths2.textContent = percentageCalc(versus_bastions2["STABLES"][2], versus_bastions2["STABLES"][1]);
    Versus_TreasureDeaths2.textContent = percentageCalc(versus_bastions2["TREASURE"][2], versus_bastions2["TREASURE"][1]);

    calculateDiff(timings["overworld"]["splits"][0] / timings["overworld"]["splits"][1], versus_timings2["overworld"]["splits"][0] / versus_timings2["overworld"]["splits"][1], Versus_OverworldSplitDiff1);
    calculateDiff(timings["nether"]["splits"][0] / timings["nether"]["splits"][1], versus_timings2["nether"]["splits"][0] / versus_timings2["nether"]["splits"][1], Versus_NetherSplitDiff1);
    calculateDiff(timings["bastion"]["splits"][0] / timings["bastion"]["splits"][1], versus_timings2["bastion"]["splits"][0] / versus_timings2["bastion"]["splits"][1], Versus_BastionSplitDiff1);
    calculateDiff(timings["fortress"]["splits"][0] / timings["fortress"]["splits"][1], versus_timings2["fortress"]["splits"][0] / versus_timings2["fortress"]["splits"][1], Versus_FortressSplitDiff1);
    calculateDiff(timings["blind"]["splits"][0] / timings["blind"]["splits"][1], versus_timings2["blind"]["splits"][0] / versus_timings2["blind"]["splits"][1], Versus_BlindSplitDiff1);
    calculateDiff(timings["stronghold"]["splits"][0] / timings["stronghold"]["splits"][1], versus_timings2["stronghold"]["splits"][0] / versus_timings2["stronghold"]["splits"][1], Versus_StrongholdSplitDiff1);
    calculateDiff(timings["end"]["splits"][0] / timings["end"]["splits"][1], versus_timings2["end"]["splits"][0] / versus_timings2["end"]["splits"][1], Versus_EndSplitDiff1);
    calculateDiff(timings["overworld"]["splits"][0] / timings["overworld"]["splits"][1] + timings["nether"]["splits"][0] / timings["nether"]["splits"][1] + timings["bastion"]["splits"][0] / timings["bastion"]["splits"][1] + timings["fortress"]["splits"][0] / timings["fortress"]["splits"][1] + timings["blind"]["splits"][0] / timings["blind"]["splits"][1] + timings["stronghold"]["splits"][0] / timings["stronghold"]["splits"][1] + timings["end"]["splits"][0] / timings["end"]["splits"][1], versus_timings2["overworld"]["splits"][0] / versus_timings2["overworld"]["splits"][1] + versus_timings2["nether"]["splits"][0] / versus_timings2["nether"]["splits"][1] + versus_timings2["bastion"]["splits"][0] / versus_timings2["bastion"]["splits"][1] + versus_timings2["fortress"]["splits"][0] / versus_timings2["fortress"]["splits"][1] + versus_timings2["blind"]["splits"][0] / versus_timings2["blind"]["splits"][1] + versus_timings2["stronghold"]["splits"][0] / versus_timings2["stronghold"]["splits"][1] + versus_timings2["end"]["splits"][0] / versus_timings2["end"]["splits"][1], Versus_CompletionSplitDiff1);

    calculateDiff(timings["overworld"]["splits"][0] / timings["overworld"]["splits"][1], versus_timings2["overworld"]["splits"][0] / versus_timings2["overworld"]["splits"][1], Versus_NetherEnterDiff1);
    calculateDiff(timings["bastion"]["timestamps"][0] / timings["bastion"]["timestamps"][1], versus_timings2["bastion"]["timestamps"][0] / versus_timings2["bastion"]["timestamps"][1], Versus_BastionEnterDiff1);
    calculateDiff(timings["fortress"]["timestamps"][0] / timings["fortress"]["timestamps"][1], versus_timings2["fortress"]["timestamps"][0] / versus_timings2["fortress"]["timestamps"][1], Versus_FortressEnterDiff1);
    calculateDiff(timings["blind"]["timestamps"][0] / timings["blind"]["timestamps"][1], versus_timings2["blind"]["timestamps"][0] / versus_timings2["blind"]["timestamps"][1], Versus_BlindEnterDiff1);
    calculateDiff(timings["stronghold"]["timestamps"][0] / timings["stronghold"]["timestamps"][1], versus_timings2["stronghold"]["timestamps"][0] / versus_timings2["stronghold"]["timestamps"][1], Versus_StrongholdEnterDiff1);
    calculateDiff(timings["end"]["timestamps"][0] / timings["end"]["timestamps"][1], versus_timings2["end"]["timestamps"][0] / versus_timings2["end"]["timestamps"][1], Versus_EndEnterDiff1);
    calculateDiff(timings["completions"][0] / timings["completions"][1], versus_timings2["completions"][0] / versus_timings2["completions"][1], Versus_AvgCompletionDiff1);

    calculateDiff(overworlds["BURIED_TREASURE"][0] / overworlds["BURIED_TREASURE"][1], versus_overworlds2["BURIED_TREASURE"][0] / versus_overworlds2["BURIED_TREASURE"][1], Versus_BuriedTreasureDiff1);
    calculateDiff(overworlds["VILLAGE"][0] / overworlds["VILLAGE"][1], versus_overworlds2["VILLAGE"][0] / versus_overworlds2["VILLAGE"][1], Versus_VillageDiff1);
    calculateDiff(overworlds["SHIPWRECK"][0] / overworlds["SHIPWRECK"][1], versus_overworlds2["SHIPWRECK"][0] / versus_overworlds2["SHIPWRECK"][1], Versus_ShipwreckDiff1);
    calculateDiff(overworlds["DESERT_TEMPLE"][0] / overworlds["DESERT_TEMPLE"][1], versus_overworlds2["DESERT_TEMPLE"][0] / versus_overworlds2["DESERT_TEMPLE"][1], Versus_DesertTempleDiff1);
    calculateDiff(overworlds["RUINED_PORTAL"][0] / overworlds["RUINED_PORTAL"][1], versus_overworlds2["RUINED_PORTAL"][0] / versus_overworlds2["RUINED_PORTAL"][1], Versus_RuinedPortalDiff1);

    calculateDiff(bastions["BRIDGE"][0] / bastions["BRIDGE"][1], versus_bastions2["BRIDGE"][0] / versus_bastions2["BRIDGE"][1], Versus_BridgeDiff1);
    calculateDiff(bastions["HOUSING"][0] / bastions["HOUSING"][1], versus_bastions2["HOUSING"][0] / versus_bastions2["HOUSING"][1], Versus_HousingDiff1);
    calculateDiff(bastions["STABLES"][0] / bastions["STABLES"][1], versus_bastions2["STABLES"][0] / versus_bastions2["STABLES"][1], Versus_StablesDiff1);
    calculateDiff(bastions["TREASURE"][0] / bastions["TREASURE"][1], versus_bastions2["TREASURE"][0] / versus_bastions2["TREASURE"][1], Versus_TreasureDiff1);

    calculateDiff(versus_timings2["overworld"]["splits"][0] / versus_timings2["overworld"]["splits"][1], timings["overworld"]["splits"][0] / timings["overworld"]["splits"][1], Versus_OverworldSplitDiff2);
    calculateDiff(versus_timings2["nether"]["splits"][0] / versus_timings2["nether"]["splits"][1], timings["nether"]["splits"][0] / timings["nether"]["splits"][1], Versus_NetherSplitDiff2);
    calculateDiff(versus_timings2["bastion"]["splits"][0] / versus_timings2["bastion"]["splits"][1], timings["bastion"]["splits"][0] / timings["bastion"]["splits"][1], Versus_BastionSplitDiff2);
    calculateDiff(versus_timings2["fortress"]["splits"][0] / versus_timings2["fortress"]["splits"][1], timings["fortress"]["splits"][0] / timings["fortress"]["splits"][1], Versus_FortressSplitDiff2);
    calculateDiff(versus_timings2["blind"]["splits"][0] / versus_timings2["blind"]["splits"][1], timings["blind"]["splits"][0] / timings["blind"]["splits"][1], Versus_BlindSplitDiff2);
    calculateDiff(versus_timings2["stronghold"]["splits"][0] / versus_timings2["stronghold"]["splits"][1], timings["stronghold"]["splits"][0] / timings["stronghold"]["splits"][1], Versus_StrongholdSplitDiff2);
    calculateDiff(versus_timings2["end"]["splits"][0] / versus_timings2["end"]["splits"][1], timings["end"]["splits"][0] / timings["end"]["splits"][1], Versus_EndSplitDiff2);
    calculateDiff(versus_timings2["overworld"]["splits"][0] / versus_timings2["overworld"]["splits"][1] + versus_timings2["nether"]["splits"][0] / versus_timings2["nether"]["splits"][1] + versus_timings2["bastion"]["splits"][0] / versus_timings2["bastion"]["splits"][1] + versus_timings2["fortress"]["splits"][0] / versus_timings2["fortress"]["splits"][1] + versus_timings2["blind"]["splits"][0] / versus_timings2["blind"]["splits"][1] + versus_timings2["stronghold"]["splits"][0] / versus_timings2["stronghold"]["splits"][1] + versus_timings2["end"]["splits"][0] / versus_timings2["end"]["splits"][1], timings["overworld"]["splits"][0] / timings["overworld"]["splits"][1] + timings["nether"]["splits"][0] / timings["nether"]["splits"][1] + timings["bastion"]["splits"][0] / timings["bastion"]["splits"][1] + timings["fortress"]["splits"][0] / timings["fortress"]["splits"][1] + timings["blind"]["splits"][0] / timings["blind"]["splits"][1] + timings["stronghold"]["splits"][0] / timings["stronghold"]["splits"][1] + timings["end"]["splits"][0] / timings["end"]["splits"][1], Versus_CompletionSplitDiff2);

    calculateDiff(versus_timings2["overworld"]["splits"][0] / versus_timings2["overworld"]["splits"][1], timings["overworld"]["splits"][0] / timings["overworld"]["splits"][1], Versus_NetherEnterDiff2);
    calculateDiff(versus_timings2["bastion"]["timestamps"][0] / versus_timings2["bastion"]["timestamps"][1], timings["bastion"]["timestamps"][0] / timings["bastion"]["timestamps"][1], Versus_BastionEnterDiff2);
    calculateDiff(versus_timings2["fortress"]["timestamps"][0] / versus_timings2["fortress"]["timestamps"][1], timings["fortress"]["timestamps"][0] / timings["fortress"]["timestamps"][1], Versus_FortressEnterDiff2);
    calculateDiff(versus_timings2["blind"]["timestamps"][0] / versus_timings2["blind"]["timestamps"][1], timings["blind"]["timestamps"][0] / timings["blind"]["timestamps"][1], Versus_BlindEnterDiff2);
    calculateDiff(versus_timings2["stronghold"]["timestamps"][0] / versus_timings2["stronghold"]["timestamps"][1], timings["stronghold"]["timestamps"][0] / timings["stronghold"]["timestamps"][1], Versus_StrongholdEnterDiff2);
    calculateDiff(versus_timings2["end"]["timestamps"][0] / versus_timings2["end"]["timestamps"][1], timings["end"]["timestamps"][0] / timings["end"]["timestamps"][1], Versus_EndEnterDiff2);
    calculateDiff(versus_timings2["completions"][0] / versus_timings2["completions"][1], timings["completions"][0] / timings["completions"][1], Versus_AvgCompletionDiff2);

    calculateDiff(versus_overworlds2["BURIED_TREASURE"][0] / versus_overworlds2["BURIED_TREASURE"][1], overworlds["BURIED_TREASURE"][0] / overworlds["BURIED_TREASURE"][1], Versus_BuriedTreasureDiff2);
    calculateDiff(versus_overworlds2["VILLAGE"][0] / versus_overworlds2["VILLAGE"][1], overworlds["VILLAGE"][0] / overworlds["VILLAGE"][1], Versus_VillageDiff2);
    calculateDiff(versus_overworlds2["SHIPWRECK"][0] / versus_overworlds2["SHIPWRECK"][1], overworlds["SHIPWRECK"][0] / overworlds["SHIPWRECK"][1], Versus_ShipwreckDiff2);
    calculateDiff(versus_overworlds2["DESERT_TEMPLE"][0] / versus_overworlds2["DESERT_TEMPLE"][1], overworlds["DESERT_TEMPLE"][0] / overworlds["DESERT_TEMPLE"][1], Versus_DesertTempleDiff2);
    calculateDiff(versus_overworlds2["RUINED_PORTAL"][0] / versus_overworlds2["RUINED_PORTAL"][1], overworlds["RUINED_PORTAL"][0] / overworlds["RUINED_PORTAL"][1], Versus_RuinedPortalDiff2);

    calculateDiff(versus_bastions2["BRIDGE"][0] / versus_bastions2["BRIDGE"][1], bastions["BRIDGE"][0] / bastions["BRIDGE"][1], Versus_BridgeDiff2);
    calculateDiff(versus_bastions2["HOUSING"][0] / versus_bastions2["HOUSING"][1], bastions["HOUSING"][0] / bastions["HOUSING"][1], Versus_HousingDiff2);
    calculateDiff(versus_bastions2["STABLES"][0] / versus_bastions2["STABLES"][1], bastions["STABLES"][0] / bastions["STABLES"][1], Versus_StablesDiff2);
    calculateDiff(versus_bastions2["TREASURE"][0] / versus_bastions2["TREASURE"][1], bastions["TREASURE"][0] / bastions["TREASURE"][1], Versus_TreasureDiff2);
}

async function versus_call_Ranked_GetUserMatches() {
    try {
        const response = await fetch("https://api.mcsrranked.com/users/" + versusIGN + "/matches?type=" + versus_gamemode2 + "&count=" + versus_matchCount2);
        const statusCode = response.status;

        promises = [];

        versus_overworlds2 = {
            "BURIED_TREASURE": [0, 0],
            "VILLAGE": [0, 0],
            "SHIPWRECK": [0, 0],
            "DESERT_TEMPLE": [0, 0],
            "RUINED_PORTAL": [0, 0],
        }

        versus_bastions2 = {
            "BRIDGE": [0, 0, 0],
            "HOUSING": [0, 0, 0],
            "STABLES": [0, 0, 0],
            "TREASURE": [0, 0, 0]
        }

        versus_timings2 = {
            "overworld": {
                "splits": [0, 0],
                "timestamps": [0, 0],
                "deaths": 0
            },
            "nether": {
                "splits": [0, 0],
                "timestamps": [0, 0],
                "deaths": 0
            },
            "bastion": {
                "splits": [0, 0],
                "timestamps": [0, 0],
                "deaths": 0
            },
            "fortress": {
                "splits": [0, 0],
                "timestamps": [0, 0],
                "deaths": 0
            },
            "blind": {
                "splits": [0, 0],
                "timestamps": [0, 0],
                "deaths": 0
            },
            "stronghold": {
                "splits": [0, 0],
                "timestamps": [0, 0],
                "deaths": 0
            },
            "end": {
                "splits": [0, 0],
                "timestamps": [0, 0],
                "deaths": 0
            },
            "completions": [0, 0]
        };

        if (statusCode != 200) {
            PageTitle.textContent = "Error code: " + statusCode + " | Ranked Analysis"; 
            switch (statusCode) {
                case 400:
                    break;
                case 429:
                    break;
            }
            return;
        }

        const data = await response.json();

        for (const match of data["data"]) {
            const matchID = match["id"];
            promises.push(versus_call_Ranked_GetMatch2(matchID));
        }

        await Promise.all(promises);

        versus_display_info();
    } catch (error) {
        console.error("ERROR IN 'versus_call_Ranked_GetUserMatches': ", error);
    }
}

// On Page load (if in a subdirectory)
const currentPath = window.location.pathname.slice(1);

if (currentPath && currentPath != "versus") {
    ign = currentPath;
    previousName = ign;
    PlayerName.textContent = decodeURIComponent(currentPath);
    PlayerModel.src = "https://starlightskins.lunareclipse.studio/render/default/" + PlayerName.textContent + "/face";
    call_Ranked_GetUser();
    call_Ranked_GetUserMatches_External();
} else {
    dataSection.style.display = "none";
    configUI.style.display = "none";
    LoadingText.style.display = "block";
    LoadingText.textContent = "Type ign in (search for player) field to search";
    PageTitle.textContent = "Home | Ranked Analysis";
}

// Nameplate
PlayerName.addEventListener("blur", function() {
    const text = PlayerName.innerText.trim();
    if (text == previousName) return;
    if (text) {
        history.pushState({}, '', '/' + encodeURIComponent(text));
    } else {
        history.pushState({}, '', '/');
    }
    ign = text;
    previousName = text;
    PlayerModel.src = "https://starlightskins.lunareclipse.studio/render/default/" + text + "/face";
    dataSection.style.display = "block";
    versusToggle = false;
    VersusSearch.style.display = "none";
    VersusButton.style.backgroundColor = "#202F3D";
    call_Ranked_GetUser();
    call_Ranked_GetUserMatches_External();
})

PlayerName.addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        PlayerName.blur();
    }  
})

PlayerName.addEventListener("focus", function() {
    const range = document.createRange();
    range.selectNodeContents(PlayerName);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
})

// Gamemode buttons
RankedButton.style.backgroundColor = "#507699";

RankedButton.addEventListener("click", function() {
    if (gamemode == 3) {
        RankedButton.style.backgroundColor = "#507699";
        PrivateButton.style.backgroundColor = "#202F3D";
        gamemode = 2;
        configureInVersusMode()
        call_Ranked_GetUserMatches_External();
    }
})

RankedButton.addEventListener("mouseover", function() {
    if (gamemode == 3) {
        RankedButton.style.backgroundColor = "#354e66";
    }
})

RankedButton.addEventListener("mouseout", function() {
    if (gamemode == 3) {
        RankedButton.style.backgroundColor = "#202F3D";
    }
})

PrivateButton.addEventListener("mouseover", function() {
    if (gamemode == 2) {
        PrivateButton.style.backgroundColor = "#354e66";
    }
})

PrivateButton.addEventListener("mouseout", function() {
    if (gamemode == 2) {
        PrivateButton.style.backgroundColor = "#202F3D";
    }
})

PrivateButton.addEventListener("click", function() {
    if (gamemode == 2) {
        PrivateButton.style.backgroundColor = "#507699";
        RankedButton.style.backgroundColor = "#202F3D";
        gamemode = 3;
        configureInVersusMode()
        call_Ranked_GetUserMatches_External();
    }
})

// Versus Gamemode Buttons
Versus_RankedButton1.addEventListener("click", function() {
    if (gamemode == 3) {
        Versus_RankedButton1.style.backgroundColor = "#507699";
        Versus_PrivateButton1.style.backgroundColor = "#202F3D";
        gamemode = 2;
        versus1ChangeStats()
    }
})

Versus_RankedButton1.addEventListener("mouseover", function() {
    if (gamemode == 3) {
        Versus_RankedButton1.style.backgroundColor = "#354e66";
    }
})

Versus_RankedButton1.addEventListener("mouseout", function() {
    if (gamemode == 3) {
        Versus_RankedButton1.style.backgroundColor = "#202F3D";
    }
})

Versus_PrivateButton1.addEventListener("mouseover", function() {
    if (gamemode == 2) {
        Versus_PrivateButton1.style.backgroundColor = "#354e66";
    }
})

Versus_PrivateButton1.addEventListener("mouseout", function() {
    if (gamemode == 2) {
        Versus_PrivateButton1.style.backgroundColor = "#202F3D";
    }
})

Versus_PrivateButton1.addEventListener("click", function() {
    if (gamemode == 2) {
        Versus_PrivateButton1.style.backgroundColor = "#507699";
        Versus_RankedButton1.style.backgroundColor = "#202F3D";
        gamemode = 3;
        versus1ChangeStats()
    }
})

Versus_RankedButton2.addEventListener("click", function() {
    if (versus_gamemode2 == 3) {
        Versus_RankedButton2.style.backgroundColor = "#507699";
        Versus_PrivateButton2.style.backgroundColor = "#202F3D";
        versus_gamemode2 = 2;
        versus_call_Ranked_GetUserMatches();
    }
})

Versus_RankedButton2.addEventListener("mouseover", function() {
    if (versus_gamemode2 == 3) {
        Versus_RankedButton2.style.backgroundColor = "#354e66";
    }
})

Versus_RankedButton2.addEventListener("mouseout", function() {
    if (versus_gamemode2 == 3) {
        Versus_RankedButton2.style.backgroundColor = "#202F3D";
    }
})

Versus_PrivateButton2.addEventListener("mouseover", function() {
    if (versus_gamemode2 == 2) {
        Versus_PrivateButton2.style.backgroundColor = "#354e66";
    }
})

Versus_PrivateButton2.addEventListener("mouseout", function() {
    if (versus_gamemode2 == 2) {
        Versus_PrivateButton2.style.backgroundColor = "#202F3D";
    }
})

Versus_PrivateButton2.addEventListener("click", function() {
    if (versus_gamemode2 == 2) {
        Versus_PrivateButton2.style.backgroundColor = "#507699";
        Versus_RankedButton2.style.backgroundColor = "#202F3D";
        versus_gamemode2 = 3;
        versus_call_Ranked_GetUserMatches();
    }
})

// Match Count Slider
MatchCount.addEventListener("blur", function() {
    MatchCount.style.backgroundColor = "#18232e";
    let newText = this.textContent;
    if (parseInt(newText) == previousMatchCount) return;
    if (/^\d+$/.test(newText) == false) {
        // Has letters or number exceeds limit
        newText = "1";
    } else if (parseInt(newText) >= matchCountLimit) {
        newText = String(matchCountLimit);
    } else if (parseInt(newText) <= 0) {
        newText = "1";
    }
    console.log(parseInt(newText));
    MatchCountSlider.value = parseInt(newText);
    previousMatchCount = parseInt(newText);
    this.textContent = newText;
    matchCount = parseInt(newText);
    configureInVersusMode()
    call_Ranked_GetUserMatches_External();
})

MatchCount.addEventListener("focus", function() {
    MatchCount.style.backgroundColor = "#507699";
    const range = document.createRange();
    range.selectNodeContents(MatchCount);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
})

MatchCount.addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        MatchCount.blur();
    }
})

MatchCountSlider.addEventListener("input", function() {
    MatchCount.textContent = MatchCountSlider.value;
    matchCount = matchCountSlider.value;
})

MatchCountSlider.addEventListener("mouseup", function() {
    if (matchCountSlider.value == previousMatchCount) return;
    previousMatchCount = matchCountSlider.value;
    configureInVersusMode()
    call_Ranked_GetUserMatches_External();
})

MatchCountSlider.addEventListener("touchend", function() {
    if (matchCountSlider.value == previousMatchCount) return;
    previousMatchCount = matchCountSlider.value;
    configureInVersusMode()
    call_Ranked_GetUserMatches_External();
})

// Versus Nameplate
Versus_PlayerName1.addEventListener("blur", function() {
    const text = Versus_PlayerName1.innerText.trim();
    if (text == previousName) return;
    if (text) {
        history.pushState({}, '', '/versus?player1=' + text + "&player2=" + encodeURIComponent(versusIGN));
    } else {
        history.pushState({}, '', '/');
    }
    ign = text;
    previousName = text;
    Versus_PlayerModel1.src = "https://starlightskins.lunareclipse.studio/render/default/" + text + "/face";
    call_Ranked_GetUser_Versus(Versus_PlayerName1, Versus_PbLabel1, Versus_WinRateLabel1, 0, ign);
    versus1ChangeStats();
})

Versus_PlayerName1.addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        Versus_PlayerName1.blur();
    }  
})

Versus_PlayerName1.addEventListener("focus", function() {
    const range = document.createRange();
    range.selectNodeContents(Versus_PlayerName1);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
})

Versus_PlayerName2.addEventListener("blur", function() {
    const text = Versus_PlayerName2.innerText.trim();
    if (text == previousVersusIGN) return;
    if (text) {
        history.pushState({}, '', '/versus?player1=' + ign + "&player2=" + encodeURIComponent(text));
    } else {
        history.pushState({}, '', '/');
    }
    versusIGN = text;
    previousVersusIGN = text;
    Versus_PlayerModel2.src = "https://starlightskins.lunareclipse.studio/render/default/" + text + "/face";
    call_Ranked_GetUser_Versus(Versus_PlayerName2, Versus_PbLabel2, Versus_WinRateLabel2, 1, text);
    versus_call_Ranked_GetUserMatches();
})

Versus_PlayerName2.addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        Versus_PlayerName2.blur();
    }  
})

Versus_PlayerName2.addEventListener("focus", function() {
    const range = document.createRange();
    range.selectNodeContents(Versus_PlayerName2);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
})

// Versus Match Count Sliders
Versus_MatchCount1.addEventListener("blur", function() {
    Versus_MatchCount1.style.backgroundColor = "#18232e";
    let newText = this.textContent;
    if (parseInt(newText) == versus_previousMatchCount1) return;
    if (/^\d+$/.test(newText) == false) {
        // Has letters or number exceeds limit
        newText = "1";
    } else if (parseInt(newText) > matchCountLimit) {
        newText = "50";
    } else if (parseInt(newText) <= 0) {
        newText = "1";
    }
    console.log(parseInt(newText));
    Versus_MatchCountSlider1.value = parseInt(newText);
    this.textContent = newText;
    matchCount = parseInt(newText); 
    versus_previousMatchCount1 = parseInt(newText);
    versus1ChangeStats();
})

Versus_MatchCount1.addEventListener("focus", function() {
    Versus_MatchCount1.style.backgroundColor = "#507699";
    const range = document.createRange();
    range.selectNodeContents(Versus_MatchCount1);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
})

Versus_MatchCount1.addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        Versus_MatchCount1.blur();
    }
})

Versus_MatchCountSlider1.addEventListener("input", function() {
    Versus_MatchCount1.textContent = Versus_MatchCountSlider1.value;
    matchCount = Versus_MatchCountSlider1.value;
})

Versus_MatchCountSlider1.addEventListener("mouseup", function() {
    if (Versus_MatchCountSlider1.value == versus_previousMatchCount1) return;
    versus_previousMatchCount1 = Versus_MatchCountSlider1.value;
    versus1ChangeStats();
})

Versus_MatchCountSlider1.addEventListener("touchend", function() {
    if (Versus_MatchCountSlider1.value == versus_previousMatchCount1) return;
    versus_previousMatchCount1 = Versus_MatchCountSlider1.value;
    versus1ChangeStats();
})

Versus_MatchCount2.addEventListener("blur", function() {
    Versus_MatchCount2.style.backgroundColor = "#18232e";
    let newText = this.textContent;
    if (parseInt(newText) == versus_previousMatchCount2) return;
    if (/^\d+$/.test(newText) == false) {
        // Has letters or number exceeds limit
        newText = "1";
    } else if (parseInt(newText) > matchCountLimit) {
        newText = "50";
    } else if (parseInt(newText) <= 0) {
        newText = "1";
    }
    console.log(parseInt(newText));
    Versus_MatchCountSlider2.value = parseInt(newText);
    this.textContent = newText;
    versus_matchCount2 = parseInt(newText);
    versus_previousMatchCount2 = parseInt(newText);
    versus_call_Ranked_GetUserMatches();
})

Versus_MatchCount2.addEventListener("focus", function() {
    Versus_MatchCount2.style.backgroundColor = "#507699";
    const range = document.createRange();
    range.selectNodeContents(Versus_MatchCount2);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
})

Versus_MatchCount2.addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        Versus_MatchCount2.blur();
    }
})

Versus_MatchCountSlider2.addEventListener("input", function() {
    Versus_MatchCount2.textContent = Versus_MatchCountSlider2.value;
    versus_matchCount2 = Versus_MatchCountSlider2.value;
})

Versus_MatchCountSlider2.addEventListener("mouseup", function() {
    if (Versus_MatchCountSlider2.value == versus_previousMatchCount2) return;
    versus_previousMatchCount2 = Versus_MatchCountSlider2.value;
    versus_call_Ranked_GetUserMatches();
})

Versus_MatchCountSlider2.addEventListener("touchend", function() {
    if (Versus_MatchCountSlider2.value == versus_previousMatchCount2) return;
    versus_previousMatchCount2 = Versus_MatchCountSlider2.value;
    versus_call_Ranked_GetUserMatches();
})

// Versus Button
VersusButton.addEventListener("mouseover", function() {
    if (!versusToggle) {
        VersusButton.style.backgroundColor = "#354e66";
    }
})

VersusButton.addEventListener("mouseout", function() {
    if (!versusToggle) {
        VersusButton.style.backgroundColor = "#202F3D";
    }
})

VersusButton.addEventListener("click", function() {
    versusToggle = !versusToggle;
    if (versusToggle) {
        VersusButton.style.backgroundColor = "#507699";
        history.pushState({}, '', '/' + encodeURIComponent("versus"));
        VersusSearchText.textContent = "(Search for player 2)";
        dataSection.style.display = "none";
        VersusSearch.style.display = "block";
    } else {
        VersusSearch.style.display = "none";
        VersusButton.style.backgroundColor = "#202F3D";
        dataSection.style.display = "block";
        const text = PlayerName.innerText.trim();
        if (text) {
            history.pushState({}, '', '/' + encodeURIComponent(text));
        } else {
            history.pushState({}, '', '/');
        }
    }
})

//Versus Search
VersusSearchText.addEventListener("focus", function() {
    const range = document.createRange();
    range.selectNodeContents(VersusSearchText);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
})

VersusSearchText.addEventListener("blur", function() {
    const text = VersusSearchText.innerText.trim();
    if (versusIGN == "(Search for player 2)") return;
    if (text) {
        history.pushState({}, '', '/versus?player1=' + ign + "&player2=" + encodeURIComponent(text));
        Nameplate.style.display = "none";
        configUI.style.display = "none";
        VersusSearch.style.display = "none";

        versus_matchCount2 = defaultMatchCount;
        versus_previousMatchCount1 = matchCount;
        versus_previousMatchCount2 = defaultMatchCount;

        Versus_MatchCount1.textContent = matchCount;
        Versus_MatchCount2.textContent = versus_matchCount2;
        Versus_MatchCountSlider1.value = matchCount;
        Versus_MatchCountSlider2.value = versus_matchCount2;

        versus_gamemode1 = gamemode;
        versus_gamemode2 = gamemode;

        if (gamemode == 2) {
            Versus_RankedButton1.style.backgroundColor = "#507699";
            Versus_RankedButton2.style.backgroundColor = "#507699";
        } else {
            Versus_PrivateButton1.style.backgroundColor = "#507699";
            Versus_PrivateButton2.style.backgroundColor = "#507699";
        }

        console.log(matchCount);

        Versus_PlayerModel1.src = "https://starlightskins.lunareclipse.studio/render/default/" + ign + "/face";
        Versus_PlayerModel2.src = "https://starlightskins.lunareclipse.studio/render/default/" + text + "/face";
        Versus_NameplatePlayer1.style.display = "block";
        Versus_NameplatePlayer2.style.display = "block";

        Versus_Config1.style.display = "inline-flex";
        Versus_Config2.style.display = "inline-flex";

        Versus_Data1.style.display = "block";
        Versus_Data2.style.display = "block";

        call_Ranked_GetUser_Versus(Versus_PlayerName1, Versus_PbLabel1, Versus_WinRateLabel1, 0, ign);
        call_Ranked_GetUser_Versus(Versus_PlayerName2, Versus_PbLabel2, Versus_WinRateLabel2, 1, text);
        versusIGN = text;
        versus_call_Ranked_GetUserMatches();
    } else {
        history.pushState({}, '', '/' + ign);
    }
})

VersusSearchText.addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        VersusSearchText.blur();
    }  
})