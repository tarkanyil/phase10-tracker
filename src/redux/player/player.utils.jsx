export const updatePoints = (state, payload) => {
  const index = Number(payload.name);
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
    ...state.slice(index + 1) // everything after current post
  ];

  return newState;
};

export const roundEndUpdate = (state) => {
  let newState = state.map((player) => {
    let newPhase = player.phaseCompleted
      ? player.actualPhase + 1
      : player.actualPhase;
    console.log(newPhase);
    const newTotalPoints =
      Number(player.totalPoints) + Number(player.roundPoints);
    let newPhaseCompl = false;
    const newGameCompl = () => {
      if (player.actualPhase >= 3 && player.phaseCompleted) {
        newPhase = "GAME COMPLETED";
        newPhaseCompl = false;
        console.log(newPhase);
        return true;
      }
      return false;
    };
    console.log(newGameCompl());
    const newRoundPoints = 0;
    return {
      ...player,
      totalPoints: newTotalPoints,
      roundPoints: newRoundPoints,
      phaseCompleted: newPhaseCompl,
      actualPhase: newPhase,
      completedGame: newGameCompl(),
    };
  });

  return newState;
};

export const resetExistingPlayers = (state) => {
  const newState = state.map((player) => {
    return { ...player, phaseCompleted: false, actualPhase: 1, totalPoints: 0, roundPoints: "", leader: false, completedGame: false };
  });

  return newState;
};
