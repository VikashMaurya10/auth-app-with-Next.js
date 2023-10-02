/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  env: {
    URI: "mongodb+srv://vikashmauryastp:67NSKmY93jp0GxB5@cluster0.poglb9n.mongodb.net/",
    SECRET_KEY:"nowsecretkeyHere"
  },
  // distDir: "export",
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/login",
  //       permanent: false,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
