(function() {
    "use strict";

    const DEFAULT_SEED = -1747862978341114290n;
    const LONG_MIN = -(2n ** 63n);
    const LONG_MAX = 2n ** 63n - 1n;
    const TEXTURE_ROOT = "public/textures/";
    const MAX_VISIBLE_ICONS = 120;
    const ROUTE_ITEMS = new Set([
        "minecraft:obsidian",
        "minecraft:ender_pearl",
        "minecraft:string",
        "minecraft:glowstone_dust",
        "minecraft:crying_obsidian",
        "minecraft:potion",
        "minecraft:splash_potion"
    ]);

    const ITEM_LABELS = {
        "minecraft:book": "Soul Speed book",
        "minecraft:iron_boots": "Soul Speed boots",
        "minecraft:potion": "Fire resistance potion",
        "minecraft:splash_potion": "Splash fire resistance",
        "minecraft:iron_nugget": "Iron nuggets",
        "minecraft:quartz": "Nether quartz",
        "minecraft:glowstone_dust": "Glowstone dust",
        "minecraft:magma_cream": "Magma cream",
        "minecraft:ender_pearl": "Ender pearls",
        "minecraft:string": "String",
        "minecraft:fire_charge": "Fire charges",
        "minecraft:gravel": "Gravel",
        "minecraft:leather": "Leather",
        "minecraft:nether_brick": "Nether bricks",
        "minecraft:obsidian": "Obsidian",
        "minecraft:crying_obsidian": "Crying obsidian",
        "minecraft:soul_sand": "Soul sand"
    };

    const ITEM_TEXTURES = {
        "minecraft:book": "book.png",
        "minecraft:iron_boots": "iron_boots.png",
        "minecraft:potion": "potion.png",
        "minecraft:splash_potion": "splash_potion.png",
        "minecraft:iron_nugget": "iron_nugget.png",
        "minecraft:quartz": "quartz.png",
        "minecraft:glowstone_dust": "glowstone_dust.png",
        "minecraft:magma_cream": "magma_cream.png",
        "minecraft:ender_pearl": "ender_pearl.png",
        "minecraft:string": "string.png",
        "minecraft:fire_charge": "fire_charge.png",
        "minecraft:gravel": "gravel.png",
        "minecraft:leather": "leather.png",
        "minecraft:nether_brick": "nether_brick.png",
        "minecraft:obsidian": "obsidian.png",
        "minecraft:crying_obsidian": "crying_obsidian.png",
        "minecraft:soul_sand": "soul_sand.png"
    };

    const BARTER_ENTRIES = [
        { name: "minecraft:book", weight: 5n, enchant: true },
        { name: "minecraft:iron_boots", weight: 8n, enchant: true },
        { name: "minecraft:potion", weight: 10n },
        { name: "minecraft:splash_potion", weight: 10n },
        { name: "minecraft:iron_nugget", weight: 10n, min: 9n, max: 36n },
        { name: "minecraft:quartz", weight: 20n, min: 8n, max: 16n },
        { name: "minecraft:glowstone_dust", weight: 20n, min: 5n, max: 12n },
        { name: "minecraft:magma_cream", weight: 20n, min: 2n, max: 6n },
        { name: "minecraft:ender_pearl", weight: 20n, min: 4n, max: 8n },
        { name: "minecraft:string", weight: 20n, min: 8n, max: 24n },
        { name: "minecraft:fire_charge", weight: 40n, min: 1n, max: 5n },
        { name: "minecraft:gravel", weight: 40n, min: 8n, max: 16n },
        { name: "minecraft:leather", weight: 40n, min: 4n, max: 10n },
        { name: "minecraft:nether_brick", weight: 40n, min: 4n, max: 16n },
        { name: "minecraft:obsidian", weight: 40n },
        { name: "minecraft:crying_obsidian", weight: 40n, min: 1n, max: 3n },
        { name: "minecraft:soul_sand", weight: 40n, min: 4n, max: 16n }
    ];

    const MULTIPLIER = 0x5DEECE66Dn;
    const ADDEND = 0xBn;
    const MASK = (1n << 48n) - 1n;

    class JavaRandom {
        constructor(seed) {
            this.seed = initialScramble(seed);
        }

        next(bits) {
            this.seed = (this.seed * MULTIPLIER + ADDEND) & MASK;
            return this.seed >> (48n - bits);
        }

        nextInt(bound) {
            if (bound <= 0n) throw new RangeError("bound must be positive");

            let result = this.next(31n);
            const mask = bound - 1n;
            if ((bound & mask) === 0n) {
                return (bound * result) >> 31n;
            }

            let candidate = result;
            while (candidate - (result = candidate % bound) + mask < 0n) {
                candidate = this.next(31n);
            }
            return result;
        }

        nextFloat() {
            return Number(this.next(24n)) / (1 << 24);
        }

        nextLong() {
            const high = this.next(32n);
            let low = this.next(32n);
            if ((low & (1n << 31n)) !== 0n) low -= 1n << 32n;
            return (high << 32n) + low;
        }
    }

    class RNGState {
        static Type = {
            BLAZE: 0,
            BLAZE_SPAWN: 1,
            MAGMA_CUBE_SPAWN: 2,
            BARTER: 3,
            ENDERMAN: 4,
            FLINT: 5,
            EYE: 6,
            SUS_STEW: 7,
            HOGLIN: 8,
            FOOD_RANDOM: 9,
            TRADE: 10,
            DRAGON_STANDARD: 11,
            DRAGON_PERCH: 12,
            DRAGON_PATH: 13,
            DRAGON_HEIGHT: 14,
            CHICKEN: 15,
            SHEEP: 16,
            SHEEP_SHEARS: 17,
            COW: 18,
            PIG: 19,
            ENDER_MITE: 20,
            RAIN_WITH_THUNDER: 21,
            SPAWN: 22,
            PHANTOM: 23,
            LEAVES: 24,
            DEAD_BUSH: 25,
            FORTRESS_SPAWN: 26
        };

        constructor(seed) {
            const seedRandom = new JavaRandom(seed + 4262064045n);
            this.randoms = [];
            for (let i = 0; i < Object.keys(RNGState.Type).length; i++) {
                const random = new JavaRandom(0n);
                random.seed = initialScramble(seedRandom.nextLong());
                this.randoms.push(random);
            }
        }

        getRandom(type) {
            return this.randoms[type];
        }
    }

    class PiglinBarterState {
        static MAX_GUARANTEE = 72;
        static MAX_PEARL_COUNT = 3;
        static MAX_OBSIDIAN_COUNT = 6;

        constructor() {
            this.pearlTradeIndexes = [];
            this.obsidianTradeIndexes = [];
            this.currentTrades = Number.MAX_SAFE_INTEGER;
            this.rolling = false;
        }

        refreshTradeIndexes(random) {
            this.currentTrades = 0;
            const indexes = Array.from({ length: PiglinBarterState.MAX_GUARANTEE }, (_, index) => index);
            this.shuffle(indexes, random);
            this.pearlTradeIndexes = indexes.splice(0, PiglinBarterState.MAX_PEARL_COUNT);
            this.obsidianTradeIndexes = indexes.splice(0, PiglinBarterState.MAX_OBSIDIAN_COUNT);
        }

        shuffle(values, random) {
            for (let i = values.length; i > 1; i--) {
                const swapIndex = Number(random.nextInt(BigInt(i)));
                [values[i - 1], values[swapIndex]] = [values[swapIndex], values[i - 1]];
            }
        }

        getBarteredItem(random) {
            let roll = random.nextInt(423n);
            for (const entry of BARTER_ENTRIES) {
                roll -= entry.weight;
                if (roll >= 0n) continue;
                return this.guaranteeItem({ item: entry.name, amount: getBarterAmount(entry, random) }, random);
            }
            return { item: "minecraft:obsidian", amount: 1 };
        }

        guaranteeItem(itemStack, random) {
            const result = this.guaranteeItemInternal(itemStack, random);
            if (!this.rolling) this.currentTrades++;
            return result;
        }

        guaranteeItemInternal(itemStack, random) {
            if (this.currentTrades >= PiglinBarterState.MAX_GUARANTEE) {
                this.refreshTradeIndexes(random);
            }

            if (itemStack.item === "minecraft:ender_pearl") {
                if (this.pearlTradeIndexes.length === 0) {
                    this.rolling = true;
                    const rerolled = this.getBarteredItem(random);
                    this.rolling = false;
                    return rerolled;
                }
                this.pearlTradeIndexes.shift();
                return itemStack;
            }

            if (itemStack.item === "minecraft:obsidian") {
                if (this.obsidianTradeIndexes.length > 0) this.obsidianTradeIndexes.shift();
                return itemStack;
            }

            const pearlIndex = this.pearlTradeIndexes.indexOf(this.currentTrades);
            if (pearlIndex !== -1) {
                if (!this.rolling) this.pearlTradeIndexes.splice(pearlIndex, 1);
                return { item: "minecraft:ender_pearl", amount: Number(random.nextInt(5n)) + 4 };
            }

            const obsidianIndex = this.obsidianTradeIndexes.indexOf(this.currentTrades);
            if (obsidianIndex !== -1) {
                if (!this.rolling) this.obsidianTradeIndexes.splice(obsidianIndex, 1);
                return { item: "minecraft:obsidian", amount: 1 };
            }

            return itemStack;
        }
    }

    const rankedView = document.getElementById("rankedAnalysisView");
    const seedView = document.getElementById("seedInfoView");
    const rankedTab = document.getElementById("rankedAnalysisTab");
    const seedTab = document.getElementById("seedInfoTab");
    const siteContext = document.getElementById("siteContext");
    const pageTitle = document.getElementById("pageTitle");
    const currentUrl = new URL(window.location.href);
    const isSeedView = currentUrl.searchParams.get("view") === "seed";

    configureTabs();
    if (!isSeedView) return;

    const seedInput = document.getElementById("seedInput");
    const goldInput = document.getElementById("goldInput");
    const goldSlider = document.getElementById("goldSlider");
    const barterFilter = document.getElementById("barterFilter");
    const barterItems = document.getElementById("barterItems");
    const blazeInput = document.getElementById("blazeInput");
    const blazeSlider = document.getElementById("blazeSlider");
    const blazeRodAmount = document.getElementById("blazeRodAmount");
    const blazeSequence = document.getElementById("blazeSequence");
    const flintCount = document.getElementById("flintCount");
    const flintSequence = document.getElementById("flintSequence");
    const eyeCount = document.getElementById("eyeCount");
    const eyeSequence = document.getElementById("eyeSequence");
    const rodLabels = {
        5: document.getElementById("fiveRodsKilled"),
        6: document.getElementById("sixRodsKilled"),
        7: document.getElementById("sevenRodsKilled")
    };

    let seed = parseLong(currentUrl.searchParams.get("seed")) ?? DEFAULT_SEED;
    let gold = 1;
    let blazes = 1;
    let rodTargets = {};

    seedInput.value = seed.toString();
    bindControls();
    refreshSeed();

    if (!currentUrl.searchParams.has("seed")) {
        loadWeeklySeed();
    }

    function configureTabs() {
        const rankedUrl = new URL(window.location.href);
        rankedUrl.searchParams.delete("view");
        rankedUrl.searchParams.delete("seed");

        const seedUrl = new URL(window.location.href);
        seedUrl.searchParams.set("view", "seed");

        rankedTab.href = rankedUrl.pathname + rankedUrl.search + rankedUrl.hash;
        seedTab.href = seedUrl.pathname + seedUrl.search + seedUrl.hash;
        rankedTab.toggleAttribute("aria-current", !isSeedView);
        seedTab.toggleAttribute("aria-current", isSeedView);
        rankedView.hidden = isSeedView;
        seedView.hidden = !isSeedView;
        siteContext.textContent = isSeedView ? "mcsr.seed.rng.preview" : "mcsr.player.feed.stats";
        if (isSeedView) pageTitle.textContent = "Seed Info | Ranked Analysis";
    }

    function bindControls() {
        seedInput.addEventListener("input", function() {
            const nextSeed = parseLong(seedInput.value);
            seedInput.setAttribute("aria-invalid", String(nextSeed === null));
            if (nextSeed === null) return;
            seed = nextSeed;
            updateSeedUrl();
            refreshSeed();
        });

        bindNumberAndSlider(goldInput, goldSlider, 500, function(value) {
            gold = value;
            refreshGold();
        });

        bindNumberAndSlider(blazeInput, blazeSlider, 500, function(value) {
            blazes = value;
            refreshBlazes();
        });

        document.querySelectorAll("[data-gold-delta]").forEach(function(button) {
            button.addEventListener("click", function() {
                setGold(gold + Number(button.dataset.goldDelta));
            });
        });

        document.querySelectorAll("[data-gold-blocks]").forEach(function(button) {
            button.addEventListener("click", function() {
                setGold(Number(button.dataset.goldBlocks) * 9);
            });
        });

        document.querySelectorAll("[data-rod-target]").forEach(function(button) {
            button.addEventListener("click", function() {
                const target = Number(button.dataset.rodTarget);
                if (rodTargets[target] != null) setBlazes(rodTargets[target]);
            });
        });

        barterFilter.addEventListener("change", refreshGold);
    }

    function bindNumberAndSlider(numberInput, slider, max, onChange) {
        numberInput.addEventListener("input", function() {
            const value = clampInteger(numberInput.value, max);
            if (value === null) return;
            slider.value = Math.min(value, Number(slider.max));
            onChange(value);
        });

        slider.addEventListener("input", function() {
            const value = Number(slider.value);
            numberInput.value = String(value);
            onChange(value);
        });
    }

    function setGold(value) {
        gold = Math.min(Math.max(Math.trunc(value), 0), 500);
        goldInput.value = String(gold);
        goldSlider.value = String(Math.min(gold, Number(goldSlider.max)));
        refreshGold();
    }

    function setBlazes(value) {
        blazes = Math.min(Math.max(Math.trunc(value), 0), 500);
        blazeInput.value = String(blazes);
        blazeSlider.value = String(Math.min(blazes, Number(blazeSlider.max)));
        refreshBlazes();
    }

    function refreshSeed() {
        refreshGold();
        refreshRodTargets();
        refreshBlazes();
        refreshFlint();
        refreshEyes();
    }

    function refreshGold() {
        const random = new RNGState(seed).getRandom(RNGState.Type.BARTER);
        const barterState = new PiglinBarterState();
        const totals = new Map();

        for (let i = 0; i < gold; i++) {
            const result = barterState.getBarteredItem(random);
            totals.set(result.item, (totals.get(result.item) ?? 0) + result.amount);
        }

        barterItems.replaceChildren();
        for (const [item, amount] of totals) {
            if (barterFilter.checked && !ROUTE_ITEMS.has(item)) continue;
            barterItems.appendChild(createBarterRow(item, amount));
        }

        if (!barterItems.children.length) {
            const row = document.createElement("tr");
            const cell = document.createElement("td");
            cell.colSpan = 2;
            cell.className = "seedEmpty";
            cell.textContent = gold === 0 ? "No gold selected" : "No route items in this sequence";
            row.appendChild(cell);
            barterItems.appendChild(row);
        }
    }

    function createBarterRow(item, amount) {
        const row = document.createElement("tr");
        const itemCell = document.createElement("td");
        const amountCell = document.createElement("td");
        const itemWrap = document.createElement("span");
        const icon = document.createElement("img");
        const label = document.createElement("span");

        itemWrap.className = "seedItem";
        icon.src = TEXTURE_ROOT + ITEM_TEXTURES[item];
        icon.alt = "";
        icon.setAttribute("aria-hidden", "true");
        label.textContent = ITEM_LABELS[item] ?? item.replace("minecraft:", "").replaceAll("_", " ");
        amountCell.textContent = formatBarterAmount(item, amount);

        itemWrap.append(icon, label);
        itemCell.appendChild(itemWrap);
        row.append(itemCell, amountCell);
        return row;
    }

    function refreshRodTargets() {
        const random = new RNGState(seed).getRandom(RNGState.Type.BLAZE);
        rodTargets = {};
        let rods = 0;

        for (let kill = 1; kill <= 1000; kill++) {
            rods += getNextBlazeDrop(random, kill - 1);
            for (const target of [5, 6, 7]) {
                if (rods >= target && rodTargets[target] == null) rodTargets[target] = kill;
            }
            if (rodTargets[7] != null) break;
        }

        for (const target of [5, 6, 7]) {
            const kills = rodTargets[target];
            rodLabels[target].textContent = kills == null ? "not found" : kills + " killed";
        }
    }

    function refreshBlazes() {
        const random = new RNGState(seed).getRandom(RNGState.Type.BLAZE);
        const outcomes = [];
        let rods = 0;

        for (let kill = 0; kill < blazes; kill++) {
            const dropped = getNextBlazeDrop(random, kill);
            rods += dropped;
            outcomes.push(dropped === 1);
        }

        blazeRodAmount.textContent = String(rods);
        blazeSequence.replaceChildren(createIconCell("iron_sword.png", "Iron sword"));
        const visible = outcomes.slice(0, MAX_VISIBLE_ICONS);
        visible.forEach(function(dropped, index) {
            const title = "Blaze " + (index + 1) + (dropped ? ": rod" : ": no rod");
            blazeSequence.appendChild(createIconCell(dropped ? "blaze_rod.png" : "blaze_powder.png", title, dropped ? "" : "isMiss"));
        });
        appendMoreIndicator(blazeSequence, outcomes.length - visible.length);
    }

    function refreshFlint() {
        const random = new RNGState(seed).getRandom(RNGState.Type.FLINT);
        let gravel = 0;
        do {
            gravel++;
        } while (random.nextFloat() >= 0.1 && gravel < 1000000);

        flintCount.textContent = String(gravel);
        flintSequence.replaceChildren(createIconCell("iron_shovel.png", "Iron shovel"));
        const misses = Math.min(gravel - 1, MAX_VISIBLE_ICONS - 1);
        for (let i = 0; i < misses; i++) {
            flintSequence.appendChild(createIconCell("gravel.png", "Gravel " + (i + 1), "isMiss"));
        }
        if (gravel <= MAX_VISIBLE_ICONS) {
            flintSequence.appendChild(createIconCell("flint.png", "Flint"));
        } else {
            appendMoreIndicator(flintSequence, gravel - MAX_VISIBLE_ICONS);
            flintSequence.appendChild(createIconCell("flint.png", "Flint"));
        }
    }

    function refreshEyes() {
        const random = new RNGState(seed).getRandom(RNGState.Type.EYE);
        const outcomes = [];
        let survived = 0;

        for (let throwIndex = 0; throwIndex < 5; throwIndex++) {
            const survives = throwIndex === 1 || random.nextInt(5n) > 0n;
            outcomes.push(survives);
            if (survives) survived++;
        }

        eyeCount.textContent = survived + " / 5 survive";
        eyeSequence.replaceChildren();
        outcomes.forEach(function(survives, index) {
            eyeSequence.appendChild(createIconCell("ender_eye.png", "Eye " + (index + 1) + (survives ? ": survives" : ": breaks"), survives ? "" : "isBroken"));
        });
    }

    function createIconCell(texture, title, stateClass) {
        const cell = document.createElement("span");
        const image = document.createElement("img");
        cell.className = "seedIconCell" + (stateClass ? " " + stateClass : "");
        cell.title = title;
        image.className = "seedIcon";
        image.src = TEXTURE_ROOT + texture;
        image.alt = "";
        image.setAttribute("aria-hidden", "true");
        cell.appendChild(image);
        return cell;
    }

    function appendMoreIndicator(container, amount) {
        if (amount <= 0) return;
        const more = document.createElement("span");
        more.className = "seedMore";
        more.textContent = "+" + amount + " more";
        container.appendChild(more);
    }

    function getNextBlazeDrop(random, blazeIndex) {
        if (blazeIndex > 20 && blazeIndex < 32) return 1;
        return Number(helperNextInt(random, 0n, 1n));
    }

    function getBarterAmount(entry, random) {
        let amount = 1;
        if (entry.min != null) amount = Number(helperNextInt(random, entry.min, entry.max));
        if (entry.enchant) {
            random.nextInt(1n);
            helperNextInt(random, 1n, 3n);
        }
        return amount;
    }

    function helperNextInt(random, min, max) {
        if (min >= max) return min;
        return random.nextInt(max - min + 1n) + min;
    }

    function initialScramble(seedValue) {
        return (seedValue ^ MULTIPLIER) & MASK;
    }

    function parseLong(value) {
        if (value == null) return null;
        const text = String(value).trim();
        if (!/^-?\d+$/.test(text) || text.length > 20) return null;
        try {
            const result = BigInt(text);
            return result >= LONG_MIN && result <= LONG_MAX ? result : null;
        } catch (error) {
            return null;
        }
    }

    function clampInteger(value, max) {
        if (!/^\d+$/.test(String(value))) return null;
        return Math.min(Math.max(Number(value), 0), max);
    }

    function formatBarterAmount(item, amount) {
        if (item === "minecraft:string") return amount + " (" + Math.floor(amount / 12) + " beds)";
        if (item === "minecraft:glowstone_dust") return amount + " (" + Math.floor(amount / 16) + " anchors)";
        if (item === "minecraft:crying_obsidian") return amount + " (" + Math.floor(amount / 6) + " anchors)";
        return String(amount);
    }

    function updateSeedUrl() {
        const url = new URL(window.location.href);
        url.searchParams.set("view", "seed");
        url.searchParams.set("seed", seed.toString());
        history.replaceState(null, "", url.pathname + url.search + url.hash);
        seedTab.href = url.pathname + url.search + url.hash;
    }

    async function loadWeeklySeed() {
        try {
            const response = await fetch("https://mcsrranked.com/api/weekly-race/");
            if (!response.ok) return;
            const payload = await response.json();
            const weeklySeed = parseLong(payload?.data?.seed?.rng);
            if (payload?.status !== "success" || weeklySeed === null) return;
            seed = weeklySeed;
            seedInput.value = seed.toString();
            updateSeedUrl();
            refreshSeed();
        } catch (error) {
            console.warn("Unable to load the weekly seed; using the default seed.", error);
        }
    }
})();
