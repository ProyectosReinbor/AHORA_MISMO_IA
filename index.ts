const serve = Bun.serve({
    async fetch(request) {
        const url = new URL(request.url)
        const pathname = url.pathname
        if (pathname === '/') {
            await Bun.build({
                entrypoints: ['src/index.ts'],
                outdir: 'public/src',
                minify: true,
            })
            return new Response(Bun.file('index.html'))
        }
        const file = Bun.file(`public${url.pathname}`)
        return new Response(file);
    }
})

console.log(`listening on http://localhost:${serve.port}`);