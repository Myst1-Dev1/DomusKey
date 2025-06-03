import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'imoveis/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const res = await fetch('https://domus-key-api.vercel.app/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query {
              immobiles {
                id
              }
            }
          `,
        }),
      });

      const result = await res.json();

      return result.data.immobiles.map((imovel: any) => ({ id: imovel.id }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];