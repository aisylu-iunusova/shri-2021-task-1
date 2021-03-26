import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import replace from "@rollup/plugin-replace";

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require("child_process").spawn(
        "npm",
        ["run", "start", "--", "--dev"],
        {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        }
      );

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

export default {
  input: "src/main.js",
  output: {
    sourcemap: false,
    name: "app",
    file: "build/stories.js",
  },
  plugins: [
    postcss({
      extract: true,
      plugins: [require("postcss-nested"), require("postcss-import")],
      minimize: production,
    }),
    replace({
      preventAssignment: false,
      "process.env.NODE_ENV": JSON.stringify(!production),
    }),
    resolve({
      browser: true,
    }),
    commonjs(),
    !production && serve(),
    !production && livereload("build"),
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
