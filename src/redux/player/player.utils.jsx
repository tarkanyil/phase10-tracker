export const updatePoints = (state, payload) => {
    const index = payload.name;
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
    const index = payload.name;
    const newValue = payload.checked;
    console.log(newValue);
    return [
      ...state.slice(0, index), // everything before current post
      {
        ...state[index],
        phaseCompleted: newValue,
      },
      ...state.slice(index + 1), // everything after current post
    ];
}

export const roundEndUpdate = (state) => {
    let newState = state.map(player => {
      const newPhase = player.actualPhase + 1;
      const newTotalPoints = Number(player.totalPoints) + Number(player.roundPoints);
      console.log(newTotalPoints);
      const newCompl = false;
      const newRoundPoints = 0;
      console.log(newPhase);
      return {...player, totalPoints: newTotalPoints, roundPoints: newRoundPoints, phaseCompleted: newCompl, actualPhase: newPhase}
    })

    return newState;
}
