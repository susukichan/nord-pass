import itemHasOldPassword from "../itemHasOldPassword";

const now = Date.now();
const twoDays = new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString();
const thirtyOneDays = new Date(now - 31 * 24 * 60 * 60 * 1000).toISOString();

const items = [
  {
    id: "001",
    title: "Google",
    description: "My personal account",
    password: "Password123.",
    createdAt: twoDays,
  },
  {
    id: "002",
    title: "Facebook",
    description: "Facebook account that I manage",
    password: "SuperDuper5trong!",
    createdAt: thirtyOneDays,
  },
];

test("should return true if item was created more than 30 days ago", () => {
  expect(itemHasOldPassword(items[0])).toBe(false);
  expect(itemHasOldPassword(items[1])).toBe(true);
});
