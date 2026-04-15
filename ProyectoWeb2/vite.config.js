import { defineConfig } from "vite";
import path, { resolve } from "node:path";
import { glob } from "glob";
import HtmlCssPurgePlugin from "vite-plugin-purgecss";
import HandlebarsPlugin from "vite-plugin-handlebars";

function obtenerHtmlFiles() {
    return Object.fromEntries(
        glob.sync('./**/*.html', {
            ignore: [
                './dist/**',
                './node_modules/**'
            ]
        }).map((file) => {
            return [
                file.replace(/\.html$/, '').replace(/^\.\//, ''),
                resolve(__dirname, file)
            ];
        })
    );
}

export default defineConfig({
    appType: 'mpa',
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