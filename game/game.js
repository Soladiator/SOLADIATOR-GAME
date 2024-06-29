import entityOne from "./player.json" assert { type: "json" };
import entityTwo from "./opponent.json" assert { type: "json" };

const calculateStat = (x, multiplier) =>
  Math.round(multiplier * (1 - Math.exp(-0.05 * x)));

const Status = {
  CRITICAL: "critical",
  STANDARD: "standard",
};

const Dodge = {
  DODGED: "dodged",
  FAILED: "failed",
};

const player = {
  name: entityOne.name,
  str: Number(entityOne.str),
  dex: Number(entityOne.dex),
  dex_percent: calculateStat(entityOne.dex, 40),
  maxHealth: Number(entityOne.vit) * 5,
  health: Number(entityOne.health),
  luc: Number(entityOne.luc),
  def: Number(entityOne.def),
  def_percent: calculateStat(entityOne.def, 30),
};

const opponent = {
  name: entityTwo.name,
  str: Number(entityTwo.str),
  dex: Number(entityTwo.dex),
  dex_percent: calculateStat(entityTwo.dex, 40),
  maxHealth: Number(entityTwo.vit) * 5,
  health: Number(entityTwo.health),
  luc: Number(entityTwo.luc),
  def: Number(entityTwo.def),
  def_percent: calculateStat(entityTwo.def, 30),
};

let gameData = [];

const attack = (attacker) => {
  const dexteritySuccess = Math.random() < attacker.dex_percent / 100;
  let attackScore = attacker.str;
  let critical = false;

  if (dexteritySuccess) {
    attackScore *= 2;
    critical = true;
  }

  return { attackScore, critical };
};

const defend = (defender, attackScore) => {
  const dexteritySuccess = Math.random() < defender.dex_percent / 100;
  let dodged = false;

  if (dexteritySuccess) {
    dodged = true;
  } else {
    const damage = attackScore * (1 - defender.def_percent * 0.01);
    defender.health -= damage;
  }

  return dodged;
};

const combatRound = (attacker, defender) => {
  const { attackScore, critical } = attack(attacker);
  const dodged = defend(defender, attackScore);

  gameData.push({
    attacker: attacker.name,
    defender: defender.name,
    attack_status: critical ? Status.CRITICAL : Status.STANDARD,
    dodge_status: dodged ? Dodge.DODGED : Dodge.FAILED,
    attack_amount: attackScore,
    player1_health: parseFloat(player.health.toFixed(2)),
    player2_health: parseFloat(opponent.health.toFixed(2)),
  });
};

const combat = () => {
  let attacker = player;
  let defender = opponent;

  while (player.health > 0 && opponent.health > 0) {
    combatRound(attacker, defender);
    // Switch roles
    [attacker, defender] = [defender, attacker];
  }
};
// Initial health state
console.log({
  player1_name: player.name,
  player1_starting_health: player.health,
  player2_name: opponent.name,
  player2_starting_health: opponent.health,
});
combat();
console.log(gameData);
