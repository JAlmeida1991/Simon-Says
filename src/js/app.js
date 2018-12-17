import "@fortawesome/fontawesome-free/css/all.min.css";
import { simonGame, startSimonGame, stopSimonGame } from "./helpers";
import { onButton, offButton, state } from "./globals";

// Event handlers

state.colors.forEach(color => color.addEventListener("click", simonGame));

onButton.addEventListener("click", startSimonGame);

offButton.addEventListener("click", stopSimonGame);
