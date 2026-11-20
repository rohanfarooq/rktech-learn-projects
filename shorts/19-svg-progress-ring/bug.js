// Setting only the offset does nothing.
// Without strokeDasharray the stroke is one solid line (dasharray "none"),
// so there is no dash for strokeDashoffset to shift: the ring stays full.
const ring = document.querySelector("#ring-progress");

function render() {
  ring.style.strokeDashoffset = 565 * (1 - remaining / duration);
}
// At 05:00 of 25:00 the ring still looks full.
