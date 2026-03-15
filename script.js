const SUPABASE_URL = "COLE_AQUI_SUA_SUPABASE_URL";
const SUPABASE_ANON_KEY = "COLE_AQUI_SUA_SUPABASE_ANON_KEY";
const ROOM_TABLE = "cozy_rooms";
const PRESENCE_TABLE = "cozy_presence";

const scenes = [
	{
		title: "Noite chuvosa em casa",
		text: "A chuva cai lá fora e a sala está quentinha. É o momento perfeito para começar a noite juntos.",
		choices: [
			{ label: "Preparar chocolate quente lado a lado", affinity: 12, comfort: 14, memory: "Chocolate quente dividido na janela enquanto a chuva caía." },
			{ label: "Montar uma playlist calma para os dois", affinity: 10, comfort: 9, memory: "Uma playlist baixinha deixou a casa ainda mais acolhedora." },
			{ label: "Passar a noite em telas separadas", affinity: -7, comfort: -4, memory: "A noite começou com distância demais entre vocês." }
		]
	},
	{
		title: "Passeio no parque",
		text: "O céu está rosado e ainda há tempo para uma escolha que mude o rumo do encontro.",
		choices: [
			{ label: "Improvisar um piquenique simples", affinity: 13, comfort: 8, memory: "Um piquenique improvisado virou lembrança favorita." },
			{ label: "Tirar fotos e rir das poses", affinity: 9, comfort: 6, memory: "Fotos espontâneas registraram o melhor do dia." },
			{ label: "Encerrar o passeio sem muita conversa", affinity: -6, comfort: -3, memory: "O passeio terminou cedo demais e sem calor." }
		]
	},
	{
		title: "Hora do jantar",
		text: "A cozinha está pronta. Vocês podem transformar a rotina em um momento fofo.",
		choices: [
			{ label: "Cozinhar juntos e decorar os pratos", affinity: 14, comfort: 11, memory: "O jantar saiu simples, bonito e cheio de parceria." },
			{ label: "Pedir comida e conversar por horas", affinity: 11, comfort: 10, memory: "Uma conversa longa fez a noite render mais do que o esperado." },
			{ label: "Discutir por besteira e perder o clima", affinity: -10, comfort: -8, memory: "A tensão roubou parte do aconchego da noite." }
		]
	},
	{
		title: "Fim da noite",
		text: "Antes de dormir, ainda existe espaço para um último gesto marcante.",
		choices: [
			{ label: "Escrever uma cartinha carinhosa", affinity: 16, comfort: 8, memory: "Uma carta curta guardou tudo o que faltava dizer." },
			{ label: "Trocar presentes feitos à mão", affinity: 12, comfort: 12, memory: "Presentes artesanais fecharam a noite com delicadeza." },
			{ label: "Dormir sem resolver nada", affinity: -12, comfort: -9, memory: "O silêncio final deixou coisas importantes em aberto." }
		]
	}
];

const feelingsMap = {
	aconchego: { emoji: "💞", label: "Aconchego", description: "Tudo está calmo, leve e quentinho." },
	animacao: { emoji: "✨", label: "Animação", description: "Tem energia boa no ar e vontade de viver algo fofo." },
	carinho: { emoji: "🥺", label: "Carinho", description: "O momento pede colo, atenção e cuidado." },
	cansaco: { emoji: "😴", label: "Cansaço", description: "Talvez seja melhor desacelerar e escolher algo bem leve." },
	saudade: { emoji: "🌧️", label: "Saudade", description: "Existe ternura aqui, mas também uma pontinha de distância." }
};

const paletteMap = {
	rose: { label: "rosé suave", room: "🌸" },
	lavender: { label: "lavanda", room: "💜" },
	sunset: { label: "pôr do sol", room: "🌇" }
};

const petStyleMap = {
	laco: { label: "laço", emoji: "🎀" },
	cachecol: { label: "cachecol", emoji: "🧣" },
	estrela: { label: "pingente de estrela", emoji: "⭐" }
};

const roomItemMap = {
	luzes: { label: "luzes quentinhas", emoji: "✨" },
	almofadas: { label: "monte de almofadas", emoji: "🛋️" },
	vinil: { label: "vitrola", emoji: "🎵" }
};

const refs = {
	playerName: document.getElementById("player-name"),
	roomCode: document.getElementById("room-code"),
	createRoomBtn: document.getElementById("create-room-btn"),
	joinRoomBtn: document.getElementById("join-room-btn"),
	copyLinkBtn: document.getElementById("copy-link-btn"),
	restartBtn: document.getElementById("restart-btn"),
	syncBadge: document.getElementById("sync-badge"),
	roomStatus: document.getElementById("room-status"),
	affinityValue: document.getElementById("affinity-value"),
	comfortValue: document.getElementById("comfort-value"),
	dayValue: document.getElementById("day-value"),
	memoryCount: document.getElementById("memory-count"),
	turnValue: document.getElementById("turn-value"),
	affinityFill: document.getElementById("affinity-fill"),
	comfortFill: document.getElementById("comfort-fill"),
	sceneTitle: document.getElementById("scene-title"),
	sceneText: document.getElementById("scene-text"),
	turnHint: document.getElementById("turn-hint"),
	choices: document.getElementById("choices"),
	playersList: document.getElementById("players-list"),
	memoryList: document.getElementById("memory-list"),
	activityList: document.getElementById("activity-list"),
	feelingEmoji: document.getElementById("feeling-emoji"),
	feelingLabel: document.getElementById("feeling-label"),
	feelingDescription: document.getElementById("feeling-description"),
	feelingButtons: document.querySelectorAll(".feeling-button"),
	letterTitle: document.getElementById("letter-title"),
	letterMessage: document.getElementById("letter-message"),
	sendLetterBtn: document.getElementById("send-letter-btn"),
	lettersList: document.getElementById("letters-list"),
	petJoyValue: document.getElementById("pet-joy-value"),
	petHungerValue: document.getElementById("pet-hunger-value"),
	petJoyFill: document.getElementById("pet-joy-fill"),
	petHungerFill: document.getElementById("pet-hunger-fill"),
	feedPetBtn: document.getElementById("feed-pet-btn"),
	playPetBtn: document.getElementById("play-pet-btn"),
	plantWaterValue: document.getElementById("plant-water-value"),
	plantGrowthValue: document.getElementById("plant-growth-value"),
	plantWaterFill: document.getElementById("plant-water-fill"),
	plantGrowthFill: document.getElementById("plant-growth-fill"),
	waterPlantBtn: document.getElementById("water-plant-btn"),
	singPlantBtn: document.getElementById("sing-plant-btn"),
	paletteSelect: document.getElementById("palette-select"),
	petStyleSelect: document.getElementById("pet-style-select"),
	roomItemSelect: document.getElementById("room-item-select"),
	applyCustomBtn: document.getElementById("apply-custom-btn"),
	previewRoomItem: document.getElementById("preview-room-item"),
	previewPetItem: document.getElementById("preview-pet-item"),
	previewPlantItem: document.getElementById("preview-plant-item"),
	customSummary: document.getElementById("custom-summary"),
	teaFill: document.getElementById("tea-fill"),
	teaStatus: document.getElementById("tea-status"),
	teaGameBtn: document.getElementById("tea-game-btn"),
	starsFill: document.getElementById("stars-fill"),
	starsStatus: document.getElementById("stars-status"),
	starsGameBtn: document.getElementById("stars-game-btn"),
	minesBoard: document.getElementById("mines-board"),
	minesStatus: document.getElementById("mines-status"),
	resetMinesBtn: document.getElementById("reset-mines-btn"),
	chessBoard: document.getElementById("chess-board"),
	chessStatus: document.getElementById("chess-status"),
	resetChessBtn: document.getElementById("reset-chess-btn")
};

const localPlayer = {
	id: crypto.randomUUID ? crypto.randomUUID() : `p-${Date.now()}`,
	name: "Jogador"
};

let supabase = null;
let roomCode = "";
let gameState = null;
let onlinePlayers = [];
let roomChannel = null;
let presenceChannel = null;
let heartbeatTimer = null;
let localChessSelection = null;

function createMinesweeperState() {
	const bombs = [];
	while (bombs.length < 3) {
		const index = Math.floor(Math.random() * 16);
		if (!bombs.includes(index)) bombs.push(index);
	}

	return {
		bombs,
		revealed: [],
		finished: false,
		status: "Encontre as casas seguras."
	};
}

function createChessState() {
	return {
		board: [
			{ type: "king", color: "black" },
			{ type: "pawn", color: "black" },
			{ type: "pawn", color: "black" },
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			{ type: "pawn", color: "white" },
			{ type: "pawn", color: "white" },
			{ type: "king", color: "white" }
		],
		turn: "white",
		winner: null,
		status: "Brancas começam."
	};
}

function isSupabaseConfigured() {
	return (
		SUPABASE_URL &&
		SUPABASE_ANON_KEY &&
		!SUPABASE_URL.includes("COLE_AQUI") &&
		!SUPABASE_ANON_KEY.includes("COLE_AQUI")
	);
}

function initSupabase() {
	if (!isSupabaseConfigured()) {
		setSyncStatus("Configure o Supabase", "idle");
		return false;
	}

	supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
	return true;
}

function setSyncStatus(text, tone = "idle") {
	refs.syncBadge.textContent = text;
	refs.syncBadge.dataset.tone = tone;
}

function clamp(value, min, max) {
	return Math.min(Math.max(value, min), max);
}

function normalizeRoomCode(value) {
	return value.trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12);
}

function generateRoomCode() {
	return Math.random().toString(36).slice(2, 10).toUpperCase();
}

function getPlayerName() {
	const value = refs.playerName.value.trim();
	localPlayer.name = value || "Jogador";
	refs.playerName.value = localPlayer.name;
	return localPlayer.name;
}

function ensureGameReady() {
	if (!gameState) {
		alert("Crie ou entre em uma sala primeiro.");
		return false;
	}

	return true;
}

function createInitialState(player) {
	return {
		affinity: 50,
		comfort: 50,
		day: 1,
		currentScene: 0,
		memories: [],
		activity: ["A sala foi criada e a noite começou."],
		playerOrder: [player],
		turnPlayerId: player.id,
		ending: null,
		feeling: "aconchego",
		letters: [],
		pet: {
			name: "Mimo",
			joy: 65,
			hunger: 70
		},
		plant: {
			name: "Lumi",
			water: 72,
			growth: 30
		},
		customization: {
			palette: "rose",
			petStyle: "laco",
			roomItem: "luzes"
		},
		minigames: {
			teaProgress: 0,
			stars: 0
		},
		minesweeper: createMinesweeperState(),
		chess: createChessState(),
		updatedAt: new Date().toISOString()
	};
}

function saveBackupLocally() {
	if (!roomCode || !gameState) return;
	localStorage.setItem(`little-evenings:${roomCode}`, JSON.stringify(gameState));
}

function loadBackupLocally(code) {
	const saved = localStorage.getItem(`little-evenings:${code}`);
	return saved ? JSON.parse(saved) : null;
}

function currentTurnName() {
	if (!gameState) return "—";
	const player = gameState.playerOrder.find((item) => item.id === gameState.turnPlayerId);
	return player ? player.name : "—";
}

function updateHud() {
	const affinity = gameState?.affinity ?? 50;
	const comfort = gameState?.comfort ?? 50;
	const day = gameState?.day ?? 1;
	const memories = gameState?.memories?.length ?? 0;

	refs.affinityValue.textContent = affinity;
	refs.comfortValue.textContent = comfort;
	refs.dayValue.textContent = day;
	refs.memoryCount.textContent = memories;
	refs.turnValue.textContent = currentTurnName();
	refs.affinityFill.style.width = `${affinity}%`;
	refs.comfortFill.style.width = `${comfort}%`;
}

function renderPlayers() {
	refs.playersList.innerHTML = "";

	if (!gameState || gameState.playerOrder.length === 0) {
		refs.playersList.innerHTML = '<li class="empty-state">Nenhum jogador conectado.</li>';
		return;
	}

	const onlineIds = new Set(onlinePlayers.map((player) => player.player_id));

	gameState.playerOrder.forEach((player) => {
		const item = document.createElement("li");
		item.className = "player-pill";

		const meta = document.createElement("div");
		meta.className = "player-meta";
		meta.innerHTML = `
			<strong>${player.name}</strong>
			<span class="player-state">${player.id === gameState.turnPlayerId ? "Está na vez" : "Aguardando turno"}</span>
		`;

		const dot = document.createElement("span");
		dot.className = onlineIds.has(player.id) ? "online-dot" : "online-dot offline-dot";

		item.append(meta, dot);
		refs.playersList.appendChild(item);
	});
}

function renderMemories() {
	refs.memoryList.innerHTML = "";
	const memories = gameState?.memories ?? [];

	if (memories.length === 0) {
		refs.memoryList.innerHTML = '<li class="empty-state">Nenhuma memória registrada ainda.</li>';
		return;
	}

	memories.forEach((memory, index) => {
		const item = document.createElement("li");
		item.textContent = `Dia ${index + 1}: ${memory}`;
		refs.memoryList.appendChild(item);
	});
}

function renderActivity() {
	refs.activityList.innerHTML = "";
	const activity = gameState?.activity ?? [];

	if (activity.length === 0) {
		refs.activityList.innerHTML = '<li class="empty-state">Nada aconteceu ainda.</li>';
		return;
	}

	activity.forEach((entry) => {
		const item = document.createElement("li");
		item.textContent = entry;
		refs.activityList.appendChild(item);
	});
}

function renderFeeling() {
	const feeling = feelingsMap[gameState?.feeling || "aconchego"];
	refs.feelingEmoji.textContent = feeling.emoji;
	refs.feelingLabel.textContent = feeling.label;
	refs.feelingDescription.textContent = feeling.description;
}

function renderLetters() {
	refs.lettersList.innerHTML = "";
	const letters = gameState?.letters ?? [];

	if (letters.length === 0) {
		refs.lettersList.innerHTML = '<li class="empty-state">Nenhuma carta enviada ainda.</li>';
		return;
	}

	letters.forEach((letter) => {
		const item = document.createElement("li");
		const date = new Date(letter.createdAt).toLocaleString("pt-BR", {
			day: "2-digit",
			month: "2-digit",
			hour: "2-digit",
			minute: "2-digit"
		});

		item.innerHTML = `
			<strong>${letter.title}</strong>
			<span class="letter-meta">de ${letter.author} • ${date}</span>
			<p>${letter.body}</p>
		`;

		refs.lettersList.appendChild(item);
	});
}

function renderCare() {
	const pet = gameState?.pet || { joy: 65, hunger: 70 };
	const plant = gameState?.plant || { water: 72, growth: 30 };

	refs.petJoyValue.textContent = pet.joy;
	refs.petHungerValue.textContent = pet.hunger;
	refs.petJoyFill.style.width = `${pet.joy}%`;
	refs.petHungerFill.style.width = `${pet.hunger}%`;

	refs.plantWaterValue.textContent = plant.water;
	refs.plantGrowthValue.textContent = plant.growth;
	refs.plantWaterFill.style.width = `${plant.water}%`;
	refs.plantGrowthFill.style.width = `${plant.growth}%`;
}

function renderCustomization() {
	const customization = gameState?.customization || {
		palette: "rose",
		petStyle: "laco",
		roomItem: "luzes"
	};

	refs.paletteSelect.value = customization.palette;
	refs.petStyleSelect.value = customization.petStyle;
	refs.roomItemSelect.value = customization.roomItem;

	const palette = paletteMap[customization.palette];
	const petStyle = petStyleMap[customization.petStyle];
	const roomItem = roomItemMap[customization.roomItem];

	refs.previewRoomItem.textContent = `${palette.room} ${roomItem.emoji}`;
	refs.previewPetItem.textContent = `🐶 ${petStyle.emoji}`;
	refs.previewPlantItem.textContent = "🪴";
	refs.customSummary.textContent = `Quarto ${palette.label} com ${petStyle.label} no pet e ${roomItem.label}.`;
}

function renderMinigames() {
	const teaProgress = gameState?.minigames?.teaProgress ?? 0;
	const stars = gameState?.minigames?.stars ?? 0;

	refs.teaFill.style.width = `${teaProgress * 20}%`;
	refs.teaStatus.textContent = `${teaProgress} de 5 mexidas`;
	refs.starsFill.style.width = `${stars * 20}%`;
	refs.starsStatus.textContent = `${stars} de 5 estrelas`;
}

function countAdjacentMines(index, bombs) {
	const row = Math.floor(index / 4);
	const col = index % 4;
	let count = 0;

	for (let dr = -1; dr <= 1; dr += 1) {
		for (let dc = -1; dc <= 1; dc += 1) {
			if (dr === 0 && dc === 0) continue;

			const nextRow = row + dr;
			const nextCol = col + dc;
			if (nextRow < 0 || nextRow > 3 || nextCol < 0 || nextCol > 3) continue;

			const nextIndex = nextRow * 4 + nextCol;
			if (bombs.includes(nextIndex)) count += 1;
		}
	}

	return count;
}

function renderMinesweeper() {
	refs.minesBoard.innerHTML = "";
	const state = gameState?.minesweeper || createMinesweeperState();
	refs.minesStatus.textContent = state.status;

	for (let index = 0; index < 16; index += 1) {
		const button = document.createElement("button");
		button.type = "button";
		button.className = "mine-cell";

		const revealed = state.revealed.includes(index);
		if (revealed) {
			button.classList.add("revealed");
			if (state.bombs.includes(index)) {
				button.classList.add("bomb");
				button.textContent = "💥";
			} else {
				const count = countAdjacentMines(index, state.bombs);
				button.textContent = count === 0 ? "·" : count;
			}
		} else {
			button.textContent = "□";
		}

		button.addEventListener("click", () => revealMine(index));
		refs.minesBoard.appendChild(button);
	}
}

function chessEmoji(piece) {
	if (!piece) return "";
	const map = {
		white: { king: "♔", pawn: "♙" },
		black: { king: "♚", pawn: "♟" }
	};
	return map[piece.color][piece.type];
}

function renderChess() {
	refs.chessBoard.innerHTML = "";
	const chess = gameState?.chess || createChessState();
	refs.chessStatus.textContent = chess.winner
		? `Vitória das ${chess.winner === "white" ? "brancas" : "pretas"}.`
		: chess.status;

	chess.board.forEach((piece, index) => {
		const button = document.createElement("button");
		button.type = "button";
		button.className = `chess-cell ${(Math.floor(index / 4) + index % 4) % 2 === 0 ? "light" : "dark"}`;
		if (localChessSelection === index) button.classList.add("selected");
		button.textContent = chessEmoji(piece);
		button.addEventListener("click", () => handleChessClick(index));
		refs.chessBoard.appendChild(button);
	});
}

function buildEnding() {
	if (!gameState) return null;

	if (gameState.affinity >= 78 && gameState.comfort >= 72) {
		return {
			tone: "good",
			title: "Final aconchegante",
			text: "A noite terminou leve, íntima e cheia de lembranças bonitas. Vocês realmente construíram algo doce juntos."
		};
	}

	return {
		tone: "normal",
		title: "Final agridoce",
		text: "Houve bons momentos, mas ainda faltou presença em partes importantes da noite. Dá para tentar de novo e melhorar a conexão."
	};
}

function renderEnding() {
	refs.choices.innerHTML = "";
	const ending = document.createElement("div");
	ending.className = "custom-preview";
	ending.innerHTML = `
		<strong>${gameState.ending.title}</strong>
		<p>${gameState.ending.text}</p>
	`;
	refs.choices.appendChild(ending);
}

function renderScene() {
	refs.choices.innerHTML = "";

	if (!gameState) {
		refs.sceneTitle.textContent = "Crie ou entre em uma sala";
		refs.sceneText.textContent = "Assim que a sala estiver pronta, a história começa e as escolhas passam a ser compartilhadas.";
		refs.turnHint.textContent = "Entre em uma sala para começar.";
		return;
	}

	if (gameState.ending) {
		refs.sceneTitle.textContent = "Última memória da noite";
		refs.sceneText.textContent = "A partida terminou. Vocês podem recomeçar mantendo a mesma sala.";
		refs.turnHint.textContent = "Partida encerrada.";
		renderEnding();
		return;
	}

	const scene = scenes[gameState.currentScene];
	const isMyTurn = gameState.turnPlayerId === localPlayer.id;

	refs.sceneTitle.textContent = scene.title;
	refs.sceneText.textContent = scene.text;
	refs.turnHint.textContent = isMyTurn
		? "É a sua vez de escolher."
		: `Aguardando ${currentTurnName()} fazer a próxima escolha.`;

	scene.choices.forEach((choice, index) => {
		const button = document.createElement("button");
		button.type = "button";
		button.className = "choice-button";
		button.textContent = choice.label;
		button.disabled = !isMyTurn;
		button.addEventListener("click", () => handleChoice(index));
		refs.choices.appendChild(button);
	});
}

function renderAll() {
	updateHud();
	renderPlayers();
	renderMemories();
	renderActivity();
	renderFeeling();
	renderLetters();
	renderCare();
	renderCustomization();
	renderMinigames();
	renderMinesweeper();
	renderChess();
	renderScene();
	refs.roomStatus.textContent = roomCode ? `Sala conectada: ${roomCode}` : "Nenhuma sala conectada.";
}

function nextTurn() {
	if (!gameState || gameState.playerOrder.length === 0) return;
	const currentIndex = gameState.playerOrder.findIndex((player) => player.id === gameState.turnPlayerId);
	const nextIndex = currentIndex === -1 ?