import { serve } from "https://deno.land/std@0.155.0/http/server.ts";
import { createHash } from "https://deno.land/std@0.155.0/hash/mod.ts";
import "https://unpkg.com/badgen";

serve(async (req: Request) => {
    const u = new URL(req.url);
    const page_id = getPageId(u);
    if (!page_id) {
        return Response.redirect("https://github.com/jwenjian/visitor-badge-deno", 302);
    }
    const page_checksum = checksumOfUrl(page_id);
    const latest_count = await increase_count(page_checksum);
    console.log(badgen);
    const svg = badgen({
            label: 'views',
            status: "" + latest_count
            });
    
    const current = new Date();
    let expire_time = new Date(current.getTime() - 600000);
    return new Response(svg, {
        status: 200,
        headers: {
            "Content-Type": "image/svg+xml;charset=utf-8",
            "Cache-Control": "no-cache,max-age=0,no-store,s-maxage=0,proxy-revalidate",
            "Expires": expire_time.toGMTString()
        }
    });
});

function checksumOfUrl(url: String) {
    return createHash("md5").update(url).toString();
}

/**
 * "/page.id.svg" -> "page.id"
 */
function getPageId(u: URL) {
    if (u.pathname.length < 5) {
        return null;
    }
    if (u.pathname.substring(0,1) !== "/") {
        return null;
    } 
    if (u.pathname.substring(u.pathname.length - 4) !== ".svg") {
        return null;
    }
    return u.pathname.substring(1, u.pathname.length - 4);
}

async function increase_count(page_checksum: String) {
    // Connect to Redis
    const kv = await Deno.openKv();
    const keys = ["counts", page_checksum];
    let current = await kv.get(keys);
    if (current && current.value) {
        let new_count = current.value + 1;
        await kv.set(keys, new_count);
        return new_count;
    } else {
        await kv.set(keys, 1);
        return 1;
    }
}
