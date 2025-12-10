module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
  // plugins: [
  //   [
  //     "module-resolver",
  //     {
  //       root: ["./src"], // Or the base directory for your aliases, e.g., './src'
  //       alias: {
  //         "@": "./",
  //         "@config": "./config",
  //         "@controllers": "./controllers",
  //         "@databases": "./databases",
  //         "@dtos": "./dtos",
  //         "@exceptions": "./exceptions",
  //         "@interfaces": "./interfaces",
  //         "@middlewares": "./middlewares",
  //         "@models": "./models",
  //         "@routes": "./routes",
  //         "@services": "./services",
  //         "@utils": "./utils",
  //         "@types": "./types",
  //       },
  //     },
  //   ],
  // ],
};
