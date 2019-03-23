export const getCurrentBuilding = (buildings, bin) => {
  return buildings.find(building => building.bin === bin) || {}
}
