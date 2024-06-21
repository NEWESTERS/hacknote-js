import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

import { type AstroIntegration } from 'astro';
import sirv from 'sirv';

export function pagefind(): AstroIntegration {
  let outDir: string;

  return {
    name: 'astro-pagefind',
    hooks: {
      'astro:config:setup': ({ config }) => {
        outDir = fileURLToPath(config.outDir);
      },
      'astro:server:setup': ({ server }) => {
        const serve = sirv(outDir, {
          dev: true,
          etag: true
        });

        server.middlewares.use((request, response, next) => {
          if (request.url?.startsWith('/pagefind/')) {
            serve(request, response, next);
          } else {
            next();
          }
        });
      },
      'astro:build:done': ({ logger }) => {
        if (!outDir) {
          logger.warn(
            "astro-pagefind couldn't reliably determine the output directory. Search index will not be built."
          );
          return;
        }

        const cmd = `npx pagefind --site "${outDir}"`;
        execSync(cmd, {
          stdio: [process.stdin, process.stdout, process.stderr]
        });
      }
    }
  };
}
