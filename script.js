function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let players = [
  {
    name: "Arin Stormblade",
    initiative: 15,
    maxHps: 23,
    currentHps: 20,
    barPosition: 0,
    actions: [],
    attackStats: [],
    showCard: true,
  },
  {
    name: "Bryn Ironfist",
    initiative: 20,
    maxHps: 35,
    currentHps: 35, // will set below
    barPosition: 0, // will set below
    actions: [],
    attackStats: [],
    showCard: true,
  },
  {
    name: "Dain Shadowalker",
    initiative: 10,
    maxHps: 22,
    currentHps: 1, // will set below
    barPosition: 0, // will set below
    actions: [],
    attackStats: [],
    showCard: true,
  },
  {
    name: "Eryn Brightwood",
    initiative: 25,
    maxHps: 42,
    currentHps: 21, // will set below
    barPosition: 0, // will set below
    actions: [],
    attackStats: [],
    showCard: true,
  },
];

let npcs = [
  {
    name: "Goblin Scout",
    initiative: 12,
    maxHps: getRandomInt(10, 20),
    currentHps: 0, // will set below
    barPosition: 0, // will set below
    actions: [],
    attackStats: [],
    showCard: true,
  },
  {
    name: "Orc Brute",
    initiative: 18,
    maxHps: getRandomInt(18, 28),
    currentHps: 0,
    barPosition: 0,
    actions: [],
    attackStats: [],
    showCard: true,
  },
  {
    name: "Troll Shaman",
    initiative: 8,
    maxHps: getRandomInt(22, 35),
    currentHps: 0,
    barPosition: 0,
    actions: [],
    attackStats: [],
    showCard: true,
  },
  {
    name: "Dragon Whelp",
    initiative: 22,
    maxHps: getRandomInt(25, 40),
    currentHps: 0,
    barPosition: 0,
    actions: [],
    attackStats: [],
    showCard: true,
  },
];

// Set barPosition for all
function updateBarPositions(arr) {
  arr.forEach((obj) => {
    obj.barPosition = (obj.currentHps / obj.maxHps) * 100;
  });
}
updateBarPositions(players);
updateBarPositions(npcs);

let initList = [];

let initiative = 100;

// Utility: Get bar color
function getBarColor(percent) {
  let r, g, b;
  if (percent <= 50) {
    const t = percent / 50;
    r = Math.round(0xe5 + (0xfb - 0xe5) * t);
    g = Math.round(0x39 + (0xc0 - 0x39) * t);
    b = Math.round(0x35 + (0x2d - 0x35) * t);
  } else {
    const t = (percent - 50) / 50;
    r = Math.round(0xfb + (0x43 - 0xfb) * t);
    g = Math.round(0xc0 + (0xa0 - 0xc0) * t);
    b = Math.round(0x2d + (0x47 - 0x2d) * t);
  }
  return `rgb(${r},${g},${b})`;
}

// Helper for input styling
function styleInput(input) {
  input.style.width = "100%";
  input.style.padding = "8px";
  input.style.borderRadius = "6px";
  input.style.border = "1px solid #444";
  input.style.background = "#181a20";
  input.style.color = "#fff";
}

// General modal creation
function createModal({ type, array, render, color }) {
  const modalId = `${type}-modal`;
  document.getElementById(modalId)?.remove();

  const modalOverlay = document.createElement("div");
  modalOverlay.id = modalId;
  Object.assign(modalOverlay.style, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  });

  const modalBox = document.createElement("div");
  Object.assign(modalBox.style, {
    background: "#23272f",
    padding: "32px 32px 24px 32px",
    borderRadius: "16px",
    position: "relative",
    minWidth: "320px",
    boxShadow: "0 4px 32px #000a",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  });

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "✕";
  Object.assign(closeBtn.style, {
    position: "absolute",
    top: "12px",
    right: "16px",
    background: "#e57373",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "32px",
    height: "32px",
    fontSize: "1.2rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });
  closeBtn.onclick = () => modalOverlay.remove();

  const fields = [
    { label: "Name", type: "text" },
    { label: "Initiative", type: "number", min: 1, max: 25 },
    { label: "Bar Position", type: "number", min: 0, max: 100 },
  ];
  const inputs = {};

  fields.forEach(({ label, type, min, max }) => {
    const lbl = document.createElement("label");
    lbl.textContent = label;
    lbl.style.marginBottom = "4px";
    const input = document.createElement("input");
    input.type = type;
    if (min !== undefined) input.min = min;
    if (max !== undefined) input.max = max;
    styleInput(input);
    modalBox.appendChild(lbl);
    modalBox.appendChild(input);
    inputs[label] = input;
  });

  const addBtn = document.createElement("button");
  addBtn.textContent = "Add To List";
  Object.assign(addBtn.style, {
    background: color,
    color: "#181a20",
    border: "none",
    borderRadius: "8px",
    padding: "12px 24px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "18px",
  });

  addBtn.onclick = () => {
    const name = inputs["Name"].value.trim();
    const initiative = parseInt(inputs["Initiative"].value, 10);
    const barPosition = parseInt(inputs["Bar Position"].value, 10);
    if (name && !isNaN(initiative) && !isNaN(barPosition)) {
      array.push({ name, initiative, barPosition, showCard: true });
      render();
      Object.values(inputs).forEach((i) => (i.value = ""));
      inputs["Name"].focus();
    }
  };

  modalBox.append(closeBtn, addBtn);
  modalOverlay.appendChild(modalBox);
  document.body.appendChild(modalOverlay);

  closeBtn.onclick = () => {
    Object.values(inputs).forEach((i) => (i.value = ""));
    modalOverlay.remove();
  };
}

// General render function
function renderCards({ array, sectionId, color }) {
  const section = document.getElementById(sectionId);
  section.innerHTML = "";
  array.sort((a, b) => b.initiative - a.initiative);
  array.forEach((item) => {
    if (!item.showCard) return;
    const card = document.createElement("div");
    card.className = "card";
    card.style.position = "relative";

    // Remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✕";
    Object.assign(removeBtn.style, {
      position: "absolute",
      top: "8px",
      right: "8px",
      background: "#e57373",
      color: "#fff",
      border: "none",
      borderRadius: "50%",
      width: "28px",
      height: "28px",
      fontSize: "1rem",
      cursor: "pointer",
      padding: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    });
    removeBtn.onclick = () => {
      item.showCard = false;
      renderCards({ array, sectionId, color });
    };

    // Card content
    const nameDiv = document.createElement("div");
    nameDiv.className = "card-name";
    nameDiv.textContent = item.name;

    const cardRow = document.createElement("div");
    cardRow.className = "card-row";

    const initiativeDiv = document.createElement("div");
    initiativeDiv.className = "initiative-box";
    initiativeDiv.textContent = item.initiative;

    const barContainer = document.createElement("div");
    barContainer.className = "bar-container";
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.width = item.barPosition + "%";
    bar.style.background = getBarColor(item.barPosition);
    barContainer.appendChild(bar);

    cardRow.append(initiativeDiv, barContainer);
    card.append(removeBtn, nameDiv, cardRow);
    section.appendChild(card);
  });
}

// Attack round form rendering (extract to function)
function renderAttackRound(initList, initiative) {
  const attackRoundDiv = document.getElementById("attack-round");
  attackRoundDiv.innerHTML = "";
  attackRoundDiv.classList.remove("hide");

  // Find all objects with the current initiative value and showCard = true
  const activeItems = initList.filter(
    (item) => item.initiative === initiative && item.showCard !== false
  );

  // Create the main container div
  const activeDiv = document.createElement("div");
  activeDiv.className = "active-ar";

  // Create a close button for the attack round form
  const closeAttackRoundBtn = document.createElement("button");
  closeAttackRoundBtn.textContent = "✕";
  Object.assign(closeAttackRoundBtn.style, {
    position: "absolute",
    top: "-26px",
    right: "24px",
    background: "#e57373",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "32px",
    height: "32px",
    fontSize: "1.2rem",
    cursor: "pointer",
    zIndex: "10",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });
  closeAttackRoundBtn.onclick = () => {
    attackRoundDiv.innerHTML = "";
    attackRoundDiv.classList.add("hide");
    document.getElementById("begin-ar").classList.remove("hide");
  };

  // For each active item (player or npc)
  activeItems.forEach((item) => {
    // Top row: Name, HP, Initiative
    const topRow = document.createElement("div");
    topRow.style.display = "flex";
    topRow.style.alignItems = "center";
    topRow.style.justifyContent = "space-between";
    topRow.style.gap = "18px";
    topRow.style.marginBottom = "8px";

    const nameSpan = document.createElement("span");
    nameSpan.textContent = item.name;
    nameSpan.style.fontWeight = "bold";
    nameSpan.style.fontSize = "1.1rem";

    const hpSpan = document.createElement("span");
    // Find the original object to get currentHps and maxHps
    let original =
      players.find((p) => p.name === item.name) ||
      npcs.find((n) => n.name === item.name);
    hpSpan.textContent = `HP: ${original?.currentHps ?? "?"}/${
      original?.maxHps ?? "?"
    }`;
    hpSpan.style.marginLeft = "12px";

    const initSpan = document.createElement("span");
    initSpan.textContent = `Initiative: ${item.initiative}`;
    initSpan.style.marginLeft = "12px";

    topRow.append(nameSpan, hpSpan, initSpan);

    // Form container
    const form = document.createElement("form");
    form.style.display = "grid";
    form.style.gridTemplateColumns = "1fr 1fr";
    form.style.gap = "12px";
    form.style.background = "#23272f";
    form.style.padding = "16px";
    form.style.borderRadius = "10px";
    form.style.marginBottom = "24px";
    form.style.boxShadow = "0 2px 8px #0004";

    // D&D Actions dropdown
    const actionLabel = document.createElement("label");
    actionLabel.textContent = "Action:";
    actionLabel.style.gridColumn = "1 / 2";
    const actionSelect = document.createElement("select");
    actionSelect.style.width = "100%";
    [
      "Attack",
      "Cast Spell",
      "Dodge",
      "Help",
      "Hide",
      "Ready",
      "Search",
      "Use Object",
    ].forEach((opt) => {
      const o = document.createElement("option");
      o.value = opt;
      o.textContent = opt;
      actionSelect.appendChild(o);
    });

    // Hits input
    const hitsLabel = document.createElement("label");
    hitsLabel.textContent = "Hits:";
    const hitsInput = document.createElement("input");
    hitsInput.type = "number";
    hitsInput.min = 0;
    hitsInput.value = 0;

    // Misses input
    const missesLabel = document.createElement("label");
    missesLabel.textContent = "Misses:";
    const missesInput = document.createElement("input");
    missesInput.type = "number";
    missesInput.min = 0;
    missesInput.value = 0;

    // Damage Done input
    const dmgDoneLabel = document.createElement("label");
    dmgDoneLabel.textContent = "Damage Done:";
    const dmgDoneInput = document.createElement("input");
    dmgDoneInput.type = "number";
    dmgDoneInput.value = 0;

    // Damage Taken input
    const dmgTakenLabel = document.createElement("label");
    dmgTakenLabel.textContent = "Damage Taken:";
    const dmgTakenInput = document.createElement("input");
    dmgTakenInput.type = "number";
    dmgTakenInput.value = 0;

    // Healing Done input
    const healDoneLabel = document.createElement("label");
    healDoneLabel.textContent = "Healing Done:";
    const healDoneInput = document.createElement("input");
    healDoneInput.type = "number";
    healDoneInput.value = 0;

    // Healing Taken input
    const healTakenLabel = document.createElement("label");
    healTakenLabel.textContent = "Healing Taken:";
    const healTakenInput = document.createElement("input");
    healTakenInput.type = "number";
    healTakenInput.value = 0;

    // Submit button
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Submit";
    submitBtn.style.gridColumn = "1 / 3";
    submitBtn.style.background = "#2ee6b6";
    submitBtn.style.color = "#181a20";
    submitBtn.style.border = "none";
    submitBtn.style.borderRadius = "8px";
    submitBtn.style.padding = "10px 0";
    submitBtn.style.fontWeight = "bold";
    submitBtn.style.marginTop = "10px";
    submitBtn.style.cursor = "pointer";

    // Add all fields to the form
    form.append(
      actionLabel,
      actionSelect,
      hitsLabel,
      hitsInput,
      missesLabel,
      missesInput,
      dmgDoneLabel,
      dmgDoneInput,
      dmgTakenLabel,
      dmgTakenInput,
      healDoneLabel,
      healDoneInput,
      healTakenLabel,
      healTakenInput,
      submitBtn
    );

    // On submit, update the original object and go to next initiative
    form.onsubmit = (e) => {
      e.preventDefault();
      const statObj = {
        action: actionSelect.value,
        hits: Number(hitsInput.value),
        misses: Number(missesInput.value),
        damageDone: Number(dmgDoneInput.value),
        damageTaken: Number(dmgTakenInput.value),
        healingDone: Number(healDoneInput.value),
        healingTaken: Number(healTakenInput.value),
        timestamp: new Date().toISOString(),
      };
      if (original) {
        if (!original.attackStats) original.attackStats = [];
        original.attackStats.push(statObj);
        // Optionally update HP
        if (!isNaN(statObj.damageTaken))
          original.currentHps -= statObj.damageTaken;
        if (!isNaN(statObj.healingTaken))
          original.currentHps += statObj.healingTaken;
        // Clamp HP
        if (original.currentHps < 0) original.currentHps = 0;
        if (original.currentHps > original.maxHps)
          original.currentHps = original.maxHps;
      }

      // Find the next highest initiative (that still has showCard = true)
      const remaining = initList
        .filter((obj) => obj.showCard !== false && obj.initiative < initiative)
        .map((obj) => obj.initiative);
      const nextInitiative =
        remaining.length > 0 ? Math.max(...remaining) : null;

      if (nextInitiative !== null) {
        // Continue to next initiative
        renderAttackRound(initList, nextInitiative);
      } else {
        // End of round: close modal and show controls
        attackRoundDiv.innerHTML = "";
        attackRoundDiv.classList.add("hide");
        document.getElementById("begin-ar").classList.remove("hide");
      }
      console.table(players, npcs);
    };

    // Container for this player's/npc's form
    const playerFormContainer = document.createElement("div");
    playerFormContainer.style.marginBottom = "32px";
    playerFormContainer.style.background = "#24293a";
    playerFormContainer.style.borderRadius = "12px";
    playerFormContainer.style.padding = "18px 18px 10px 18px";
    playerFormContainer.style.boxShadow = "0 2px 8px #0004";

    playerFormContainer.append(topRow, form);
    activeDiv.appendChild(playerFormContainer);
  });

  activeDiv.style.position = "relative";
  activeDiv.appendChild(closeAttackRoundBtn);
  attackRoundDiv.appendChild(activeDiv);
}

// Event listeners for buttons
window.onload = function () {
  const renderPlayers = () =>
    renderCards({ array: players, sectionId: "section1", color: "#2ee6b6" });
  const renderNpcs = () =>
    renderCards({ array: npcs, sectionId: "section3", color: "#e57373" });

  renderPlayers();
  renderNpcs();

  document.getElementById("start-ar")?.addEventListener("click", function () {
    const composite = [...players, ...npcs].sort(
      (a, b) => b.initiative - a.initiative
    );
    console.log(composite);
    initList = composite.map((item) => ({
      name: item.name,
      initiative: item.initiative,
      barPosition: item.barPosition,
      showCard: true,
    }));
    document.getElementById("begin-ar").classList.add("hide");
    if (initList.length > 0) {
      initiative = initList[0].initiative;
    }
    renderAttackRound(initList, initiative);
  });

  document.getElementById("add-player")?.addEventListener("click", () =>
    createModal({
      type: "player",
      array: players,
      render: renderPlayers,
      color: "#2ee6b6",
    })
  );
  document.getElementById("add-npc")?.addEventListener("click", () =>
    createModal({
      type: "npc",
      array: npcs,
      render: renderNpcs,
      color: "#e57373",
    })
  );
  document.getElementById("reset-ar")?.addEventListener("click", () => {
    players = [];
    renderPlayers();
  });
};
