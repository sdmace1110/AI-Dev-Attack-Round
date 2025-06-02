let players = [
  { name: "Arin Stormblade", initiative: 15, barPosition: 70, showCard: true },
  { name: "Bryn Ironfist", initiative: 20, barPosition: 50, showCard: true },
  { name: "Dain Shadowalker", initiative: 10, barPosition: 30, showCard: true },
  { name: "Eryn Brightwood", initiative: 25, barPosition: 90, showCard: true },
];

let npcs = [
  { name: "Goblin Scout", initiative: 12, barPosition: 40, showCard: true },
  { name: "Orc Brute", initiative: 18, barPosition: 60, showCard: true },
  { name: "Troll Shaman", initiative: 8, barPosition: 20, showCard: true },
  { name: "Dragon Whelp", initiative: 22, barPosition: 80, showCard: true },
];

let initList = [];

let initiative = 100;

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

    const nameDiv = document.createElement("div");
    nameDiv.className = "card-name";
    nameDiv.textContent = item.name;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✕";
    removeBtn.title = "Remove";
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
    });
    removeBtn.onclick = () => {
      item.showCard = false;
      renderCards({ array, sectionId, color });
    };

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

    const attackRoundDiv = document.getElementById("attack-round");
    attackRoundDiv.classList.remove("hide");
    if (attackRoundDiv) {
      attackRoundDiv.innerHTML = ""; // Clear previous content
      // Find all objects with the current initiative value
      const activeItems = initList.filter(
        (item) => item.initiative === initiative
      );

      // Create the main container div
      const activeDiv = document.createElement("div");
      activeDiv.className = "active-ar";

      // Create the title span and set its text to the matching names
      const titleSpan = document.createElement("span");
      titleSpan.className = "title-ar";
      titleSpan.textContent = activeItems.map((item) => item.name).join(", ");

      // Create the form div
      const formDiv = document.createElement("div");
      formDiv.className = "form";
      formDiv.textContent = "THIS IS COMING SOON -- FORM DATA!";

      // Append title and form to the main container
      activeDiv.appendChild(titleSpan);
      activeDiv.appendChild(formDiv);

      // Append the main container to the attack round div
      attackRoundDiv.appendChild(activeDiv);
      //   attackRoundDiv.appendChild(h1);
    }
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
