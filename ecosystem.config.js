module.exports = {
    apps: [
        {
            name: "nextjs-app",
            script: "node_modules/next/dist/bin/next",
            args: "start",
            env: {
                PORT: process.env.PORT || 3000,
            },
            watch: false,
            autorestart: true,
        },
    ],
};