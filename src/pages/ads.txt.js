export async function GET({ params, request }) {
  const data = "google.com, pub-5553828151949683, DIRECT, f08c47fec0942fa0";
  const response = new Response(data, {
    headers: {
      'Content-Type': 'text/plain',
      'Content-Length': data.length,
    },
    status: 200,
  });
  return response;
}
