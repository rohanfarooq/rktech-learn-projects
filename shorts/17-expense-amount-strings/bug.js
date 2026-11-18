// Input values are always strings, even when the type is "number".
const amounts = ["5", "10"];
amounts.reduce((sum, a) => sum + a, 0);
// "0510"  —  0 + "5" is "05", then "05" + "10" is "0510"
