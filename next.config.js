/** @type {import('next').NextConfig} */

const path = require("path")

const nextConfig = {
    reactStrictMode: true,

    // For include base.scss in every scss file
    sassOptions: {
        includePaths: [
            path.join(__dirname, "styles")
        ],
        prependData: `@import "./base.scss";`,
    }
}

module.exports = nextConfig
