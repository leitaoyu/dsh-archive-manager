import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";

const clientPath = fileURLToPath(new URL("../src/client.js", import.meta.url));

test("归档会话使用卡片布局，并只显示恢复操作", async () => {
  const client = await readFile(clientPath, "utf8");

  assert.match(client, /dsham_archiveCardActions/);
  assert.match(client, /dsham_archiveCardMeta/);
  assert.match(client, /onUnarchive\(node\.id\)/);
  assert.match(client, /background:var\(--dsw-alias-button-elevated-fill\)/);
  assert.doesNotMatch(client, /dsham_archiveCardDelete/);
});

test("侧栏不提供删除会话入口，永久删除只保留在设置页", async () => {
  const client = await readFile(clientPath, "utf8");

  assert.doesNotMatch(client, /id: "delete-session"/);
  assert.doesNotMatch(client, /onDeleteSession/);
  assert.doesNotMatch(client, /onSessionDelete/);
  // 设置页的「已归档」列表仍保留永久删除按钮。
  assert.match(client, /className: "dsham_settingsDelete"/);
});

test("两个删除确认入口都使用红色危险样式", async () => {
  const client = await readFile(clientPath, "utf8");

  const confirmButtonMatches = client.match(/className: "dsham_settingsDeleteConfirm"/g) ?? [];

  assert.equal(confirmButtonMatches.length, 2);
  assert.match(client, /\.dsham_settingsDeleteConfirm\{color:var\(--dsw-alias-state-error-primary\)!important;background:transparent!important;border-color:var\(--dsw-alias-state-error-primary\)!important/);
  assert.match(client, /\.dsham_settingsDeleteConfirm:focus-visible\{outline:2px solid var\(--dsw-alias-state-error-secondary\);outline-offset:2px\}/);
});

test("全部归档确认使用红色提示样式", async () => {
  const client = await readFile(clientPath, "utf8");

  assert.match(client, /className: "dsham_archiveWorkspaceConfirm"/);
  assert.match(client, /\.dsham_archiveWorkspaceConfirm\{color:var\(--dsw-alias-state-error-primary\)!important;background:transparent!important;border-color:var\(--dsw-alias-state-error-primary\)!important/);
  assert.match(client, /\.dsham_archiveWorkspaceConfirm:hover:not\(:disabled\)\{background:color-mix\(in srgb,var\(--dsw-alias-state-error-primary\) 20%,transparent\)!important\}/);
  assert.match(client, /\.dsham_archiveWorkspaceConfirm:focus-visible\{outline:2px solid var\(--dsw-alias-state-error-secondary\);outline-offset:2px\}/);
});
