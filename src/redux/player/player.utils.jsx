import { numberOfPhases } from "../../utils/constants";

export const updatePoints = (state, payload) => {
  const index = Number(payload.idx);
  const incrementValue = Number(payload.value);
  return [
    ...state.slice(0, index), // everything before current post
    {
      ...state[index],
      roundPoints: incrementValue,
    },
    ...state.slice(index + 1), // everything after current post
  ];
};

export const updatePhase = (state, payload) => {
  const index = Number(payload.id);
  const newValue = !!payload.value;
  console.log(index, newValue);
  console.log("newCheckedValue", newValue);
  console.log("state", state);
  console.log("index", index);
  console.log("sztétszlájsz + 1", ...state.slice(index + 1));
  const newState = [
    ...state.slice(0, index), // everything before current post
    {
      ...state[index],
      phaseCompleted: newValue,
    },
    ...state.slice(index + 1), // everything after current post
  ];

  return newState;
};

export const roundEndUpdate = (state) => {
  let newState = state.map((player) => {
    let newPhase;
    if (player.phaseCompleted) {
      if (player.actualPhase < numberOfPhases) {
        newPhase = player.actualPhase + 1;
      } else {
        newPhase = "GAME COMPLETED";
      }
    } else {
      newPhase = player.actualPhase;
    }
    const newTotalPoints =
      Number(player.totalPoints) + Number(player.roundPoints);
    let newPhaseCompl = false;
    const newGameCompl = () => {
      if (player.actualPhase >= numberOfPhases && player.phaseCompleted) {
        return true;
      }
      return false;
    };
    const newRoundPoints = 0;
    return {
      ...player,
      totalPoints: newTotalPoints,
      prevTotalPoints: player.totalPoints,
      roundPoints: newRoundPoints,
      phaseCompleted: newPhaseCompl,
      actualPhase: newPhase,
      prevActualPhase: player.actualPhase,
      completedGame: newGameCompl(),
    };
  });

  return newState;
};

export const resetExistingPlayers = (state) => {
  const newState = state.map((player) => {
    return {
      ...player,
      phaseCompleted: false,
      actualPhase: 1,
      prevActualPhase: 1,
      totalPoints: 0,
      prevTotalPoints: 0,
      roundPoints: "",
      leader: false,
      completedGame: false,
    };
  });

  return newState;
};

export const playerRollback = (state) => {
  const newState = state.map((player) => {
    return {
      ...player,
      phaseCompleted: false,
      actualPhase: player.prevActualPhase,
      prevActualPhase: "",
      totalPoints: player.prevTotalPoints,
      prevTotalPoints: "",
      roundPoints: "",
      leader: false,
      completedGame: false,
    };
  });

  return newState;
}
