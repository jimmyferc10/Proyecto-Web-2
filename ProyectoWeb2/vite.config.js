import { defineConfig } from "vite";
import { resolve } from "node:path";
import pkg from "glob";
import HtmlCssPurgePlugin from "vite-plugin-purgecss";
import HandlebarsPlugin from "vite-plugin-handlebars";

function obtenerHtmlFiles() {
   
    const files = (pkg.sync || pkg.globSync)('./**/*.html', {
        ignore: [
            './dist/**',
            './node_modules/**'
        ]
    });

    return Object.fromEntries(
        files.map((file) => {
            return [
                file.replace(/\.html$/, '').replace(/^\.\//, ''),
                resolve(__dirname, file)
            ];
        })
    );
}

export default defineConfig({
    appType: 'mpa',
    base: process.env.DEPLOY_BASE_URL || '/',
    build: {
        rollupOptions: {
            input: obtenerHtmlFiles(),
        }
    },
    plugins: [
        HandlebarsPlugin({
            partialDirectory: resolve(__dirname, 'components'),
        }),
        HtmlCssPurgePlugin(),
    ]
});