// Variables
let gamemode = 2; // 2 = ranked, 3 = private
let previousName = "Type ign to search";
let matchCount = 20;
let ign = "Type ign to search";
let uuid = "";
let matchesParsed = 0;

const matchCountLimit = 50;

let timings = {
    "overworld": {
        "splits": [0, 0],
        "timestamps": [0, 0],
    },
    "nether": {
        "splits": [0, 0],
        "timestamps": [0, 0],
    },
    "bastion": {
        "splits": [0, 0],
        "timestamps": [0, 0],
    },
    "fortress": {
        "splits": [0, 0],
        "timestamps": [0, 0],
    },
    "blind": {
        "splits": [0, 0],
        "timestamps": [0, 0],
    },
    "stronghold": {
        "splits": [0, 0],
        "timestamps": [0, 0],
    },
    "end": {
        "splits": [0, 0],
        "timestamps": [0, 0],
    },
    "completions": [0, 0]
};

// API urls
const Ranked_GetUser = "https://api.mcsrranked.com/users/";
const Ranked_GetUserMatches = "/matches?type=" + gamemode + "&count=";
const Ranked_GetMatch = "https://api.mcsrranked.com/matches/";

// Elements
const PlayerName = document.getElementById("playerName");
const PbLabel = document.getElementById("pbLabel");
const WinRateLabel = document.getElementById("winRateLabel");
const PlayerModel = document.getElementById("playerModel");

const RankedButton = document.getElementById("Ranked");
const PrivateButton = document.getElementById("Private");

const MatchCount = document.getElementById("MatchCount");
const MatchCountSlider = document.getElementById("matchCountSlider");

// Misc functions
function msToMinSecs(ms) {
    let mins = ms / 60000;
    let secs = parseInt(60 * (mins - parseInt(mins)));
    if (secs < 10) {
        return String(parseInt(mins)) + ":0" + String(secs);
    }

    return String(parseInt(mins)) + ":" + String(secs);
}

// Calling APIs
async function call_Ranked_GetMatch(matchID) {
    try {
        const response = await fetch(Ranked_GetMatch + matchID);
        const statusCode = response.status;

        if (statusCode != 200) {
            return;
        }

        const data = await response.json();
        const timelines = data["data"]["timelines"];

        let latestReset = 0;
        let finished = false;
        let finalTime = 0;

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
                
                case "story.enter_the_nether":
                    timestamps["enter_nether"] = timeline["time"];
                    timings["overworld"]["splits"][0] += timeline["time"] - latestReset;
                    timings["overworld"]["splits"][1] += 1;
                    timings["nether"]["timestamps"][0] += timeline["time"] - latestReset;
                    timings["nether"]["timestamps"][1] += 1;
                    break;
                
                case "nether.find_bastion":
                    timestamps["enter_bastion"] = timeline["time"];
                    timings["bastion"]["timestamps"][0] += timeline["time"] - latestReset;
                    timings["bastion"]["timestamps"][1] += 1;
                    timings["nether"]["splits"][0] += timeline["time"] - timestamps["enter_nether"];
                    timings["nether"]["splits"][1] += 1;
                    break;
                
                case "nether.find_fortress":
                    timestamps["enter_fortress"] = timeline["time"];
                    timings["fortress"]["timestamps"][0] += timeline["time"] - latestReset;
                    timings["fortress"]["timestamps"][1] += 1;
                    timings["bastion"]["splits"][0] += timeline["time"] - timestamps["enter_bastion"];
                    timings["bastion"]["splits"][1] += 1;
                    break;

                case "projectelo.timeline.blind_travel":
                    timestamps["blind"] = timeline["time"];
                    timings["blind"]["timestamps"][0] += timeline["time"] - latestReset;
                    timings["blind"]["timestamps"][1] += 1;
                    timings["fortress"]["splits"][0] += timeline["time"] - timestamps["enter_fortress"];
                    timings["fortress"]["splits"][1] += 1;
                    break;

                case "story.follow_ender_eye":
                    timestamps["enter_stronghold"] = timeline["time"];
                    timings["stronghold"]["timestamps"][0] += timeline["time"] - latestReset;
                    timings["stronghold"]["timestamps"][1] += 1;
                    timings["blind"]["splits"][0] += timeline["time"] - timestamps["blind"];
                    timings["blind"]["splits"][1] += 1;
                    break;

                case "story.enter_the_end":
                    timestamps["enter_end"] = timeline["time"];
                    timings["end"]["timestamps"][0] += timeline["time"] - latestReset;
                    timings["end"]["timestamps"][1] += 1;
                    timings["stronghold"]["splits"][0] += timeline["time"] - timestamps["blind"];
                    timings["stronghold"]["splits"][1] += 1;        
                    break;
            }
        }

        if (finished) {
            timings["end"]["splits"][0] += finalTime - timestamps["enter_end"];
            timings["end"]["splits"][1] += 1;
        }

        console.log("Enter end time: " + timestamps["enter_end"] + " Final time: " + finalTime);

        matchesParsed += 1;
    } catch (error) {
        console.error("ERROR IN 'call_Ranked_GetMatch': ", error);
    }
}

async function call_Ranked_GetUserMatches() {
    try {
        const response = await fetch(Ranked_GetUser + ign + Ranked_GetUserMatches + matchCount);
        const statusCode = response.status;

        promises = [];

        if (statusCode != 200) {
            return;
        }

        const data = await response.json();

        for (const match of data["data"]) {
            const matchID = match["id"];
            promises.push(call_Ranked_GetMatch(matchID));
        }


        await Promise.all(promises);
        console.log("FINISHED");
        console.log(timings);
    } catch (error) {
        console.error("ERROR IN 'call_Ranked_GetUserMatches': ", error);
    }
}

async function call_Ranked_GetUser() {
    try {
        const response = await fetch(Ranked_GetUser + ign);
        const statusCode = response.status;

        if (statusCode != 200) {
            return;
        }

        const data = await response.json();
        const pb = data["data"]["statistics"]["season"]["bestTime"]["ranked"];
        const wins = data["data"]["statistics"]["season"]["wins"]["ranked"];
        const losses = data["data"]["statistics"]["season"]["loses"]["ranked"];

        WinRateLabel.textContent = "W/L%: " + (wins / (wins + losses) * 100).toFixed(1) + "%";
        PbLabel.textContent = "PB: " + msToMinSecs(pb);
        uuid = data["data"]["uuid"];
    } catch (error) {
        console.error("ERROR IN 'call_Ranked_GetUser': ", error);
    }
}

// Nameplate
const currentPath = window.location.pathname.slice(1);
if (currentPath) {
    ign = currentPath;
    PlayerName.textContent = decodeURIComponent(currentPath);
    PlayerModel.src = "https://starlightskins.lunareclipse.studio/render/default/" + PlayerName.textContent + "/face";
    call_Ranked_GetUser();
}

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
    call_Ranked_GetUser();
    call_Ranked_GetUserMatches();
})

PlayerName.addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        PlayerName.blur();
    }  
})

// Gamemode buttons
RankedButton.style.backgroundColor = "#507699";

RankedButton.addEventListener("click", function() {
    RankedButton.style.backgroundColor = "#507699";
    PrivateButton.style.backgroundColor = "#202F3D";
    gamemode = 2;
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
    PrivateButton.style.backgroundColor = "#507699";
    RankedButton.style.backgroundColor = "#202F3D";
    gamemode = 3;
})

// Match Count Slider
MatchCount.addEventListener("blur", function() {
    let newText = this.textContent;
    if (/^\d+$/.test(newText) == false || parseInt(newText) > matchCountLimit) {
        // Has letters or number exceeds limit
        newText = "1";
    }
    MatchCountSlider.value = parseInt(newText);
    this.textContent = newText;
})

MatchCount.addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        MatchCount.blur();
    }
})

MatchCountSlider.addEventListener("input", function() {
    MatchCount.textContent = MatchCountSlider.value;
})