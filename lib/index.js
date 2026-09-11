import { registerPluginUpdater } from "./plugin-updater.js";
const inject = ["webServer"];
function apply(ctx) {
  return registerPluginUpdater(ctx, {
    endpoint: "/api/leitaoy/dsh-archive-manager/update",
    packageName: "@leitaoy/dsh-archive-manager",
    manifestUrl: new URL("../package.json", import.meta.url)
  });
}
export {
  apply,
  inject
};
