import { NextResponse } from 'next/server';

const frameHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta property="fc:frame" content="vNext" />
  <meta property="fc:frame:image" content="https://castmate.app/og.png" />
  <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
  <meta property="fc:frame:button:1" content="🎨 Mint Companion" />
  <meta property="fc:frame:button:1:action" content="post" />
  <meta property="fc:frame:button:2" content="🛒 Marketplace" />
  <meta property="fc:frame:button:2:action" content="post" />
  <meta property="fc:frame:button:3" content="📊 Dashboard" />
  <meta property="fc:frame:button:3:action" content="post" />
  <meta property="fc:frame:post_url" content="https://castmate.app/api/frame" />
  <meta name="og:title" content="SelfAI - AI Companion on Farcaster" />
  <meta name="og:description" content="Your AI-powered Butler on Farcaster. Mint, trade, and interact with AI companions." />
  <meta name="og:image" content="https://castmate.app/og.png" />
</head>
<body>
  <h1>SelfAI Frame</h1>
  <p>Loading...</p>
</body>
</html>
`;

export async function GET(): Promise<NextResponse> {
  return new NextResponse(frameHtml, {
    headers: { 'Content-Type': 'text/html' },
  });
}

export async function POST(request: Request): Promise<NextResponse> {
  const formData = await request.formData();
  const buttonIndex = parseInt(formData.get('fc:frame:buttonIndex')?.toString() || '1');
  
  let responseHtml = '';
  
  switch (buttonIndex) {
    case 1:
      responseHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="https://castmate.app/mint.png" />
          <meta property="fc:frame:button:1" content="🤝 Helpful" />
          <meta property="fc:frame:button:2" content="😄 Witty" />
          <meta property="fc:frame:button:3" content="🧐 Analytical" />
          <meta property="fc:frame:button:4" content="🔥 Bold" />
          <meta property="fc:frame:button:5" content="🎨 Creative" />
          <meta property="fc:frame:button:6" content="← Back" />
          <meta property="fc:frame:post_url" content="https://castmate.app/api/frame" />
        </head>
        <body><h1>Select Personality</h1></body>
        </html>
      `;
      break;
    case 2:
      responseHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="https://castmate.app/marketplace.png" />
          <meta property="fc:frame:button:1" content="🔍 Browse All" />
          <meta property="fc:frame:button:2" content="⭐ Featured" />
          <meta property="fc:frame:button:3" content="🔥 Trending" />
          <meta property="fc:frame:post_url" content="https://castmate.app/api/frame" />
        </head>
        <body><h1>Marketplace</h1></body>
        </html>
      `;
      break;
    case 3:
      responseHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="https://castmate.app/dashboard.png" />
          <meta property="fc:frame:button:1" content="📝 New Post" />
          <meta property="fc:frame:button:2" content="💬 Reply" />
          <meta property="fc:frame:button:3" content="📊 Analytics" />
          <meta property="fc:frame:post_url" content="https://castmate.app/api/frame" />
        </head>
        <body><h1>Dashboard</h1></body>
        </html>
      `;
      break;
    default:
      responseHtml = frameHtml;
  }
  
  return new NextResponse(responseHtml, {
    headers: { 'Content-Type': 'text/html' },
  });
}
