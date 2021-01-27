export const updatePoints = (state, payload) => {
    console.log("action payload value =", payload.value);
    console.log("state detail = ", state[payload.name].id);
    const index = payload.name;
    const incrementValue = Number(payload.value);

    const playerToUpdate = state.find(
      (player) => player.id == payload.name
    );
    console.log("Player to update = ", playerToUpdate);

    return [
      ...state.slice(0, index), // everything before current post
      {
        ...state[index],
        roundPoints: incrementValue,
      },
      ...state.slice(index + 1), // everything after current post
    ];
};
