const getLevel = (levels, percentScored) => {
  return levels.find(level => (level.score.min <= percentScored) && (percentScored < level.score.max));
};

export default getLevel;