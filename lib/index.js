import { registerPluginUpdater } from "./plugin-updater.js";
const inject = ["webServer"];
function apply(ctx) {
  return registerPluginUpdater(ctx, {
    endpoint: "/api/ggtec528/dsh-archive-manager/update",
    packageName: "@ggtec528/dsh-archive-manager",
    manifestUrl: new URL("../package.json", import.meta.url)
  });
}
export {
  apply,
  inject
};
