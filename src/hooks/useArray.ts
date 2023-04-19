export default function useArray(n: number) {
  let arr = [];

  for (var i = 0; i < n; i++) {
    arr.push(...[i]);
  }

  return {
    arr,
  };
}
