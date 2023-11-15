import Controller from "./Controller";
import Playlist from "./Playlist";

test("next", () => {
  // given
  const playlist = new Playlist();
  const controller = new Controller(playlist);

  // when
  let next = controller.next();

  // then
  expect(next).toBe(controller.directory + playlist.list[1]);
});

test("prev", () => {
  // given
  const playlist = new Playlist();
  const controller = new Controller(playlist);

  // when
  let next = controller.prev();

  // then
  expect(next).toBe(controller.directory + playlist.list[2]);
});