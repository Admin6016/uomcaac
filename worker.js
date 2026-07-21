addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
async function handleRequest(request) {
  return new Response('Hello from uomcaac!', { headers: { 'Content-Type': 'text/plain' } });
}
