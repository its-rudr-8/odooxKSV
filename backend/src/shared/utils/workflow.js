const { AppError } = require("../errors/AppError");

function ensureValidTransition(currentState, nextState, allowedTransitions, entityName) {
  const allowedStates = allowedTransitions[currentState] || [];
  if (!allowedStates.includes(nextState)) {
    throw new AppError(`Invalid ${entityName} transition from ${currentState} to ${nextState}`, 400);
  }
}

module.exports = { ensureValidTransition };