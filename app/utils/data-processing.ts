export function convertMapToArrays({
  map,
  sorted,
}: {
  map: Record<string, number[]>;
  sorted: boolean;
}) {
  const keyArr = map ? Object.keys(map) : [];
  const timeArr = flattenToArrayOfAverageValues(map);

  const list = [];
  for (let j = 0; j < keyArr.length; j++)
    list.push({ key: keyArr[j], time: timeArr[j] });

  //2) sort:
  if (sorted) {
    list.sort(function (a, b) {
      return a.time > b.time ? -1 : a.time == b.time ? 0 : 1;
    });
  }

  //3) separate them back out:
  for (let k = 0; k < list.length; k++) {
    keyArr[k] = list[k].key;
    timeArr[k] = list[k].time;
  }

  return { keyArr, timeArr };
}

// returns array of average values
export const flattenToArrayOfAverageValues = (
  map: Record<string, number[]>,
) => {
  return map
    ? Object.values(map).reduce((acc, curr) => {
        const totalTime = curr.reduce((sum, time) => sum + time, 0);
        acc.push(totalTime / curr.length);
        return acc;
      }, [])
    : [];
};
